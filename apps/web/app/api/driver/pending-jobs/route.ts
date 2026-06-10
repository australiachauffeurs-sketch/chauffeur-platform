import { NextResponse } from "next/server";

const DEMO_JOBS = [
  { id:"BK8825", customer:"James Whitfield",  customerPhone:"+61400111222", pickup:"Adelaide Airport T1", dropoff:"1 King William St, CBD", distanceKm:24.3, durationMin:32, amount:142.35, vehicle:"Executive Sedan", scheduledAt:"2026-06-28T06:30", passengers:2, luggage:3, flightNumber:"QF401" },
  { id:"BK8826", customer:"Emma Johnson",     customerPhone:"+61400333444", pickup:"InterContinental Adelaide", dropoff:"Adelaide Airport T1", distanceKm:18.7, durationMin:28, amount:98.50,  vehicle:"Executive Sedan", scheduledAt:"2026-06-28T09:00", passengers:1, luggage:2, flightNumber:"" },
];

// Normalize a raw booking row (+ joined customer) into the driver app's job shape
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
  };
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") ||
      (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    return NextResponse.json({ jobs: DEMO_JOBS, demo: true });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);

  // Try with the customer join first; fall back to a plain select if the
  // embedded relationship isn't available.
  let { data, error } = await supabase
    .from("bookings")
    .select("*, customers(first_name, last_name, phone)")
    .in("status", ["pending", "confirmed"])
    .is("driver_id", null)
    .order("scheduled_at", { ascending: true });

  if (error) {
    const fallback = await supabase
      .from("bookings")
      .select("*")
      .in("status", ["pending", "confirmed"])
      .is("driver_id", null)
      .order("scheduled_at", { ascending: true });
    data  = fallback.data;
    error = fallback.error;
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ jobs: (data || []).map(normalize) });
}
