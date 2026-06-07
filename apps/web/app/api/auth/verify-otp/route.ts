import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otp-store";

/**
 * Verifies a 6-digit OTP sent via Brevo for either:
 *  - type "signup"   → confirms email after registration
 *  - type "recovery" → authenticates user for password reset
 */
export async function POST(req: NextRequest) {
  try {
    const { email, token, type } = await req.json();

    if (!email || !token || !type) {
      return NextResponse.json({ error: "Email, OTP code, and type are required." }, { status: 400 });
    }
    if (!/^\d{6}$/.test(token)) {
      return NextResponse.json({ error: "OTP must be a 6-digit number." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // ── Demo mode — accept 123456 as magic code ───────────────────────────────
    if (!supabaseUrl || supabaseUrl.includes("your-project") ||
        (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
      if (token === "123456") {
        return NextResponse.json({
          success: true, demo: true, type,
          accessToken:  type === "recovery" ? "demo_access_token" : null,
          refreshToken: type === "recovery" ? "demo_refresh_token" : null,
        });
      }
      return NextResponse.json({ error: "Invalid OTP code. In demo mode use 123456." }, { status: 400 });
    }

    // ── Verify OTP from our store ────────────────────────────────────────────
    const valid = await verifyOTP(email.trim().toLowerCase(), token.trim(), type);

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid or expired code. Please check and try again, or request a new code." },
        { status: 400 }
      );
    }

    const { createClient } = await import("@supabase/supabase-js");
    const adminSb = createClient(supabaseUrl, serviceKey!);

    // ── Signup: confirm the user's email in Supabase and create a session ────
    if (type === "signup") {
      // Get user by email and confirm them
      const { data: { users } } = await adminSb.auth.admin.listUsers();
      const user = users?.find((u: any) => u.email === email.trim().toLowerCase());

      if (user && !user.email_confirmed_at) {
        await adminSb.auth.admin.updateUserById(user.id, {
          email_confirm: true,
        });
      }

      const res = NextResponse.json({ success: true, type });
      // Set a cookie so the web app knows user is verified
      if (user) {
        res.cookies.set("ec_user", JSON.stringify({
          id: user.id,
          email: user.email,
          name: `${user.user_metadata?.firstName || ""} ${user.user_metadata?.lastName || ""}`.trim(),
        }), {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });
      }
      return res;
    }

    // ── Recovery: generate a short-lived token so user can reset password ────
    if (type === "recovery") {
      // Look up user
      const { data: { users } } = await adminSb.auth.admin.listUsers();
      const user = users?.find((u: any) => u.email === email.trim().toLowerCase());

      if (user) {
        // Generate a password reset link (we just need the tokens)
        const { data, error } = await adminSb.auth.admin.generateLink({
          type: "recovery",
          email: email.trim().toLowerCase(),
        });

        if (!error && data) {
          return NextResponse.json({
            success:      true,
            type,
            // These tokens allow the client to call reset-password
            accessToken:  data.properties?.hashed_token || "recovery_verified",
            refreshToken: "recovery_verified",
          });
        }
      }

      // Even if user not found, return success with tokens (allows password reset flow)
      return NextResponse.json({
        success:      true,
        type,
        accessToken:  "recovery_verified",
        refreshToken: "recovery_verified",
      });
    }

    return NextResponse.json({ success: true, type });

  } catch (err) {
    console.error("[VerifyOTP] Error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
