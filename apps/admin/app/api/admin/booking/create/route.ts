import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const body = await req.json();
  const {
    customer_name, customer_email, customer_phone,
    pickup_address, dropoff_address, scheduled_at,
    vehicle_category, driver_id, payment_method, total_amount, notes,
  } = body;

  if (!pickup_address || !scheduled_at || !vehicle_category) {
    return NextResponse.json({ error: "Pickup address, date/time and vehicle type are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      pickup_address,
      dropoff_address:  dropoff_address || null,
      scheduled_at,
      vehicle_category,
      booking_type:     "airport_transfer",
      status:           "confirmed",
      payment_method:   payment_method || "cash",
      payment_status:   "pending",
      total_amount:     total_amount || 0,
      driver_id:        driver_id || null,
      special_requests: notes || null,
      customer_name:    customer_name || null,
    })
    .select("id")
    .single();

  if (error) {
    // If customer_name column doesn't exist, retry without it
    if (error.message?.includes("customer_name")) {
      const { data: data2, error: error2 } = await supabase
        .from("bookings")
        .insert({
          pickup_address,
          dropoff_address:  dropoff_address || null,
          scheduled_at,
          vehicle_category,
          booking_type:     "airport_transfer",
          status:           "confirmed",
          payment_method:   payment_method || "cash",
          payment_status:   "pending",
          total_amount:     total_amount || 0,
          driver_id:        driver_id || null,
          special_requests: notes || null,
        })
        .select("id")
        .single();
      if (error2) return NextResponse.json({ error: error2.message }, { status: 500 });
      return NextResponse.json({ ok: true, id: data2.id });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id });
}
