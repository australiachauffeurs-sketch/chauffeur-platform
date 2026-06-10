import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    driverId,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    vehiclePlate,
    vehicleCategory,
    licenseExpiry,
    insuranceExpiry,
    registrationExpiry,
  } = await req.json();

  if (!driverId) return NextResponse.json({ error: "driverId required" }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || (!key?.startsWith("eyJ") && !key?.startsWith("sb_secret_"))) {
    // Demo mode — accept without DB
    return NextResponse.json({ ok: true, demo: true });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const { error } = await supabase
    .from("drivers")
    .update({
      vehicle_make:         vehicleMake        || null,
      vehicle_model:        vehicleModel       || null,
      vehicle_year:         vehicleYear        || null,
      vehicle_plate:        vehiclePlate       || null,
      vehicle_category:     vehicleCategory    || null,
      license_expiry:       licenseExpiry      || null,
      insurance_expiry:     insuranceExpiry    || null,
      registration_expiry:  registrationExpiry || null,
      onboarding_complete:  true,
    })
    .eq("id", driverId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
