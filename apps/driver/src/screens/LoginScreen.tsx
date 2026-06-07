import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, ActivityIndicator, Alert,
} from "react-native";
import { COLORS } from "../lib/theme";
import { useTheme } from "../lib/ThemeContext";

const API = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";
const SUPABASE_URL  = process.env.EXPO_PUBLIC_SUPABASE_URL  || "";
const SUPABASE_ANON = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export default function LoginScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { Alert.alert("Required", "Please enter email and password."); return; }
    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok && !data.demo) {
        Alert.alert("Login Failed", data.error || "Invalid credentials.");
        return;
      }

      // After successful auth, check approval status
      if (
        SUPABASE_URL && !SUPABASE_URL.includes("your-project") &&
        SUPABASE_ANON && !SUPABASE_ANON.includes("your-")
      ) {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

        const { data: driverProfile } = await supabase
          .from("drivers")
          .select("id, is_approved, onboarding_complete, name, phone")
          .eq("email", email)
          .single();

        if (driverProfile) {
          // Not yet completed onboarding — send to wizard
          if (!driverProfile.onboarding_complete) {
            navigation.replace("Onboarding", {
              driverId: driverProfile.id,
              name:     driverProfile.name,
              email,
              phone:    driverProfile.phone || "",
            });
            return;
          }

          // Completed onboarding but not yet approved
          if (!driverProfile.is_approved) {
            Alert.alert(
              "Account Pending Approval",
              "Your application is under review. You will receive an email once approved by our team.",
              [{ text: "OK" }]
            );
            await supabase.auth.signOut();
            return;
          }
        }
      }

      // Navigate to main driver app
      navigation.replace("Main");
    } catch {
      // Demo mode: allow any login
      if (password.length >= 4) navigation.replace("Main");
      else Alert.alert("Login Failed", "Password must be at least 4 characters.");
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
