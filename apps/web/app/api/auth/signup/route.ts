import { NextRequest, NextResponse } from "next/server";
import { generateOTP, sendOTPEmail } from "@/lib/brevo";
import { storeOTP } from "@/lib/otp-store";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password } = await req.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // ── Demo mode ─────────────────────────────────────────────────────────────
    if (!supabaseUrl || supabaseUrl.includes("your-project") ||
        (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
      return NextResponse.json({
        success: true, demo: true, otpSent: true,
        message: "OTP sent (demo mode) — use code 123456",
      });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const adminSb = createClient(supabaseUrl, serviceKey!);

    // ── Check if email already registered ────────────────────────────────────
    const { data: existing } = await adminSb
      .from("customers")
      .select("id")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in." },
        { status: 400 }
      );
    }

    // ── Create user in Supabase Auth (email auto-confirmed since we handle verification) ─
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const anonSb = createClient(supabaseUrl, anonKey);

    const { data, error } = await anonSb.auth.signUp({
      email:    email.trim(),
      password,
      options: {
        data: { firstName: firstName.trim(), lastName: lastName.trim(), phone: phone?.trim() },
        // We'll verify email ourselves via Brevo OTP
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
      },
    });

    if (error) {
      if (error.message.toLowerCase().includes("already registered") ||
          error.message.toLowerCase().includes("already exists")) {
        return NextResponse.json(
          { error: "An account with this email already exists. Please sign in." },
          { status: 400 }
        );
      }
      // If Supabase email sending fails, that's OK — we send our own
      if (!error.message.toLowerCase().includes("email")) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    // ── Pre-create customer profile ─────────────────────────────────────────
    if (data?.user) {
      await adminSb.from("customers").upsert({
        id:         data.user.id,
        first_name: firstName.trim(),
        last_name:  lastName.trim(),
        email:      email.trim().toLowerCase(),
        phone:      phone?.trim(),
      }, { onConflict: "id" });
    }

    // ── Generate OTP and send via Brevo ─────────────────────────────────────
    const otp = generateOTP();
    const stored = await storeOTP(email.trim().toLowerCase(), otp, "signup");

    if (!stored) {
      return NextResponse.json({ error: "Failed to generate verification code. Try again." }, { status: 500 });
    }

    const sent = await sendOTPEmail({
      to:        email.trim(),
      code:      otp,
      type:      "signup",
      firstName: firstName.trim(),
    });

    if (!sent.success) {
      return NextResponse.json({ error: sent.error || "Failed to send verification email." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      otpSent: true,
      message: "OTP sent — check your email for the 6-digit code.",
      userId:  data?.user?.id,
    });

  } catch (err) {
    console.error("[Signup] Error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
