import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Linking, Alert } from "react-native";
import { useTheme } from "../lib/ThemeContext";
import { API_BASE } from "../lib/config";

function getStatusColors(colors: any): Record<string, string> {
  return {
    pending:        "#FBBF24",
    confirmed:      "#60A5FA",
    driver_assigned:"#A78BFA",
    in_progress:    colors.goldLight,
    completed:      colors.green,
    cancelled:      colors.red,
  };
}

function formatAUD(n: number) { return `$${n.toFixed(2)}`; }

export default function BookingDetailScreen({ route, navigation }: any) {
  const { colors } = useTheme();
  const STATUS_COLOR = getStatusColors(colors);

  const { booking: b } = route.params || {};

  if (!b) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
        <Text style={[styles.errorText, { color: colors.white }]}>Booking not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ color: colors.gold }}>← Back</Text></TouchableOpacity>
      </SafeAreaView>
    );
  }

  const statusColor = STATUS_COLOR[b.status] || colors.gray500;
  const total       = b.total_amount || b.amount || 0;
  const pickup      = b.pickup_address || b.pickup;
  const dropoff     = b.dropoff_address || b.dropoff;

  // Rating state
  const [selectedRating,  setSelectedRating]  = React.useState(0);
  const [ratingSubmitted, setRatingSubmitted] = React.useState(false);
  const rated = b.customer_rating != null || b.driver_rating != null;

  const submitRating = async (stars: number) => {
    setSelectedRating(stars);
    try {
      await fetch(`${API_BASE}/api/booking/${b.id}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ overall: stars, bookingId: b.id }),
      });
      setRatingSubmitted(true);
    } catch {
      // Silently handle network errors — rating still shows as selected
    }
  };

  const openNav = () => {
    const url = `https://maps.google.com/?q=${encodeURIComponent(pickup)}`;
    Linking.openURL(url);
  };

  const cancelBooking = () => {
    Alert.alert("Cancel Booking", "Are you sure you want to cancel this booking?", [
      { text: "Keep Booking" },
      { text: "Cancel Booking", style: "destructive", onPress: async () => {
        try {
          const res = await fetch(`${API_BASE}/api/booking/${b.id}/cancel`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reason: "Cancelled by customer" }),
          });
          if (res.ok) {
            Alert.alert("Cancelled", "Your booking has been cancelled.");
            navigation.goBack();
          } else {
            Alert.alert("Error", "Could not cancel booking. Please try again.");
          }
        } catch {
          Alert.alert("Error", "Network error. Please try again.");
        }
      }},
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.darkBorder }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.back, { color: colors.gold }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.white }]}>Booking Detail</Text>
        <View style={{ width:60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding:20, paddingBottom:40 }}>
        {/* Status card */}
        <View style={[styles.statusCard, { backgroundColor: colors.darkSurface, borderColor: `${colors.gold}25` }]}>
          <View style={styles.statusRow}>
            <Text style={[styles.bookingId, { color: colors.gray500 }]}>{b.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor:`${statusColor}20`, borderColor:`${statusColor}50` }]}>
              <Text style={[styles.statusText, { color:statusColor }]}>{b.status?.replace("_"," ").toUpperCase()}</Text>
            </View>
          </View>
          <Text style={[styles.amount, { color: colors.gold }]}>{formatAUD(total)}</Text>
          <Text style={[styles.dateText, { color: colors.gray400 }]}>
            {b.scheduled_at ? new Date(b.scheduled_at).toLocaleString("en-AU",{ dateStyle:"full", timeStyle:"short" }) : b.date}
          </Text>
        </View>

        {/* Route */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.gray400 }]}>Route</Text>
          <View style={[styles.routeCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
            <View style={styles.routeRow}>
              <View style={[styles.dot, { backgroundColor: colors.green }]} />
              <View style={{ flex:1 }}>
                <Text style={[styles.routeLabel, { color: colors.gray500 }]}>PICKUP</Text>
                <Text style={[styles.routeAddress, { color: colors.white }]}>{pickup}</Text>
                {b.flight_number ? <Text style={[styles.flightText, { color: colors.gold }]}>Flight {b.flight_number}</Text> : null}
              </View>
            </View>
            <View style={[styles.routeLine, { backgroundColor: colors.darkBorder }]} />
            <View style={styles.routeRow}>
              <View style={[styles.dot, { backgroundColor: colors.gold }]} />
              <View style={{ flex:1 }}>
                <Text style={[styles.routeLabel, { color: colors.gray500 }]}>DROP-OFF</Text>
                <Text style={[styles.routeAddress, { color: colors.white }]}>{dropoff}</Text>
              </View>
            </View>
          </View>
          <View style={styles.metaRow}>
            <Text style={[styles.metaItem, { color: colors.gray400 }]}>{b.distance_km||b.distanceKm||0} km</Text>
            <Text style={[styles.metaItem, { color: colors.gray400 }]}>{b.passengers||1} pax</Text>
            <Text style={[styles.metaItem, { color: colors.gray400 }]}>{b.luggage||0} bags</Text>
            <Text style={[styles.metaItem, { color: colors.gray400 }]}>{b.vehicle_category||b.vehicle}</Text>
          </View>
        </View>

        {/* Driver */}
        {b.driver && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.gray400 }]}>Your Chauffeur</Text>
            <View style={[styles.driverCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
              <View style={[styles.driverAvatar, { backgroundColor: `${colors.gold}20`, borderColor: `${colors.gold}40` }]}>
                <Text style={[styles.driverAvatarText, { color: colors.gold }]}>{b.driver.name?.[0]||"D"}</Text>
              </View>
              <View style={{ flex:1 }}>
                <Text style={[styles.driverName, { color: colors.white }]}>{b.driver.name}</Text>
                <Text style={[styles.driverMeta, { color: colors.gray500 }]}>{b.driver.rating} ★ · {b.driver.trips} trips</Text>
              </View>
              <TouchableOpacity style={[styles.callBtn, { backgroundColor: `${colors.green}15`, borderColor: `${colors.green}40` }]} onPress={() => Linking.openURL(`tel:${b.driver.phone}`)}>
                <Text style={{ fontSize:14, color: colors.green, fontWeight:"700" }}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Live Tracking button — shown for active bookings */}
        {["driver_assigned","en_route","arrived","in_progress"].includes(b.status) && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.gray400 }]}>Live Tracking</Text>
            <TouchableOpacity
              style={[styles.trackingCard, { backgroundColor: colors.darkSurface, borderColor: `${colors.green}30` }]}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("RideTracking", { booking: b })}
            >
              <View style={styles.trackingLeft}>
                <View style={[styles.trackingDot, { backgroundColor: colors.green }]} />
                <View>
                  <Text style={[styles.trackingTitle, { color: colors.white }]}>Driver is on the way</Text>
                  <Text style={[styles.trackingSub, { color: colors.gray500 }]}>Tap to track your driver in real time</Text>
                </View>
              </View>
              <Text style={[styles.trackingArrow, { color: colors.green }]}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chatBtn, { backgroundColor: colors.darkSurface, borderColor: `${colors.gold}30` }]}
              onPress={() => navigation.navigate("Chat", { bookingId: b.id, driverName: b.driver?.name || "Driver" })}
            >
              <Text style={[styles.chatBtnText, { color: colors.gold }]}>💬 Message Driver</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Pricing */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.gray400 }]}>Price Breakdown</Text>
          <View style={[styles.pricingCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
            {[
              ["Base fare",         b.base_charge],
              ["Booking fee",       b.booking_fee],
              ["Airport surcharge", b.airport_surcharge],
              ["After-hours",       b.after_hours_surcharge],
              ["GST (10%)",         b.gst],
            ].filter(([,v]) => v > 0).map(([k,v]) => (
              <View key={String(k)} style={styles.priceRow}>
                <Text style={[styles.priceKey, { color: colors.gray400 }]}>{k}</Text>
                <Text style={[styles.priceVal, { color: colors.white }]}>{formatAUD(Number(v))}</Text>
              </View>
            ))}
            <View style={[styles.priceRow, styles.totalRow, { borderTopColor: colors.darkBorder }]}>
              <Text style={[styles.totalKey, { color: colors.white }]}>Total (AUD)</Text>
              <Text style={[styles.totalVal, { color: colors.gold }]}>{formatAUD(total)}</Text>
            </View>
          </View>
        </View>

        {/* Rating section — shown for completed bookings not yet rated */}
        {b.status === "completed" && !rated && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.gray400 }]}>Rate Your Chauffeur</Text>
            <View style={[styles.ratingCard, { backgroundColor: colors.darkSurface, borderColor: `${colors.gold}25` }]}>
              <Text style={[styles.ratingPrompt, { color: colors.gray400 }]}>How was your experience?</Text>
              <View style={styles.starsRow}>
                {[1,2,3,4,5].map(n => (
                  <TouchableOpacity key={n} onPress={() => submitRating(n)} activeOpacity={0.7}>
                    <Text style={[styles.star, { color: colors.darkBorder }, selectedRating >= n && { color: colors.gold }]}>★</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {ratingSubmitted && (
                <Text style={[styles.ratingThanks, { color: colors.green }]}>Thank you for your feedback!</Text>
              )}
            </View>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.navBtn, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]} onPress={openNav}>
            <Text style={[styles.navBtnText, { color: colors.white }]}>Open in Maps</Text>
          </TouchableOpacity>
          {b.status === "confirmed" && (
            <TouchableOpacity
              style={[styles.editBtn, { backgroundColor: colors.darkSurface, borderColor: colors.gold }]}
              onPress={() => navigation.navigate("EditBooking", { booking: b })}
            >
              <Text style={[styles.editBtnText, { color: colors.gold }]}>Edit Booking</Text>
            </TouchableOpacity>
          )}
          {["confirmed","driver_assigned"].includes(b.status) && (
            <TouchableOpacity style={[styles.cancelBtn, { borderColor: colors.red }]} onPress={cancelBooking}>
              <Text style={[styles.cancelBtnText, { color: colors.red }]}>Cancel Booking</Text>
            </TouchableOpacity>
          )}
          {b.status === "completed" && (
            <TouchableOpacity style={[styles.rebookBtn, { backgroundColor: colors.gold }]} onPress={() => navigation.navigate("Book", { pickup, dropoff })}>
              <Text style={[styles.rebookBtnText, { color: colors.black }]}>Rebook This Route →</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex:1 },
  errorText:       { textAlign:"center", margin:20 },
  header:          { flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingHorizontal:20, paddingVertical:14, borderBottomWidth:1 },
  back:            { fontSize:16 },
  headerTitle:     { fontWeight:"700", fontSize:17 },
  statusCard:      { borderRadius:20, padding:20, marginBottom:16, borderWidth:1 },
  statusRow:       { flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:12 },
  bookingId:       { fontSize:12, fontFamily:"monospace" },
  statusBadge:     { borderRadius:20, paddingHorizontal:12, paddingVertical:5, borderWidth:1 },
  statusText:      { fontSize:11, fontWeight:"700" },
  amount:          { fontSize:36, fontWeight:"800", marginBottom:4 },
  dateText:        { fontSize:13 },
  section:         { marginBottom:16 },
  sectionLabel:    { fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontWeight:"700", marginBottom:10 },
  routeCard:       { borderRadius:16, padding:16, borderWidth:1, marginBottom:10 },
  routeRow:        { flexDirection:"row", alignItems:"flex-start", gap:12, paddingVertical:4 },
  dot:             { width:12, height:12, borderRadius:6, marginTop:14 },
  routeLine:       { width:2, height:24, marginLeft:5, marginVertical:2 },
  routeLabel:      { fontSize:9, letterSpacing:1, textTransform:"uppercase", marginBottom:2 },
  routeAddress:    { fontSize:14, fontWeight:"500", lineHeight:20 },
  flightText:      { fontSize:12, marginTop:2 },
  metaRow:         { flexDirection:"row", flexWrap:"wrap", gap:10 },
  metaItem:        { fontSize:12 },
  driverCard:      { borderRadius:16, padding:16, flexDirection:"row", alignItems:"center", gap:12, borderWidth:1 },
  driverAvatar:    { width:46, height:46, borderRadius:23, justifyContent:"center", alignItems:"center", borderWidth:2 },
  driverAvatarText:{ fontWeight:"700", fontSize:18 },
  driverName:      { fontWeight:"700", fontSize:16, marginBottom:2 },
  driverMeta:      { fontSize:12 },
  callBtn:         { width:44, height:44, borderRadius:22, justifyContent:"center", alignItems:"center", borderWidth:1 },
  pricingCard:     { borderRadius:16, padding:16, borderWidth:1 },
  priceRow:        { flexDirection:"row", justifyContent:"space-between", paddingVertical:7 },
  priceKey:        { fontSize:13 },
  priceVal:        { fontSize:13, fontWeight:"600" },
  totalRow:        { borderTopWidth:1, marginTop:6, paddingTop:12 },
  totalKey:        { fontWeight:"700", fontSize:16 },
  totalVal:        { fontWeight:"800", fontSize:22 },
  actions:         { gap:10, marginTop:4 },
  navBtn:          { borderRadius:14, paddingVertical:14, alignItems:"center", borderWidth:1 },
  navBtnText:      { fontWeight:"600", fontSize:15 },
  editBtn:         { borderRadius:14, paddingVertical:14, alignItems:"center", borderWidth:1 },
  editBtnText:     { fontWeight:"700", fontSize:15 },
  cancelBtn:       { borderRadius:14, paddingVertical:14, alignItems:"center", borderWidth:1 },
  cancelBtnText:   { fontWeight:"700", fontSize:15 },
  rebookBtn:       { borderRadius:14, paddingVertical:14, alignItems:"center" },
  rebookBtnText:   { fontWeight:"700", fontSize:15 },
  trackingCard:    { borderRadius:16, padding:16, borderWidth:1, flexDirection:"row", alignItems:"center", justifyContent:"space-between" },
  trackingLeft:    { flexDirection:"row", alignItems:"center", gap:12 },
  trackingDot:     { width:10, height:10, borderRadius:5 },
  trackingTitle:   { fontWeight:"700", fontSize:14, marginBottom:2 },
  trackingSub:     { fontSize:12 },
  trackingArrow:   { fontSize:26 },
  ratingCard:      { borderRadius:16, padding:20, borderWidth:1, alignItems:"center" },
  ratingPrompt:    { fontSize:14, marginBottom:14 },
  starsRow:        { flexDirection:"row", gap:12, marginBottom:10 },
  star:            { fontSize:36 },
  ratingThanks:    { fontSize:13, fontWeight:"600" },
  chatBtn:         { backgroundColor:"transparent", borderRadius:14, paddingVertical:13, alignItems:"center", borderWidth:1, marginTop:8 },
  chatBtnText:     { fontWeight:"700", fontSize:14 },
});
