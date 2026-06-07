import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // â”€â”€ No Supabase â†’ mock login â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (!supabaseUrl || supabaseUrl.includes("your-project") || (!anonKey?.startsWith("eyJ") && !anonKey?.startsWith("sb_publishable_"))) {
      if (password.length < 4) {
        return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
      }
      const name = email.split("@")[0];
      const res  = NextResponse.json({ user: { id: "mock-id", email }, message: "Logged in (demo mode)", demo: true });
      // Set cookie so middleware auth guard works
      res.cookies.set("ec_user", JSON.stringify({ name, email }), { path: "/", maxAge: 60 * 60 * 24 * 7 });
      return res;
    }

    // â”€â”€ Real Supabase login â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, anonKey!);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const meta = data.user?.user_metadata ?? {};
    const name = [meta.firstName, meta.lastName].filter(Boolean).join(" ") || email.split("@")[0];

    const response = NextResponse.json({ user: data.user, message: "Logged in" });
    response.cookies.set("sb-access-token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    // Also set ec_user cookie so middleware + client can read user info
    response.cookies.set("ec_user", JSON.stringify({ id: data.user.id, email: data.user.email, name }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
