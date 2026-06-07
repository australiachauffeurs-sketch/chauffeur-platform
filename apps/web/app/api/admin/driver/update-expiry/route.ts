import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { driverId, license_expiry, insurance_expiry, registration_expiry } = await req.json();

  if (!driverId) return NextResponse.json({ error: "driverId required" }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key?.startsWith("eyJ")) {
    return NextResponse.json({ ok: true, demo: true });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const { error } = await supabase
    .from("drivers")
    .update({
      license_expiry:      license_expiry      || null,
      insurance_expiry:    insurance_expiry    || null,
      registration_expiry: registration_expiry || null,
    })
    .eq("id", driverId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
