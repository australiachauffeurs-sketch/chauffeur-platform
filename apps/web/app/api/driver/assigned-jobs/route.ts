import { NextRequest, NextResponse } from "next/server";

function normalize(b: any) {
  const c = b.customers || {};
  const customerName =
    [c.first_name, c.last_name].filter(Boolean).join(" ").trim() || "Customer";
  return {
    id:            b.id,
    pickup:        b.pickup_address,
    dropoff:       b.dropoff_address,
    amount:        b.total_amount,
    scheduledAt:   b.scheduled_at,
    distanceKm:    b.distance_km,
    durationMin:   b.duration_minutes,
    passengers:    b.passengers,
    luggage:       b.luggage,
    flightNumber:  b.flight_number,
    vehicle:       b.vehicle_category,
    customer:      customerName,
    customerId:    b.customer_id,
    customerPhone: c.phone || null,
    waypoints:     b.waypoints || null,
    status:        b.status,
  };
}

export async function GET(req: NextRequest) {
  const driverId = req.nextUrl.searchParams.get("driverId");
  if (!driverId) return NextResponse.json({ error: "driverId required" }, { status: 400 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") ||
      (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    return NextResponse.json({ jobs: [] });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);

  let { data, error } = await supabase
    .from("bookings")
    .select("*, customers(first_name, last_name, phone)")
    .eq("driver_id", driverId)
    .in("status", ["driver_assigned", "confirmed"])
    .order("scheduled_at", { ascending: true });

  if (error) {
    const fallback = await supabase
      .from("bookings")
      .select("*")
      .eq("driver_id", driverId)
      .in("status", ["driver_assigned", "confirmed"])
      .order("scheduled_at", { ascending: true });
    data  = fallback.data;
    error = fallback.error;
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ jobs: (data || []).map(normalize) });
}
