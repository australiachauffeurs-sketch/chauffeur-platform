import React, { useState, useEffect, useRef } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator, StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import { API_BASE } from "../lib/config";

const GOLD   = "#C9A84C";
const BLACK  = "#09090B";
const CARD   = "#17171A";
const BORDER = "#2A2A30";
const GRAY   = "#6B7280";
const ERROR  = "#F87171";
const GREEN  = "#4ADE80";
const OTP_LEN = 6;
const RESEND_COOLDOWN = 60;

export default function VerifyOTPScreen() {
  const navigation = useNavigation<any>();
  const route      = useRoute<any>();
  const email      = route.params?.email as string ?? "";
  const type       = (route.params?.type as "signup" | "recovery") ?? "signup";

  const [digits,    setDigits]    = useState<string[]>(Array(OTP_LEN).fill(""));
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState(false);
  const [cooldown,  setCooldown]  = useState(RESEND_COOLDOWN);
  const [resending, setResending] = useState(false);
  const refs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  useEffect(() => {
    if (digits.every(d => d) && !loading && !success) submit(digits.join(""));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  const submit = async (code: string) => {
    if (loading || success) return;
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token: code, type }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid code. Please try again.");
        setDigits(Array(OTP_LEN).fill(""));
        refs.current[0]?.focus();
        return;
      }
      setSuccess(true);
      if (type === "signup") {
        const pending = await AsyncStorage.getItem("ec_pending_user");
        if (pending) {
          await AsyncStorage.setItem("ec_user", pending);
          await AsyncStorage.removeItem("ec_pending_user");
        }
        setTimeout(() => {
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Main" }] }));
        }, 1200);
      } else {
        setTimeout(() => {
          navigation.navigate("ResetPassword", {
            email,
            accessToken:  data.accessToken  || "",
            refreshToken: data.refreshToken || "",
          });
        }, 800);
      }
    } catch {
      setError("Network error — check your connection and try again.");
    } finally { setLoading(false); }
  };

  const handleDigit = (val: string, i: number) => {
    const cleaned = val.replace(/[^0-9]/g, "").slice(-1);
    const next    = [...digits];
    next[i]       = cleaned;
    setDigits(next);
    if (error) setError("");
    if (cleaned && i < OTP_LEN - 1) refs.current[i + 1]?.focus();
  };

  const handleKey = (e: any, i: number) => {
    if (e.nativeEvent.key === "Backspace" && !digits[i] && i > 0) {
      const next = [...digits]; next[i - 1] = "";
      setDigits(next);
      refs.current[i - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setError("");
    try {
      const endpoint = type === "signup"
        ? `${API_BASE}/api/auth/resend-otp`
        : `${API_BASE}/api/auth/forgot-password`;
      await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setCooldown(RESEND_COOLDOWN);
      setDigits(Array(OTP_LEN).fill(""));
      refs.current[0]?.focus();
    } catch {
      setError("Failed to resend code. Try again.");
    } finally { setResending(false); }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: BLACK }}
    >
      <StatusBar barStyle="light-content" backgroundColor={BLACK} />
      <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>

        {/* Back */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 32 }}>
          <Text style={{ color: GOLD, fontSize: 15, fontWeight: "600" }}>← Back</Text>
        </TouchableOpacity>

        {/* Success state */}
        {success ? (
          <View style={{ alignItems: "center" }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(74,222,128,0.1)",
              borderWidth: 2, borderColor: "rgba(74,222,128,0.4)", justifyContent: "center",
              alignItems: "center", marginBottom: 20 }}>
              <Text style={{ fontSize: 36 }}>✓</Text>
            </View>
            <Text style={{ color: "#fff", fontSize: 24, fontWeight: "800", marginBottom: 8 }}>Verified!</Text>
            <Text style={{ color: GRAY, fontSize: 14 }}>
              {type === "signup" ? "Account confirmed. Taking you in…" : "Redirecting to reset password…"}
            </Text>
          </View>
        ) : (
          <View style={{ backgroundColor: CARD, borderRadius: 24, padding: 28,
            borderWidth: 1, borderColor: BORDER,
            shadowColor: "#000", shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 }}>

            {/* Icon */}
            <View style={{ width: 60, height: 60, borderRadius: 18,
              backgroundColor: "rgba(201,168,76,0.1)", borderWidth: 1,
              borderColor: "rgba(201,168,76,0.25)", justifyContent: "center",
              alignItems: "center", marginBottom: 20 }}>
              <Text style={{ fontSize: 28 }}>✉️</Text>
            </View>

            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 6 }}>
              {type === "signup" ? "Verify your email" : "Check your email"}
            </Text>
            <Text style={{ color: GRAY, fontSize: 13, lineHeight: 20, marginBottom: 14 }}>
              We sent a 6-digit code to{"\n"}
              <Text style={{ color: GOLD, fontWeight: "600" }}>{email}</Text>
            </Text>

            {/* Spam folder hint */}
            <View style={{ backgroundColor: "rgba(201,168,76,0.08)", borderColor: "rgba(201,168,76,0.25)",
              borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 22,
              flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
              <Text style={{ fontSize: 14 }}>💡</Text>
              <Text style={{ color: GRAY, fontSize: 12, lineHeight: 17, flex: 1 }}>
                Can't find it? Check your <Text style={{ color: GOLD, fontWeight: "700" }}>Spam</Text> or{" "}
                <Text style={{ color: GOLD, fontWeight: "700" }}>Junk</Text> folder — and mark it "Not spam" so future codes arrive in your inbox.
              </Text>
            </View>

            {/* OTP Boxes */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 24, gap: 8 }}>
              {digits.map((d, i) => (
                <TextInput
                  key={i}
                  ref={r => { refs.current[i] = r; }}
                  value={d}
                  onChangeText={v => handleDigit(v, i)}
                  onKeyPress={e => handleKey(e, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  style={{
                    flex: 1, height: 56, borderRadius: 14, textAlign: "center",
                    fontSize: 22, fontWeight: "900", color: "#fff",
                    backgroundColor: "#111113",
                    borderWidth: 2,
                    borderColor: d ? GOLD : error ? "rgba(248,113,113,0.5)" : BORDER,
                  }}
                />
              ))}
            </View>

            {/* Loading */}
            {loading && (
              <View style={{ alignItems: "center", marginBottom: 16 }}>
                <ActivityIndicator color={GOLD} />
                <Text style={{ color: GRAY, fontSize: 12, marginTop: 6 }}>Verifying…</Text>
              </View>
            )}

            {/* Error */}
            {!!error && (
              <View style={{ backgroundColor: "rgba(248,113,113,0.08)", borderColor: "rgba(248,113,113,0.3)",
                borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 16,
                flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={{ fontSize: 16, color: ERROR }}>⚠</Text>
                <Text style={{ color: ERROR, fontSize: 13, flex: 1 }}>{error}</Text>
              </View>
            )}

            {/* Resend */}
            <View style={{ alignItems: "center" }}>
              {cooldown > 0 ? (
                <Text style={{ color: GRAY, fontSize: 13 }}>
                  Resend code in <Text style={{ color: GOLD, fontWeight: "700" }}>{cooldown}s</Text>
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResend} disabled={resending}>
                  {resending
                    ? <ActivityIndicator color={GOLD} size="small" />
                    : <Text style={{ color: GOLD, fontSize: 14, fontWeight: "700" }}>Resend Code</Text>
                  }
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
