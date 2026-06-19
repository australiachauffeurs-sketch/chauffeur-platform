import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const supabase = createClient(url, key);

  const {
    firstName, lastName, email, password, phone,
    vehicle_category, vehicle_make, vehicle_model, vehicle_year, vehicle_plate,
  } = await req.json();

  if (!firstName || !lastName || !email || !password || !phone) {
    return NextResponse.json({ error: "First name, last name, phone, email and password are required." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // 1. Create Supabase Auth user
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
      const { data: { users }, error: listErr } = await supabase.auth.admin.listUsers({ perPage: 1000 });
      if (listErr) return NextResponse.json({ error: listErr.message }, { status: 500 });
      const existing = users?.find((u: any) => u.email?.toLowerCase() === normalizedEmail);
      if (!existing) return NextResponse.json({ error: "Email already in use." }, { status: 409 });

      const { data: existingDriver } = await supabase.from("drivers").select("id").eq("id", existing.id).maybeSingle();
      if (existingDriver) {
        return NextResponse.json({ error: "A driver account with this email already exists." }, { status: 409 });
      }

      await supabase.auth.admin.updateUserById(existing.id, { password });
      authUserId = existing.id;
    } else {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }
  } else {
    authUserId = authData.user.id;
  }

  // 2. Insert driver row with correct column names from actual DB schema
  const insertData: any = {
    id:                  authUserId,
    user_id:             authUserId,
    first_name:          firstName.trim(),
    last_name:           lastName.trim(),
    email:               normalizedEmail,
    phone:               phone.trim(),
    is_approved:         true,
    status:              "offline",
    rating:              0,
    total_trips:         0,
    onboarding_complete: true,
  };

  if (vehicle_category) insertData.vehicle_category = vehicle_category;
  if (vehicle_make)     insertData.vehicle_make     = vehicle_make.trim();
  if (vehicle_model)    insertData.vehicle_model    = vehicle_model.trim();
  if (vehicle_year)     insertData.vehicle_year     = parseInt(vehicle_year);
  if (vehicle_plate)    insertData.vehicle_plate    = vehicle_plate.trim().toUpperCase();

  const { data: driver, error: driverError } = await supabase
    .from("drivers")
    .insert(insertData)
    .select("id, first_name, last_name, email")
    .single();

  if (driverError) {
    await supabase.auth.admin.deleteUser(authUserId);
    return NextResponse.json({ error: "Failed to create driver profile: " + driverError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    driver: {
      id:    driver.id,
      name:  [driver.first_name, driver.last_name].filter(Boolean).join(" "),
      email: driver.email,
    },
  });
}
