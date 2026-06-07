import { NextRequest, NextResponse } from "next/server";

const DEMO = [
  { id:"BK8821", customer:"James Whitfield",  pickup:"Sydney Airport T1", dropoff:"1 Martin Pl CBD",      vehicle:"Sedan",  date:"28 Jun 2026 06:30", status:"confirmed",   amount:142, driver:"Marcus T."   },
  { id:"BK8820", customer:"Priya Sharma",     pickup:"Crown Casino MEL",  dropoff:"Melbourne Airport",    vehicle:"SUV",    date:"27 Jun 2026 14:00", status:"in_progress", amount:188, driver:"Grace N."    },
  { id:"BK8819", customer:"David Chen",       pickup:"Brisbane CBD",      dropoff:"BNE Airport T1",       vehicle:"Luxury", date:"26 Jun 2026 09:00", status:"completed",   amount:214, driver:"Ahmed A."    },
  { id:"BK8818", customer:"Sarah O'Brien",    pickup:"Surfers Paradise",  dropoff:"GC Convention Centre", vehicle:"Limo",   date:"25 Jun 2026 18:00", status:"completed",   amount:450, driver:"Robert W."   },
  { id:"BK8817", customer:"Michael Wong",     pickup:"Perth Airport",     dropoff:"Burswood Resort",      vehicle:"Van",    date:"25 Jun 2026 10:15", status:"pending",     amount:165, driver:"Unassigned"  },
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
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search")?.toLowerCase();
  const page   = parseInt(searchParams.get("page") || "1");
  const limit  = parseInt(searchParams.get("limit") || "20");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") ||
      (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    let data = DEMO;
    if (status && status !== "all") data = data.filter(b => b.status === status);
    if (search) data = data.filter(b => b.customer.toLowerCase().includes(search) || b.id.toLowerCase().includes(search));
    const total = data.length;
    const paginated = data.slice((page - 1) * limit, page * limit);
    return NextResponse.json({ bookings: paginated, total, demo: true });
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, serviceKey!);
    const offset = (page - 1) * limit;

    let query = supabase
      .from("bookings")
      .select("*, customers(first_name, last_name), drivers(first_name, last_name)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status && status !== "all") query = query.eq("status", status);

    const { data, error, count } = await query;

    if (error) {
      console.error("[Admin bookings] Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Normalize data to match what admin dashboard expects
    const bookings = (data || []).map((b: any) => {
      const cust = b.customers as any;
      const drv  = b.drivers as any;
      const customerName = cust
        ? `${cust.first_name || ""} ${cust.last_name || ""}`.trim()
        : "Unknown";
      const driverName = drv
        ? `${drv.first_name || ""} ${drv.last_name || ""}`.trim()
        : "Unassigned";

      return {
        id:       b.id?.substring(0, 8)?.toUpperCase() || "—",
        customer: customerName,
        pickup:   b.pickup_address || "—",
        dropoff:  b.dropoff_address || "—",
        vehicle:  (b.vehicle_category || "sedan").replace("_", " "),
        date:     b.scheduled_at
          ? new Date(b.scheduled_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
          : b.created_at
          ? new Date(b.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
          : "—",
        status:   b.status || "pending",
        amount:   b.total_amount || 0,
        driver:   driverName,
      };
    });

    return NextResponse.json({ bookings, total: count || 0 });

  } catch (err) {
    console.error("[Admin bookings] Error:", err);
    return NextResponse.json({ error: "Failed to load bookings" }, { status: 500 });
  }
}
