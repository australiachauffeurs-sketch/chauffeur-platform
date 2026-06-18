import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json({ vehicles: [], demo: true });
  }

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("vehicles")
    .select("id, make, model, year, plate, color, category, capacity, status")
    .neq("status", "maintenance")
    .order("category", { ascending: true })
    .order("make", { ascending: true });

  if (error) {
    return NextResponse.json({ vehicles: [], error: error.message });
  }

  return NextResponse.json({ vehicles: data || [] });
}
