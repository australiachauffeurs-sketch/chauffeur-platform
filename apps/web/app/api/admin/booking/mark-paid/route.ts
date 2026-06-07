import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { bookingId, paymentMethod, notes } = await req.json();
  if (!bookingId) return NextResponse.json({ error: "bookingId required" }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key?.startsWith("eyJ")) return NextResponse.json({ ok: true, demo: true });

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const { error } = await supabase
    .from("bookings")
    .update({
      payment_status: "paid",
      payment_method: paymentMethod || "cash",
      payment_notes: notes || null,
      paid_at: new Date().toISOString(),
    })
    .eq("id", bookingId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
