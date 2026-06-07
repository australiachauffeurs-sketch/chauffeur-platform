import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { bookingId, driverId } = await req.json();
  if (!bookingId) return NextResponse.json({ error: "bookingId required" }, { status: 400 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") || (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    return NextResponse.json({ success: true, bookingId, status: "driver_assigned", demo: true });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);

  const [bookingUpdate, driverUpdate] = await Promise.all([
    supabase.from("bookings").update({ status: "driver_assigned", driver_id: driverId }).eq("id", bookingId),
    supabase.from("drivers").update({ status: "on_trip" }).eq("id", driverId),
  ]);

  if (bookingUpdate.error) return NextResponse.json({ error: bookingUpdate.error.message }, { status: 500 });
  return NextResponse.json({ success: true, bookingId, status: "driver_assigned" });
}
