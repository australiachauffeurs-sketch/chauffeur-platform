import React, { useState, useEffect, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, Animated, Dimensions, Linking, Alert,
} from "react-native";
import { useTheme } from "../lib/ThemeContext";
import { supabase } from "../lib/supabase";

const { width } = Dimensions.get("window");

const STAGES = [
  { key: "confirmed",       label: "Confirmed",      icon: "1" },
  { key: "driver_assigned", label: "Driver Assigned", icon: "2" },
  { key: "arriving",        label: "Arriving",        icon: "3" },
  { key: "in_progress",     label: "In Progress",     icon: "4" },
  { key: "completed",       label: "Completed",       icon: "5" },
];

const STATUS_TO_STAGE: Record<string, number> = {
  confirmed: 0, driver_assigned: 1, en_route: 1,
  arrived: 2, in_progress: 3, completed: 4,
};

interface DriverLocation {
  lat: number;
  lng: number;
  heading?: number | null;
  speed?: number | null;
  updated_at?: string;
}

export default function RideTrackingScreen({ route, navigation }: any) {
  const { colors } = useTheme();
  const COLORS = colors;
  const styles = makeStyles(colors);
  const { booking } = route.params || {};
  const [currentStage, setCurrentStage] = useState(
    STATUS_TO_STAGE[booking?.status] ?? 1
  );
  const [eta,       setEta]       = useState(8);
  const [driverLoc, setDriverLoc] = useState<DriverLocation | null>(null);
  const [connected, setConnected] = useState(false);

  const pulseAnim    = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0.25)).current;
  const channelRef   = useRef<any>(null);
  const statusChRef  = useRef<any>(null);

  const driverId  = booking?.driver_id;
  const bookingId = booking?.id;

  // ── Pulse animation ────────────────────────────────────────────────────────
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.3, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,   duration: 1000, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  // ── Progress bar animation ─────────────────────────────────────────────────
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue:  (currentStage + 1) / STAGES.length,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [currentStage]);

  // ── ETA countdown ──────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setEta(prev => (prev > 0 ? prev - 1 : 0));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // ── Supabase Realtime: driver location + booking status ───────────────────
  useEffect(() => {
    const hasSupabase =
      process.env.EXPO_PUBLIC_SUPABASE_URL &&
      !process.env.EXPO_PUBLIC_SUPABASE_URL.includes("your-project");

    if (!hasSupabase) {
      // Demo — simulate driver moving toward pickup
      const demoPath = [
        { lat: -33.9461, lng: 151.1772 },
        { lat: -33.9250, lng: 151.1850 },
        { lat: -33.9050, lng: 151.1950 },
        { lat: -33.8850, lng: 151.2020 },
        { lat: -33.8688, lng: 151.2093 },
      ];
      let idx = 0;
      setDriverLoc({ ...demoPath[0], updated_at: new Date().toISOString() });
      setConnected(true);
      const t = setInterval(() => {
        idx = Math.min(idx + 1, demoPath.length - 1);
        setDriverLoc({ ...demoPath[idx], speed: 45 + Math.random() * 20, updated_at: new Date().toISOString() });
        setEta(Math.max(0, demoPath.length - idx - 1) * 2);
        if (idx === demoPath.length - 1) clearInterval(t);
      }, 4000);
      return () => clearInterval(t);
    }

    // Fetch latest location immediately
    (async () => {
      const q = supabase.from("driver_locations").select("lat,lng,heading,speed,updated_at");
      const { data } = driverId
        ? await q.eq("driver_id",  driverId).maybeSingle()
        : await q.eq("booking_id", bookingId).maybeSingle();
      if (data) { setDriverLoc(data); setConnected(true); }
    })();

    // Subscribe to live location updates
    const locFilter = driverId
      ? `driver_id=eq.${driverId}`
      : `booking_id=eq.${bookingId}`;

    channelRef.current = supabase
      .channel(`driver-loc-${driverId ?? bookingId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "driver_locations", filter: locFilter },
        (payload: any) => {
          setDriverLoc(payload.new as DriverLocation);
          setConnected(true);
        }
      )
      .subscribe((s: string) => setConnected(s === "SUBSCRIBED"));

    // Subscribe to booking status changes
    if (bookingId) {
      statusChRef.current = supabase
        .channel(`booking-status-${bookingId}`)
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "bookings", filter: `id=eq.${bookingId}` },
          (payload: any) => {
            const stage = STATUS_TO_STAGE[payload.new?.status];
            if (stage != null) setCurrentStage(stage);
          }
        )
        .subscribe();
    }

    return () => {
      channelRef.current?.unsubscribe?.();
      statusChRef.current?.unsubscribe?.();
    };
  }, [driverId, bookingId]);

  const driver = booking?.driver || {
    name: "Awaiting driver", rating: null, trips: null,
    phone: "", vehicle: booking?.vehicle_category || booking?.vehicle || "Luxury vehicle", plate: "",
  };

  const openMaps = () => {
    const url = driverLoc
      ? `https://maps.google.com/?q=${driverLoc.lat},${driverLoc.lng}`
      : `https://maps.google.com/?q=${encodeURIComponent(booking?.pickup_address || "")}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Live Tracking</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Live Location Panel */}
      <View style={styles.mapPlaceholder}>
        {/* Connection badge */}
        <View style={styles.connBadge}>
          <View style={[styles.connDot, { backgroundColor: connected ? COLORS.green : COLORS.gray500 }]} />
          <Text style={styles.connText}>{connected ? "Live" : "Connecting…"}</Text>
        </View>

        {/* ETA badge */}
        <View style={styles.etaOverlay}>
          <Text style={styles.etaNum}>{eta}</Text>
          <Text style={styles.etaLabel}>min away</Text>
        </View>

        <View style={styles.mapContent}>
          <Animated.View style={[styles.carPulse, { transform: [{ scale: pulseAnim }] }]}>
            <View style={styles.carIcon}>
              <Text style={styles.carIconText}>CAR</Text>
            </View>
          </Animated.View>

          {driverLoc ? (
            <View style={styles.coordBox}>
              <Text style={styles.coordText}>
                {driverLoc.lat.toFixed(5)}, {driverLoc.lng.toFixed(5)}
              </Text>
              {driverLoc.speed != null && driverLoc.speed > 0 && (
                <Text style={styles.speedText}>{Math.round(driverLoc.speed)} km/h</Text>
              )}
              {driverLoc.updated_at && (
                <Text style={styles.updatedText}>
                  Updated {new Date(driverLoc.updated_at).toLocaleTimeString("en-AU", { timeStyle: "short" })}
                </Text>
              )}
            </View>
          ) : (
            <Text style={styles.mapText}>Waiting for driver location…</Text>
          )}

          <TouchableOpacity style={styles.openMapBtn} onPress={openMaps}>
            <Text style={styles.openMapText}>Open in Google Maps →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Tracker */}
      <View style={styles.progressSection}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, {
            width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }),
          }]} />
        </View>
        <View style={styles.stagesRow}>
          {STAGES.map((stage, i) => (
            <View key={stage.key} style={styles.stageItem}>
              <View style={[
                styles.stageDot,
                i <= currentStage && styles.stageDotActive,
                i === currentStage && styles.stageDotCurrent,
              ]}>
                <Text style={[styles.stageIcon, i === currentStage && { color: COLORS.black }]}>
                  {i <= currentStage ? stage.icon : "○"}
                </Text>
              </View>
              <Text style={[styles.stageLabel, i <= currentStage && styles.stageLabelActive]} numberOfLines={1}>
                {stage.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Driver Card */}
      <View style={styles.driverCard}>
        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverAvatarText}>{booking?.driver ? (driver.name?.[0] || "D") : "…"}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <Text style={styles.driverMeta}>
              {booking?.driver
                ? `${driver.rating ?? "—"} ★ · ${driver.trips ?? 0} trips`
                : "Your chauffeur will be assigned shortly"}
            </Text>
            <Text style={styles.driverVehicle}>{[driver.vehicle, driver.plate].filter(Boolean).join(" · ")}</Text>
          </View>
        </View>
        <View style={styles.driverActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => driver.phone
              ? Linking.openURL(`tel:${driver.phone}`)
              : Alert.alert("No driver yet", "You'll be able to call your chauffeur once one is assigned.")}
          >
            <Text style={[styles.actionIcon, { color: COLORS.gold }]}>Call</Text>
            <Text style={styles.actionLabel}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => booking?.driver
              ? navigation.navigate("Chat", { bookingId: booking?.id, driverName: driver.name })
              : Alert.alert("No driver yet", "You'll be able to message your chauffeur once one is assigned.")}
          >
            <Text style={[styles.actionIcon, { color: COLORS.gold }]}>Msg</Text>
            <Text style={styles.actionLabel}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={openMaps}>
            <Text style={[styles.actionIcon, { color: COLORS.gold }]}>Nav</Text>
            <Text style={styles.actionLabel}>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { borderColor: "#F8717130" }]}>
            <Text style={[styles.actionIcon, { color: "#F87171" }]}>SOS</Text>
            <Text style={[styles.actionLabel, { color: "#F87171" }]}>SOS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Trip Details */}
      <View style={styles.tripInfo}>
        <View style={styles.tripRow}>
          <View style={[styles.tripDot, { backgroundColor: COLORS.green }]} />
          <Text style={styles.tripText} numberOfLines={1}>
            {booking?.pickup_address || booking?.pickup || "Pickup location"}
          </Text>
        </View>
        <View style={styles.tripDivider} />
        <View style={styles.tripRow}>
          <View style={[styles.tripDot, { backgroundColor: COLORS.gold }]} />
          <Text style={styles.tripText} numberOfLines={1}>
            {booking?.dropoff_address || booking?.dropoff || "Drop-off location"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS: any) => StyleSheet.create({
  container:        { flex: 1, backgroundColor: COLORS.black },
  header:           { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.darkBorder },
  back:             { color: COLORS.gold, fontSize: 16 },
  title:            { color: COLORS.white, fontWeight: "700", fontSize: 17 },

  // Live location panel
  mapPlaceholder:   { height: 210, backgroundColor: COLORS.darkMuted, justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: COLORS.darkBorder },
  mapContent:       { alignItems: "center" },
  carPulse:         { marginBottom: 10 },
  carIcon:          { width: 56, height: 34, borderRadius: 10, backgroundColor: `${COLORS.gold}20`, borderWidth: 1.5, borderColor: COLORS.gold, justifyContent: "center", alignItems: "center" },
  carIconText:      { color: COLORS.gold, fontWeight: "800", fontSize: 11, letterSpacing: 1 },
  coordBox:         { alignItems: "center", marginTop: 6 },
  coordText:        { color: COLORS.white, fontSize: 12, fontWeight: "600" },
  speedText:        { color: COLORS.gold, fontSize: 11, marginTop: 2 },
  updatedText:      { color: COLORS.gray500, fontSize: 10, marginTop: 1 },
  mapText:          { color: COLORS.gray500, fontSize: 13, marginTop: 8 },
  openMapBtn:       { marginTop: 12, backgroundColor: `${COLORS.gold}15`, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1, borderColor: `${COLORS.gold}30` },
  openMapText:      { color: COLORS.gold, fontSize: 12, fontWeight: "700" },
  connBadge:        { position: "absolute", top: 10, left: 14, flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(0,0,0,0.55)", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  connDot:          { width: 7, height: 7, borderRadius: 4 },
  connText:         { color: COLORS.white, fontSize: 10, fontWeight: "700" },
  etaOverlay:       { position: "absolute", top: 10, right: 14, backgroundColor: COLORS.gold, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 8, alignItems: "center" },
  etaNum:           { color: COLORS.black, fontSize: 22, fontWeight: "800" },
  etaLabel:         { color: "rgba(0,0,0,0.6)", fontSize: 9, fontWeight: "600" },

  // Progress
  progressSection:  { paddingHorizontal: 20, paddingVertical: 14 },
  progressTrack:    { height: 4, backgroundColor: COLORS.darkBorder, borderRadius: 2, overflow: "hidden", marginBottom: 12 },
  progressFill:     { height: "100%", backgroundColor: COLORS.gold, borderRadius: 2 },
  stagesRow:        { flexDirection: "row", justifyContent: "space-between" },
  stageItem:        { alignItems: "center", flex: 1 },
  stageDot:         { width: 30, height: 30, borderRadius: 15, backgroundColor: COLORS.darkMuted, justifyContent: "center", alignItems: "center", marginBottom: 5, borderWidth: 1, borderColor: COLORS.darkBorder },
  stageDotActive:   { backgroundColor: `${COLORS.gold}20`, borderColor: `${COLORS.gold}40` },
  stageDotCurrent:  { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  stageIcon:        { fontSize: 12, color: COLORS.gray500, fontWeight: "700" },
  stageLabel:       { color: COLORS.gray500, fontSize: 8, fontWeight: "500", textAlign: "center" },
  stageLabelActive: { color: COLORS.gold, fontWeight: "700" },

  // Driver card
  driverCard:       { marginHorizontal: 20, backgroundColor: COLORS.darkSurface, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: `${COLORS.gold}25`, marginBottom: 10 },
  driverInfo:       { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  driverAvatar:     { width: 48, height: 48, borderRadius: 24, backgroundColor: `${COLORS.gold}15`, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: `${COLORS.gold}40` },
  driverAvatarText: { color: COLORS.gold, fontWeight: "700", fontSize: 18 },
  driverName:       { color: COLORS.white, fontWeight: "700", fontSize: 16, marginBottom: 2 },
  driverMeta:       { color: COLORS.gray500, fontSize: 12, marginBottom: 2 },
  driverVehicle:    { color: COLORS.gray400, fontSize: 12, fontWeight: "500" },
  driverActions:    { flexDirection: "row", gap: 8 },
  actionBtn:        { flex: 1, backgroundColor: COLORS.darkMuted, borderRadius: 12, paddingVertical: 10, alignItems: "center", borderWidth: 1, borderColor: COLORS.darkBorder },
  actionIcon:       { fontSize: 10, fontWeight: "800", marginBottom: 3, letterSpacing: 0.5 },
  actionLabel:      { color: COLORS.gray400, fontSize: 9, fontWeight: "600" },

  // Trip info
  tripInfo:         { marginHorizontal: 20, backgroundColor: COLORS.darkSurface, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: COLORS.darkBorder },
  tripRow:          { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 5 },
  tripDot:          { width: 10, height: 10, borderRadius: 5 },
  tripText:         { color: COLORS.white, fontSize: 13, fontWeight: "500", flex: 1 },
  tripDivider:      { width: 2, height: 16, backgroundColor: COLORS.darkBorder, marginLeft: 4, marginVertical: 1 },
});
