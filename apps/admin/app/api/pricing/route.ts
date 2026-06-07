import { NextRequest, NextResponse } from "next/server";

// GET — fetch current pricing config
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") || !serviceKey) {
    // Return default pricing in demo mode
    return NextResponse.json({
      demo: true,
      pricing: [
        { vehicle_category:"sedan",        base_rate_per_km:2.80, minimum_fare:65,  airport_surcharge:15, after_hours_mult:1.25, booking_fee:5  },
        { vehicle_category:"suv",          base_rate_per_km:3.50, minimum_fare:85,  airport_surcharge:20, after_hours_mult:1.25, booking_fee:5  },
        { vehicle_category:"luxury",       base_rate_per_km:5.50, minimum_fare:130, airport_surcharge:30, after_hours_mult:1.30, booking_fee:10 },
        { vehicle_category:"van",          base_rate_per_km:4.00, minimum_fare:100, airport_surcharge:25, after_hours_mult:1.20, booking_fee:5  },
        { vehicle_category:"stretch_limo", base_rate_per_km:8.00, minimum_fare:200, airport_surcharge:50, after_hours_mult:1.35, booking_fee:15 },
      ],
    });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);
  const { data, error } = await supabase.from("pricing_config").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pricing: data });
}

// POST — update pricing config
export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const body = await req.json();

  if (!supabaseUrl || supabaseUrl.includes("your-project") || !serviceKey) {
    return NextResponse.json({ success: true, demo: true, message: "Pricing updated (demo mode)" });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);

  for (const row of body.pricing) {
    await supabase.from("pricing_config").upsert(row, { onConflict: "vehicle_category" });
  }

  return NextResponse.json({ success: true });
}
