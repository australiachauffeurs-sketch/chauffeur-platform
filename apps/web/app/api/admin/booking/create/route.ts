import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    customer_id, customer_name, customer_email, customer_phone,
    pickup_address, dropoff_address,
    scheduled_at, vehicle_category, notes,
    driver_id, payment_method, total_amount,
  } = body;

  if (!pickup_address || !scheduled_at || !vehicle_category) {
    return NextResponse.json({ error: "pickup_address, scheduled_at and vehicle_category are required" }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json({ success: true, demo: true, booking: { id: `BK-DEMO-${Date.now()}` } });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  // If customer_id provided, use it; otherwise look up by email or create
  let cid = customer_id;
  if (!cid && customer_email) {
    const { data: existing } = await supabase
      .from("customers")
      .select("id")
      .eq("email", customer_email)
      .single();
    if (existing) {
      cid = existing.id;
    } else if (customer_name) {
      const { data: created } = await supabase
        .from("customers")
        .insert([{ name: customer_name, email: customer_email || null, phone: customer_phone || null }])
        .select("id")
        .single();
      cid = created?.id;
    }
  }

  const { data, error } = await supabase.from("bookings").insert([{
    customer_id:      cid || null,
    pickup_address,
    dropoff_address:  dropoff_address || null,
    scheduled_at,
    vehicle_category,
    notes:            notes || null,
    driver_id:        driver_id || null,
    payment_method:   payment_method || "cash",
    payment_status:   "pending",
    total_amount:     total_amount || 0,
    status:           driver_id ? "confirmed" : "pending",
  }]).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send confirmation email if customer email available
  if (customer_email && data) {
    try {
      const { sendEmail, bookingConfirmationHtml } = await import("@chauffeur/utils");
      await sendEmail({
        to: customer_email,
        subject: `Booking Confirmed — ${data.id}`,
        html: bookingConfirmationHtml({
          id: data.id,
          pickup_address,
          dropoff_address,
          scheduled_at,
          total_amount: total_amount || 0,
          vehicle_category,
        }),
      });
    } catch { /* non-critical */ }
  }

  return NextResponse.json({ success: true, booking: data });
}
