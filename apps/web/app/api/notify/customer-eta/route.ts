import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { bookingId, status, driverName } = await req.json();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key?.startsWith("eyJ")) return NextResponse.json({ ok: true, demo: true });

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  // Get booking + customer push token
  const { data: booking } = await supabase
    .from("bookings")
    .select("customer_push_token, pickup_address")
    .eq("id", bookingId)
    .single();

  if (!booking?.customer_push_token) return NextResponse.json({ ok: true, no_token: true });

  const messages: Record<string, { title: string; body: string }> = {
    driver_assigned: { title: "Driver Assigned!", body: `${driverName} will be your chauffeur today.` },
    en_route:        { title: "Driver is on the way", body: `${driverName} is heading to your pickup location.` },
    arrived:         { title: "Driver has arrived", body: "Your chauffeur is waiting at the pickup point." },
  };

  const notif = messages[status];
  if (!notif) return NextResponse.json({ ok: true });

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      to: booking.customer_push_token,
      title: notif.title,
      body: notif.body,
      sound: "default",
      data: { bookingId, status },
    }),
  }).catch(() => {});

  return NextResponse.json({ ok: true });
}
