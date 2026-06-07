import { NextResponse } from "next/server";

const DEMO_JOBS = [
  { id:"BK8825", customer:"James Whitfield",  pickup:"Sydney Airport T1",    dropoff:"1 Martin Place, CBD",    distanceKm:24.3, durationMin:32, amount:142.35, vehicle:"Executive Sedan", scheduledAt:"2026-06-28T06:30", passengers:2, luggage:3, flightNumber:"QF401" },
  { id:"BK8826", customer:"Emma Johnson",     pickup:"Intercontinental Sydney",dropoff:"Sydney Airport T2",     distanceKm:18.7, durationMin:28, amount:98.50,  vehicle:"Executive Sedan", scheduledAt:"2026-06-28T09:00", passengers:1, luggage:2, flightNumber:""      },
];

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") || (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    return NextResponse.json({ jobs: DEMO_JOBS, demo: true });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .in("status", ["pending", "confirmed"])
    .is("driver_id", null)
    .order("scheduled_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ jobs: data });
}
