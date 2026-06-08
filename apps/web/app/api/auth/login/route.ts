import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // ── Demo mode ──────────────────────────────────────────────────────────────
    if (!supabaseUrl || supabaseUrl.includes("your-project") ||
        (!anonKey?.startsWith("eyJ") && !anonKey?.startsWith("sb_publishable_"))) {
      if (password.length < 4) {
        return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
      }
      const name = email.split("@")[0];
      const res  = NextResponse.json({ user: { id: "mock-id", email }, message: "Logged in (demo mode)", demo: true });
      res.cookies.set("ec_user", JSON.stringify({ name, email }), { path: "/", maxAge: 60 * 60 * 24 * 7 });
      return res;
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase      = createClient(supabaseUrl, anonKey!);
    const adminSupabase = serviceKey ? createClient(supabaseUrl, serviceKey) : null;

    // ── Attempt login ──────────────────────────────────────────────────────────
    let { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });

    // ── If email not confirmed — auto-confirm via admin and retry ──────────────
    if (error && adminSupabase &&
        (error.message?.toLowerCase().includes("email not confirmed") ||
         error.message?.toLowerCase().includes("not confirmed"))) {

      // Find the user and confirm their email
      const { data: { users } } = await adminSupabase.auth.admin.listUsers({ perPage: 1000 });
      const user = users?.find((u: any) => u.email?.toLowerCase() === email.trim().toLowerCase());

      if (user) {
        await adminSupabase.auth.admin.updateUserById(user.id, { email_confirm: true });
        // Retry login after confirming
        const retry = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        data  = retry.data;
        error = retry.error;
      }
    }

    if (error) {
      const msg = error.message?.toLowerCase() ?? "";
      if (msg.includes("invalid") || msg.includes("password") || msg.includes("credentials")) {
        return NextResponse.json({ error: "Incorrect email or password. Please try again." }, { status: 401 });
      }
      if (msg.includes("not found") || msg.includes("no user")) {
        return NextResponse.json({ error: "No account found with this email. Please sign up." }, { status: 401 });
      }
      if (msg.includes("too many")) {
        return NextResponse.json({ error: "Too many attempts. Please wait a moment and try again." }, { status: 429 });
      }
      return NextResponse.json({ error: error.message || "Login failed. Please try again." }, { status: 401 });
    }

    if (!data?.user || !data?.session) {
      return NextResponse.json({ error: "Login failed. Please try again." }, { status: 401 });
    }

    const meta = data.user.user_metadata ?? {};
    const name = [meta.firstName, meta.lastName].filter(Boolean).join(" ") || email.split("@")[0];

    const response = NextResponse.json({
      user:    data.user,
      message: "Logged in",
      session: {
        access_token:  data.session.access_token,
        refresh_token: data.session.refresh_token,
      },
    });

    response.cookies.set("sb-access-token", data.session.access_token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      maxAge:   60 * 60 * 24 * 7,
      path:     "/",
    });
    response.cookies.set("ec_user", JSON.stringify({ id: data.user.id, email: data.user.email, name }), {
      httpOnly: false,
      secure:   process.env.NODE_ENV === "production",
      maxAge:   60 * 60 * 24 * 7,
      path:     "/",
    });

    return response;

  } catch (err) {
    console.error("[Login] Error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
