import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ drivers: [] });

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("drivers")
    .select("id, first_name, last_name, email, phone, status, is_approved, vehicle_category, vehicle_plate, vehicle_make, vehicle_model, current_lat, current_lng, location_updated_at, rating, total_trips")
    .order("first_name", { ascending: true });

  if (error) return NextResponse.json({ drivers: [], error: error.message });

  return NextResponse.json({ drivers: data || [] });
}
