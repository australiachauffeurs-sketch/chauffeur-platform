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

  const normalizedEmail = email.trim().toLowerCase();

  // 1. Try to create Supabase Auth user
  let authUserId: string;
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: normalizedEmail,
    password,
    email_confirm: true,
    user_metadata: { firstName, lastName, role: "driver" },
  });

  if (authError) {
    const msg = authError.message?.toLowerCase() ?? "";
    if (msg.includes("already registered") || msg.includes("already exists")) {
      // User exists in auth — look them up and reuse their ID with the new password
      const { data: { users }, error: listErr } = await supabase.auth.admin.listUsers({ perPage: 1000 });
      if (listErr) return NextResponse.json({ error: listErr.message }, { status: 500 });
      const existing = users?.find((u: any) => u.email?.toLowerCase() === normalizedEmail);
      if (!existing) return NextResponse.json({ error: "Email already in use." }, { status: 409 });

      // Check if a driver row already exists for this user
      const { data: existingDriver } = await supabase.from("drivers").select("id").eq("id", existing.id).maybeSingle();
      if (existingDriver) {
        return NextResponse.json({ error: "A driver account with this email already exists." }, { status: 409 });
      }

      // Update their password to the one admin set
      await supabase.auth.admin.updateUserById(existing.id, { password });
      authUserId = existing.id;
    } else {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }
  } else {
    authUserId = authData.user.id;
  }

  // 2. Insert driver row — pre-approved and onboarding complete since admin created it
  // Build insert using only columns that exist in the drivers table
  const insertData: any = {
    id:          authUserId,
    name:        `${firstName.trim()} ${lastName.trim()}`,
    email:       normalizedEmail,
    phone:       phone || null,
    is_approved: true,
    status:      "offline",
    rating:      0,
    trips:       0,
  };

  // Optional columns — add only if the table has them (safe to try; error will say which ones to drop)
  if (vehicle_category) insertData.vehicle_category = vehicle_category;
  if (vehicle_make)     insertData.vehicle_make     = vehicle_make;
  if (vehicle_model)    insertData.vehicle_model    = vehicle_model;
  if (vehicle_year)     insertData.vehicle_year     = parseInt(vehicle_year);
  if (vehicle_plate)    insertData.vehicle_plate    = vehicle_plate;

  const { data: driver, error: driverError } = await supabase.from("drivers").insert(insertData).select("id, name, email").single();

  if (driverError) {
    // Roll back: delete the auth user we just created
    await supabase.auth.admin.deleteUser(authUserId);
    return NextResponse.json({ error: "Failed to create driver profile: " + driverError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    driver: {
      id:       driver.id,
      name:     driver.name,
      email:    driver.email,
    },
  });
}
