import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const driverId = req.nextUrl.searchParams.get("driverId");
  if (!driverId) return NextResponse.json({ error: "driverId required" }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Not configured" }, { status: 500 });

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("drivers")
    .select("id, first_name, last_name, email, phone, rating, total_trips, vehicle_make, vehicle_model, vehicle_year, vehicle_plate, vehicle_category, status, is_approved")
    .eq("id", driverId)
    .single();

  if (error || !data) return NextResponse.json({ error: "Driver not found" }, { status: 404 });

  return NextResponse.json({ driver: data });
}
