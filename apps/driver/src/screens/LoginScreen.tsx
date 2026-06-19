import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, ActivityIndicator, Alert,
} from "react-native";
import { COLORS } from "../lib/theme";
import { useTheme } from "../lib/ThemeContext";
import { supabase } from "../lib/supabase";
import { setDriver } from "../lib/driver";

export default function LoginScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async () => {
    const e = email.trim().toLowerCase();
    if (!e || !password) { Alert.alert("Required", "Please enter email and password."); return; }
    setLoading(true);
    try {
      // ── Sign in with Supabase ──────────────────────────────────────────
      const { data: auth, error } = await supabase.auth.signInWithPassword({ email: e, password });
      if (error || !auth?.user) {
        Alert.alert("Login Failed", error?.message || "Incorrect email or password.");
        return;
      }

      // Load the driver profile (onboarding + approval gating)
      const { data: d } = await supabase
        .from("drivers")
        .select("id, is_approved, onboarding_complete, first_name, last_name, phone, vehicle_make, vehicle_model, vehicle_year, vehicle_plate, vehicle_category")
        .eq("email", e)
        .maybeSingle();

      if (d) {
        const driverName = [d.first_name, d.last_name].filter(Boolean).join(" ") || e.split("@")[0];
        if (!d.onboarding_complete) {
          navigation.replace("Onboarding", { driverId: d.id, name: driverName, email: e, phone: d.phone || "" });
          return;
        }
        if (!d.is_approved) {
          Alert.alert(
            "Account Pending Approval",
            "Your application is under review. You will receive an email once approved by our team."
          );
          await supabase.auth.signOut();
          return;
        }
        await setDriver({
          id: d.id,
          name: driverName,
          email: e,
          phone: d.phone,
          vehicleMakeModel: [d.vehicle_make, d.vehicle_model].filter(Boolean).join(" ") || null,
          vehiclePlate: d.vehicle_plate,
          vehicleYear: d.vehicle_year,
          vehicleCategory: d.vehicle_category,
        });
      } else {
        // Authenticated but no driver row yet — store minimal identity
        await setDriver({ id: auth.user.id, name: e.split("@")[0], email: e });
      }

      navigation.replace("Main");
    } catch {
      Alert.alert("Login Failed", "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <StatusBar barStyle={isDark ? "dark-content" : "dark-content"} backgroundColor={colors.black} />
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoBox}>
          <View style={[styles.logoCircle, { backgroundColor: colors.gold, shadowColor: colors.gold }]}>
            <Text style={[styles.logoText, { color: colors.black }]}>E</Text>
          </View>
          <Text style={[styles.brandName, { color: colors.white }]}>Elite Chauffeurs</Text>
          <Text style={[styles.brandSub, { color: colors.gold }]}>Driver Portal · Australia</Text>
        </View>

        <Text style={[styles.title, { color: colors.white }]}>Welcome, Driver</Text>
        <Text style={[styles.sub, { color: colors.gray500 }]}>Sign in to your driver account to start accepting rides</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.gray400 }]}>Email Address</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder, color: colors.white }]}
              value={email} onChangeText={setEmail}
              placeholder="driver@example.com" placeholderTextColor={colors.gray500}
              keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.gray400 }]}>Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder, color: colors.white }]}
              value={password} onChangeText={setPassword}
              placeholder="••••••••" placeholderTextColor={colors.gray500}
              secureTextEntry />
          </View>

          <TouchableOpacity
            style={[styles.loginBtn, { backgroundColor: colors.gold, shadowColor: colors.gold }, loading && { opacity:0.7 }]}
            onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
            {loading
              ? <ActivityIndicator color={colors.black} />
              : <Text style={[styles.loginBtnText, { color: colors.black }]}>Sign In →</Text>
            }
          </TouchableOpacity>
        </View>

        <Text style={[styles.footer, { color: colors.gray500 }]}>
          Need access? Contact{" "}
          <Text style={{ color: colors.gold }}>dispatch@elitechauffeurs.com.au</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:    { flex:1, backgroundColor:COLORS.black },
  content:      { flex:1, justifyContent:"center", paddingHorizontal:28 },
  logoBox:      { alignItems:"center", marginBottom:36 },
  logoCircle:   { width:72, height:72, borderRadius:36, backgroundColor:COLORS.gold, justifyContent:"center", alignItems:"center", marginBottom:14, shadowColor:COLORS.gold, shadowOffset:{width:0,height:6}, shadowOpacity:0.4, shadowRadius:14, elevation:10 },
  logoText:     { color:COLORS.black, fontSize:30, fontWeight:"800" },
  brandName:    { color:COLORS.white, fontSize:24, fontWeight:"800" },
  brandSub:     { color:COLORS.gold, fontSize:11, letterSpacing:1, marginTop:4 },
  title:        { color:COLORS.white, fontSize:28, fontWeight:"700", textAlign:"center", marginBottom:8 },
  sub:          { color:COLORS.gray500, fontSize:14, textAlign:"center", lineHeight:20, marginBottom:32 },
  form:         { gap:16, marginBottom:24 },
  inputGroup:   { gap:6 },
  label:        { color:COLORS.gray400, fontSize:12, fontWeight:"600" },
  input:        { backgroundColor:COLORS.darkSurface, borderWidth:1, borderColor:COLORS.darkBorder, borderRadius:14, paddingVertical:14, paddingHorizontal:16, color:COLORS.white, fontSize:15 },
  loginBtn:     { backgroundColor:COLORS.gold, borderRadius:14, paddingVertical:17, alignItems:"center", marginTop:4, shadowColor:COLORS.gold, shadowOffset:{width:0,height:4}, shadowOpacity:0.35, shadowRadius:12, elevation:8 },
  loginBtnText: { color:COLORS.black, fontWeight:"800", fontSize:17 },
  footer:       { color:COLORS.gray500, fontSize:12, textAlign:"center" },
});
