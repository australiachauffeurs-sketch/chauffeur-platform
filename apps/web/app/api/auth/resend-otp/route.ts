import { NextRequest, NextResponse } from "next/server";
import { generateOTP, sendOTPEmail } from "@/lib/brevo";
import { storeOTP } from "@/lib/otp-store";

export async function POST(req: NextRequest) {
  try {
    const { email, type } = await req.json();

    if (!email || !type) {
      return NextResponse.json({ error: "Email and type are required." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // ── Demo mode ─────────────────────────────────────────────────────────────
    if (!supabaseUrl || supabaseUrl.includes("your-project") ||
        (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
      return NextResponse.json({ success: true, demo: true, message: "OTP resent (demo — use 123456)" });
    }

    // ── Generate new OTP and send via Brevo ──────────────────────────────────
    const otp = generateOTP();
    await storeOTP(email.trim().toLowerCase(), otp, type);

    await sendOTPEmail({
      to:   email.trim(),
      code: otp,
      type,
    });

    return NextResponse.json({ success: true, message: "New OTP sent to your email." });

  } catch (err) {
    console.error("[ResendOTP] Error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
