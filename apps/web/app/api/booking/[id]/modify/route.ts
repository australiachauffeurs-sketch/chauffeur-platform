import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { scheduledAt, pickupAddress, dropoffAddress, passengers, luggage, notes } = await req.json();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key?.startsWith("eyJ")) return NextResponse.json({ ok: true, demo: true });

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  // Only allow modifying pending or confirmed bookings
  const { data: booking } = await supabase
    .from("bookings")
    .select("status")
    .eq("id", params.id)
    .single();

  if (!booking || !["pending", "confirmed"].includes(booking.status)) {
    return NextResponse.json(
      { error: "Cannot modify a booking that is already in progress" },
      { status: 400 }
    );
  }

  const updates: Record<string, any> = {};
  if (scheduledAt)           updates.scheduled_at          = scheduledAt;
  if (pickupAddress)         updates.pickup_address         = pickupAddress;
  if (dropoffAddress)        updates.dropoff_address        = dropoffAddress;
  if (passengers)            updates.passengers             = passengers;
  if (luggage !== undefined) updates.luggage                = luggage;
  if (notes)                 updates.special_instructions   = notes;

  const { error } = await supabase.from("bookings").update(updates).eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
