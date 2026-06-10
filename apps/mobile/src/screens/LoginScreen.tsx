import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { useTheme } from "../lib/ThemeContext";

const GOLD   = "#C9A84C";
const BLACK  = "#09090B";
const CARD   = "#17171A";
const BORDER = "#2A2A30";
const GRAY   = "#6B7280";
const MUTED  = "#9CA3AF";
const ERROR  = "#F87171";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();
  const GOLD = colors.gold, BLACK = colors.black, CARD = colors.darkSurface,
        BORDER = colors.darkBorder, GRAY = colors.gray500, ERROR = colors.red;

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  // Skip login if already logged in
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("ec_user");
        if (stored) {
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Main" }] }));
          return;
        }
        // Also check Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const meta = session.user.user_metadata ?? {};
          const name = [meta.firstName, meta.lastName].filter(Boolean).join(" ") || session.user.email?.split("@")[0] || "User";
          await AsyncStorage.setItem("ec_user", JSON.stringify({
            id: session.user.id, email: session.user.email, name,
          }));
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Main" }] }));
        }
      } catch {}
    })();
  }, [navigation]);

  const handleLogin = async () => {
    setError("");
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      // ── Try Supabase directly first (fastest, most reliable) ─────────────
      const { data, error: sbError } = await supabase.auth.signInWithPassword({
        email:    trimmedEmail,
        password,
      });

      if (!sbError && data?.user) {
        // Success via Supabase directly
        const meta = data.user.user_metadata ?? {};
        const name = [meta.firstName, meta.lastName].filter(Boolean).join(" ")
          || trimmedEmail.split("@")[0];

        await AsyncStorage.setItem("ec_user", JSON.stringify({
          id:    data.user.id,
          email: data.user.email,
          name,
        }));

        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Main" }] }));
        return;
      }

      // ── If Supabase direct login failed, try via API (handles auto-confirm) ─
      const { API_BASE } = await import("../lib/config");
      const res  = await fetch(`${API_BASE}/api/auth/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: trimmedEmail, password }),
      });
      const body = await res.json();

      if (!res.ok) {
        setError(body.error || "Incorrect email or password.");
        return;
      }

      // If API returned a session, set it in Supabase client
      if (body.session?.access_token) {
        await supabase.auth.setSession({
          access_token:  body.session.access_token,
          refresh_token: body.session.refresh_token,
        });
      }

      const meta = body.user?.user_metadata ?? {};
      const name = [meta.firstName, meta.lastName].filter(Boolean).join(" ")
        || trimmedEmail.split("@")[0];

      await AsyncStorage.setItem("ec_user", JSON.stringify({
        id:    body.user?.id ?? null,
        email: trimmedEmail,
        name,
      }));

      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Main" }] }));

    } catch (e: any) {
      // Network / fetch error
      if (e?.message?.includes("Network") || e?.message?.includes("fetch")) {
        setError("Network error — check your internet connection and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: BLACK }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24, paddingTop: 60 }}
        keyboardShouldPersistTaps="handled"
      >

        {/* Logo */}
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <View style={{
            width: 70, height: 70, borderRadius: 35, backgroundColor: GOLD,
            alignItems: "center", justifyContent: "center", marginBottom: 14,
            shadowColor: GOLD, shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.5, shadowRadius: 20, elevation: 12,
          }}>
            <Text style={{ color: BLACK, fontSize: 24, fontWeight: "900" }}>EC</Text>
          </View>
          <Text style={{ color: "#fff", fontSize: 26, fontWeight: "800", letterSpacing: 0.3 }}>
            Elite Chauffeurs
          </Text>
          <Text style={{ color: GOLD, fontSize: 9, letterSpacing: 5, marginTop: 5, textTransform: "uppercase", opacity: 0.8 }}>
            Australia
          </Text>
        </View>

        {/* Card */}
        <View style={{
          backgroundColor: CARD, borderRadius: 24, padding: 24,
          borderWidth: 1, borderColor: BORDER,
          shadowColor: "#000", shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4, shadowRadius: 20, elevation: 10,
        }}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 4 }}>
            Welcome back
          </Text>
          <Text style={{ color: GRAY, fontSize: 13, marginBottom: 28 }}>
            Sign in to manage your premium rides
          </Text>

          {/* Email */}
          <Text style={{ color: MUTED, fontSize: 10, letterSpacing: 1.5, marginBottom: 8, fontWeight: "700" }}>
            EMAIL ADDRESS
          </Text>
          <TextInput
            value={email}
            onChangeText={t => { setEmail(t); if (error) setError(""); }}
            placeholder="you@example.com"
            placeholderTextColor="#3A3A45"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            style={{
              backgroundColor: "#111113", borderWidth: 1,
              borderColor: error ? "rgba(248,113,113,0.4)" : BORDER,
              color: "#fff", padding: 15, borderRadius: 12, fontSize: 15, marginBottom: 18,
            }}
          />

          {/* Password */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <Text style={{ color: MUTED, fontSize: 10, letterSpacing: 1.5, fontWeight: "700" }}>
              PASSWORD
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={{ color: GOLD, fontSize: 12, fontWeight: "600" }}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <View style={{ position: "relative", marginBottom: 6 }}>
            <TextInput
              value={password}
              onChangeText={t => { setPassword(t); if (error) setError(""); }}
              placeholder="••••••••"
              placeholderTextColor="#3A3A45"
              secureTextEntry={!showPw}
              autoCapitalize="none"
              autoComplete="password"
              style={{
                backgroundColor: "#111113", borderWidth: 1,
                borderColor: error ? "rgba(248,113,113,0.4)" : BORDER,
                color: "#fff", padding: 15, paddingRight: 56, borderRadius: 12, fontSize: 15,
              }}
            />
            <TouchableOpacity
              onPress={() => setShowPw(v => !v)}
              style={{ position: "absolute", right: 14, top: 0, bottom: 0, justifyContent: "center", padding: 4 }}
            >
              <Text style={{ fontSize: 13, color: GOLD, fontWeight: "600" }}>{showPw ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>

          {/* Error banner */}
          {!!error && (
            <View style={{
              backgroundColor: "rgba(248,113,113,0.08)", borderColor: "rgba(248,113,113,0.3)",
              borderWidth: 1, borderRadius: 12, padding: 14, marginTop: 14,
              flexDirection: "row", alignItems: "flex-start", gap: 10,
            }}>
              <Text style={{ fontSize: 16, color: ERROR, marginTop: -1 }}>⚠</Text>
              <Text style={{ color: ERROR, fontSize: 13, flex: 1, lineHeight: 18 }}>{error}</Text>
            </View>
          )}

          {/* Submit */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
            style={{
              marginTop: 22, borderRadius: 14, padding: 17,
              alignItems: "center", opacity: loading ? 0.7 : 1,
              backgroundColor: GOLD,
              shadowColor: GOLD, shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4, shadowRadius: 16, elevation: 8,
            }}
          >
            {loading
              ? <ActivityIndicator color={BLACK} />
              : <Text style={{ color: BLACK, fontSize: 15, fontWeight: "900", letterSpacing: 0.5 }}>Sign In →</Text>
            }
          </TouchableOpacity>

          {/* Sign up link */}
          <View style={{ marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: "#1E1E22", alignItems: "center" }}>
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
