import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { driverId, bookingId, lat, lng, heading, speed, accuracy } = await req.json();

  if (!driverId || lat == null || lng == null) {
    return NextResponse.json({ error: "driverId, lat, lng required" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") || (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    return NextResponse.json({ success: true, demo: true });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);

  const now = new Date().toISOString();

  // 1. Update the drivers table (current location snapshot)
  const { error: driverErr } = await supabase
    .from("drivers")
    .update({ current_lat: lat, current_lng: lng, location_updated_at: now })
    .eq("id", driverId);

  if (driverErr) console.error("[Location] drivers update error:", driverErr);

  // 2. Upsert into driver_locations — triggers Supabase Realtime to all subscribers
  const { error: locErr } = await supabase
    .from("driver_locations")
    .upsert({
      driver_id:  driverId,
      booking_id: bookingId ?? null,
      lat,
      lng,
      heading:    heading  ?? null,
      speed:      speed    ?? null,
      accuracy:   accuracy ?? null,
      updated_at: now,
    }, { onConflict: "driver_id" });

  if (locErr) console.error("[Location] driver_locations upsert error:", locErr);

  return NextResponse.json({ success: true });
}
