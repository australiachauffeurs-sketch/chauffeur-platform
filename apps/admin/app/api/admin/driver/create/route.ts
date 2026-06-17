import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const supabase = createClient(url, key);

  const {
    firstName, lastName, email, password,
    phone, city, vehicle_category,
    vehicle_make, vehicle_model, vehicle_year, vehicle_plate,
  } = await req.json();

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: "First name, last name, email and password are required." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  // 1. Create Supabase Auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: email.trim().toLowerCase(),
    password,
    email_confirm: true,
    user_metadata: { firstName, lastName, role: "driver" },
  });

  if (authError) {
    if (authError.message?.toLowerCase().includes("already registered") || authError.message?.toLowerCase().includes("already exists")) {
      return NextResponse.json({ error: "A user with this email already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const authUserId = authData.user.id;

  // 2. Insert driver row — pre-approved and onboarding complete since admin created it
  const { data: driver, error: driverError } = await supabase.from("drivers").insert({
    id:                  authUserId,
    first_name:          firstName.trim(),
    last_name:           lastName.trim(),
    name:                `${firstName.trim()} ${lastName.trim()}`,
    email:               email.trim().toLowerCase(),
    phone:               phone || null,
    city:                city || null,
    vehicle_category:    vehicle_category || "sedan",
    vehicle_make:        vehicle_make || null,
    vehicle_model:       vehicle_model || null,
    vehicle_year:        vehicle_year ? parseInt(vehicle_year) : null,
    vehicle_plate:       vehicle_plate || null,
    is_approved:         true,
    onboarding_complete: true,
    status:              "offline",
    is_online:           false,
    rating:              0,
    total_trips:         0,
  }).select("id, first_name, last_name, email").single();

  if (driverError) {
    // Roll back: delete the auth user we just created
    await supabase.auth.admin.deleteUser(authUserId);
    return NextResponse.json({ error: "Failed to create driver profile: " + driverError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    driver: {
      id:       driver.id,
      name:     `${driver.first_name} ${driver.last_name}`,
      email:    driver.email,
    },
  });
}
