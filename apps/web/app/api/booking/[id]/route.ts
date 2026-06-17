import { NextRequest, NextResponse } from "next/server";

// Demo bookings store (in-memory for demo mode)
const DEMO_BOOKINGS: Record<string, object> = {
  "BK8821": {
    id: "BK8821", status: "confirmed", booking_type: "airport_transfer",
    vehicle_category: "sedan", scheduled_at: "2026-06-28T06:30:00",
    passengers: 2, luggage: 3, flight_number: "QF401",
    pickup_address: "Sydney Airport T1", dropoff_address: "1 Martin Place, Sydney CBD",
    distance_km: 24.3, duration_minutes: 32,
    base_charge: 115.00, booking_fee: 5.00, airport_surcharge: 15.00,
    after_hours_surcharge: 0, gst: 13.50, total_amount: 148.50, currency: "AUD",
    payment_status: "paid",
    driver: { name: "Marcus Thompson", phone: "+61 412 345 678", rating: 4.98, trips: 312 },
    created_at: "2026-06-24T09:15:00",
  },
  "BK8820": {
    id: "BK8820", status: "completed", booking_type: "corporate",
    vehicle_category: "suv", scheduled_at: "2026-06-26T14:00:00",
    passengers: 4, luggage: 4, flight_number: null,
    pickup_address: "Crown Casino Melbourne", dropoff_address: "Melbourne Airport T3",
    distance_km: 31.2, duration_minutes: 38,
    base_charge: 145.00, booking_fee: 5.00, airport_surcharge: 20.00,
    after_hours_surcharge: 0, gst: 17.00, total_amount: 187.00, currency: "AUD",
    payment_status: "paid",
    driver: { name: "Grace Nguyen", phone: "+61 434 567 890", rating: 4.99, trips: 441 },
    created_at: "2026-06-22T10:00:00",
  },
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Demo mode
  if (!supabaseUrl || supabaseUrl.includes("your-project") || (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    // Return stored demo booking or generate a plausible one for any ID
    const booking = DEMO_BOOKINGS[id] ?? {
      id, status: "confirmed", booking_type: "point_to_point",
      vehicle_category: "sedan", scheduled_at: new Date(Date.now() + 2 * 3600_000).toISOString(),
      passengers: 2, luggage: 1, flight_number: null,
      pickup_address: "Sydney CBD", dropoff_address: "Bondi Beach",
      distance_km: 8.5, duration_minutes: 22,
      base_charge: 85.00, booking_fee: 5.00, airport_surcharge: 0,
      after_hours_surcharge: 0, gst: 9.00, total_amount: 99.00, currency: "AUD",
      payment_status: "paid",
      driver: { name: "Marcus Thompson", phone: "+61 412 345 678", rating: 4.98, trips: 312 },
      created_at: new Date().toISOString(),
    };
    return NextResponse.json({ booking, demo: true });
  }

  // Real Supabase
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  // Fetch driver separately if assigned
  let driver = null;
  if (data.driver_id) {
    const { data: driverData } = await supabase
      .from("drivers")
      .select("id, first_name, last_name, phone, rating, vehicle_category, vehicle_plate, vehicle_model")
      .eq("id", data.driver_id)
      .single();
    driver = driverData ?? null;
  }

  return NextResponse.json({ booking: data, driver });
}

// PATCH — update booking status
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") || (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    return NextResponse.json({ success: true, demo: true });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);
  const { error } = await supabase.from("bookings").update(body).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
