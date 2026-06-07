import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, ActivityIndicator, Alert, Image,
} from "react-native";
import { useTheme } from "../lib/ThemeContext";
import { SHADOWS } from "../lib/theme";
import { PlacesAutocomplete } from "../components/PlacesAutocomplete";

const VEHICLES = [
  {
    cat: "sedan",
    label: "Executive Sedan",
    model: "Mercedes E-Class",
    pax: 3,
    features: ["3 pax", "3 bags", "Wi-Fi"],
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=200&fit=crop",
  },
  {
    cat: "suv",
    label: "Premium SUV",
    model: "Mercedes GLE",
    pax: 6,
    features: ["6 pax", "6 bags", "Wi-Fi"],
    imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=200&fit=crop",
  },
  {
    cat: "luxury",
    label: "Luxury Sedan",
    model: "Mercedes S-Class",
    pax: 3,
    features: ["3 pax", "3 bags", "Premium audio"],
    imageUrl: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=400&h=200&fit=crop",
  },
  {
    cat: "van",
    label: "Executive Van",
    model: "Mercedes Viano",
    pax: 10,
    features: ["8 pax", "8 bags", "Conference"],
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
  },
  {
    cat: "stretch_limo",
    label: "Stretch Limo",
    model: "Lincoln Stretch",
    pax: 8,
    features: ["8 pax", "5 bags", "Bar service"],
    imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=200&fit=crop",
  },
];

