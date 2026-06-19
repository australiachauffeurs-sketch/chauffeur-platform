import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Supabase not configured", drivers: [] }, { status: 500 });

  const supabase = createClient(url, key);
  const { searchParams } = new URL(req.url);
  const limit  = parseInt(searchParams.get("limit") || "100");
  const search = searchParams.get("search")?.toLowerCase() || "";

  const { data, error } = await supabase
    .from("drivers")
    .select("id, first_name, last_name, email, phone, vehicle_category, vehicle_plate, vehicle_model, status, is_approved")
    .order("first_name", { ascending: true })
    .limit(limit);

  if (error) return NextResponse.json({ error: error.message, drivers: [] }, { status: 500 });

  let drivers = (data || []).map((d: any) => ({
    id:       d.id,
    name:     [d.first_name, d.last_name].filter(Boolean).join(" ") || "",
    email:    d.email,
    phone:    d.phone,
    vehicle:  d.vehicle_category,
    plate:    d.vehicle_plate,
    model:    d.vehicle_model,
    status:   d.status,
    approved: d.is_approved,
    online:   d.status === "online",
  }));

  if (search) {
    drivers = drivers.filter(d =>
      d.name.toLowerCase().includes(search) ||
      d.email?.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ drivers, total: drivers.length });
}
