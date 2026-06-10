import React, { useState, useEffect, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, Alert, Linking, Platform,
} from "react-native";
import * as Location from "expo-location";
import { COLORS, SHADOWS } from "../lib/theme";
import { useTheme } from "../lib/ThemeContext";

const API = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

// Map local trip status → booking status in DB
const STATUS_TO_DB: Record<string, string> = {
  en_route:    "en_route",
  arrived:     "arrived",
  in_progress: "in_progress",
  completed:   "completed",
};

type TripStatus = "accepted" | "en_route" | "arrived" | "in_progress" | "completed";

const STATUS_FLOW: TripStatus[] = ["accepted", "en_route", "arrived", "in_progress", "completed"];

const STATUS_CONFIG: Record<TripStatus, { label: string; action: string; color: string; nextLabel: string }> = {
  accepted:    { label: "Job Accepted",       action: "Head to Pickup",   color: COLORS.blue,   nextLabel: "I'm On the Way" },
  en_route:    { label: "En Route to Pickup", action: "Arrived at Pickup",color: COLORS.orange, nextLabel: "I've Arrived"   },
  arrived:     { label: "Arrived at Pickup",  action: "Start Trip",       color: COLORS.gold,   nextLabel: "Start Trip"     },
  in_progress: { label: "Trip In Progress",   action: "Complete Trip",    color: COLORS.green,  nextLabel: "Complete Trip"  },
  completed:   { label: "Trip Completed",     action: "",                 color: COLORS.green,  nextLabel: ""               },
};

