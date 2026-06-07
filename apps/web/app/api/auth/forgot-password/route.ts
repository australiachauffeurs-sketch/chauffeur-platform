import { NextRequest, NextResponse } from "next/server";
import { generateOTP, sendOTPEmail } from "@/lib/brevo";
import { storeOTP } from "@/lib/otp-store";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
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

    // ── Generate and send OTP via Brevo ──────────────────────────────────────
    const otp = generateOTP();
    await storeOTP(email.trim().toLowerCase(), otp, "recovery");

    await sendOTPEmail({
      to:   email.trim(),
      code: otp,
      type: "recovery",
    });

    // Always return success regardless of whether email exists (prevent enumeration)
    return NextResponse.json({
      success: true,
      otpSent: true,
      message: "If an account exists with that email, a 6-digit OTP has been sent.",
    });

  } catch (err) {
    console.error("[ForgotPassword] Error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
