import React, { useState, useEffect, useRef } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";

const GOLD   = "#C9A84C";
const GOLD2  = "#E8C97A";
const BLACK  = "#0A0A0A";
const DARK   = "#111111";
const BORDER = "#2A2A2A";
const GRAY   = "#6B7280";
const MUTED  = "#9CA3AF";
const ERROR  = "#F87171";
const GREEN  = "#34D399";

import { API_BASE } from "../lib/config";
const OTP_LEN       = 6;
const RESEND_COOLDOWN = 60;

export default function VerifyOTPScreen() {
  const navigation = useNavigation<any>();
  const route      = useRoute<any>();

  const email = route.params?.email as string ?? "";
  const type  = (route.params?.type as "signup" | "recovery") ?? "signup";

  const [digits,    setDigits]    = useState<string[]>(Array(OTP_LEN).fill(""));
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState(false);
  const [cooldown,  setCooldown]  = useState(RESEND_COOLDOWN);
  const [resending, setResending] = useState(false);

  const refs = useRef<(TextInput | null)[]>([]);

  // ── Cooldown timer ────────────────────────────────────────────────────
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // ── Auto-submit when all 6 filled ─────────────────────────────────────
  useEffect(() => {
    if (digits.every(d => d) && !loading && !success) submit(digits.join(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  // ── Submit OTP ────────────────────────────────────────────────────────
  const submit = async (code: string) => {
    if (loading || success) return;
    setLoading(true);
    setError("");

    try {
      const res  = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, token: code, type }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid code. Try again.");
        setDigits(Array(OTP_LEN).fill(""));
        refs.current[0]?.focus();
        return;
      }

      setSuccess(true);

      if (type === "signup") {
        // Promote pending user
        const pending = await AsyncStorage.getItem("ec_pending_user");
        if (pending) {
          await AsyncStorage.setItem("ec_user", pending);
          await AsyncStorage.removeItem("ec_pending_user");
        }
        setTimeout(() => {
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Main" }] }));
        }, 1500);

      } else {
        // recovery → go to reset password
        setTimeout(() => {
          navigation.navigate("ResetPassword", {
            email,
            accessToken:  data.accessToken,
            refreshToken: data.refreshToken,
          });
        }, 1500);
      }

    } catch {
      setError("Unable to connect. Try again.");
      setDigits(Array(OTP_LEN).fill(""));
    } finally {
      setLoading(false);
    }
  };

  // ── Resend ────────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/resend-otp`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, type }),
      });
      if (res.ok) {
        setCooldown(RESEND_COOLDOWN);
        setDigits(Array(OTP_LEN).fill(""));
        refs.current[0]?.focus();
      }
    } catch {}
    finally { setResending(false); }
  };

  // ── Digit input handler ───────────────────────────────────────────────
  const handleChange = (i: number, value: string) => {
    // Only digits, last char
    const d = value.replace(/\D/g, "").slice(-1);
    const next = [...digits]; next[i] = d;
    setDigits(next);
    if (error) setError("");

    if (d && i < OTP_LEN - 1) refs.current[i + 1]?.focus();
    // If user pasted multiple chars, distribute
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, "").slice(0, OTP_LEN);
      const arr = Array(OTP_LEN).fill("");
      pasted.split("").forEach((ch, idx) => { arr[idx] = ch; });
      setDigits(arr);
      refs.current[Math.min(pasted.length - 1, OTP_LEN - 1)]?.focus();
    }
  };

  const handleKeyPress = (i: number, key: string) => {
    if (key === "Backspace" && !digits[i] && i > 0) {
      const next = [...digits]; next[i - 1] = "";
      setDigits(next);
      refs.current[i - 1]?.focus();
    }
  };

  const maskedEmail = email
    ? email.replace(/^(.{2})(.*)(@.*)$/, (_, a, b, c) => a + "*".repeat(Math.max(2, b.length)) + c)
    : "";

  // ── Success screen ────────────────────────────────────────────────────
  if (success) {
    return (
      <View style={{ flex: 1, backgroundColor: BLACK, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <View style={{ backgroundColor: DARK, borderRadius: 24, padding: 32, borderWidth: 1, borderColor: BORDER, alignItems: "center", width: "100%" }}>
          <View style={{
            width: 72, height: 72, borderRadius: 36, backgroundColor: "rgba(52,211,153,0.15)",
            alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(52,211,153,0.4)",
            marginBottom: 18,
          }}>
            <Text style={{ fontSize: 36, color: GREEN }}>✓</Text>
          </View>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 8 }}>
            {type === "signup" ? "Email Verified!" : "Identity Confirmed!"}
          </Text>
          <Text style={{ color: GRAY, fontSize: 13, textAlign: "center" }}>
            {type === "signup" ? "Taking you to your dashboard…" : "Taking you to set new password…"}
          </Text>
        </View>
      </View>
    );
  }

  // ── Main screen ───────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1, backgroundColor: BLACK }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 18 }}>
          <Text style={{ color: GRAY, fontSize: 13 }}>← Wrong email? Go back</Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: DARK, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: BORDER }}>

          <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 14, marginBottom: 24 }}>
            <View style={{
              width: 52, height: 52, borderRadius: 14, backgroundColor: "rgba(201,168,76,0.12)",
              alignItems: "center", justifyContent: "center",
              borderWidth: 1, borderColor: "rgba(201,168,76,0.2)",
            }}>
              <Text style={{ fontSize: 14, color: GOLD, fontWeight: "700" }}>{type === "signup" ? "Email" : "OTP"}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#fff", fontSize: 19, fontWeight: "700", marginBottom: 4 }}>
                {type === "signup" ? "Verify Your Email" : "Enter Your OTP"}
              </Text>
              <Text style={{ color: GRAY, fontSize: 12, lineHeight: 17 }}>
                We sent a 6-digit code{type === "signup" ? " to confirm your account." : " to reset your password."}
              </Text>
            </View>
          </View>

          {/* Email */}
          <View style={{
            flexDirection: "row", alignItems: "center", gap: 10,
            backgroundColor: "#1A1A1A", padding: 12, borderRadius: 12, borderWidth: 1, borderColor: BORDER,
            marginBottom: 24,
          }}>
            <Text style={{ fontSize: 12, color: GOLD, fontWeight: "600" }}>To</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#4B5563", fontSize: 9, letterSpacing: 1, marginBottom: 1 }}>CODE SENT TO</Text>
              <Text style={{ color: GOLD, fontSize: 13, fontWeight: "600" }} numberOfLines={1}>{maskedEmail}</Text>
            </View>
          </View>

          {/* OTP boxes */}
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: 20 }}>
            {digits.map((d, i) => (
              <TextInput
                key={i}
                ref={el => { refs.current[i] = el; }}
                value={d}
                onChangeText={v => handleChange(i, v)}
                onKeyPress={e => handleKeyPress(i, e.nativeEvent.key)}
                keyboardType="number-pad"
                maxLength={i === 0 ? OTP_LEN : 1}  // first box accepts paste of full code
                editable={!loading}
                selectTextOnFocus
                style={{
                  width: 46, height: 56, textAlign: "center", fontSize: 22, fontWeight: "800",
                  backgroundColor: d ? "rgba(201,168,76,0.1)" : "#1A1A1A",
                  borderWidth: 2,
                  borderColor: error ? "rgba(248,113,113,0.5)" : d ? GOLD : BORDER,
                  borderRadius: 12,
                  color: d ? GOLD2 : "#fff",
                }}
              />
            ))}
          </View>

          {/* Error */}
          {error ? (
            <View style={{
              backgroundColor: "rgba(248,113,113,0.1)", borderColor: "rgba(248,113,113,0.3)", borderWidth: 1,
              borderRadius: 10, padding: 12, marginBottom: 14, flexDirection: "row", alignItems: "center", gap: 8,
            }}>
              <Text style={{ fontSize: 14, color: ERROR }}>!</Text>
              <Text style={{ color: ERROR, fontSize: 13, flex: 1 }}>{error}</Text>
            </View>
          ) : null}

          {/* Submit */}
          <TouchableOpacity
            onPress={() => submit(digits.join(""))}
            disabled={digits.filter(Boolean).length < OTP_LEN || loading}
            activeOpacity={0.85}
            style={{
              backgroundColor: GOLD, borderRadius: 12, padding: 16, alignItems: "center",
              opacity: (digits.filter(Boolean).length < OTP_LEN || loading) ? 0.4 : 1,
            }}
          >
            {loading
              ? <ActivityIndicator color={BLACK} />
              : <Text style={{ color: BLACK, fontSize: 15, fontWeight: "800" }}>
                  Verify Code {digits.filter(Boolean).length > 0 ? `(${digits.filter(Boolean).length}/${OTP_LEN})` : "→"}
                </Text>}
          </TouchableOpacity>

          {/* Resend */}
          <View style={{ marginTop: 20, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#1E1E1E", alignItems: "center" }}>
            {cooldown > 0 ? (
              <Text style={{ color: "#4B5563", fontSize: 13 }}>
                Resend code in <Text style={{ fontWeight: "800" }}>
                  {String(Math.floor(cooldown / 60)).padStart(2, "0")}:{String(cooldown % 60).padStart(2, "0")}
                </Text>
              </Text>
            ) : (
              <Text style={{ color: GRAY, fontSize: 13 }}>
                Didn&apos;t receive it?{" "}
                <Text style={{ color: GOLD, fontWeight: "700" }} onPress={handleResend}>
                  {resending ? "Sending…" : "Resend now"}
                </Text>
              </Text>
            )}
          </View>
        </View>

        <Text style={{ color: "#374151", fontSize: 11, textAlign: "center", marginTop: 18 }}>
          Codes expire after 10 minutes. Check spam if not received.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
