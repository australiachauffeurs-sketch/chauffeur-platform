import { NextRequest, NextResponse } from "next/server";

const DEMO = [
  { id:"C001", name:"James Whitfield",  email:"james.w@whitfieldcap.com.au", phone:"+61 400 111 222", city:"Sydney",    trips:24, spent:4820, joined:"Jan 2025", type:"Corporate" },
  { id:"C002", name:"Priya Sharma",     email:"priya.s@gmail.com",           phone:"+61 411 222 333", city:"Melbourne", trips:3,  spent:890,  joined:"May 2026", type:"Personal"  },
  { id:"C003", name:"David Chen",       email:"d.chen@fingroup.com.au",      phone:"+61 422 333 444", city:"Brisbane",  trips:18, spent:3240, joined:"Mar 2025", type:"Corporate" },
];

function isAdminRequest(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET;
  if (adminSecret) return req.headers.get("x-admin-secret") === adminSecret;
  const origin  = req.headers.get("origin") || "";
  const referer = req.headers.get("referer") || "";
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";
  return origin.startsWith(adminUrl) || referer.startsWith(adminUrl);
}

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") ||
      (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    let data = DEMO;
    if (search) data = data.filter(c => c.name.toLowerCase().includes(search) || c.email.toLowerCase().includes(search));
    return NextResponse.json({ customers: data, total: data.length, demo: true });
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, serviceKey!);

    const { data, error, count } = await supabase
      .from("customers")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Normalize for admin dashboard
    const customers = (data || []).map((c: any) => ({
      id:      c.id?.substring(0, 8)?.toUpperCase() || "—",
      name:    `${c.first_name || ""} ${c.last_name || ""}`.trim() || "Unknown",
      email:   c.email || "—",
      phone:   c.phone || "—",
      city:    c.city || "—",
      trips:   c.total_trips || 0,
      spent:   c.total_spent || 0,
      joined:  c.created_at
        ? new Date(c.created_at).toLocaleDateString("en-AU", { month: "short", year: "numeric" })
        : "—",
      type:    c.account_type || "Personal",
    }));

    let filtered = customers;
    if (search) {
      filtered = customers.filter((c: any) =>
        c.name.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ customers: filtered, total: count || 0 });

  } catch (err) {
    console.error("[Admin customers] Error:", err);
    return NextResponse.json({ error: "Failed to load customers" }, { status: 500 });
  }
}
