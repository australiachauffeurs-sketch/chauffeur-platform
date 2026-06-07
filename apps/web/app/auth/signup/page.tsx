"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormState = {
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
  password:  string;
  confirm:   string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = { firstName: "", lastName: "", email: "", phone: "", password: "", confirm: "" };

// Password strength 0-4
function pwStrength(pw: string): number {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8)  s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const STRENGTH_LABEL  = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR  = ["", "#F87171", "#FBBF24", "#34D399", "#10B981"];

export default function SignupPage() {
  const router = useRouter();

  const [form,         setForm]         = useState<FormState>(INITIAL);
  const [fieldErrors,  setFieldErrors]  = useState<FieldErrors>({});
  const [showPw,       setShowPw]       = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [globalError,  setGlobalError]  = useState("");
  const [step,         setStep]         = useState<"form" | "verify" | "done">("form");

  const set = (k: keyof FormState, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (fieldErrors[k]) setFieldErrors(fe => ({ ...fe, [k]: "" }));
  };

  // ── Field validation ───────────────────────────────────────────────────────
  const validateField = (k: keyof FormState, v: string): string => {
    switch (k) {
      case "firstName": return v.trim().length < 2 ? "First name is required." : "";
      case "lastName":  return v.trim().length < 2 ? "Last name is required."  : "";
      case "email":
        if (!v) return "Email is required.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address.";
      case "phone":
        if (!v) return "Phone number is required.";
        return /^[\d\s+\-()]{8,}$/.test(v) ? "" : "Enter a valid phone number.";
      case "password":
        if (!v) return "Password is required.";
        return v.length < 8 ? "Password must be at least 8 characters." : "";
      case "confirm":
        if (!v) return "Please confirm your password.";
        return v !== form.password ? "Passwords do not match." : "";
      default: return "";
    }
  };

  const handleBlur = (k: keyof FormState) => {
    const err = validateField(k, form[k]);
    setFieldErrors(fe => ({ ...fe, [k]: err }));
  };

  const validateAll = (): boolean => {
    const errs: FieldErrors = {};
    (Object.keys(form) as (keyof FormState)[]).forEach(k => {
      const e = validateField(k, form[k]);
      if (e) errs[k] = e;
    });
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    if (!validateAll()) return;
    setLoading(true);

    try {
      const res  = await fetch("/api/auth/signup", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          firstName: form.firstName.trim(),
          lastName:  form.lastName.trim(),
          email:     form.email.trim(),
          phone:     form.phone.trim(),
          password:  form.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.error?.toLowerCase().includes("already")) {
          setFieldErrors(fe => ({ ...fe, email: "An account with this email already exists." }));
        } else {
          setGlobalError(data.error || "Signup failed. Please try again.");
        }
        return;
      }

      // Store name so dashboard navbar picks it up after OTP verification
      localStorage.setItem("ec_pending_user", JSON.stringify({
        name:  `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
      }));

      // Redirect to OTP verification page
      router.push(`/auth/verify-otp?email=${encodeURIComponent(form.email)}&type=signup`);

    } catch {
      setGlobalError("Unable to connect. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const strength = pwStrength(form.password);

  // ── Email verification screen ──────────────────────────────────────────────
  if (step === "verify") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
        <div className="w-full max-w-md rounded-3xl p-10 text-center shadow-2xl"
          style={{ background: "#111", border: "1px solid #222" }}>
          {/* Icon */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
            style={{ background: "rgba(201,168,76,0.1)", border: "2px solid rgba(201,168,76,0.4)" }}>
            <svg className="w-10 h-10 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
          </div>
          <h2 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>
            Check Your Email
          </h2>
          <p className="text-sm mb-2" style={{ color: "#9CA3AF" }}>
            We&apos;ve sent a confirmation link to
          </p>
          <p className="font-semibold mb-6" style={{ color: "#C9A84C" }}>{form.email}</p>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            Click the link in that email to verify your account and complete registration.
            The link expires in 24 hours.
          </p>
          <div className="space-y-3">
            <Link href="/auth/login"
              className="block w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
              Go to Sign In →
            </Link>
            <p className="text-xs" style={{ color: "#4B5563" }}>
              Didn&apos;t receive it? Check your spam folder or{" "}
              <button onClick={() => setStep("form")} className="underline hover:no-underline" style={{ color: "#C9A84C" }}>
                try again
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Account created (auto-confirmed) screen ────────────────────────────────
  if (step === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
        <div className="w-full max-w-md rounded-3xl p-10 text-center shadow-2xl"
          style={{ background: "#111", border: "1px solid #222" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
            style={{ background: "rgba(52,211,153,0.1)", border: "2px solid rgba(52,211,153,0.4)" }}>
            ✓
          </div>
          <h2 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>
            Welcome, {form.firstName}!
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            Your account is ready. Redirecting to your dashboard…
          </p>
          <Link href="/dashboard"
            className="block w-full py-3.5 rounded-xl font-bold text-sm text-center"
            style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
            Go to Dashboard →
          </Link>
        </div>
      </div>
    );
  }

  // ── Registration form ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-14" style={{ background: "#0A0A0A" }}>
      {/* BG glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-[440px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
              EC
            </div>
            <span className="text-white text-xl font-bold" style={{ fontFamily: "'Playfair Display',serif" }}>
              Elite Chauffeurs
            </span>
            <span className="text-xs tracking-[0.25em] uppercase" style={{ color: "#C9A84C" }}>Australia</span>
          </Link>
        </div>

        <div className="rounded-3xl p-8 shadow-2xl" style={{ background: "#111", border: "1px solid #222" }}>
          <h1 className="text-white text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display',serif" }}>
            Create your account
          </h1>
          <p className="text-sm mb-7" style={{ color: "#6B7280" }}>
            Join thousands of satisfied clients across Australia
          </p>

          <form onSubmit={handleSignup} noValidate className="space-y-4">

            {/* First + Last name */}
            <div className="grid grid-cols-2 gap-3">
              {(["firstName", "lastName"] as const).map(k => (
                <div key={k}>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                    style={{ color: "#9CA3AF" }}>
                    {k === "firstName" ? "First Name" : "Last Name"}
                  </label>
                  <input
                    type="text" autoComplete={k === "firstName" ? "given-name" : "family-name"}
                    value={form[k]} onChange={e => set(k, e.target.value)}
                    onBlur={() => handleBlur(k)}
                    placeholder={k === "firstName" ? "John" : "Smith"}
                    className="w-full rounded-xl py-3 px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all"
                    style={{
                      background: "#1A1A1A",
                      border:     `1px solid ${fieldErrors[k] ? "#F87171" : "#2A2A2A"}`,
                    }}
                    onFocus={e  => { e.target.style.borderColor = fieldErrors[k] ? "#F87171" : "#C9A84C"; }}
                    onBlurCapture={e => { if (!fieldErrors[k]) e.target.style.borderColor = "#2A2A2A"; }}
                  />
                  {fieldErrors[k] && (
                    <p className="mt-1 text-xs" style={{ color: "#F87171" }}>{fieldErrors[k]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: "#9CA3AF" }}>Email Address</label>
              <input
                type="email" autoComplete="email"
                value={form.email} onChange={e => set("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="you@example.com"
                className="w-full rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all"
                style={{ background: "#1A1A1A", border: `1px solid ${fieldErrors.email ? "#F87171" : "#2A2A2A"}` }}
                onFocus={e => { e.target.style.borderColor = fieldErrors.email ? "#F87171" : "#C9A84C"; }}
                onBlurCapture={e => { if (!fieldErrors.email) e.target.style.borderColor = "#2A2A2A"; }}
              />
              {fieldErrors.email && <p className="mt-1.5 text-xs" style={{ color: "#F87171" }}>{fieldErrors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: "#9CA3AF" }}>Phone Number</label>
              <input
                type="tel" autoComplete="tel"
                value={form.phone} onChange={e => set("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                placeholder="+61 4XX XXX XXX"
                className="w-full rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all"
                style={{ background: "#1A1A1A", border: `1px solid ${fieldErrors.phone ? "#F87171" : "#2A2A2A"}` }}
                onFocus={e => { e.target.style.borderColor = fieldErrors.phone ? "#F87171" : "#C9A84C"; }}
                onBlurCapture={e => { if (!fieldErrors.phone) e.target.style.borderColor = "#2A2A2A"; }}
              />
              {fieldErrors.phone && <p className="mt-1.5 text-xs" style={{ color: "#F87171" }}>{fieldErrors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: "#9CA3AF" }}>Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"} autoComplete="new-password"
                  value={form.password} onChange={e => set("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="Min 8 characters"
                  className="w-full rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all"
                  style={{ background: "#1A1A1A", border: `1px solid ${fieldErrors.password ? "#F87171" : "#2A2A2A"}` }}
                  onFocus={e => { e.target.style.borderColor = fieldErrors.password ? "#F87171" : "#C9A84C"; }}
                  onBlurCapture={e => { if (!fieldErrors.password) e.target.style.borderColor = "#2A2A2A"; }}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#6B7280" }}>
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
              {/* Strength meter */}
              {form.password && (
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
              {fieldErrors.password && <p className="mt-1.5 text-xs" style={{ color: "#F87171" }}>{fieldErrors.password}</p>}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: "#9CA3AF" }}>Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"} autoComplete="new-password"
                  value={form.confirm} onChange={e => set("confirm", e.target.value)}
                  onBlur={() => handleBlur("confirm")}
                  placeholder="Repeat your password"
                  className="w-full rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all"
                  style={{ background: "#1A1A1A", border: `1px solid ${fieldErrors.confirm ? "#F87171" : form.confirm && form.confirm === form.password ? "#34D399" : "#2A2A2A"}` }}
                  onFocus={e => { e.target.style.borderColor = "#C9A84C"; }}
                  onBlurCapture={e => {
                    e.target.style.borderColor = fieldErrors.confirm ? "#F87171"
                      : form.confirm && form.confirm === form.password ? "#34D399" : "#2A2A2A";
                  }}
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)} tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#6B7280" }}>
                  {showConfirm ? "Hide" : "Show"}
                </button>
                {form.confirm && form.confirm === form.password && (
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#34D399" }}>✓</span>
                )}
              </div>
              {fieldErrors.confirm && <p className="mt-1.5 text-xs" style={{ color: "#F87171" }}>{fieldErrors.confirm}</p>}
            </div>

            {/* Global error */}
            {globalError && (
              <div className="rounded-xl p-3.5 text-sm flex items-start gap-2"
                style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", color: "#F87171" }}>
                <span className="flex-shrink-0 font-bold">!</span> <span>{globalError}</span>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full font-bold py-4 rounded-xl text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{ borderColor: "rgba(0,0,0,0.25)", borderTopColor: "#0A0A0A" }} />
                    Creating account…
                  </span>
                : "Create Account →"}
            </button>
          </form>

          {/* Terms */}
          <p className="text-xs text-center mt-4" style={{ color: "#4B5563" }}>
            By registering you agree to our{" "}
            <Link href="/terms" className="hover:underline" style={{ color: "#C9A84C" }}>Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="hover:underline" style={{ color: "#C9A84C" }}>Privacy Policy</Link>
          </p>

          {/* Sign in link */}
          <div className="mt-5 pt-5 text-center" style={{ borderTop: "1px solid #222" }}>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Already have an account?{" "}
              <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: "#C9A84C" }}>
                Sign In →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
