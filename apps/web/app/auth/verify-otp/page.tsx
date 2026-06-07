"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // seconds

function VerifyOTPForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";
  const type  = (searchParams.get("type") ?? "signup") as "signup" | "recovery";

  // ── State ──────────────────────────────────────────────────────────────────
  const [digits,    setDigits]    = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState(false);
  const [cooldown,  setCooldown]  = useState(RESEND_COOLDOWN);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const [shaking,   setShaking]   = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ── Resend cooldown timer ──────────────────────────────────────────────────
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // ── Focus first box on mount ───────────────────────────────────────────────
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // ── Auto-submit when all digits filled ────────────────────────────────────
  useEffect(() => {
    if (digits.every(d => d !== "") && !loading && !success) {
      submitOTP(digits.join(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  // ── Shake animation on error ───────────────────────────────────────────────
  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const submitOTP = useCallback(async (code: string) => {
    if (loading || success) return;
    setLoading(true);
    setError("");

    try {
      const res  = await fetch("/api/auth/verify-otp", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, token: code, type }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid code. Please try again.");
        setDigits(Array(OTP_LENGTH).fill(""));
        triggerShake();
        setTimeout(() => inputRefs.current[0]?.focus(), 50);
        return;
      }

      setSuccess(true);

      if (type === "signup") {
        // Promote pending user to active session in localStorage + cookie
        const pending = localStorage.getItem("ec_pending_user");
        if (pending) {
          localStorage.setItem("ec_user", pending);
          localStorage.removeItem("ec_pending_user");
          // Set cookie so middleware can verify auth on server-side navigation
          document.cookie = `ec_user=${encodeURIComponent(pending)}; path=/; max-age=${60 * 60 * 24 * 7}`;
        }
        setTimeout(() => router.push("/dashboard"), 1500);

      } else if (type === "recovery") {
        // Recovery: redirect to reset-password with tokens in hash
        const hash = `#access_token=${data.accessToken}&refresh_token=${data.refreshToken}&type=recovery&email=${encodeURIComponent(email)}`;
        setTimeout(() => router.push(`/auth/reset-password${hash}`), 1500);
      }

    } catch {
      setError("Unable to connect. Please check your internet and try again.");
      setDigits(Array(OTP_LENGTH).fill(""));
      triggerShake();
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    } finally {
      setLoading(false);
    }
  }, [email, type, loading, success, router]);

  // ── Input handlers ─────────────────────────────────────────────────────────
  const handleChange = (index: number, value: string) => {
    // Accept only digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const next  = [...digits];
    next[index] = digit;
    setDigits(next);
    setError("");

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        // Clear current box
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        // Move back and clear previous
        const next = [...digits];
        next[index - 1] = "";
        setDigits(next);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "Enter") {
      const code = digits.join("");
      if (code.length === OTP_LENGTH) submitOTP(code);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    setError("");
    // Focus last filled box or submit
    const lastIndex = Math.min(pasted.length - 1, OTP_LENGTH - 1);
    inputRefs.current[lastIndex]?.focus();
  };

  // ── Resend OTP ─────────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setResendMsg("");
    setError("");

    try {
      const res  = await fetch("/api/auth/resend-otp", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, type }),
      });
      const data = await res.json();

      if (res.ok) {
        setCooldown(RESEND_COOLDOWN);
        setDigits(Array(OTP_LENGTH).fill(""));
        setResendMsg("New code sent!");
        setTimeout(() => { setResendMsg(""); inputRefs.current[0]?.focus(); }, 3000);
      } else {
        setResendMsg(data.error || "Failed to resend. Please try again.");
      }
    } catch {
      setResendMsg("Unable to connect. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const filledCount = digits.filter(Boolean).length;
  const maskedEmail = email
    ? email.replace(/^(.{2})(.*)(@.*)$/, (_, a, b, c) => a + "*".repeat(Math.max(2, b.length)) + c)
    : "";

  // ── Success state ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
        <div className="w-full max-w-md rounded-3xl p-10 text-center shadow-2xl"
          style={{ background: "#111", border: "1px solid #222" }}>
          {/* Animated checkmark */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(52,211,153,0.12)", border: "2px solid rgba(52,211,153,0.5)" }}>
            <svg viewBox="0 0 52 52" className="w-10 h-10" style={{ color: "#34D399" }}>
              <circle cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
              <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                d="M14 27l8 8 16-16" />
            </svg>
          </div>
          <h2 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>
            {type === "signup" ? "Email Verified!" : "Identity Confirmed!"}
          </h2>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            {type === "signup"
              ? "Your account is ready. Taking you to your dashboard…"
              : "Redirecting you to set your new password…"}
          </p>
          {/* Progress bar */}
          <div className="mt-6 h-1 rounded-full overflow-hidden" style={{ background: "#1A1A1A" }}>
            <div className="h-full rounded-full animate-[grow_1.5s_ease-in-out]"
              style={{ background: "linear-gradient(90deg,#C9A84C,#E8C97A)", width: "100%" }} />
          </div>
        </div>
      </div>
    );
  }

  // ── Main OTP form ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
      {/* BG glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)" }} />
      </div>

      <div className="relative w-full max-w-[440px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
              EC
            </div>
            <span className="text-white text-xl font-bold" style={{ fontFamily: "'Playfair Display',serif" }}>
              Elite Chauffeurs
            </span>
          </Link>
        </div>

        <div className="rounded-3xl p-8 shadow-2xl" style={{ background: "#111", border: "1px solid #222" }}>

          {/* Icon + heading */}
          <div className="flex items-start gap-4 mb-7">
            <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl"
              style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}>
              {type === "signup" ? <svg className="w-7 h-7 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg> : <svg className="w-7 h-7 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>}
            </div>
            <div>
              <h1 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display',serif" }}>
                {type === "signup" ? "Verify Your Email" : "Enter Your OTP"}
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                {type === "signup"
                  ? "We sent a 6-digit code to confirm your account."
                  : "We sent a 6-digit code to reset your password."}
              </p>
            </div>
          </div>

          {/* Email display */}
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-7"
            style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}>
            <svg className="w-5 h-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide mb-0.5" style={{ color: "#4B5563" }}>Code sent to</p>
              <p className="text-sm font-medium truncate" style={{ color: "#C9A84C" }}>{maskedEmail || email}</p>
            </div>
          </div>

          {/* 6-digit OTP boxes */}
          <div
            className={`flex gap-3 justify-center mb-2 transition-transform ${shaking ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
            onPaste={handlePaste}
          >
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                onFocus={e => e.target.select()}
                disabled={loading}
                aria-label={`OTP digit ${i + 1}`}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl outline-none transition-all duration-150 select-none disabled:opacity-50"
                style={{
                  background:  digit ? "rgba(201,168,76,0.08)" : "#1A1A1A",
                  border:      `2px solid ${
                    error   ? "rgba(248,113,113,0.5)"  :
                    digit   ? "#C9A84C"                :
                    document.activeElement === inputRefs.current[i] ? "rgba(201,168,76,0.5)" :
                    "#2A2A2A"
                  }`,
                  color:       digit ? "#E8C97A" : "#6B7280",
                  caretColor:  "#C9A84C",
                }}
              />
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mb-6">
            {digits.map((d, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                style={{ background: d ? "#C9A84C" : "#2A2A2A" }} />
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl px-4 py-3 mb-5 text-sm flex items-center gap-2.5"
              style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", color: "#F87171" }}>
              <span className="flex-shrink-0 font-bold">!</span>
              <span>{error}</span>
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={() => submitOTP(digits.join(""))}
            disabled={filledCount < OTP_LENGTH || loading}
            className="w-full font-bold py-4 rounded-xl text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}
          >
            {loading
              ? <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 rounded-full animate-spin"
                    style={{ borderColor: "rgba(0,0,0,0.25)", borderTopColor: "#0A0A0A" }} />
                  Verifying…
                </span>
              : `Verify Code ${filledCount > 0 ? `(${filledCount}/${OTP_LENGTH})` : "→"}`}
          </button>

          {/* Resend section */}
          <div className="mt-6 pt-5 text-center" style={{ borderTop: "1px solid #1E1E1E" }}>
            {resendMsg ? (
              <p className="text-sm" style={{ color: resendMsg.includes("sent") ? "#34D399" : "#F87171" }}>
                {resendMsg}
              </p>
            ) : cooldown > 0 ? (
              <p className="text-sm" style={{ color: "#4B5563" }}>
                Resend code in{" "}
                <span className="font-mono font-bold tabular-nums" style={{ color: "#6B7280" }}>
                  {String(Math.floor(cooldown / 60)).padStart(2, "0")}:{String(cooldown % 60).padStart(2, "0")}
                </span>
              </p>
            ) : (
              <p className="text-sm" style={{ color: "#6B7280" }}>
                Didn&apos;t receive the code?{" "}
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="font-semibold hover:underline disabled:opacity-50 transition-opacity"
                  style={{ color: "#C9A84C" }}
                >
                  {resending ? "Sending…" : "Resend now"}
                </button>
              </p>
            )}
          </div>

          {/* Back link */}
          <div className="mt-4 text-center">
            <Link
              href={type === "signup" ? "/auth/signup" : "/auth/forgot-password"}
              className="text-xs hover:underline transition-opacity hover:opacity-80"
              style={{ color: "#374151" }}
            >
              ← Wrong email? Go back
            </Link>
          </div>
        </div>

        {/* Help text */}
        <p className="text-center mt-5 text-xs px-4" style={{ color: "#374151" }}>
          Check your spam folder if you don&apos;t see the email.
          Codes expire after <span style={{ color: "#4B5563" }}>10 minutes</span>.
        </p>
      </div>

      {/* Shake + grow keyframes injected inline */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-6px); }
          30%       { transform: translateX(6px); }
          45%       { transform: translateX(-4px); }
          60%       { transform: translateX(4px); }
          75%       { transform: translateX(-2px); }
          90%       { transform: translateX(2px); }
        }
        @keyframes grow {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense>
      <VerifyOTPForm />
    </Suspense>
  );
}
