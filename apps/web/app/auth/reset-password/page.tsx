"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function pwStrength(pw: string): number {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8)       s++;
  if (/[A-Z]/.test(pw))     s++;
  if (/[0-9]/.test(pw))     s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["", "#F87171", "#FBBF24", "#34D399", "#10B981"];

type Stage = "loading" | "invalid" | "form" | "success";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [stage,        setStage]        = useState<Stage>("loading");
  const [email,        setEmail]        = useState("");
  const [accessToken,  setAccessToken]  = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [password,     setPassword]     = useState("");
  const [confirm,      setConfirm]      = useState("");
  const [showPw,       setShowPw]       = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState("");
  const [pwError,      setPwError]      = useState("");
  const [cfError,      setCfError]      = useState("");

  // ── Extract tokens from URL hash on mount ─────────────────────────────────
  useEffect(() => {
    const hash   = window.location.hash.substring(1);  // strip leading #
    const params = new URLSearchParams(hash);

    const type    = params.get("type");
    const access  = params.get("access_token");
    const refresh = params.get("refresh_token");

    // Also handle query string format (some Supabase versions)
    const qParams  = new URLSearchParams(window.location.search);
    const qType    = qParams.get("type");
    const qAccess  = qParams.get("access_token");
    const qRefresh = qParams.get("refresh_token");

    const finalType    = type    || qType;
    const finalAccess  = access  || qAccess  || "";
    const finalRefresh = refresh || qRefresh || "";

    const qEmail   = qParams.get("email") || params.get("email") || "";

    if (finalType === "recovery" && finalAccess) {
      setAccessToken(finalAccess);
      setRefreshToken(finalRefresh);
      setEmail(qEmail);
      setStage("form");
      // Clean the tokens from the URL so they're not visible
      window.history.replaceState({}, "", window.location.pathname);
    } else {
      // No valid token — maybe landed here directly
      setStage("invalid");
    }
  }, []);

  // ── Validate ───────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    let ok = true;
    if (!password || password.length < 8) {
      setPwError("Password must be at least 8 characters.");
      ok = false;
    } else { setPwError(""); }

    if (!confirm) {
      setCfError("Please confirm your password.");
      ok = false;
    } else if (confirm !== password) {
      setCfError("Passwords do not match.");
      ok = false;
    } else { setCfError(""); }

    return ok;
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      const res  = await fetch("/api/auth/reset-password", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, accessToken, refreshToken, newPassword: password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password. The link may have expired.");
        return;
      }

      setStage("success");
      setTimeout(() => router.push("/auth/login"), 3000);

    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strength = pwStrength(password);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (stage === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0A" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 rounded-full animate-spin"
            style={{ borderColor: "rgba(201,168,76,0.2)", borderTopColor: "#C9A84C" }} />
          <p className="text-sm" style={{ color: "#6B7280" }}>Verifying reset link…</p>
        </div>
      </div>
    );
  }

  // ── Invalid / expired link ─────────────────────────────────────────────────
  if (stage === "invalid") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
        <div className="w-full max-w-md rounded-3xl p-10 text-center shadow-2xl"
          style={{ background: "#111", border: "1px solid #222" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
            style={{ background: "rgba(248,113,113,0.1)", border: "2px solid rgba(248,113,113,0.3)" }}>
            !
          </div>
          <h2 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>
            Link Invalid or Expired
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            This password reset link is no longer valid. Reset links expire after 1 hour
            and can only be used once. Please request a new one.
          </p>
          <div className="space-y-3">
            <Link href="/auth/forgot-password"
              className="block w-full py-3.5 rounded-xl font-bold text-sm text-center"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
              Request New Reset Link →
            </Link>
            <Link href="/auth/login"
              className="block w-full py-3 rounded-xl text-sm text-center hover:opacity-80 transition-all"
              style={{ background: "transparent", border: "1px solid #2A2A2A", color: "#6B7280" }}>
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (stage === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
        <div className="w-full max-w-md rounded-3xl p-10 text-center shadow-2xl"
          style={{ background: "#111", border: "1px solid #222" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
            style={{ background: "rgba(52,211,153,0.1)", border: "2px solid rgba(52,211,153,0.4)" }}>
            ✓
          </div>
          <h2 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>
            Password Updated!
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            Your password has been changed successfully. Redirecting you to sign in…
          </p>
          <Link href="/auth/login"
            className="block w-full py-3.5 rounded-xl font-bold text-sm text-center"
            style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
            Sign In Now →
          </Link>
        </div>
      </div>
    );
  }

  // ── Reset form ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
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
          {/* Shield icon */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}>
            <svg className="w-6 h-6 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z"/></svg>
          </div>

          <h1 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>
            Set New Password
          </h1>
          <p className="text-sm mb-7" style={{ color: "#6B7280" }}>
            Choose a strong password to secure your account.
          </p>

          <form onSubmit={handleReset} noValidate className="space-y-5">

            {/* New password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: "#9CA3AF" }}>New Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"} autoComplete="new-password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (pwError) setPwError(""); }}
                  placeholder="Min 8 characters"
                  className="w-full rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all"
                  style={{ background: "#1A1A1A", border: `1px solid ${pwError ? "#F87171" : "#2A2A2A"}` }}
                  onFocus={e => { e.target.style.borderColor = pwError ? "#F87171" : "#C9A84C"; }}
                  onBlur={e  => { e.target.style.borderColor = pwError ? "#F87171" : "#2A2A2A"; }}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#6B7280" }}>
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
              {/* Strength */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all"
                        style={{ background: strength >= i ? STRENGTH_COLOR[strength] : "#2A2A2A" }} />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: STRENGTH_COLOR[strength] }}>
                    {STRENGTH_LABEL[strength]}
                    {strength < 3 && " — add uppercase, numbers or symbols"}
                  </p>
                </div>
              )}
              {pwError && <p className="mt-1.5 text-xs" style={{ color: "#F87171" }}>! {pwError}</p>}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: "#9CA3AF" }}>Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"} autoComplete="new-password"
                  value={confirm}
                  onChange={e => { setConfirm(e.target.value); if (cfError) setCfError(""); }}
                  placeholder="Repeat your new password"
                  className="w-full rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all"
                  style={{
                    background: "#1A1A1A",
                    border: `1px solid ${cfError ? "#F87171" : confirm && confirm === password ? "#34D399" : "#2A2A2A"}`,
                  }}
                  onFocus={e => { e.target.style.borderColor = "#C9A84C"; }}
                  onBlur={e  => {
                    e.target.style.borderColor = cfError ? "#F87171"
                      : confirm && confirm === password ? "#34D399" : "#2A2A2A";
                  }}
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)} tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#6B7280" }}>
                  {showConfirm ? "Hide" : "Show"}
                </button>
                {confirm && confirm === password && (
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#34D399" }}>✓</span>
                )}
              </div>
              {cfError && <p className="mt-1.5 text-xs" style={{ color: "#F87171" }}>! {cfError}</p>}
            </div>

            {/* Password rules hint */}
            <div className="rounded-xl p-3.5 text-xs space-y-1.5" style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}>
              <p className="font-semibold mb-2 uppercase tracking-wide" style={{ color: "#6B7280" }}>
                Password requirements
              </p>
              {[
                { label: "At least 8 characters",          met: password.length >= 8 },
                { label: "One uppercase letter (A–Z)",      met: /[A-Z]/.test(password) },
                { label: "One number (0–9)",                met: /[0-9]/.test(password) },
                { label: "One special character (!@#…)",    met: /[^A-Za-z0-9]/.test(password) },
              ].map(({ label, met }) => (
                <div key={label} className="flex items-center gap-2">
                  <span style={{ color: met ? "#34D399" : "#4B5563" }}>{met ? "✓" : "○"}</span>
                  <span style={{ color: met ? "#9CA3AF" : "#4B5563" }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Global error */}
            {error && (
              <div className="rounded-xl p-3.5 text-sm flex items-start gap-2"
                style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", color: "#F87171" }}>
                <span className="flex-shrink-0 font-bold">!</span> <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full font-bold py-4 rounded-xl text-base transition-all duration-200 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{ borderColor: "rgba(0,0,0,0.25)", borderTopColor: "#0A0A0A" }} />
                    Updating password…
                  </span>
                : "Update Password →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
