import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { bookingId, status, driver_id } = await req.json();

  if (!bookingId || !status) {
    return NextResponse.json({ error: "bookingId and status are required" }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ success: true, demo: true });

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const update: any = { status };
  if (driver_id !== undefined) update.driver_id = driver_id;
  if (status === "completed") update.completed_at = new Date().toISOString();
  if (status === "cancelled") update.cancelled_at = new Date().toISOString();

  const { error } = await supabase.from("bookings").update(update).eq("id", bookingId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
