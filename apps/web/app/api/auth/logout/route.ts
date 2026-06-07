import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Attempt Supabase sign-out if configured
    if (supabaseUrl && anonKey &&
        !supabaseUrl.includes("your-project") &&
        (anonKey.startsWith("eyJ") || anonKey.startsWith("sb_publishable_"))) {
      try {
        const token = req.cookies.get("sb-access-token")?.value;
        if (token) {
          const { createClient } = await import("@supabase/supabase-js");
          const supabase = createClient(supabaseUrl, anonKey, {
            global: { headers: { Authorization: `Bearer ${token}` } },
          });
          await supabase.auth.signOut();
        }
      } catch { /* non-fatal */ }
    }

    const res = NextResponse.json({ success: true });
    // Clear all auth cookies
    res.cookies.delete("sb-access-token");
    res.cookies.delete("ec_user");
    return res;
  } catch (err) {
    console.error("[Logout] Error:", err);
    // Still clear cookies even on error
    const res = NextResponse.json({ success: true });
    res.cookies.delete("sb-access-token");
    res.cookies.delete("ec_user");
    return res;
  }
}
