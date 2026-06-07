"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirectTo   = searchParams.get("redirect") || "/dashboard";

  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPw,      setShowPw]      = useState(false);
  const [remember,    setRemember]    = useState(true);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  // ── Inline validation ──────────────────────────────────────────────────────
  const validateField = (name: string, value: string) => {
    if (name === "email") {
      if (!value) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address.";
    }
    if (name === "password") {
      if (!value) return "Password is required.";
      if (value.length < 6) return "Password must be at least 6 characters.";
    }
    return "";
  };

  const handleBlur = (name: string, value: string) => {
    const err = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: err }));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate all fields first
    const emailErr    = validateField("email",    email);
    const passwordErr = validateField("password", password);
    if (emailErr || passwordErr) {
      setFieldErrors({ email: emailErr, password: passwordErr });
      return;
    }

    setLoading(true);

    try {
      const res  = await fetch("/api/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password. Please try again.");
        return;
      }

      // Store user info for navbar + session persistence
      const meta  = data.user?.user_metadata ?? {};
      const name  = [meta.firstName, meta.lastName].filter(Boolean).join(" ") || email.split("@")[0];
      const userObj = JSON.stringify({ name, email, id: data.user?.id });
      const store = remember ? localStorage : sessionStorage;
      store.setItem("ec_user", userObj);
      // Also set cookie so middleware can check auth on server-side navigation
      document.cookie = `ec_user=${encodeURIComponent(userObj)}; path=/; max-age=${60 * 60 * 24 * 7}`;

      router.push(redirectTo);
      router.refresh();

    } catch {
      setError("Unable to connect. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "#0A0A0A" }}>
      {/* Background rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
              EC
            </div>
            <span className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display',serif" }}>
              Elite Chauffeurs
            </span>
            <span className="text-xs tracking-[0.25em] uppercase" style={{ color: "#C9A84C" }}>Australia</span>
          </Link>
        </div>

        {/* Redirected notice */}
        {searchParams.get("redirect") && (
          <div className="mb-4 rounded-xl px-4 py-3 text-sm text-center"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#C9A84C" }}>
            Please sign in to continue.
          </div>
        )}

        {/* Card */}
        <div className="rounded-3xl p-8 shadow-2xl" style={{ background: "#111", border: "1px solid #222" }}>
          <h1 className="text-white text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display',serif" }}>
            Welcome back
          </h1>
          <p className="text-sm mb-7" style={{ color: "#6B7280" }}>Sign in to manage your bookings</p>

          <form onSubmit={handleLogin} noValidate className="space-y-5">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: "#9CA3AF" }}>
                Email Address
              </label>
              <input
                id="email" type="email" autoComplete="email"
                value={email} onChange={e => setEmail(e.target.value)}
                onBlur={e => handleBlur("email", e.target.value)}
                placeholder="you@example.com" required
                className="w-full rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all"
                style={{
                  background:  "#1A1A1A",
                  border:      `1px solid ${fieldErrors.email ? "#F87171" : "#2A2A2A"}`,
                }}
                onFocus={e  => { e.target.style.borderColor = fieldErrors.email ? "#F87171" : "#C9A84C"; }}
                onBlurCapture={e => { if (!fieldErrors.email) e.target.style.borderColor = "#2A2A2A"; }}
              />
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs" style={{ color: "#F87171" }}>{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#9CA3AF" }}>
                  Password
                </label>
                <Link href="/auth/forgot-password"
                  className="text-xs hover:underline transition-opacity hover:opacity-80"
                  style={{ color: "#C9A84C" }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password" type={showPw ? "text" : "password"} autoComplete="current-password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  onBlur={e => handleBlur("password", e.target.value)}
                  placeholder="••••••••" required
                  className="w-full rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all"
                  style={{
                    background: "#1A1A1A",
                    border:     `1px solid ${fieldErrors.password ? "#F87171" : "#2A2A2A"}`,
                  }}
                  onFocus={e => { e.target.style.borderColor = fieldErrors.password ? "#F87171" : "#C9A84C"; }}
                  onBlurCapture={e => { if (!fieldErrors.password) e.target.style.borderColor = "#2A2A2A"; }}
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm select-none"
                  style={{ color: "#6B7280" }} tabIndex={-1}>
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1.5 text-xs" style={{ color: "#F87171" }}>{fieldErrors.password}</p>
              )}
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={remember}
                  onChange={e => setRemember(e.target.checked)} />
                <div className="w-5 h-5 rounded flex items-center justify-center transition-all"
                  style={{ background: remember ? "#C9A84C" : "#1A1A1A", border: `1px solid ${remember ? "#C9A84C" : "#3A3A3A"}` }}>
                  {remember && <span className="text-black text-xs font-bold">✓</span>}
                </div>
              </div>
              <span className="text-sm" style={{ color: "#9CA3AF" }}>Keep me signed in</span>
            </label>

            {/* Global error */}
            {error && (
              <div className="rounded-xl p-3.5 text-sm flex items-start gap-2.5"
                style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", color: "#F87171" }}>
                <span className="flex-shrink-0 mt-0.5 font-bold">!</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full font-bold py-4 rounded-xl text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{ borderColor: "rgba(0,0,0,0.25)", borderTopColor: "#0A0A0A" }} />
                    Signing in…
                  </span>
                : "Sign In →"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 pt-6 text-center" style={{ borderTop: "1px solid #222" }}>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="font-semibold hover:underline" style={{ color: "#C9A84C" }}>
                Create one free →
              </Link>
            </p>
          </div>
        </div>

        {/* Admin link */}
        <p className="text-center mt-5 text-xs" style={{ color: "#374151" }}>
          Admin access?{" "}
          <a href="http://localhost:3001" className="hover:underline" style={{ color: "#6B7280" }}>
            Go to Admin Panel →
          </a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
