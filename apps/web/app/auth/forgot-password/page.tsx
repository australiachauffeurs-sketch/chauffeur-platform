"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Stage = "form" | "sent";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [stage,   setStage]   = useState<Stage>("form");

  const validate = () => {
    if (!email) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    setError("");

    try {
      const res  = await fetch("/api/auth/forgot-password", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      // Redirect to OTP page
      router.push(`/auth/verify-otp?email=${encodeURIComponent(email.trim())}&type=recovery`);
    } catch {
      setError("Unable to connect. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  // ── Sent confirmation ──────────────────────────────────────────────────────
  if (stage === "sent") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
        <div className="w-full max-w-md rounded-3xl p-10 text-center shadow-2xl"
          style={{ background: "#111", border: "1px solid #222" }}>

          {/* Animated envelope icon */}
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(201,168,76,0.1)", border: "2px solid rgba(201,168,76,0.35)" }}>
            <svg className="w-10 h-10 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
          </div>

          <h2 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>
            Check Your Email
          </h2>

          <p className="text-sm mb-2" style={{ color: "#9CA3AF" }}>
            We&apos;ve sent a password reset link to
          </p>
          <p className="font-semibold text-base mb-6" style={{ color: "#C9A84C" }}>{email}</p>

          <div className="rounded-2xl p-4 mb-7 text-left space-y-2"
            style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#6B7280" }}>
              What to do next
            </p>
            {[
              "Open the email from Elite Chauffeurs",
              'Click the "Reset Password" link',
              "Choose a new secure password",
              "Sign in with your new password",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}>
                  {i + 1}
                </span>
                <span className="text-sm" style={{ color: "#9CA3AF" }}>{step}</span>
              </div>
            ))}
          </div>

          <p className="text-xs mb-6" style={{ color: "#4B5563" }}>
            The link expires in <span style={{ color: "#C9A84C" }}>1 hour</span>.
            Didn&apos;t receive it? Check your spam folder.
          </p>

          <div className="space-y-3">
            <Link href="/auth/login"
              className="block w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
              Back to Sign In →
            </Link>
            <button onClick={() => { setStage("form"); setError(""); }}
              className="block w-full py-3 rounded-xl text-sm transition-all hover:opacity-80"
              style={{ background: "transparent", border: "1px solid #2A2A2A", color: "#6B7280" }}>
              Resend with different email
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Request form ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
      {/* BG glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-[420px]">
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
          {/* Lock icon */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}>
            <svg className="w-6 h-6 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/></svg>
          </div>

          <h1 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>
            Forgot your password?
          </h1>
          <p className="text-sm mb-7" style={{ color: "#6B7280" }}>
            No worries — enter your email and we&apos;ll send you a secure reset link.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: "#9CA3AF" }}>
                Email Address
              </label>
              <input
                id="email" type="email" autoComplete="email"
                value={email}
                onChange={e => { setEmail(e.target.value); if (error) setError(""); }}
                placeholder="you@example.com"
                className="w-full rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all"
                style={{ background: "#1A1A1A", border: `1px solid ${error ? "#F87171" : "#2A2A2A"}` }}
                onFocus={e  => { e.target.style.borderColor = error ? "#F87171" : "#C9A84C"; }}
                onBlur={e   => { e.target.style.borderColor = error ? "#F87171" : "#2A2A2A"; }}
              />
              {error && <p className="mt-1.5 text-xs" style={{ color: "#F87171" }}>! {error}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full font-bold py-4 rounded-xl text-base transition-all duration-200 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{ borderColor: "rgba(0,0,0,0.25)", borderTopColor: "#0A0A0A" }} />
                    Sending…
                  </span>
                : "Send Reset Link →"}
            </button>
          </form>

          <div className="mt-6 pt-6 text-center" style={{ borderTop: "1px solid #222" }}>
            <Link href="/auth/login" className="text-sm hover:underline" style={{ color: "#C9A84C" }}>
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
