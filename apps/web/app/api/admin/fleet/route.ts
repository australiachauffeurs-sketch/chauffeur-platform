import { NextRequest, NextResponse } from "next/server";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const { createClient } = require("@supabase/supabase-js");
  return createClient(url, key);
}

// GET /api/admin/fleet — list all vehicles
export async function GET(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ vehicles: getDemoVehicles(), total: 6, demo: true });
  }

  const search = req.nextUrl.searchParams.get("search") || "";

  let query = supabase
    .from("vehicles")
    .select(`
      id, make, model, year, plate, color, category, capacity, status,
      driver_id,
      drivers ( id, name )
    `, { count: "exact" })
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`make.ilike.%${search}%,model.ilike.%${search}%,plate.ilike.%${search}%`);
  }

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const vehicles = (data || []).map((v: any) => ({
    id:       v.id,
    make:     v.make,
    model:    v.model,
    year:     v.year,
    plate:    v.plate,
    color:    v.color,
    category: v.category,
    capacity: v.capacity,
    status:   v.status || "available",
    driver_id: v.driver_id,
    driver:   v.drivers?.name || "Unassigned",
  }));

  return NextResponse.json({ vehicles, total: count || 0 });
}

// POST /api/admin/fleet — add vehicle
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { make, model, year, plate, color, category, capacity, driver_id } = body;

  if (!make || !model || !plate || !category) {
    return NextResponse.json({ error: "make, model, plate and category are required" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ success: true, demo: true });

  const { data, error } = await supabase.from("vehicles").insert([{
    make, model,
    year:     year     || new Date().getFullYear(),
    plate:    plate.toUpperCase(),
    color:    color    || "",
    category,
    capacity: capacity || 3,
    status:   "available",
    driver_id: driver_id || null,
  }]).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, vehicle: data });
}

// PATCH /api/admin/fleet — update vehicle
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, ...fields } = body;
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ success: true, demo: true });

  const allowed = ["make","model","year","plate","color","category","capacity","status","driver_id"];
  const update: any = {};
  for (const k of allowed) if (fields[k] !== undefined) update[k] = fields[k];

  if (update.plate) update.plate = update.plate.toUpperCase();

  const { error } = await supabase.from("vehicles").update(update).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE /api/admin/fleet — remove vehicle
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ success: true, demo: true });

  const { error } = await supabase.from("vehicles").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

function getDemoVehicles() {
  return [
    { id:"V001", make:"Mercedes-Benz", model:"E-Class W213", year:2023, plate:"ABC 123", color:"Obsidian Black", category:"sedan",        capacity:3, driver:"Marcus Thompson", driver_id:null, status:"on_trip"   },
    { id:"V002", make:"Mercedes-Benz", model:"GLE 450",      year:2024, plate:"DEF 456", color:"Polar White",    category:"suv",          capacity:6, driver:"Ahmed Al-Rashid", driver_id:null, status:"available" },
    { id:"V003", make:"Mercedes-Benz", model:"S-Class W223", year:2023, plate:"GHI 789", color:"Graphite Grey",  category:"luxury",       capacity:3, driver:"Grace Nguyen",    driver_id:null, status:"on_trip"   },
    { id:"V004", make:"Mercedes-Benz", model:"V-Class",      year:2022, plate:"JKL 012", color:"Obsidian Black", category:"van",          capacity:8, driver:"Robert Wilson",   driver_id:null, status:"available" },
    { id:"V005", make:"Mercedes-Benz", model:"E-Class W213", year:2023, plate:"MNO 345", color:"Polar White",    category:"sedan",        capacity:3, driver:"Lily Chen",       driver_id:null, status:"offline"   },
    { id:"V006", make:"Lincoln",       model:"Town Car",     year:2022, plate:"PQR 678", color:"Gloss Black",    category:"stretch_limo", capacity:8, driver:"Unassigned",      driver_id:null, status:"available" },
  ];
}
