import { NextRequest, NextResponse } from "next/server";

// GET — load current pricing config
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json({ pricing: getDefaultPricing() });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const { data, error } = await supabase.from("pricing_config").select("*").order("vehicle_category");
  if (error || !data || data.length === 0) {
    return NextResponse.json({ pricing: getDefaultPricing() });
  }

  return NextResponse.json({ pricing: data });
}

// POST — save pricing config (upsert)
export async function POST(req: NextRequest) {
  const { pricing } = await req.json();
  if (!Array.isArray(pricing) || pricing.length === 0) {
    return NextResponse.json({ error: "pricing array is required" }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ success: true, demo: true });

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const rows = pricing.map((p: any) => ({
    vehicle_category:  p.vehicle_category,
    base_rate_per_km:  p.base_rate_per_km,
    minimum_fare:      p.minimum_fare,
    airport_surcharge: p.airport_surcharge,
    after_hours_mult:  p.after_hours_mult,
    booking_fee:       p.booking_fee,
    updated_at:        new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("pricing_config")
    .upsert(rows, { onConflict: "vehicle_category" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

function getDefaultPricing() {
  return [
    { vehicle_category:"sedan",        base_rate_per_km:2.80, minimum_fare:65,  airport_surcharge:15, after_hours_mult:1.25, booking_fee:5  },
    { vehicle_category:"suv",          base_rate_per_km:3.50, minimum_fare:85,  airport_surcharge:20, after_hours_mult:1.25, booking_fee:5  },
    { vehicle_category:"luxury",       base_rate_per_km:5.50, minimum_fare:130, airport_surcharge:30, after_hours_mult:1.30, booking_fee:10 },
    { vehicle_category:"van",          base_rate_per_km:4.00, minimum_fare:100, airport_surcharge:25, after_hours_mult:1.20, booking_fee:5  },
    { vehicle_category:"stretch_limo", base_rate_per_km:8.00, minimum_fare:200, airport_surcharge:50, after_hours_mult:1.35, booking_fee:15 },
    { vehicle_category:"minibus",      base_rate_per_km:5.00, minimum_fare:150, airport_surcharge:35, after_hours_mult:1.25, booking_fee:10 },
  ];
}