// ── Inline customer rating widget ────────────────────────────────────────────
function CustomerRating({ bookingId, customerId }: { bookingId?: string; customerId?: string }) {
  const { colors } = useTheme();
  const [rating,    setRating]    = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [loading,   setLoading]   = React.useState(false);

  if (submitted) {
    return (
      <View style={{ paddingVertical: 12, alignItems: "center" }}>
        <Text style={{ color: colors.gold, fontWeight: "700", fontSize: 14 }}>✓ Customer rated</Text>
      </View>
    );
  }

  const submit = async (stars: number) => {
    setRating(stars);
    setLoading(true);
    try {
      await fetch(`${API}/api/booking/${bookingId}/rate-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverRating: stars, customerId }),
      });
    } catch { /* best effort */ }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <View style={{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.darkBorder, width: "100%" }}>
      <Text style={{ color: colors.gray400, fontSize: 12, textAlign: "center", marginBottom: 8, fontWeight: "600", letterSpacing: 1 }}>
        RATE YOUR CUSTOMER
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <TouchableOpacity key={n} onPress={() => !loading && submit(n)} disabled={loading}>
            <Text style={{ fontSize: 28, color: rating >= n ? colors.gold : colors.darkBorder }}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ActiveTripScreen({ route, navigation }: any) {
  const { colors, isDark } = useTheme();
  const { job } = route.params || {};
  const [status, setStatus] = useState<TripStatus>("accepted");
  const [loading, setLoading] = useState(false);
  const locationWatchRef = useRef<any>(null);

  const config = STATUS_CONFIG[status];
  const currentIndex = STATUS_FLOW.indexOf(status);
  const isLastStep = status === "completed";

  // Start location tracking when trip begins
  useEffect(() => {
    if (!job?.id) return;
    startLocationTracking();
    return () => stopLocationTracking();
  }, []);

  const startLocationTracking = async () => {
    // Request foreground location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Location Required", "Please enable location access so customers can track your arrival.");
      return;
    }

    // Watch position — fires every ~5 seconds or when moved >10m
    locationWatchRef.current = await Location.watchPositionAsync(
      {
        accuracy:            Location.Accuracy.High,
        timeInterval:        5000,   // minimum 5s between updates
        distanceInterval:    10,     // minimum 10m movement
      },
      (pos) => {
        fetch(`${API}/api/driver/location`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            driverId:  job?.driverId,
            bookingId: job?.id,
            lat:       pos.coords.latitude,
            lng:       pos.coords.longitude,
            heading:   pos.coords.heading   ?? null,
            speed:     pos.coords.speed != null ? pos.coords.speed * 3.6 : null, // m/s → km/h
            accuracy:  pos.coords.accuracy  ?? null,
          }),
        }).catch(() => {});
      }
    );
  };

  const stopLocationTracking = () => {
    if (locationWatchRef.current) {
      locationWatchRef.current.remove();
      locationWatchRef.current = null;
    }
  };

  const advance = async () => {
    if (isLastStep) return;
    setLoading(true);
    const nextStatus = STATUS_FLOW[currentIndex + 1];
    try {
      await fetch(`${API}/api/driver/trip-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: job?.id,
          driverId: job?.driverId,
          status: STATUS_TO_DB[nextStatus] || nextStatus,
        }),
      });
    } catch { /* continue even if network fails */ }
    setStatus(nextStatus);
    setLoading(false);
    if (nextStatus === "completed") stopLocationTracking();
  };

  const openNavigation = () => {
    const address = status === "in_progress" ? job?.dropoff : job?.pickup;
    const url = `https://maps.google.com/?q=${encodeURIComponent(address || "")}`;
    Linking.openURL(url);
  };

  const callCustomer = () => {
    if (!job?.customerPhone) {
      Alert.alert("No phone number", "This customer hasn't shared a phone number. Use in-app chat to reach them.");
      return;
    }
    Alert.alert("Call Customer", `Call ${job?.customer || "the customer"}?`, [
      { text: "Cancel" },
      { text: "Call", onPress: () => Linking.openURL(`tel:${job.customerPhone}`) },
    ]);
  };

  if (isLastStep) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.black, justifyContent: "center" }]}>
        <StatusBar barStyle={isDark ? "dark-content" : "dark-content"} backgroundColor={colors.black} />
        <View style={styles.completedCard}>
          <Text style={{ fontSize: 28, color: colors.green, marginBottom: 16, fontWeight: "700" }}>Complete</Text>
          <Text style={[styles.completedTitle, { color: colors.white }]}>Trip Completed!</Text>
          <Text style={[styles.completedSub, { color: colors.gray400 }]}>Great job. Your earnings have been credited.</Text>
          <View style={[styles.earningsRow, { backgroundColor: colors.darkSurface, borderColor: `${colors.gold}30` }]}>
            <Text style={[styles.earningsLabel, { color: colors.gray400 }]}>Earned</Text>
            <Text style={[styles.earningsValue, { color: colors.gold }]}>${job?.amount?.toFixed(2) || "—"}</Text>
          </View>

          {/* Rate the customer */}
          <CustomerRating bookingId={job?.id} customerId={job?.customerId} />

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.gold }, SHADOWS.gold, { marginTop: 8 }]}
            onPress={() => navigation.navigate("DriverHome")}
          >
            <Text style={[styles.actionBtnText, { color: colors.black }]}>Back to Dashboard →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <StatusBar barStyle={isDark ? "dark-content" : "dark-content"} backgroundColor={colors.black} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.darkBorder }]}>
        <Text style={[styles.headerTitle, { color: colors.white }]}>Active Trip</Text>
        <View style={[styles.statusPill, { backgroundColor: `${config.color}20`, borderColor: `${config.color}50` }]}>
          <View style={[styles.statusDot, { backgroundColor: config.color }]} />
          <Text style={[styles.statusText, { color: config.color }]}>{config.label}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        {STATUS_FLOW.filter(s => s !== "completed").map((s, i) => (
          <View
            key={s}
            style={[
              styles.progressSegment,
              { backgroundColor: STATUS_FLOW.indexOf(status) >= i ? colors.gold : colors.darkBorder },
            ]}
          />
        ))}
      </View>

      <View style={{ flex: 1, padding: 20 }}>
        {/* Job Info */}
        <View style={[styles.jobCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
          <View style={styles.jobHeader}>
            <Text style={[styles.jobId, { color: colors.gray500 }]}>{job?.id || "BK8825"}</Text>
            <Text style={[styles.jobAmount, { color: colors.gold }]}>${job?.amount?.toFixed(2) || "—"}</Text>
          </View>

          {/* Customer */}
          <View style={[styles.customerRow, { borderBottomColor: colors.darkBorder }]}>
            <View style={[styles.avatar, { backgroundColor: `${colors.gold}20` }]}>
              <Text style={[styles.avatarText, { color: colors.gold }]}>{(job?.customer || "J")[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.customerName, { color: colors.white }]}>{job?.customer || "James Whitfield"}</Text>
              <Text style={[styles.customerSub, { color: colors.gray500 }]}>{job?.passengers || 1} passenger{(job?.passengers || 1) > 1 ? "s" : ""} · {job?.luggage || 0} bags</Text>
            </View>
            <TouchableOpacity style={[styles.callBtn, { backgroundColor: colors.darkMuted, borderColor: colors.darkBorder }]} onPress={callCustomer}>
              <Text style={{ fontSize: 14, color: colors.white, fontWeight: "600" }}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.chatBtn, { backgroundColor: colors.gold }]} onPress={() => navigation.navigate("Chat", { bookingId: job?.id, customerName: job?.customer })}>
              <Text style={{ color: COLORS.white, fontWeight: "600", fontSize: 14 }}>Chat</Text>
            </TouchableOpacity>
          </View>

          {/* Route */}
          <View style={styles.routeBox}>
            <View style={styles.routeRow}>
              <View style={[styles.dotGreen, { backgroundColor: colors.green }]} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.routeLabel, { color: colors.gray500 }]}>PICKUP</Text>
                <Text style={[styles.routeAddress, { color: colors.white }]}>{job?.pickup || "Sydney Airport T1"}</Text>
              </View>
            </View>
            {/* Waypoints / intermediate stops */}
            {Array.isArray(job?.waypoints) && job.waypoints.filter((w: string) => w?.trim()).map((wp: string, i: number) => (
              <React.Fragment key={i}>
                <View style={[styles.routeLine, { backgroundColor: colors.darkBorder }]} />
                <View style={styles.routeRow}>
                  <View style={[styles.dotGreen, { backgroundColor: colors.blue || "#60A5FA", width: 10, height: 10, borderRadius: 5, marginTop: 14 }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.routeLabel, { color: colors.gray500 }]}>STOP {i + 1}</Text>
                    <Text style={[styles.routeAddress, { color: colors.white }]}>{wp}</Text>
                  </View>
                </View>
              </React.Fragment>
            ))}
            <View style={[styles.routeLine, { backgroundColor: colors.darkBorder }]} />
            <View style={styles.routeRow}>
              <View style={[styles.dotGold, { backgroundColor: colors.gold }]} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.routeLabel, { color: colors.gray500 }]}>DROP-OFF</Text>
                <Text style={[styles.routeAddress, { color: colors.white }]}>{job?.dropoff || "1 Martin Place, CBD"}</Text>
              </View>
            </View>
          </View>

          {/* Meta */}
          <View style={[styles.metaRow, { borderTopColor: colors.darkBorder }]}>
            <Text style={[styles.metaItem, { color: colors.gray400 }]}>{job?.distanceKm || 24.3} km</Text>
            <Text style={[styles.metaItem, { color: colors.gray400 }]}>~{job?.durationMin || 32} min</Text>
            {job?.flightNumber ? <Text style={[styles.metaItem, { color: colors.gray400 }]}>Flight {job.flightNumber}</Text> : null}
          </View>
        </View>

        {/* Navigate button */}
        <TouchableOpacity style={[styles.navBtn, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]} onPress={openNavigation}>
          <Text style={[styles.navBtnText, { color: colors.white }]}>Open in Google Maps</Text>
        </TouchableOpacity>

        {/* Status action button */}
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.gold }, SHADOWS.gold, loading && { opacity: 0.7 }]}
          onPress={advance}
          disabled={loading}
        >
          <Text style={[styles.actionBtnText, { color: colors.black }]}>
            {loading ? "Updating…" : `✓  ${config.nextLabel}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.black },
  header:          { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.darkBorder },
  headerTitle:     { color: COLORS.white, fontWeight: "700", fontSize: 18 },
  statusPill:      { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  statusDot:       { width: 7, height: 7, borderRadius: 4 },
  statusText:      { fontSize: 11, fontWeight: "700" },

  progressBar:     { flexDirection: "row", gap: 4, paddingHorizontal: 20, paddingVertical: 10 },
  progressSegment: { flex: 1, height: 3, borderRadius: 2 },

  jobCard:         { backgroundColor: COLORS.darkSurface, borderRadius: 18, padding: 18, borderWidth: 1, borderColor: COLORS.darkBorder, marginBottom: 14 },
  jobHeader:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  jobId:           { color: COLORS.gray500, fontSize: 12, fontFamily: "monospace" },
  jobAmount:       { color: COLORS.gold, fontSize: 26, fontWeight: "700" },

  customerRow:     { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.darkBorder },
  avatar:          { width: 44, height: 44, borderRadius: 22, backgroundColor: `${COLORS.gold}20`, justifyContent: "center", alignItems: "center" },
  avatarText:      { color: COLORS.gold, fontWeight: "700", fontSize: 18 },
  customerName:    { color: COLORS.white, fontWeight: "700", fontSize: 16 },
  customerSub:     { color: COLORS.gray500, fontSize: 12, marginTop: 2 },
  callBtn:         { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.darkMuted, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: COLORS.darkBorder },
  chatBtn:         { height: 44, borderRadius: 22, paddingHorizontal: 16, justifyContent: "center", alignItems: "center" },

  routeBox:        { marginBottom: 14 },
  routeRow:        { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 4 },
  dotGreen:        { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.green, marginTop: 14 },
  dotGold:         { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.gold, marginTop: 14 },
  routeLine:       { width: 2, height: 24, backgroundColor: COLORS.darkBorder, marginLeft: 5, marginVertical: 2 },
  routeLabel:      { color: COLORS.gray500, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 },
  routeAddress:    { color: COLORS.white, fontSize: 14, fontWeight: "500", lineHeight: 20 },

  metaRow:         { flexDirection: "row", gap: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.darkBorder },
  metaItem:        { color: COLORS.gray400, fontSize: 12 },

  navBtn:          { backgroundColor: COLORS.darkSurface, borderRadius: 14, paddingVertical: 14, alignItems: "center", marginBottom: 10, borderWidth: 1, borderColor: COLORS.darkBorder },
  navBtnText:      { color: COLORS.white, fontWeight: "600", fontSize: 15 },
  actionBtn:       { backgroundColor: COLORS.gold, borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  actionBtnText:   { color: COLORS.black, fontWeight: "700", fontSize: 16 },

  completedCard:   { alignItems: "center", padding: 32 },
  completedTitle:  { color: COLORS.white, fontSize: 28, fontWeight: "700", marginBottom: 10 },
  completedSub:    { color: COLORS.gray400, fontSize: 15, textAlign: "center", marginBottom: 24 },
  earningsRow:     { backgroundColor: COLORS.darkSurface, borderRadius: 16, paddingHorizontal: 40, paddingVertical: 20, alignItems: "center", borderWidth: 1, borderColor: `${COLORS.gold}30`, marginBottom: 8, width: "100%" },
  earningsLabel:   { color: COLORS.gray400, fontSize: 13, marginBottom: 4 },
  earningsValue:   { color: COLORS.gold, fontSize: 36, fontWeight: "700" },
});
