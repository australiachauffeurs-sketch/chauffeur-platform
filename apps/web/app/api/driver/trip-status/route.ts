import { NextRequest, NextResponse } from "next/server";

const VALID_STATUSES = ["en_route", "arrived", "in_progress", "completed"];

export async function POST(req: NextRequest) {
  const { bookingId, driverId, status } = await req.json();

  if (!bookingId || !status) {
    return NextResponse.json({ error: "bookingId and status required" }, { status: 400 });
  }
  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") || (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    return NextResponse.json({ success: true, bookingId, status, demo: true });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);

  const updates: Record<string, any> = { status };
  if (status === "completed") {
    updates.driver_id = driverId;
  }

  const { error } = await supabase
    .from("bookings")
    .update(updates)
    .eq("id", bookingId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // When trip completes, free up the driver
  if (status === "completed" && driverId) {
    await supabase.from("drivers").update({ status: "available" }).eq("id", driverId);
  }

  // Send push notification to customer for key status changes
  if (["en_route", "arrived", "driver_assigned"].includes(status)) {
    const { data: driver } = driverId
      ? await supabase.from("drivers").select("first_name, last_name").eq("id", driverId).single()
      : { data: null };
    const driverName = driver
      ? [driver.first_name, driver.last_name].filter(Boolean).join(" ")
      : "Your driver";
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    fetch(`${baseUrl}/api/notify/customer-eta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, status, driverName }),
    }).catch(() => {});
  }

  return NextResponse.json({ success: true, bookingId, status });
}
