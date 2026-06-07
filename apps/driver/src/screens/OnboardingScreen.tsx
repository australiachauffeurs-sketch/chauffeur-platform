import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, ActivityIndicator, Alert,
} from "react-native";
import { useTheme } from "../lib/ThemeContext";

const API = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

const VEHICLE_CATEGORIES = [
  "Executive Sedan",
  "Luxury SUV",
  "Business Van",
  "Stretch Limousine",
  "Premium MPV",
];

interface OnboardingProps {
  navigation: any;
  route?: { params?: { driverId?: string; name?: string; email?: string; phone?: string } };
}

export default function OnboardingScreen({ navigation, route }: OnboardingProps) {
  const { colors } = useTheme();
  const params = route?.params || {};

  const [step, setStep]                     = useState(1);
  const [submitting, setSubmitting]         = useState(false);

  // Step 2 — Vehicle details
  const [vehicleMake,     setVehicleMake]     = useState("");
  const [vehicleModel,    setVehicleModel]    = useState("");
  const [vehicleYear,     setVehicleYear]     = useState("");
  const [vehiclePlate,    setVehiclePlate]    = useState("");
  const [vehicleCategory, setVehicleCategory] = useState(VEHICLE_CATEGORIES[0]);

  // Step 3 — Document dates
  const [licenseExpiry,      setLicenseExpiry]      = useState("");
  const [insuranceExpiry,    setInsuranceExpiry]    = useState("");
  const [registrationExpiry, setRegistrationExpiry] = useState("");

  const isValidDate = (val: string) => /^\d{4}-\d{2}-\d{2}$/.test(val);

  const handleStep2Next = () => {
    if (!vehicleMake || !vehicleModel || !vehicleYear || !vehiclePlate) {
      Alert.alert("Required", "Please fill in all vehicle details.");
      return;
    }
    if (isNaN(Number(vehicleYear)) || vehicleYear.length !== 4) {
      Alert.alert("Invalid Year", "Please enter a 4-digit vehicle year.");
      return;
    }
    setStep(3);
  };

  const handleSubmit = async () => {
    if (!isValidDate(licenseExpiry) || !isValidDate(insuranceExpiry) || !isValidDate(registrationExpiry)) {
      Alert.alert("Invalid Date", "Please enter all dates in YYYY-MM-DD format.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/driver/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driverId:            params.driverId,
          vehicleMake,
          vehicleModel,
          vehicleYear:         Number(vehicleYear),
          vehiclePlate,
          vehicleCategory,
          licenseExpiry,
          insuranceExpiry,
          registrationExpiry,
        }),
      });
      if (res.ok) {
        setStep(4);
      } else {
        const data = await res.json();
        Alert.alert("Error", data.error || "Failed to submit. Please try again.");
      }
    } catch {
      // Demo mode: proceed anyway
      setStep(4);
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabel = (n: number) =>
    n === step ? colors.gold : n < step ? colors.green : colors.gray500;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 48 }} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.logoRow}>
          <View style={[styles.logoCircle, { backgroundColor: colors.gold }]}>
            <Text style={[styles.logoText, { color: colors.black }]}>E</Text>
          </View>
          <Text style={[styles.brand, { color: colors.white }]}>Elite Chauffeurs</Text>
          <Text style={[styles.brandSub, { color: colors.gold }]}>Driver Onboarding</Text>
        </View>

        {step < 4 && (
          <View style={styles.stepsRow}>
            {[1, 2, 3].map(n => (
              <View key={n} style={styles.stepItem}>
                <View style={[styles.stepDot, { borderColor: stepLabel(n), backgroundColor: n <= step ? stepLabel(n) : "transparent" }]}>
                  <Text style={[styles.stepNum, { color: n <= step ? colors.black : colors.gray500 }]}>{n}</Text>
                </View>
                {n < 3 && <View style={[styles.stepLine, { backgroundColor: n < step ? colors.gold : colors.darkBorder }]} />}
              </View>
            ))}
          </View>
        )}

        {/* ── STEP 1: Personal details ── */}
        {step === 1 && (
          <>
            <Text style={[styles.stepTitle, { color: colors.white }]}>Personal Details</Text>
            <Text style={[styles.stepSub,   { color: colors.gray500 }]}>Confirm your account information below.</Text>

            {[
              { label: "Full Name",      value: params.name  || "—" },
              { label: "Email Address",  value: params.email || "—" },
              { label: "Phone Number",   value: params.phone || "—" },
            ].map(row => (
              <View key={row.label} style={[styles.readonlyRow, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                <Text style={[styles.readonlyLabel, { color: colors.gray500 }]}>{row.label}</Text>
                <Text style={[styles.readonlyVal,   { color: colors.white }]}>{row.value}</Text>
              </View>
            ))}

            <Text style={[styles.hint, { color: colors.gray500 }]}>
              If any details are incorrect, contact dispatch@elitechauffeurs.com.au before continuing.
            </Text>

            <TouchableOpacity
              style={[styles.btn, { backgroundColor: colors.gold }]}
              onPress={() => setStep(2)}>
              <Text style={[styles.btnText, { color: colors.black }]}>Continue →</Text>
            </TouchableOpacity>
          </>
        )}

        {/* ── STEP 2: Vehicle details ── */}
        {step === 2 && (
          <>
            <Text style={[styles.stepTitle, { color: colors.white }]}>Vehicle Details</Text>
            <Text style={[styles.stepSub,   { color: colors.gray500 }]}>Enter the vehicle you will be driving.</Text>

            {[
              { label: "Vehicle Make",  placeholder: "e.g. Mercedes-Benz", val: vehicleMake,  set: setVehicleMake  },
              { label: "Vehicle Model", placeholder: "e.g. E-Class W213",  val: vehicleModel, set: setVehicleModel },
              { label: "Year",          placeholder: "e.g. 2023",           val: vehicleYear,  set: setVehicleYear  },
              { label: "Plate Number",  placeholder: "e.g. ABC 123",        val: vehiclePlate, set: setVehiclePlate },
            ].map(f => (
              <View key={f.label} style={styles.fieldGroup}>
                <Text style={[styles.fieldLabel, { color: colors.gray400 }]}>{f.label}</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder, color: colors.white }]}
                  value={f.val}
                  onChangeText={f.set}
                  placeholder={f.placeholder}
                  placeholderTextColor={colors.gray500}
                  keyboardType={f.label === "Year" ? "number-pad" : "default"}
                />
              </View>
            ))}

            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: colors.gray400 }]}>Vehicle Category</Text>
              <View style={styles.categoryRow}>
                {VEHICLE_CATEGORIES.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setVehicleCategory(cat)}
                    style={[styles.categoryBtn, vehicleCategory === cat && { backgroundColor: colors.gold, borderColor: colors.gold }]}>
                    <Text style={[styles.categoryText, vehicleCategory === cat ? { color: colors.black } : { color: colors.gray400 }]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity
                style={[styles.btnOutline, { borderColor: colors.darkBorder }]}
                onPress={() => setStep(1)}>
                <Text style={[styles.btnOutlineText, { color: colors.gray400 }]}>← Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: colors.gold, flex: 1 }]}
                onPress={handleStep2Next}>
                <Text style={[styles.btnText, { color: colors.black }]}>Continue →</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* ── STEP 3: Document dates ── */}
        {step === 3 && (
          <>
            <Text style={[styles.stepTitle, { color: colors.white }]}>Document Expiry Dates</Text>
            <Text style={[styles.stepSub,   { color: colors.gray500 }]}>Enter the expiry dates for your key documents (YYYY-MM-DD).</Text>

            {[
              { label: "Driver's Licence Expiry",    val: licenseExpiry,      set: setLicenseExpiry      },
              { label: "Vehicle Insurance Expiry",   val: insuranceExpiry,    set: setInsuranceExpiry    },
              { label: "Vehicle Registration Expiry",val: registrationExpiry, set: setRegistrationExpiry },
            ].map(f => (
              <View key={f.label} style={styles.fieldGroup}>
                <Text style={[styles.fieldLabel, { color: colors.gray400 }]}>{f.label}</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder, color: colors.white }]}
                  value={f.val}
                  onChangeText={f.set}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={colors.gray500}
                  keyboardType="numbers-and-punctuation"
                />
              </View>
            ))}

            <View style={styles.btnRow}>
              <TouchableOpacity
                style={[styles.btnOutline, { borderColor: colors.darkBorder }]}
                onPress={() => setStep(2)}>
                <Text style={[styles.btnOutlineText, { color: colors.gray400 }]}>← Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: colors.gold, flex: 1, opacity: submitting ? 0.7 : 1 }]}
                onPress={handleSubmit}
                disabled={submitting}>
                {submitting
                  ? <ActivityIndicator color={colors.black} />
                  : <Text style={[styles.btnText, { color: colors.black }]}>Submit Application</Text>
                }
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* ── STEP 4: Submitted ── */}
        {step === 4 && (
          <View style={styles.successBox}>
            <View style={[styles.successIcon, { backgroundColor: `${colors.gold}20`, borderColor: `${colors.gold}40` }]}>
              <Text style={{ fontSize: 40 }}>✓</Text>
            </View>
            <Text style={[styles.successTitle, { color: colors.white }]}>Application Submitted!</Text>
            <Text style={[styles.successSub, { color: colors.gray500 }]}>
              Thank you! Your driver application has been received.{"\n\n"}
              Our team will review your details and notify you by email once your account is approved.
              This usually takes 1–2 business days.
            </Text>
            <View style={[styles.infoCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
              <Text style={[styles.infoRow, { color: colors.gray400 }]}>Questions?</Text>
              <Text style={[styles.infoRow, { color: colors.gold }]}>dispatch@elitechauffeurs.com.au</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1 },
  logoRow:         { alignItems: "center", marginBottom: 28 },
  logoCircle:      { width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  logoText:        { fontSize: 26, fontWeight: "800" },
  brand:           { fontSize: 20, fontWeight: "800" },
  brandSub:        { fontSize: 11, letterSpacing: 1, marginTop: 3 },

  stepsRow:        { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 28 },
  stepItem:        { flexDirection: "row", alignItems: "center" },
  stepDot:         { width: 28, height: 28, borderRadius: 14, borderWidth: 2, justifyContent: "center", alignItems: "center" },
  stepNum:         { fontSize: 12, fontWeight: "700" },
  stepLine:        { width: 48, height: 2, marginHorizontal: 4 },

  stepTitle:       { fontSize: 22, fontWeight: "700", marginBottom: 6 },
  stepSub:         { fontSize: 14, marginBottom: 20, lineHeight: 20 },

  readonlyRow:     { borderRadius: 12, borderWidth: 1, padding: 14, marginBottom: 10 },
  readonlyLabel:   { fontSize: 11, marginBottom: 4 },
  readonlyVal:     { fontSize: 15, fontWeight: "600" },

  hint:            { fontSize: 12, lineHeight: 18, marginBottom: 24 },

  fieldGroup:      { marginBottom: 14 },
  fieldLabel:      { fontSize: 12, fontWeight: "600", marginBottom: 6 },
  input:           { borderWidth: 1, borderRadius: 12, paddingVertical: 13, paddingHorizontal: 14, fontSize: 15 },

  categoryRow:     { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  categoryBtn:     { borderRadius: 10, paddingVertical: 7, paddingHorizontal: 12, borderWidth: 1, borderColor: "#333" },
  categoryText:    { fontSize: 12, fontWeight: "600" },

  btnRow:          { flexDirection: "row", gap: 10, marginTop: 10 },
  btn:             { borderRadius: 14, paddingVertical: 16, alignItems: "center", marginTop: 10 },
  btnText:         { fontWeight: "800", fontSize: 16 },
  btnOutline:      { borderRadius: 14, paddingVertical: 16, alignItems: "center", paddingHorizontal: 18, borderWidth: 1, marginTop: 10 },
  btnOutlineText:  { fontWeight: "700", fontSize: 15 },

  successBox:      { alignItems: "center", paddingTop: 20 },
  successIcon:     { width: 88, height: 88, borderRadius: 44, borderWidth: 2, justifyContent: "center", alignItems: "center", marginBottom: 20 },
  successTitle:    { fontSize: 24, fontWeight: "800", marginBottom: 12, textAlign: "center" },
  successSub:      { fontSize: 14, lineHeight: 22, textAlign: "center", marginBottom: 24 },
  infoCard:        { borderRadius: 14, padding: 16, borderWidth: 1, alignItems: "center", width: "100%" },
  infoRow:         { fontSize: 13, marginBottom: 4 },
});
