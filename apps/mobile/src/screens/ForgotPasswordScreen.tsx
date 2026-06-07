import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const GOLD   = "#C9A84C";
const BLACK  = "#0A0A0A";
const DARK   = "#111111";
const BORDER = "#2A2A2A";
const GRAY   = "#6B7280";
const MUTED  = "#9CA3AF";
const ERROR  = "#F87171";

import { API_BASE } from "../lib/config";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<any>();

  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }

      navigation.navigate("VerifyOTP", { email: email.trim(), type: "recovery" });

    } catch {
      setError("Unable to connect. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1, backgroundColor: BLACK }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}>

        {/* Back */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 24 }}>
          <Text style={{ color: GOLD, fontSize: 14 }}>← Back to Sign In</Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: DARK, borderRadius: 24, padding: 28, borderWidth: 1, borderColor: BORDER }}>

          {/* Icon */}
          <View style={{
            width: 56, height: 56, borderRadius: 16, backgroundColor: "rgba(201,168,76,0.12)",
            alignItems: "center", justifyContent: "center", marginBottom: 18,
            borderWidth: 1, borderColor: "rgba(201,168,76,0.2)",
          }}>
            <Text style={{ fontSize: 18, color: GOLD, fontWeight: "700" }}>Reset</Text>
          </View>

          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 8 }}>
            Forgot your password?
          </Text>
          <Text style={{ color: GRAY, fontSize: 13, lineHeight: 19, marginBottom: 24 }}>
            No worries — enter your email and we&apos;ll send a 6-digit code to reset your password.
          </Text>

          {/* Email */}
          <Text style={{ color: MUTED, fontSize: 10, letterSpacing: 1.5, marginBottom: 6, fontWeight: "700" }}>
            EMAIL ADDRESS
          </Text>
          <TextInput
            value={email}
            onChangeText={t => { setEmail(t); if (error) setError(""); }}
            placeholder="you@example.com" placeholderTextColor="#4B5563"
            keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
            style={{
              backgroundColor: "#1A1A1A",
              borderWidth: 1, borderColor: error ? ERROR : BORDER,
              color: "#fff", padding: 14, borderRadius: 12, fontSize: 14,
            }}
          />

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
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.85}
            style={{
              marginTop: 20, backgroundColor: GOLD, borderRadius: 12, padding: 16,
              alignItems: "center", opacity: loading ? 0.6 : 1,
            }}
          >
            {loading
              ? <ActivityIndicator color={BLACK} />
              : <Text style={{ color: BLACK, fontSize: 15, fontWeight: "800" }}>Send Code →</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
