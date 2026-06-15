import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, ActivityIndicator, Alert,
  Image, Modal, Platform, KeyboardAvoidingView,
} from "react-native";
import { useTheme } from "../lib/ThemeContext";
import { SHADOWS } from "../lib/theme";
import { PlacesAutocomplete } from "../components/PlacesAutocomplete";
const { API_BASE } = require("../lib/config");

// ─── Types ───────────────────────────────────────────────────────────────────
type Step = "location" | "vehicle" | "details" | "confirm";

interface Pricing {
  baseCharge: number;
  bookingFee: number;
  airportSurcharge: number;
  afterHoursSurcharge: number;
  gst: number;
  total: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const SERVICES = [
  { id: "airport_transfer", label: "Airport",   icon: "✈️" },
  { id: "corporate",        label: "Corporate", icon: "💼" },
  { id: "wedding",          label: "Wedding",   icon: "💍" },
  { id: "special_event",    label: "Events",    icon: "🎉" },
  { id: "hourly",           label: "Hourly",    icon: "🕐" },
];

const VEHICLES = [
  { cat: "sedan",        label: "Executive Sedan",  model: "Mercedes E-Class", pax: 3,  bags: 3,  features: ["3 pax", "3 bags", "Wi-Fi", "Water"],      imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=200&fit=crop" },
  { cat: "suv",          label: "Premium SUV",      model: "Mercedes GLE",     pax: 6,  bags: 6,  features: ["6 pax", "6 bags", "Wi-Fi", "Water"],      imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=200&fit=crop" },
  { cat: "luxury",       label: "Luxury Sedan",     model: "Mercedes S-Class", pax: 3,  bags: 3,  features: ["3 pax", "3 bags", "Premium Audio", "Bar"], imageUrl: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=400&h=200&fit=crop" },
  { cat: "van",          label: "Executive Van",    model: "Mercedes Viano",   pax: 8,  bags: 8,  features: ["8 pax", "8 bags", "Wi-Fi", "Conference"],  imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop" },
  { cat: "stretch_limo", label: "Stretch Limo",     model: "Lincoln Stretch",  pax: 8,  bags: 5,  features: ["8 pax", "5 bags", "Bar", "Premium"],      imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=200&fit=crop" },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const STEP_LABELS = ["Location", "Vehicle", "Details", "Confirm"];

// ─── Date/Time Picker Modal ───────────────────────────────────────────────────
function DateTimeModal({ visible, date, onConfirm, onClose, colors }: {
  visible: boolean; date: Date;
  onConfirm: (d: Date) => void; onClose: () => void; colors: any;
}) {
  const [d, setD] = useState(new Date(date));

  const adjust = (field: string, delta: number) => {
    const next = new Date(d);
    if (field === "day")    { next.setDate(next.getDate() + delta); }
    if (field === "month")  { next.setMonth(next.getMonth() + delta); }
    if (field === "year")   { next.setFullYear(next.getFullYear() + delta); }
    if (field === "hour")   { next.setHours((next.getHours() + delta + 24) % 24); }
    if (field === "minute") { next.setMinutes(Math.round((next.getMinutes() + delta + 60) / 15) * 15 % 60); }
    setD(next);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  const Col = ({ label, value, field }: { label: string; value: string; field: string }) => (
    <View style={dts.col}>
      <TouchableOpacity onPress={() => adjust(field, 1)} style={dts.arrow}><Text style={[dts.arrowText, { color: colors.gold }]}>▲</Text></TouchableOpacity>
      <Text style={[dts.val, { color: colors.white }]}>{value}</Text>
      <TouchableOpacity onPress={() => adjust(field, -1)} style={dts.arrow}><Text style={[dts.arrowText, { color: colors.gold }]}>▼</Text></TouchableOpacity>
      <Text style={[dts.fieldLabel, { color: colors.gray500 }]}>{label}</Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={dts.overlay}>
        <View style={[dts.sheet, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
          <Text style={[dts.title, { color: colors.white }]}>Select Date & Time</Text>
          <View style={dts.row}>
            <Col label="Day"   value={pad(d.getDate())}         field="day" />
            <View style={[dts.sep, { backgroundColor: colors.darkBorder }]} />
            <Col label="Month" value={MONTHS[d.getMonth()]}     field="month" />
            <View style={[dts.sep, { backgroundColor: colors.darkBorder }]} />
            <Col label="Year"  value={String(d.getFullYear())}  field="year" />
          </View>
          <View style={[dts.divider, { backgroundColor: colors.darkBorder }]} />
          <View style={dts.row}>
            <Col label="Hour"   value={pad(d.getHours())}                                    field="hour" />
            <Text style={[dts.colon, { color: colors.gray400 }]}>:</Text>
            <Col label="Minute" value={pad(Math.round(d.getMinutes() / 15) * 15 % 60)} field="minute" />
          </View>
          <View style={dts.btns}>
            <TouchableOpacity onPress={onClose}                          style={[dts.btn, { borderColor: colors.darkBorder }]}>
              <Text style={{ color: colors.gray400, fontWeight: "600" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { onConfirm(d); onClose(); }} style={[dts.btn, { backgroundColor: colors.gold }]}>
              <Text style={{ color: colors.black, fontWeight: "700" }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const dts = StyleSheet.create({
  overlay:    { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center", padding: 20 },
  sheet:      { width: "100%", borderRadius: 20, padding: 24, borderWidth: 1 },
  title:      { fontSize: 17, fontWeight: "700", textAlign: "center", marginBottom: 20 },
  row:        { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 },
  col:        { alignItems: "center", flex: 1 },
  arrow:      { paddingVertical: 8, paddingHorizontal: 12 },
  arrowText:  { fontSize: 16, fontWeight: "700" },
  val:        { fontSize: 22, fontWeight: "700", marginVertical: 4 },
  fieldLabel: { fontSize: 10, marginTop: 4 },
  sep:        { width: 1, height: 80, marginHorizontal: 4 },
  divider:    { height: 1, marginVertical: 16 },
  colon:      { fontSize: 22, fontWeight: "700", marginHorizontal: 4, marginBottom: 16 },
  btns:       { flexDirection: "row", gap: 10, marginTop: 20 },
  btn:        { flex: 1, paddingVertical: 13, borderRadius: 12, alignItems: "center", borderWidth: 1 },
});

// ─── Counter Component ────────────────────────────────────────────────────────
function Counter({ label, value, onInc, onDec, min = 0, max = 10, colors }: any) {
  return (
    <View style={cs.counterRow}>
      <Text style={[cs.counterLabel, { color: colors.gray400 }]}>{label}</Text>
      <View style={cs.counterControls}>
        <TouchableOpacity onPress={onDec} disabled={value <= min} style={[cs.counterBtn, { backgroundColor: colors.darkMuted, borderColor: colors.darkBorder }, value <= min && { opacity: 0.4 }]}>
          <Text style={[cs.counterBtnText, { color: colors.white }]}>−</Text>
        </TouchableOpacity>
        <Text style={[cs.counterVal, { color: colors.white }]}>{value}</Text>
        <TouchableOpacity onPress={onInc} disabled={value >= max} style={[cs.counterBtn, { backgroundColor: colors.gold }, value >= max && { opacity: 0.4 }]}>
          <Text style={[cs.counterBtnText, { color: colors.black }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const cs = StyleSheet.create({
  counterRow:      { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12 },
  counterLabel:    { fontSize: 14, fontWeight: "500" },
  counterControls: { flexDirection: "row", alignItems: "center", gap: 14 },
  counterBtn:      { width: 34, height: 34, borderRadius: 10, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  counterBtnText:  { fontSize: 18, fontWeight: "700", lineHeight: 20 },
  counterVal:      { fontSize: 18, fontWeight: "700", minWidth: 28, textAlign: "center" },
});

// ─── Pricing Row ──────────────────────────────────────────────────────────────
function PricingRow({ label, value, bold, gold, colors }: any) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
      <Text style={{ color: bold ? colors.white : colors.gray400, fontSize: 13, fontWeight: bold ? "600" : "400" }}>{label}</Text>
      <Text style={{ color: gold ? colors.gold : bold ? colors.white : colors.gray300, fontSize: bold ? 15 : 13, fontWeight: bold ? "700" : "400" }}>
        ${typeof value === "number" ? value.toFixed(2) : value}
      </Text>
    </View>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BookScreen({ route, navigation }: any) {
  const { colors } = useTheme();
  const { pickup: initPickup = "", dropoff: initDropoff = "", service: initService = "airport_transfer" } = route?.params || {};

  // Step 1
  const [service,      setService]      = useState(initService);
  const [pickup,       setPickup]       = useState(initPickup);
  const [dropoff,      setDropoff]      = useState(initDropoff);
  const [flightNumber, setFlightNumber] = useState("");
  const [scheduledAt,  setScheduledAt]  = useState(() => { const d = new Date(); d.setHours(d.getHours() + 3, 0, 0, 0); return d; });
  const [showDateModal,setShowDateModal]= useState(false);

  // Step 2
  const [vehicle,           setVehicle]           = useState("sedan");
  const [quotes,            setQuotes]            = useState<Record<string, number>>({});
  const [pricingBreakdowns, setPricingBreakdowns] = useState<Record<string, Pricing>>({});
  const [distanceKm,        setDistanceKm]        = useState(0);
  const [durationMinutes,   setDurationMinutes]   = useState(0);

  // Step 3
  const [passengers,      setPassengers]      = useState(1);
  const [luggage,         setLuggage]         = useState(0);
  const [firstName,       setFirstName]       = useState("");
  const [lastName,        setLastName]        = useState("");
  const [email,           setEmail]           = useState("");
  const [phone,           setPhone]           = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [promoCode,       setPromoCode]       = useState("");
  const [promoApplied,    setPromoApplied]    = useState<any>(null);
  const [promoLoading,    setPromoLoading]    = useState(false);
  const [promoError,      setPromoError]      = useState("");

  // Step 4
  const [isRecurring,    setIsRecurring]    = useState(false);
  const [recurrenceRule, setRecurrenceRule] = useState("weekly:monday");
  const [paymentMethod,  setPaymentMethod]  = useState("cash");

  // General
  const [step,    setStep]    = useState<Step>("location");
  const [loading, setLoading] = useState(false);

  const stepIndex = ["location", "vehicle", "details", "confirm"].indexOf(step);

  const fmtDate = (d: Date) =>
    `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} · ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;

  // ── Step 1 → 2: calculate route + get quotes ──
  const goToVehicle = async () => {
    if (!pickup.trim() || !dropoff.trim()) {
      Alert.alert("Missing fields", "Please enter pickup and drop-off locations."); return;
    }
    setLoading(true);
    try {
      const distRes  = await fetch(`${API_BASE}/api/pricing/distance`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickup, dropoff }),
      });
      const dist = await distRes.json();
      setDistanceKm(dist.distanceKm || 0);
      setDurationMinutes(dist.durationMinutes || 0);

      const quoteRes = await fetch(`${API_BASE}/api/pricing/quote`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          distanceKm: dist.distanceKm, durationMinutes: dist.durationMinutes,
          bookingType: service, scheduledAt: scheduledAt.toISOString(),
          isAirport: service === "airport_transfer",
        }),
      });
      const q = await quoteRes.json();
      setQuotes(q.quotes || {});
      setPricingBreakdowns(q.pricingBreakdowns || {});
      setStep("vehicle");
    } catch {
      Alert.alert("Error", "Could not calculate route. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Apply promo code ──
  const applyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true); setPromoError(""); setPromoApplied(null);
    try {
      const res  = await fetch(`${API_BASE}/api/promo/validate`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode.trim(), bookingAmount: quotes[vehicle] || 0 }),
      });
      const json = await res.json();
      if (json.valid) { setPromoApplied(json.discount); }
      else { setPromoError(json.error || "Invalid promo code"); }
    } catch { setPromoError("Could not validate code"); }
    finally { setPromoLoading(false); }
  };

  // ── Step 4: Create booking ──
  const confirmBooking = async () => {
    setLoading(true);
    try {
      const pricing = pricingBreakdowns[vehicle];
      const total   = pricing
        ? (promoApplied ? Math.max(0, pricing.total - promoApplied.amount) : pricing.total)
        : quotes[vehicle] || 0;

      // Get auth token so server can link booking to the logged-in customer
      const { data: { session } } = await supabase.auth.getSession();
      const authHeaders: Record<string, string> = { "Content-Type": "application/json" };
      if (session?.access_token) authHeaders["Authorization"] = `Bearer ${session.access_token}`;

      const res = await fetch(`${API_BASE}/api/booking/create`, {
        method: "POST", headers: authHeaders,
        body: JSON.stringify({
          pickup, dropoff,
          bookingType:      service,
          vehicleCategory:  vehicle,
          scheduledAt:      scheduledAt.toISOString(),
          passengers,       luggage,
          specialRequests:  specialRequests || null,
          flightNumber:     service === "airport_transfer" ? flightNumber || null : null,
          distanceKm,       durationMinutes,
          customerEmail:    email || null,
          paymentMethod,
          isRecurring,      recurrenceRule: isRecurring ? recurrenceRule : null,
          promoCode:        promoApplied?.code || null,
          promoDiscount:    promoApplied || null,
          pricing: pricing ? {
            baseCharge:         pricing.baseCharge,
            bookingFee:         pricing.bookingFee,
            airportSurcharge:   pricing.airportSurcharge,
            afterHoursSurcharge:pricing.afterHoursSurcharge,
            gst:                pricing.gst,
            total,
          } : null,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      Alert.alert(
        "Booking Confirmed! ✓",
        `Reference: ${String(data.bookingId).slice(0, 8).toUpperCase()}\n\nYour chauffeur will be in touch shortly.`,
        [{ text: "View Bookings", onPress: () => navigation.navigate("Bookings") }]
      );
    } catch {
      Alert.alert("Booking Failed", "Please try again or call 1800 ELITE.");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (step === "location") navigation.goBack();
    else if (step === "vehicle") setStep("location");
    else if (step === "details") setStep("vehicle");
    else setStep("details");
  };

  const pricing = pricingBreakdowns[vehicle];
  const total   = pricing
    ? (promoApplied ? Math.max(0, pricing.total - promoApplied.amount) : pricing.total)
    : (quotes[vehicle] || 0);

  return (
    <SafeAreaView style={[s.container, { backgroundColor: colors.black }]}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: colors.darkBorder }]}>
        <TouchableOpacity onPress={goBack} style={s.backBtn}>
          <Text style={[s.backText, { color: colors.gold }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: colors.white }]}>Book a Ride</Text>
        <View style={{ width: 70 }} />
      </View>

      {/* Progress bar */}
      <View style={s.progress}>
        {STEP_LABELS.map((label, i) => (
          <React.Fragment key={label}>
            <View style={s.progressItem}>
              <View style={[s.progressDot, { backgroundColor: colors.darkMuted, borderColor: colors.darkBorder },
                i <= stepIndex && { backgroundColor: colors.gold, borderColor: colors.gold }]}>
                <Text style={[s.progressNum, { color: colors.gray500 }, i <= stepIndex && { color: colors.black }]}>{i + 1}</Text>
              </View>
              <Text style={[s.progressLabel, { color: i <= stepIndex ? colors.gold : colors.gray500 }]}>{label}</Text>
            </View>
            {i < 3 && <View style={[s.progressLine, { backgroundColor: colors.darkBorder }, i < stepIndex && { backgroundColor: colors.gold }]} />}
          </React.Fragment>
        ))}
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">

          {/* ══ STEP 1: LOCATION ══ */}
          {step === "location" && (
            <View>
              <Text style={[s.stepTitle, { color: colors.white }]}>Where are you going?</Text>

              {/* Service type */}
              <Text style={[s.sectionLabel, { color: colors.gray400 }]}>Service Type</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                {SERVICES.map(sv => (
                  <TouchableOpacity key={sv.id} onPress={() => setService(sv.id)}
                    style={[s.serviceChip, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder },
                      service === sv.id && { borderColor: colors.gold, backgroundColor: `${colors.gold}18` }]}>
                    <Text style={{ fontSize: 18 }}>{sv.icon}</Text>
                    <Text style={[s.serviceLabel, { color: service === sv.id ? colors.gold : colors.gray400 }]}>{sv.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Pickup */}
              <View style={[s.inputCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder, zIndex: 200 }]}>
                <Text style={[s.inputLabel, { color: colors.gray400 }]}>📍 Pickup Location</Text>
                <PlacesAutocomplete value={pickup} onSelect={setPickup}
                  placeholder="Enter pickup address" placeholderTextColor={colors.gray500}
                  inputStyle={[s.input, { color: colors.white }]} />
              </View>

              {/* Dropoff */}
              <View style={[s.inputCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder, zIndex: 100 }]}>
                <Text style={[s.inputLabel, { color: colors.gray400 }]}>🏁 Drop-off Location</Text>
                <PlacesAutocomplete value={dropoff} onSelect={setDropoff}
                  placeholder="Enter drop-off address" placeholderTextColor={colors.gray500}
                  inputStyle={[s.input, { color: colors.white }]} />
              </View>

              {/* Flight number (airport only) */}
              {service === "airport_transfer" && (
                <View style={[s.inputCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                  <Text style={[s.inputLabel, { color: colors.gray400 }]}>✈️ Flight Number (optional)</Text>
                  <TextInput style={[s.input, { color: colors.white }]} value={flightNumber}
                    onChangeText={setFlightNumber} placeholder="e.g. QF401"
                    placeholderTextColor={colors.gray500} autoCapitalize="characters" />
                </View>
              )}

              {/* Date & Time */}
              <TouchableOpacity onPress={() => setShowDateModal(true)}
                style={[s.inputCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                <Text style={[s.inputLabel, { color: colors.gray400 }]}>🗓 Date & Time</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={[s.input, { color: colors.white }]}>{fmtDate(scheduledAt)}</Text>
                  <Text style={{ color: colors.gold, fontSize: 13, fontWeight: "600" }}>Change</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[s.primaryBtn, SHADOWS.gold]} onPress={goToVehicle} disabled={loading}>
                {loading ? <ActivityIndicator color={colors.black} /> : <Text style={[s.primaryBtnText, { color: colors.black }]}>Get Quote →</Text>}
              </TouchableOpacity>
            </View>
          )}

          {/* ══ STEP 2: VEHICLE ══ */}
          {step === "vehicle" && (
            <View>
              <Text style={[s.stepTitle, { color: colors.white }]}>Choose Your Vehicle</Text>
              <Text style={[s.stepSub, { color: colors.gray500 }]}>
                {distanceKm > 0 ? `${distanceKm.toFixed(1)} km · ~${durationMinutes} min` : "Prices inc. GST"}
              </Text>
              {VEHICLES.map(v => {
                const isSelected = vehicle === v.cat;
                const price = quotes[v.cat];
                return (
                  <TouchableOpacity key={v.cat} onPress={() => setVehicle(v.cat)} activeOpacity={0.85}
                    style={[s.vehicleCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder },
                      isSelected && { borderColor: colors.gold, borderWidth: 2 }]}>
                    <View style={s.vehicleImageWrap}>
                      <Image source={{ uri: v.imageUrl }} style={s.vehicleImage} resizeMode="cover" />
                      <View style={s.vehicleImageOverlay} />
                      <View style={s.priceBadge}>
                        <Text style={s.priceBadgeAmount}>{price ? `$${price.toFixed(0)}` : "—"}</Text>
                        <Text style={s.priceBadgeGst}>inc. GST</Text>
                      </View>
                      {isSelected && (
                        <View style={[s.checkBadge, { backgroundColor: colors.gold }]}>
                          <Text style={{ color: colors.black, fontSize: 12, fontWeight: "900" }}>✓</Text>
                        </View>
                      )}
                    </View>
                    <View style={[s.vehicleBody, isSelected && { backgroundColor: `${colors.gold}08` }]}>
                      <Text style={[s.vehicleLabel, { color: colors.white }]}>{v.label}</Text>
                      <Text style={[s.vehicleModel, { color: colors.gray500 }]}>{v.model}</Text>
                      <View style={s.featurePills}>
                        {v.features.map(f => (
                          <View key={f} style={[s.featurePill, { backgroundColor: isSelected ? `${colors.gold}20` : colors.darkBorder }]}>
                            <Text style={[s.featurePillText, { color: isSelected ? colors.gold : colors.gray400 }]}>{f}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity style={[s.primaryBtn, SHADOWS.gold]} onPress={() => setStep("details")}>
                <Text style={[s.primaryBtnText, { color: colors.black }]}>Continue →</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ══ STEP 3: DETAILS ══ */}
          {step === "details" && (
            <View>
              <Text style={[s.stepTitle, { color: colors.white }]}>Your Details</Text>

              {/* Passenger & luggage counters */}
              <View style={[s.card, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                <Text style={[s.cardTitle, { color: colors.white }]}>Trip Details</Text>
                <Counter label="Passengers" value={passengers} onInc={() => setPassengers(p => Math.min(p + 1, 10))} onDec={() => setPassengers(p => Math.max(p - 1, 1))} min={1} max={10} colors={colors} />
                <View style={[s.divider, { backgroundColor: colors.darkBorder }]} />
                <Counter label="Luggage bags" value={luggage} onInc={() => setLuggage(p => Math.min(p + 1, 10))} onDec={() => setLuggage(p => Math.max(p - 1, 0))} min={0} max={10} colors={colors} />
              </View>

              {/* Contact info */}
              <View style={[s.card, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                <Text style={[s.cardTitle, { color: colors.white }]}>Contact Info</Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={[s.fieldLabel, { color: colors.gray400 }]}>First Name</Text>
                    <TextInput style={[s.fieldInput, { color: colors.white, borderColor: colors.darkBorder }]}
                      value={firstName} onChangeText={setFirstName} placeholder="Jane"
                      placeholderTextColor={colors.gray500} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[s.fieldLabel, { color: colors.gray400 }]}>Last Name</Text>
                    <TextInput style={[s.fieldInput, { color: colors.white, borderColor: colors.darkBorder }]}
                      value={lastName} onChangeText={setLastName} placeholder="Smith"
                      placeholderTextColor={colors.gray500} />
                  </View>
                </View>
                <Text style={[s.fieldLabel, { color: colors.gray400, marginTop: 10 }]}>Email</Text>
                <TextInput style={[s.fieldInput, { color: colors.white, borderColor: colors.darkBorder }]}
                  value={email} onChangeText={setEmail} placeholder="jane@example.com"
                  placeholderTextColor={colors.gray500} keyboardType="email-address" autoCapitalize="none" />
                <Text style={[s.fieldLabel, { color: colors.gray400, marginTop: 10 }]}>Phone</Text>
                <TextInput style={[s.fieldInput, { color: colors.white, borderColor: colors.darkBorder }]}
                  value={phone} onChangeText={setPhone} placeholder="+61 400 000 000"
                  placeholderTextColor={colors.gray500} keyboardType="phone-pad" />
              </View>

              {/* Special requests */}
              <View style={[s.card, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                <Text style={[s.cardTitle, { color: colors.white }]}>Special Requests</Text>
                <TextInput
                  style={[s.fieldInput, s.textArea, { color: colors.white, borderColor: colors.darkBorder }]}
                  value={specialRequests} onChangeText={setSpecialRequests}
                  placeholder="Child seat, meet & greet sign, dietary requirements…"
                  placeholderTextColor={colors.gray500} multiline numberOfLines={3} />
              </View>

              {/* Promo code */}
              <View style={[s.card, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                <Text style={[s.cardTitle, { color: colors.white }]}>Promo Code</Text>
                {promoApplied ? (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: "#22c55e", fontWeight: "600", fontSize: 13 }}>
                      ✓ {promoApplied.code} — saving ${promoApplied.amount.toFixed(2)}
                    </Text>
                    <TouchableOpacity onPress={() => { setPromoApplied(null); setPromoCode(""); }}>
                      <Text style={{ color: "#f87171", fontSize: 13, fontWeight: "600" }}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <TextInput style={[s.fieldInput, { flex: 1, color: colors.white, borderColor: colors.darkBorder }]}
                        value={promoCode} onChangeText={t => { setPromoCode(t.toUpperCase()); setPromoError(""); }}
                        placeholder="Enter code" placeholderTextColor={colors.gray500} autoCapitalize="characters" />
                      <TouchableOpacity onPress={applyPromo} disabled={promoLoading || !promoCode.trim()}
                        style={[s.promoBtn, { backgroundColor: promoCode.trim() ? colors.gold : colors.darkMuted }]}>
                        {promoLoading ? <ActivityIndicator color={colors.black} size="small" /> :
                          <Text style={{ color: promoCode.trim() ? colors.black : colors.gray500, fontWeight: "700", fontSize: 13 }}>Apply</Text>}
                      </TouchableOpacity>
                    </View>
                    {promoError ? <Text style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{promoError}</Text> : null}
                  </View>
                )}
              </View>

              <TouchableOpacity style={[s.primaryBtn, SHADOWS.gold]} onPress={() => setStep("confirm")}>
                <Text style={[s.primaryBtnText, { color: colors.black }]}>Review Booking →</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ══ STEP 4: CONFIRM ══ */}
          {step === "confirm" && (
            <View>
              <Text style={[s.stepTitle, { color: colors.white }]}>Review & Confirm</Text>

              {/* Trip summary */}
              <View style={[s.card, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#22c55e" }} />
                  <Text style={[s.summaryAddr, { color: colors.white }]} numberOfLines={1}>{pickup}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.gold }} />
                  <Text style={[s.summaryAddr, { color: colors.white }]} numberOfLines={1}>{dropoff}</Text>
                </View>
                <View style={[s.divider, { backgroundColor: colors.darkBorder, marginBottom: 12 }]} />
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                  {[
                    ["Vehicle",    VEHICLES.find(v => v.cat === vehicle)?.label || vehicle],
                    ["Date",       fmtDate(scheduledAt)],
                    ["Passengers", `${passengers} pax · ${luggage} bags`],
                    ["Service",    SERVICES.find(sv => sv.id === service)?.label || service],
                    ...(service === "airport_transfer" && flightNumber ? [["Flight", flightNumber]] : []),
                    ...(distanceKm > 0 ? [["Distance", `${distanceKm.toFixed(1)} km`]] : []),
                  ].map(([k, v]) => (
                    <View key={k} style={[s.summaryChip, { backgroundColor: colors.darkMuted, borderColor: colors.darkBorder }]}>
                      <Text style={{ color: colors.gray500, fontSize: 10 }}>{k}</Text>
                      <Text style={{ color: colors.white, fontSize: 12, fontWeight: "600" }}>{v}</Text>
                    </View>
                  ))}
                </View>
                {specialRequests ? (
                  <View style={{ marginTop: 12 }}>
                    <Text style={{ color: colors.gray500, fontSize: 11 }}>Special requests: <Text style={{ color: colors.gray400 }}>{specialRequests}</Text></Text>
                  </View>
                ) : null}
              </View>

              {/* Pricing breakdown */}
              {pricing && (
                <View style={[s.card, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                  <Text style={[s.cardTitle, { color: colors.white }]}>Price Breakdown</Text>
                  <PricingRow label="Base fare"          value={pricing.baseCharge}           colors={colors} />
                  <PricingRow label="Booking fee"        value={pricing.bookingFee}            colors={colors} />
                  {pricing.airportSurcharge > 0    && <PricingRow label="Airport surcharge"    value={pricing.airportSurcharge}    colors={colors} />}
                  {pricing.afterHoursSurcharge > 0 && <PricingRow label="After-hours"          value={pricing.afterHoursSurcharge} colors={colors} />}
                  <PricingRow label="GST (10%)"          value={pricing.gst}                   colors={colors} />
                  {promoApplied && (
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                      <Text style={{ color: "#22c55e", fontSize: 13 }}>Promo ({promoApplied.code})</Text>
                      <Text style={{ color: "#22c55e", fontSize: 13, fontWeight: "600" }}>−${promoApplied.amount.toFixed(2)}</Text>
                    </View>
                  )}
                  <View style={[s.divider, { backgroundColor: colors.darkBorder, marginVertical: 10 }]} />
                  <PricingRow label="Total (AUD)" value={total} bold gold colors={colors} />
                  <Text style={{ color: colors.gray500, fontSize: 11, marginTop: 6 }}>Free cancellation up to 2 hours before pickup</Text>
                </View>
              )}

              {/* Recurring booking */}
              <View style={[s.card, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={[s.cardTitle, { color: colors.white }]}>Repeat Booking</Text>
                  <TouchableOpacity onPress={() => setIsRecurring(!isRecurring)}
                    style={[s.toggle, { backgroundColor: isRecurring ? colors.gold : colors.darkMuted }]}>
                    <View style={[s.toggleThumb, { transform: [{ translateX: isRecurring ? 20 : 2 }] }]} />
                  </TouchableOpacity>
                </View>
                {isRecurring && (
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                    {[
                      { id: "weekly:monday",               label: "Mon" },
                      { id: "weekly:friday",               label: "Fri" },
                      { id: "weekly:monday,friday",        label: "Mon & Fri" },
                      { id: "weekly:monday,wednesday,friday", label: "Mon/Wed/Fri" },
                      { id: "weekly:daily",                label: "Weekdays" },
                      { id: "monthly:1",                   label: "Monthly" },
                    ].map(r => (
                      <TouchableOpacity key={r.id} onPress={() => setRecurrenceRule(r.id)}
                        style={[s.recurrenceChip, { borderColor: colors.darkBorder, backgroundColor: colors.darkMuted },
                          recurrenceRule === r.id && { borderColor: colors.gold, backgroundColor: `${colors.gold}20` }]}>
                        <Text style={{ color: recurrenceRule === r.id ? colors.gold : colors.gray400, fontSize: 12, fontWeight: "600" }}>{r.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Payment method */}
              <Text style={[s.sectionLabel, { color: colors.gray400 }]}>Payment Method</Text>
              <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
                {[
                  { id: "cash",          label: "Cash",     sub: "Pay on day" },
                  { id: "bank_transfer", label: "Transfer", sub: "Via invoice" },
                  { id: "invoice",       label: "Invoice",  sub: "Corporate" },
                ].map(m => (
                  <TouchableOpacity key={m.id} onPress={() => setPaymentMethod(m.id)}
                    style={[s.payCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder },
                      paymentMethod === m.id && { borderColor: colors.gold, backgroundColor: `${colors.gold}10` }]}>
                    <Text style={[s.payLabel, { color: paymentMethod === m.id ? colors.gold : colors.white }]}>{m.label}</Text>
                    <Text style={[s.paySub, { color: colors.gray500 }]}>{m.sub}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Total + confirm */}
              <View style={[s.totalBar, { backgroundColor: `${colors.gold}12`, borderColor: `${colors.gold}40` }]}>
                <Text style={{ color: colors.gray400, fontSize: 13 }}>Total</Text>
                <Text style={{ color: colors.gold, fontSize: 26, fontWeight: "800" }}>${total.toFixed(2)}</Text>
                <Text style={{ color: colors.gray500, fontSize: 11 }}>AUD inc. GST</Text>
              </View>

              <TouchableOpacity style={[s.primaryBtn, SHADOWS.gold]} onPress={confirmBooking} disabled={loading}>
                {loading ? <ActivityIndicator color={colors.black} /> :
                  <Text style={[s.primaryBtnText, { color: colors.black }]}>Confirm Booking ✓</Text>}
              </TouchableOpacity>

              <Text style={{ color: colors.gray500, fontSize: 11, textAlign: "center", marginTop: 12 }}>
                SSL Secured · Free cancellation 2 hrs before pickup
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date/Time Picker Modal */}
      <DateTimeModal
        visible={showDateModal}
        date={scheduledAt}
        onConfirm={d => setScheduledAt(d)}
        onClose={() => setShowDateModal(false)}
        colors={colors}
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  container:           { flex: 1 },
  header:              { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  backBtn:             { paddingVertical: 4 },
  backText:            { fontSize: 16, fontWeight: "600" },
  headerTitle:         { fontWeight: "700", fontSize: 17 },
  progress:            { flexDirection: "row", alignItems: "flex-start", justifyContent: "center", paddingVertical: 14, paddingHorizontal: 20 },
  progressItem:        { alignItems: "center", gap: 4 },
  progressDot:         { width: 28, height: 28, borderRadius: 14, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  progressNum:         { fontSize: 12, fontWeight: "700" },
  progressLabel:       { fontSize: 9, fontWeight: "600" },
  progressLine:        { flex: 1, height: 2, marginHorizontal: 4, marginTop: 13 },
  stepTitle:           { fontSize: 22, fontWeight: "800", marginBottom: 6 },
  stepSub:             { fontSize: 13, marginBottom: 18 },
  sectionLabel:        { fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10, marginTop: 4 },
  card:                { borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1 },
  cardTitle:           { fontSize: 14, fontWeight: "700", marginBottom: 12 },
  divider:             { height: 1, marginVertical: 8 },
  inputCard:           { borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1 },
  inputLabel:          { fontSize: 12, marginBottom: 8, fontWeight: "500" },
  input:               { fontSize: 15 },
  serviceChip:         { borderRadius: 14, padding: 12, marginRight: 10, borderWidth: 1, alignItems: "center", minWidth: 72 },
  serviceLabel:        { fontSize: 11, fontWeight: "600", marginTop: 4 },
  primaryBtn:          { backgroundColor: "#C9A84C", borderRadius: 14, paddingVertical: 17, alignItems: "center", marginTop: 8 },
  primaryBtnText:      { fontWeight: "800", fontSize: 16 },
  vehicleCard:         { borderRadius: 18, marginBottom: 14, borderWidth: 1.5, overflow: "hidden" },
  vehicleImageWrap:    { height: 130, position: "relative" },
  vehicleImage:        { width: "100%", height: 130 },
  vehicleImageOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: 60, backgroundColor: "rgba(0,0,0,0.4)" },
  priceBadge:          { position: "absolute", bottom: 10, right: 12, backgroundColor: "rgba(0,0,0,0.75)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, alignItems: "flex-end" },
  priceBadgeAmount:    { color: "#fff", fontWeight: "800", fontSize: 15 },
  priceBadgeGst:       { color: "#aaa", fontSize: 9 },
  checkBadge:          { position: "absolute", top: 10, right: 12, width: 26, height: 26, borderRadius: 13, justifyContent: "center", alignItems: "center" },
  vehicleBody:         { padding: 14 },
  vehicleLabel:        { fontWeight: "700", fontSize: 15, marginBottom: 2 },
  vehicleModel:        { fontSize: 12, marginBottom: 8 },
  featurePills:        { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  featurePill:         { borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  featurePillText:     { fontSize: 10, fontWeight: "600" },
  fieldLabel:          { fontSize: 12, fontWeight: "500", marginBottom: 6 },
  fieldInput:          { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
  textArea:            { height: 80, textAlignVertical: "top" },
  promoBtn:            { paddingHorizontal: 18, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  summaryAddr:         { fontSize: 13, fontWeight: "500", flex: 1 },
  summaryChip:         { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 1, minWidth: "47%", flex: 1 },
  toggle:              { width: 44, height: 24, borderRadius: 12, justifyContent: "center" },
  toggleThumb:         { width: 20, height: 20, borderRadius: 10, backgroundColor: "#fff" },
  recurrenceChip:      { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1 },
  payCard:             { flex: 1, borderRadius: 14, padding: 12, borderWidth: 1, alignItems: "center" },
  payLabel:            { fontWeight: "700", fontSize: 13, marginBottom: 2 },
  paySub:              { fontSize: 10, textAlign: "center" },
  totalBar:            { borderRadius: 16, padding: 16, alignItems: "center", borderWidth: 1, marginBottom: 14 },
});
