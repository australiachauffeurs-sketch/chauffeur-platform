import { NextRequest, NextResponse } from "next/server";

const DEMO_BOOKINGS = [
  { id:"BK8821", status:"confirmed",   booking_type:"airport_transfer", vehicle_category:"sedan",  scheduled_at:"2026-06-28T06:30:00", passengers:2, luggage:3, pickup_address:"Sydney Airport T1",    dropoff_address:"1 Martin Place, Sydney CBD", total_amount:148.50, distance_km:24.3 },
  { id:"BK8820", status:"completed",   booking_type:"corporate",        vehicle_category:"suv",    scheduled_at:"2026-06-26T14:00:00", passengers:4, luggage:4, pickup_address:"Crown Casino Melbourne",dropoff_address:"Melbourne Airport T3",      total_amount:187.00, distance_km:31.2 },
  { id:"BK8819", status:"completed",   booking_type:"corporate",        vehicle_category:"luxury", scheduled_at:"2026-06-22T09:00:00", passengers:1, luggage:2, pickup_address:"Brisbane CBD",          dropoff_address:"BNE Airport T1",             total_amount:214.00, distance_km:22.7 },
  { id:"BK8818", status:"completed",   booking_type:"wedding",          vehicle_category:"stretch_limo", scheduled_at:"2026-06-18T18:00:00", passengers:8, luggage:4, pickup_address:"Surfers Paradise Hotel",dropoff_address:"GC Convention Centre", total_amount:450.00, distance_km:12.1 },
  { id:"BK8815", status:"completed",   booking_type:"airport_transfer", vehicle_category:"sedan",  scheduled_at:"2026-06-10T07:45:00", passengers:1, luggage:1, pickup_address:"Adelaide CBD",          dropoff_address:"ADL Airport",                total_amount:98.50,  distance_km:18.3 },
  { id:"BK8810", status:"cancelled",   booking_type:"corporate",        vehicle_category:"suv",    scheduled_at:"2026-06-02T16:30:00", passengers:3, luggage:3, pickup_address:"Perth Airport",         dropoff_address:"Burswood Resort",            total_amount:165.00, distance_km:22.0 },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status  = searchParams.get("status");
    const page    = parseInt(searchParams.get("page") || "1");
    const limit   = parseInt(searchParams.get("limit") || "20");
    const offset  = (page - 1) * limit;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // â”€â”€ Demo mode â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (!supabaseUrl || supabaseUrl.includes("your-project") || (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
      let data = [...DEMO_BOOKINGS];

      // Filter by status
      if (status && status !== "all" && status !== "") {
        const statuses = status.split(",");
        data = data.filter(b => statuses.includes(b.status));
      }

      const total     = data.length;
      const paginated = data.slice(offset, offset + limit);
      return NextResponse.json({ bookings: paginated, total, page, limit, demo: true });
    }

    // â”€â”€ Real Supabase â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Extract customer_id from session â€” only return own bookings
    let customerId: string | null = null;
    const ecUserCookie = req.cookies.get("ec_user")?.value;
    if (ecUserCookie) {
      try { customerId = JSON.parse(ecUserCookie).id ?? null; } catch {}
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, serviceKey);

    let query = supabase
      .from("bookings")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (customerId) query = query.eq("customer_id", customerId);

    if (status && status !== "all" && status !== "") {
      const statuses = status.split(",");
      if (statuses.length === 1) query = query.eq("status", statuses[0]);
      else query = query.in("status", statuses);
    }

    const { data, error, count } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ bookings: data, total: count, page, limit });

  } catch (err) {
    console.error("Booking list error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
