import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const { bookingId, paymentMethod } = await req.json();
  if (!bookingId) return NextResponse.json({ error: "bookingId required" }, { status: 400 });

  const { error } = await supabase
    .from("bookings")
    .update({ payment_status: "paid", payment_method: paymentMethod || "cash", paid_at: new Date().toISOString() })
    .eq("id", bookingId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
