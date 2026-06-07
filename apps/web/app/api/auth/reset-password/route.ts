import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, accessToken, refreshToken, newPassword } = await req.json();

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // ── Demo mode ─────────────────────────────────────────────────────────────
    if (!supabaseUrl || supabaseUrl.includes("your-project") ||
        (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
      return NextResponse.json({ success: true, demo: true, message: "Password updated (demo mode)" });
    }

    if (!accessToken && !email) {
      return NextResponse.json({ error: "Invalid or expired reset link. Please request a new one." }, { status: 400 });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const adminSb = createClient(supabaseUrl, serviceKey!);

    // ── Our direct Brevo OTP flow: we already verified the OTP, now just update password ──
    // The accessToken here is "recovery_verified" from our verify-otp route
    if (accessToken === "recovery_verified" && email) {
      // Find user by email and update their password directly
      const { data: { users } } = await adminSb.auth.admin.listUsers();
      const user = users?.find((u: any) => u.email === email.trim().toLowerCase());

      if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }

      const { error: updateError } = await adminSb.auth.admin.updateUserById(user.id, {
        password: newPassword,
      });

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, message: "Password updated successfully." });
    }

    // ── Legacy Supabase token flow (fallback) ────────────────────────────────
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, anonKey);

    const { error: sessionError } = await supabase.auth.setSession({
      access_token:  accessToken,
      refresh_token: refreshToken ?? "",
    });

    if (sessionError) {
      return NextResponse.json(
        { error: "Reset link is invalid or has expired. Please request a new one." },
        { status: 401 }
      );
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    await supabase.auth.signOut();

    return NextResponse.json({ success: true, message: "Password updated successfully." });

  } catch (err) {
    console.error("[ResetPassword] Error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
