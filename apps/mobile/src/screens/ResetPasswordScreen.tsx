import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";

const GOLD   = "#C9A84C";
const BLACK  = "#0A0A0A";
const DARK   = "#111111";
const BORDER = "#2A2A2A";
const GRAY   = "#6B7280";
const MUTED  = "#9CA3AF";
const ERROR  = "#F87171";
const GREEN  = "#34D399";

import { API_BASE } from "../lib/config";

function pwStrength(pw: string): number {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8)        s++;
  if (/[A-Z]/.test(pw))      s++;
  if (/[0-9]/.test(pw))      s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const STRENGTH_COLOR = ["", "#F87171", "#FBBF24", "#34D399", "#10B981"];
const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];

export default function ResetPasswordScreen() {
  const navigation = useNavigation<any>();
  const route      = useRoute<any>();

  const email        = route.params?.email         as string | undefined;
  const accessToken  = route.params?.accessToken  as string | undefined;
  const refreshToken = route.params?.refreshToken as string | undefined;

  const [password,    setPassword]    = useState("");
  const [confirm,     setConfirm]     = useState("");
  const [showPw,      setShowPw]      = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [success,     setSuccess]     = useState(false);

  const handleReset = async () => {
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }

    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/api/auth/reset-password`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, accessToken, refreshToken, newPassword: password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Login" }] }));
      }, 2000);

    } catch {
      setError("Unable to connect. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const strength  = pwStrength(password);
  const confirmOK = confirm && confirm === password;

  if (success) {
    return (
      <View style={{ flex: 1, backgroundColor: BLACK, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <View style={{
          backgroundColor: DARK, borderRadius: 24, padding: 32, borderWidth: 1, borderColor: BORDER,
          alignItems: "center", width: "100%",
        }}>
          <View style={{
            width: 72, height: 72, borderRadius: 36, backgroundColor: "rgba(52,211,153,0.15)",
            alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(52,211,153,0.4)",
            marginBottom: 18,
          }}>
            <Text style={{ fontSize: 36, color: GREEN }}>✓</Text>
          </View>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 8 }}>
            Password Updated!
          </Text>
          <Text style={{ color: GRAY, fontSize: 13, textAlign: "center" }}>
            Redirecting you to sign in…
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1, backgroundColor: BLACK }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}>

        <View style={{ backgroundColor: DARK, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: BORDER }}>

          <View style={{
            width: 52, height: 52, borderRadius: 14, backgroundColor: "rgba(201,168,76,0.12)",
            alignItems: "center", justifyContent: "center", marginBottom: 18,
            borderWidth: 1, borderColor: "rgba(201,168,76,0.2)",
          }}>
            <Text style={{ fontSize: 16, color: GOLD, fontWeight: "700" }}>Secure</Text>
          </View>

          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 6 }}>
            Set New Password
          </Text>
          <Text style={{ color: GRAY, fontSize: 13, marginBottom: 24 }}>
            Choose a strong password to secure your account.
          </Text>

          {/* New password */}
          <Text style={{ color: MUTED, fontSize: 10, letterSpacing: 1.5, marginBottom: 6, fontWeight: "700" }}>NEW PASSWORD</Text>
          <View style={{ position: "relative", marginBottom: 6 }}>
            <TextInput
              value={password} onChangeText={t => { setPassword(t); if (error) setError(""); }}
              placeholder="Min 8 characters" placeholderTextColor="#4B5563"
              secureTextEntry={!showPw} autoCapitalize="none"
              style={{
                backgroundColor: "#1A1A1A",
                borderWidth: 1, borderColor: error ? ERROR : BORDER,
                color: "#fff", padding: 14, paddingRight: 44, borderRadius: 12, fontSize: 14,
              }}
            />
            <TouchableOpacity onPress={() => setShowPw(v => !v)} style={{ position: "absolute", right: 12, top: 14, padding: 4 }}>
              <Text style={{ fontSize: 14, color: GOLD }}>{showPw ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>

          {password ? (
            <View style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: "row", gap: 4, marginBottom: 4 }}>
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
              value={confirm} onChangeText={t => { setConfirm(t); if (error) setError(""); }}
              placeholder="Repeat password" placeholderTextColor="#4B5563"
              secureTextEntry={!showConfirm} autoCapitalize="none"
              style={{
                backgroundColor: "#1A1A1A",
                borderWidth: 1, borderColor: confirmOK ? GREEN : (error ? ERROR : BORDER),
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

          {/* Requirements */}
          <View style={{ backgroundColor: "#1A1A1A", borderColor: BORDER, borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 16 }}>
            <Text style={{ color: GRAY, fontSize: 10, letterSpacing: 1, marginBottom: 8, fontWeight: "700" }}>PASSWORD REQUIREMENTS</Text>
            {[
              { label: "At least 8 characters",       met: password.length >= 8 },
              { label: "One uppercase letter",        met: /[A-Z]/.test(password) },
              { label: "One number",                  met: /[0-9]/.test(password) },
              { label: "One special character",       met: /[^A-Za-z0-9]/.test(password) },
            ].map(({ label, met }) => (
              <View key={label} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <Text style={{ color: met ? GREEN : "#4B5563", fontSize: 12 }}>{met ? "✓" : "○"}</Text>
                <Text style={{ color: met ? MUTED : "#4B5563", fontSize: 12 }}>{label}</Text>
              </View>
            ))}
          </View>

          {/* Error */}
          {error ? (
            <View style={{
              backgroundColor: "rgba(248,113,113,0.1)", borderColor: "rgba(248,113,113,0.3)", borderWidth: 1,
              borderRadius: 10, padding: 12, marginTop: 12, flexDirection: "row", alignItems: "center", gap: 8,
            }}>
              <Text style={{ fontSize: 14, color: ERROR }}>!</Text>
              <Text style={{ color: ERROR, fontSize: 13, flex: 1 }}>{error}</Text>
            </View>
          ) : null}

          {/* Submit */}
          <TouchableOpacity
            onPress={handleReset}
            disabled={loading}
            activeOpacity={0.85}
            style={{
              marginTop: 18, backgroundColor: GOLD, borderRadius: 12, padding: 16,
              alignItems: "center", opacity: loading ? 0.6 : 1,
            }}
          >
            {loading
              ? <ActivityIndicator color={BLACK} />
              : <Text style={{ color: BLACK, fontSize: 15, fontWeight: "800" }}>Update Password →</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
