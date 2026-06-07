import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, CommonActions } from "@react-navigation/native";

const GOLD   = "#C9A84C";
const GOLD2  = "#E8C97A";
const BLACK  = "#0A0A0A";
const DARK   = "#111111";
const BORDER = "#2A2A2A";
const GRAY   = "#6B7280";
const MUTED  = "#9CA3AF";
const ERROR  = "#F87171";

import { API_BASE } from "../lib/config";

export default function LoginScreen() {
  const navigation = useNavigation<any>();

  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [showPw,    setShowPw]    = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  // ── Skip login if already logged in ─────────────────────────────────────
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("ec_user");
      if (stored) {
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Main" }] }));
      }
    })();
  }, [navigation]);

  // ── Submit ──────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    setError("");
    if (!email || !email.includes("@")) { setError("Please enter a valid email."); return; }
    if (!password || password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/api/auth/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password.");
        return;
      }

      const meta = data.user?.user_metadata ?? {};
      const name = [meta.firstName, meta.lastName].filter(Boolean).join(" ") || email.split("@")[0];

      await AsyncStorage.setItem("ec_user", JSON.stringify({
        name, email, id: data.user?.id ?? null,
      }));

      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Main" }] }));

    } catch (e: any) {
      setError("Unable to connect. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: BLACK }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24, paddingTop: 60 }}>

        {/* Logo */}
        <View style={{ alignItems: "center", marginBottom: 36 }}>
          <View style={{
            width: 64, height: 64, borderRadius: 32, backgroundColor: GOLD,
            alignItems: "center", justifyContent: "center", marginBottom: 12,
          }}>
            <Text style={{ color: BLACK, fontSize: 22, fontWeight: "900" }}>EC</Text>
          </View>
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>Elite Chauffeurs</Text>
          <Text style={{ color: GOLD, fontSize: 10, letterSpacing: 4, marginTop: 4, textTransform: "uppercase" }}>
            Australia
          </Text>
        </View>

        {/* Card */}
        <View style={{
          backgroundColor: DARK, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: BORDER,
        }}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 4 }}>
            Welcome back
          </Text>
          <Text style={{ color: GRAY, fontSize: 13, marginBottom: 24 }}>
            Sign in to manage your premium rides
          </Text>

          {/* Email */}
          <Text style={{ color: MUTED, fontSize: 10, letterSpacing: 1.5, marginBottom: 6, fontWeight: "700" }}>
            EMAIL ADDRESS
          </Text>
          <TextInput
            value={email}
            onChangeText={t => { setEmail(t); if (error) setError(""); }}
            placeholder="you@example.com"
            placeholderTextColor="#4B5563"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={{
              backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: BORDER,
              color: "#fff", padding: 14, borderRadius: 12, fontSize: 14, marginBottom: 16,
            }}
          />

          {/* Password */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <Text style={{ color: MUTED, fontSize: 10, letterSpacing: 1.5, fontWeight: "700" }}>
              PASSWORD
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={{ color: GOLD, fontSize: 11, fontWeight: "600" }}>Forgot?</Text>
            </TouchableOpacity>
          </View>

          <View style={{ position: "relative", marginBottom: 6 }}>
            <TextInput
              value={password}
              onChangeText={t => { setPassword(t); if (error) setError(""); }}
              placeholder="••••••••"
              placeholderTextColor="#4B5563"
              secureTextEntry={!showPw}
              autoCapitalize="none"
              style={{
                backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: BORDER,
                color: "#fff", padding: 14, paddingRight: 44, borderRadius: 12, fontSize: 14,
              }}
            />
            <TouchableOpacity
              onPress={() => setShowPw(v => !v)}
              style={{ position: "absolute", right: 12, top: 14, padding: 4 }}
            >
              <Text style={{ fontSize: 14, color: GOLD }}>{showPw ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
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
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
            style={{
              marginTop: 20, backgroundColor: GOLD, borderRadius: 12, padding: 16,
              alignItems: "center", opacity: loading ? 0.6 : 1,
            }}
          >
            {loading
              ? <ActivityIndicator color={BLACK} />
              : <Text style={{ color: BLACK, fontSize: 15, fontWeight: "800" }}>Sign In →</Text>}
          </TouchableOpacity>

          {/* Divider */}
          <View style={{ marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: "#1E1E1E", alignItems: "center" }}>
            <Text style={{ color: GRAY, fontSize: 13 }}>
              Don&apos;t have an account?{" "}
              <Text style={{ color: GOLD, fontWeight: "700" }}
                onPress={() => navigation.navigate("Signup")}>
                Create one →
              </Text>
            </Text>
          </View>
        </View>

        <Text style={{ color: "#374151", fontSize: 11, textAlign: "center", marginTop: 24 }}>
          By signing in you agree to our Terms & Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
