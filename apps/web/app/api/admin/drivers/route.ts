import { NextRequest, NextResponse } from "next/server";

const DEMO = [
  { id:"D001", name:"Marcus Thompson", phone:"+61 412 345 678", email:"marcus@driver.com", vehicle:"Mercedes E-Class", city:"Sydney",    rating:4.98, trips:312, status:"on_trip",   approved:true  },
  { id:"D002", name:"Ahmed Al-Rashid", phone:"+61 423 456 789", email:"ahmed@driver.com",  vehicle:"Mercedes GLE",     city:"Melbourne", rating:4.95, trips:198, status:"available", approved:true  },
  { id:"D003", name:"Grace Nguyen",    phone:"+61 434 567 890", email:"grace@driver.com",  vehicle:"Mercedes S-Class", city:"Sydney",    rating:4.99, trips:441, status:"on_trip",   approved:true  },
  { id:"D004", name:"Robert Wilson",   phone:"+61 445 678 901", email:"robert@driver.com", vehicle:"Mercedes Viano",   city:"Brisbane",  rating:4.92, trips:156, status:"available", approved:true  },
  { id:"D005", name:"Lily Chen",       phone:"+61 456 789 012", email:"lily@driver.com",   vehicle:"Mercedes E-Class", city:"Perth",     rating:4.88, trips:89,  status:"offline",   approved:true  },
  { id:"D006", name:"James Okafor",    phone:"+61 467 890 123", email:"james@driver.com",  vehicle:"Pending",          city:"Gold Coast",rating:0,    trips:0,   status:"offline",   approved:false },
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
    if (search) data = data.filter(d => d.name.toLowerCase().includes(search) || d.city.toLowerCase().includes(search));
    return NextResponse.json({ drivers: data, total: data.length, demo: true });
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, serviceKey!);

    const { data, error, count } = await supabase
      .from("drivers")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Normalize for admin dashboard
    const drivers = (data || []).map((d: any) => ({
      id:       d.id?.substring(0, 8)?.toUpperCase() || "—",
      name:     `${d.first_name || ""} ${d.last_name || ""}`.trim() || "Unknown",
      phone:    d.phone || "—",
      email:    d.email || "—",
      vehicle:  d.vehicle_make ? `${d.vehicle_make} ${d.vehicle_model || ""}`.trim() : "Not assigned",
      city:     d.city || "—",
      rating:   d.rating || 0,
      trips:    d.total_trips || 0,
      status:   d.status || "offline",
      approved: d.is_approved || false,
    }));

    let filtered = drivers;
    if (search) {
      filtered = drivers.filter((d: any) =>
        d.name.toLowerCase().includes(search) ||
        d.email.toLowerCase().includes(search) ||
        d.city.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ drivers: filtered, total: count || 0 });

  } catch (err) {
    console.error("[Admin drivers] Error:", err);
    return NextResponse.json({ error: "Failed to load drivers" }, { status: 500 });
  }
}