function formatAUD(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function BookScreen({ route, navigation }: any) {
  const { colors } = useTheme();
  const { pickup: initPickup = "", dropoff: initDropoff = "", service = "airport_transfer" } = route.params || {};

  const [pickup, setPickup]           = useState(initPickup);
  const [dropoff, setDropoff]         = useState(initDropoff);
  const [vehicle, setVehicle]         = useState("sedan");
  const [passengers, setPassengers]   = useState(1);
  const [datetime, setDatetime]       = useState("");
  const [quotes, setQuotes]           = useState<Record<string,number>>({});
  const [loading, setLoading]         = useState(false);
  const [step, setStep]               = useState<"location"|"vehicle"|"confirm">("location");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { API_BASE } = require("../lib/config");

  const calculateRoute = async () => {
    if (!pickup || !dropoff) { Alert.alert("Missing fields", "Enter pickup and drop-off"); return; }
    setLoading(true);
    try {
      const distRes = await fetch(`${API_BASE}/api/pricing/distance`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ pickup, dropoff }),
      });
      const dist = await distRes.json();

      const quoteRes = await fetch(`${API_BASE}/api/pricing/quote`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ distanceKm: dist.distanceKm, durationMinutes: dist.durationMinutes, bookingType: service, scheduledAt: datetime || new Date().toISOString(), isAirport: service==="airport_transfer" }),
      });
      const q = await quoteRes.json();
      setQuotes(q.quotes || {});
      setStep("vehicle");
    } catch {
      Alert.alert("Error", "Could not calculate route. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/booking/create`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ pickup, dropoff, bookingType: service, vehicleCategory: vehicle, scheduledAt: datetime, passengers, paymentMethod }),
      });
      if (res.ok) {
        const data = await res.json();
        Alert.alert("Booking Confirmed", `Reference: ${data.bookingId?.slice(0,8).toUpperCase()}`, [
          { text: "View Bookings", onPress: () => navigation.navigate("Bookings") },
        ]);
      }
    } catch {
      Alert.alert("Error", "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <View style={[styles.header, { borderBottomColor: colors.darkBorder }]}>
        <TouchableOpacity onPress={() => step === "location" ? navigation.goBack() : setStep(step === "vehicle" ? "location" : "vehicle")}>
          <Text style={[styles.back, { color: colors.gold }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.white }]}>Book a Ride</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Progress */}
      <View style={styles.progress}>
        {["Location","Vehicle","Confirm"].map((s, i) => {
          const stepIndex = step === "location" ? 0 : step === "vehicle" ? 1 : 2;
          return (
            <React.Fragment key={s}>
              <View style={[
                styles.progressDot,
                { backgroundColor: colors.darkMuted, borderColor: colors.darkBorder },
                i <= stepIndex && { backgroundColor: colors.gold, borderColor: colors.gold },
              ]}>
                <Text style={[
                  styles.progressNum,
                  { color: colors.gray500 },
                  i <= stepIndex && { color: colors.black },
                ]}>{i + 1}</Text>
              </View>
              {i < 2 && <View style={[
                styles.progressLine,
                { backgroundColor: colors.darkBorder },
                i < stepIndex && { backgroundColor: colors.gold },
              ]} />}
            </React.Fragment>
          );
        })}
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        {/* Step 1: Location */}
        {step === "location" && (
          <View>
            <Text style={[styles.stepTitle, { color: colors.white }]}>Where are you going?</Text>
            <View style={[styles.inputCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder, zIndex: 200 }]}>
              <Text style={[styles.inputLabel, { color: colors.gray400 }]}>Pickup Location</Text>
              <PlacesAutocomplete
                value={pickup}
                onSelect={setPickup}
                placeholder="Enter pickup address"
                placeholderTextColor={colors.gray500}
                inputStyle={[styles.input, { color: colors.white }]}
              />
            </View>
            <View style={[styles.inputCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder, zIndex: 100 }]}>
              <Text style={[styles.inputLabel, { color: colors.gray400 }]}>Drop-off Location</Text>
              <PlacesAutocomplete
                value={dropoff}
                onSelect={setDropoff}
                placeholder="Enter drop-off address"
                placeholderTextColor={colors.gray500}
                inputStyle={[styles.input, { color: colors.white }]}
              />
            </View>
            <View style={[styles.inputCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
              <Text style={[styles.inputLabel, { color: colors.gray400 }]}>Date & Time</Text>
              <TextInput
                style={[styles.input, { color: colors.white }]}
                value={datetime}
                onChangeText={setDatetime}
                placeholder="e.g. 2026-07-01T09:00"
                placeholderTextColor={colors.gray500}
              />
            </View>
            <TouchableOpacity style={[styles.primaryBtn, SHADOWS.gold]} onPress={calculateRoute} disabled={loading}>
              {loading ? <ActivityIndicator color={colors.black} /> : <Text style={[styles.primaryBtnText, { color: colors.black }]}>Get Quote →</Text>}
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2: Vehicle */}
        {step === "vehicle" && (
          <View>
            <Text style={[styles.stepTitle, { color: colors.white }]}>Choose Your Vehicle</Text>
            {VEHICLES.map((v) => {
              const isSelected = vehicle === v.cat;
              return (
                <TouchableOpacity
                  key={v.cat}
                  style={[
                    styles.vehicleCard,
                    { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder },
                    isSelected && { borderColor: colors.gold, borderWidth: 2 },
                  ]}
                  onPress={() => setVehicle(v.cat)}
                  activeOpacity={0.85}
                >
                  {/* Vehicle image */}
                  <View style={styles.vehicleImageWrap}>
                    <Image
                      source={{ uri: v.imageUrl }}
                      style={styles.vehicleImage}
                      resizeMode="cover"
                    />
                    <View style={styles.vehicleImageOverlay} />
                    {/* Price badge */}
                    <View style={styles.priceBadge}>
                      <Text style={styles.priceBadgeText}>{quotes[v.cat] ? formatAUD(quotes[v.cat]) : "—"}</Text>
                      <Text style={{ color: "#aaa", fontSize: 9 }}>inc. GST</Text>
                    </View>
                    {/* Selected check */}
                    {isSelected && (
                      <View style={[styles.checkBadge, { backgroundColor: colors.gold }]}>
                        <Text style={{ color: colors.black, fontSize: 12, fontWeight: "900" }}>✓</Text>
                      </View>
                    )}
                  </View>

                  {/* Card body */}
                  <View style={[styles.vehicleBody, isSelected && { backgroundColor: `${colors.gold}08` }]}>
                    <Text style={[styles.vehicleLabel, { color: colors.white }]}>{v.label}</Text>
                    <Text style={[styles.vehicleModel, { color: colors.gray500 }]}>{v.model}</Text>
                    {/* Feature pills */}
                    <View style={styles.featurePills}>
                      {v.features.map(f => (
                        <View
                          key={f}
                          style={[
                            styles.featurePill,
                            { backgroundColor: isSelected ? `${colors.gold}20` : colors.darkBorder },
                          ]}
                        >
                          <Text style={[styles.featurePillText, { color: isSelected ? colors.gold : colors.gray400 }]}>{f}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={[styles.primaryBtn, SHADOWS.gold]} onPress={() => setStep("confirm")}>
              <Text style={[styles.primaryBtnText, { color: colors.black }]}>Continue →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 3: Confirm */}
        {step === "confirm" && (
          <View>
            <Text style={[styles.stepTitle, { color: colors.white }]}>Confirm Booking</Text>
            <View style={[styles.summaryCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
              {[
                ["Pickup",      pickup],
                ["Drop-off",    dropoff],
                ["Vehicle",     VEHICLES.find(v=>v.cat===vehicle)?.label || vehicle],
                ["Date",        datetime || "ASAP"],
                ["Passengers",  `${passengers}`],
              ].map(([k,v]) => (
                <View key={k} style={styles.summaryRow}>
                  <Text style={[styles.summaryKey, { color: colors.gray400 }]}>{k}</Text>
                  <Text style={[styles.summaryVal, { color: colors.white }]} numberOfLines={1}>{v}</Text>
                </View>
              ))}
              <View style={[styles.summaryRow, { borderTopWidth: 1, borderTopColor: colors.darkBorder, marginTop: 12, paddingTop: 12 }]}>
                <Text style={[styles.summaryKey, { color: colors.white, fontWeight: "700" }]}>Total (AUD)</Text>
                <Text style={[styles.summaryVal, { color: colors.gold, fontSize: 22, fontWeight: "700" }]}>
                  {quotes[vehicle] ? formatAUD(quotes[vehicle]) : "—"}
                </Text>
              </View>
            </View>
            {/* Payment method */}
            <Text style={[styles.sectionLabel, { color: colors.gray400 }]}>Payment Method</Text>
            <View style={styles.paymentRow}>
              {[
                { id: "cash",          label: "Cash",     sub: "Pay on day" },
                { id: "bank_transfer", label: "Transfer", sub: "Via invoice" },
                { id: "invoice",       label: "Invoice",  sub: "Corporate" },
              ].map(m => (
                <TouchableOpacity
                  key={m.id}
                  onPress={() => setPaymentMethod(m.id)}
                  style={[
                    styles.paymentCard,
                    { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder },
                    paymentMethod === m.id && { borderColor: colors.gold, backgroundColor: `${colors.gold}10` },
                  ]}
                >
                  <Text style={[styles.paymentLabel, { color: colors.white }, paymentMethod === m.id && { color: colors.gold }]}>{m.label}</Text>
                  <Text style={[styles.paymentSub, { color: colors.gray500 }]}>{m.sub}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={[styles.primaryBtn, SHADOWS.gold]} onPress={confirmBooking} disabled={loading}>
              {loading ? <ActivityIndicator color={colors.black} /> : <Text style={[styles.primaryBtnText, { color: colors.black }]}>Confirm Booking</Text>}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:           { flex: 1 },
  header:              { flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingHorizontal:20, paddingVertical:14, borderBottomWidth:1 },
  back:                { fontSize: 16 },
  title:               { fontWeight: "700", fontSize: 17 },
  progress:            { flexDirection:"row", alignItems:"center", justifyContent:"center", paddingVertical:16, paddingHorizontal:40 },
  progressDot:         { width:28, height:28, borderRadius:14, justifyContent:"center", alignItems:"center", borderWidth:1 },
  progressNum:         { fontSize:12, fontWeight:"700" },
  progressLine:        { flex:1, height:2, marginHorizontal:6 },
  stepTitle:           { fontSize:20, fontWeight:"700", marginBottom:20 },
  inputCard:           { borderRadius:14, padding:14, marginBottom:12, borderWidth:1 },
  inputLabel:          { fontSize:12, marginBottom:8 },
  input:               { fontSize:15 },
  primaryBtn:          { backgroundColor:"#C9A84C", borderRadius:14, paddingVertical:16, alignItems:"center", marginTop:8 },
  primaryBtnText:      { fontWeight:"700", fontSize:16 },
  vehicleCard:         { borderRadius:18, marginBottom:14, borderWidth:1.5, overflow:"hidden" },
  vehicleImageWrap:    { height:130, position:"relative" },
  vehicleImage:        { width:"100%", height:130 },
  vehicleImageOverlay: { position:"absolute", bottom:0, left:0, right:0, height:60, backgroundColor:"rgba(0,0,0,0.4)" },
  priceBadge:          { position:"absolute", bottom:10, right:12, backgroundColor:"rgba(0,0,0,0.7)", borderRadius:10, paddingHorizontal:10, paddingVertical:5, alignItems:"flex-end" },
  priceBadgeText:      { color:"#ffffff", fontWeight:"700", fontSize:14 },
  checkBadge:          { position:"absolute", top:10, right:12, width:26, height:26, borderRadius:13, justifyContent:"center", alignItems:"center" },
  vehicleBody:         { padding:14 },
  vehicleLabel:        { fontWeight:"700", fontSize:15, marginBottom:2 },
  vehicleModel:        { fontSize:12, marginBottom:8 },
  featurePills:        { flexDirection:"row", flexWrap:"wrap", gap:6 },
  featurePill:         { borderRadius:20, paddingHorizontal:8, paddingVertical:3 },
  featurePillText:     { fontSize:10, fontWeight:"600" },
  vehiclePrice:        { fontWeight:"700", fontSize:18 },
  summaryCard:         { borderRadius:16, padding:18, borderWidth:1, marginBottom:16 },
  summaryRow:          { flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingVertical:8 },
  summaryKey:          { fontSize:13 },
  summaryVal:          { fontSize:13, fontWeight:"600", flex:1, textAlign:"right", marginLeft:12 },
  sectionLabel:        { fontSize:12, fontWeight:"700", textTransform:"uppercase", letterSpacing:1, marginBottom:10, marginTop:4 },
  paymentRow:          { flexDirection:"row", gap:10, marginBottom:20 },
  paymentCard:         { flex:1, borderRadius:14, padding:12, borderWidth:1, alignItems:"center" },
  paymentLabel:        { fontWeight:"700", fontSize:13, marginBottom:2 },
  paymentSub:          { fontSize:10 },
});
