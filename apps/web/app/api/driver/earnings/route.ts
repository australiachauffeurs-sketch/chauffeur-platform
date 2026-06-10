import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const driverId = req.nextUrl.searchParams.get("driverId");
  const period   = req.nextUrl.searchParams.get("period") || "week";

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || (!key?.startsWith("eyJ") && !key?.startsWith("sb_secret_"))) {
    // Demo data (only when Supabase is not configured)
    return NextResponse.json({
      stats: { total: 1840.50, tripCount: 12, avgPerTrip: 153.38, longestKm: 48 },
      trips: [
        { id: "1", pickup_address: "Adelaide Airport T1", total_amount: 185, scheduled_at: new Date().toISOString() },
        { id: "2", pickup_address: "King William St, CBD", total_amount: 120, scheduled_at: new Date().toISOString() },
        { id: "3", pickup_address: "Glenelg Beach",        total_amount: 95,  scheduled_at: new Date().toISOString() },
      ],
    });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const now = new Date();
  let fromDate: Date | null = null;
  if (period === "today") {
    fromDate = new Date(now);
    fromDate.setHours(0, 0, 0, 0);
  } else if (period === "week") {
    fromDate = new Date(now);
    fromDate.setDate(now.getDate() - 7);
  } else if (period === "month") {
    fromDate = new Date(now);
    fromDate.setDate(1);
    fromDate.setHours(0, 0, 0, 0);
  }

  let query = supabase
    .from("bookings")
    .select("id, pickup_address, total_amount, scheduled_at, completed_at, distance_km")
    .eq("driver_id", driverId)
    .eq("status", "completed")
    .order("scheduled_at", { ascending: false });

  if (fromDate) query = query.gte("scheduled_at", fromDate.toISOString());

  const { data: trips } = await query;
  const total     = trips?.reduce((s: number, t: any) => s + (t.total_amount || 0), 0) || 0;
  const tripCount = trips?.length || 0;
  const longestKm = trips?.reduce((m: number, t: any) => Math.max(m, t.distance_km || 0), 0) || 0;

  return NextResponse.json({
    stats: { total, tripCount, avgPerTrip: tripCount ? total / tripCount : 0, longestKm },
    trips: trips || [],
  });
}
