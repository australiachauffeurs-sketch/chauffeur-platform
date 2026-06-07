import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, CommonActions } from "@react-navigation/native";

const GOLD   = "#C9A84C";
const BLACK  = "#0A0A0A";
const DARK   = "#111111";
const BORDER = "#2A2A2A";
const GRAY   = "#6B7280";
const MUTED  = "#9CA3AF";
const ERROR  = "#F87171";
const GREEN  = "#34D399";

import { API_BASE } from "../lib/config";

type Form = { firstName: string; lastName: string; email: string; phone: string; password: string; confirm: string };

function pwStrength(pw: string): number {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8)        s++;
  if (/[A-Z]/.test(pw))      s++;
  if (/[0-9]/.test(pw))      s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["", "#F87171", "#FBBF24", "#34D399", "#10B981"];

export default function SignupScreen() {
  const navigation = useNavigation<any>();

  const [form,        setForm]        = useState<Form>({ firstName: "", lastName: "", email: "", phone: "", password: "", confirm: "" });
  const [showPw,      setShowPw]      = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");

  const set = (k: keyof Form, v: string) => { setForm(f => ({ ...f, [k]: v })); if (error) setError(""); };

  const validate = () => {
    if (!form.firstName || form.firstName.length < 2) return "First name is required.";
    if (!form.lastName || form.lastName.length < 2)   return "Last name is required.";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email.";
    if (!form.phone || form.phone.length < 8)         return "Enter a valid phone number.";
    if (form.password.length < 8)                     return "Password must be at least 8 characters.";
    if (form.password !== form.confirm)               return "Passwords do not match.";
    return null;
  };

  const handleSignup = async () => {
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/api/auth/signup`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          firstName: form.firstName.trim(),
          lastName:  form.lastName.trim(),
          email:     form.email.trim(),
          phone:     form.phone.trim(),
          password:  form.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed. Please try again.");
        return;
      }

      // Store pending — confirmed after OTP
      await AsyncStorage.setItem("ec_pending_user", JSON.stringify({
        name:  `${form.firstName} ${form.lastName}`.trim(),
        email: form.email.trim(),
      }));

      navigation.navigate("VerifyOTP", { email: form.email.trim(), type: "signup" });

    } catch {
      setError("Unable to connect. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const strength = pwStrength(form.password);
  const confirmOK = form.confirm && form.confirm === form.password;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: BLACK }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingTop: 60 }}>

        {/* Logo */}
        <View style={{ alignItems: "center", marginBottom: 28 }}>
          <View style={{
            width: 56, height: 56, borderRadius: 28, backgroundColor: GOLD,
            alignItems: "center", justifyContent: "center", marginBottom: 10,
          }}>
            <Text style={{ color: BLACK, fontSize: 20, fontWeight: "900" }}>EC</Text>
          </View>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>Elite Chauffeurs</Text>
        </View>

        {/* Card */}
        <View style={{ backgroundColor: DARK, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: BORDER }}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 4 }}>
            Create your account
          </Text>
          <Text style={{ color: GRAY, fontSize: 13, marginBottom: 24 }}>
            Join thousands of satisfied clients
          </Text>

          {/* Name row */}
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 14 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: MUTED, fontSize: 10, letterSpacing: 1.5, marginBottom: 6, fontWeight: "700" }}>FIRST NAME</Text>
              <TextInput
                value={form.firstName} onChangeText={v => set("firstName", v)}
                placeholder="John" placeholderTextColor="#4B5563"
                style={{ backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: BORDER, color: "#fff", padding: 12, borderRadius: 10, fontSize: 14 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: MUTED, fontSize: 10, letterSpacing: 1.5, marginBottom: 6, fontWeight: "700" }}>LAST NAME</Text>
              <TextInput
                value={form.lastName} onChangeText={v => set("lastName", v)}
                placeholder="Smith" placeholderTextColor="#4B5563"
                style={{ backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: BORDER, color: "#fff", padding: 12, borderRadius: 10, fontSize: 14 }}
              />
            </View>
          </View>

          {/* Email */}
          <Text style={{ color: MUTED, fontSize: 10, letterSpacing: 1.5, marginBottom: 6, fontWeight: "700" }}>EMAIL</Text>
          <TextInput
            value={form.email} onChangeText={v => set("email", v)}
            placeholder="you@example.com" placeholderTextColor="#4B5563"
            keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
            style={{ backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: BORDER, color: "#fff", padding: 14, borderRadius: 12, fontSize: 14, marginBottom: 14 }}
          />

          {/* Phone */}
          <Text style={{ color: MUTED, fontSize: 10, letterSpacing: 1.5, marginBottom: 6, fontWeight: "700" }}>PHONE</Text>
          <TextInput
            value={form.phone} onChangeText={v => set("phone", v)}
            placeholder="+61 4XX XXX XXX" placeholderTextColor="#4B5563"
            keyboardType="phone-pad"
            style={{ backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: BORDER, color: "#fff", padding: 14, borderRadius: 12, fontSize: 14, marginBottom: 14 }}
          />

          {/* Password */}
          <Text style={{ color: MUTED, fontSize: 10, letterSpacing: 1.5, marginBottom: 6, fontWeight: "700" }}>PASSWORD</Text>
          <View style={{ position: "relative", marginBottom: 6 }}>
            <TextInput
              value={form.password} onChangeText={v => set("password", v)}
              placeholder="Min 8 characters" placeholderTextColor="#4B5563"
              secureTextEntry={!showPw} autoCapitalize="none"
              style={{ backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: BORDER, color: "#fff", padding: 14, paddingRight: 44, borderRadius: 12, fontSize: 14 }}
            />
            <TouchableOpacity onPress={() => setShowPw(v => !v)} style={{ position: "absolute", right: 12, top: 14, padding: 4 }}>
              <Text style={{ fontSize: 14, color: GOLD }}>{showPw ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>

          {/* Strength */}
          {form.password ? (
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: "row", gap: 4, marginTop: 4, marginBottom: 4 }}>
                {[1,2,3,4].map(i => (
                  <View key={i} style={{
                    flex: 1, height: 3, borderRadius: 2,
                    backgroundColor: strength >= i ? STRENGTH_COLOR[strength] : BORDER,
                  }} />
                ))}
              </View>
              <Text style={{ color: STRENGTH_COLOR[strength], fontSize: 11 }}>{STRENGTH_LABEL[strength]}</Text>
            </View>
          ) : <View style={{ marginBottom: 8 }} />}

          {/* Confirm */}
          <Text style={{ color: MUTED, fontSize: 10, letterSpacing: 1.5, marginBottom: 6, fontWeight: "700" }}>CONFIRM PASSWORD</Text>
          <View style={{ position: "relative" }}>
            <TextInput
              value={form.confirm} onChangeText={v => set("confirm", v)}
              placeholder="Repeat password" placeholderTextColor="#4B5563"
              secureTextEntry={!showConfirm} autoCapitalize="none"
              style={{
                backgroundColor: "#1A1A1A",
                borderWidth: 1,
                borderColor: confirmOK ? GREEN : BORDER,
                color: "#fff", padding: 14, paddingRight: 60, borderRadius: 12, fontSize: 14,
              }}
            />
            <TouchableOpacity onPress={() => setShowConfirm(v => !v)} style={{ position: "absolute", right: 12, top: 14, padding: 4 }}>
              <Text style={{ fontSize: 14, color: GOLD }}>{showConfirm ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
            {confirmOK ? (
              <Text style={{ position: "absolute", right: 38, top: 16, color: GREEN, fontSize: 16 }}>✓</Text>
            ) : null}
          </View>

          {/* Error */}
          {error ? (
            <View style={{
              backgroundColor: "rgba(248,113,113,0.1)", borderColor: "rgba(248,113,113,0.3)", borderWidth: 1,
              borderRadius: 10, padding: 12, marginTop: 14, flexDirection: "row", alignItems: "center", gap: 8,
            }}>
              <Text style={{ fontSize: 14, color: ERROR }}>!</Text>
              <Text style={{ color: ERROR, fontSize: 13, flex: 1 }}>{error}</Text>
            </View>
          ) : null}

          {/* Submit */}
          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.85}
            style={{
              marginTop: 18, backgroundColor: GOLD, borderRadius: 12, padding: 16,
              alignItems: "center", opacity: loading ? 0.6 : 1,
            }}
          >
            {loading
              ? <ActivityIndicator color={BLACK} />
              : <Text style={{ color: BLACK, fontSize: 15, fontWeight: "800" }}>Create Account →</Text>}
          </TouchableOpacity>

          {/* Sign in */}
          <View style={{ marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: "#1E1E1E", alignItems: "center" }}>
            <Text style={{ color: GRAY, fontSize: 13 }}>
              Already have an account?{" "}
              <Text style={{ color: GOLD, fontWeight: "700" }}
                onPress={() => navigation.navigate("Login")}>
                Sign In →
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
