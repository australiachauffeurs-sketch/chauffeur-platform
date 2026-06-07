import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("ec_user")?.value;
  let userData: Record<string, string> = {};
  if (cookie) {
    try { userData = JSON.parse(cookie); } catch { /* ignore */ }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") || (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    return NextResponse.json({
      demo: true,
      user: {
        id: "demo-user",
        firstName: userData.name?.split(" ")[0] || "James",
        lastName:  userData.name?.split(" ")[1]  || "Smith",
        email:     userData.email || "james@example.com",
        phone:     "+61 400 111 222",
        totalBookings: 12,
        totalSpent: 2840,
        avgRating: 4.9,
      },
    });
  }

  const token = req.cookies.get("sb-access-token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { data } = await supabase.from("customers").select("*").eq("id", user.id).single();
  return NextResponse.json({ user: { ...data, id: user.id } });
}
