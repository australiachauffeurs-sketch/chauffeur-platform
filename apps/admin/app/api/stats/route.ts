import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") || !serviceKey) {
    return NextResponse.json({
      demo: true,
      stats: {
        totalBookings: 1284, activeTrips: 7, revenue: 48320,
        totalDrivers: 34, completionRate: 98.2, avgRating: 4.91,
      },
    });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);

  const [bookings, drivers] = await Promise.all([
    supabase.from("bookings").select("status, total_amount", { count: "exact" }),
    supabase.from("drivers").select("id, is_approved, status", { count: "exact" }),
  ]);

  const completed = bookings.data?.filter(b => b.status === "completed") || [];
  const revenue   = completed.reduce((s, b) => s + (b.total_amount || 0), 0);
  const active    = bookings.data?.filter(b => ["en_route","arrived","in_progress"].includes(b.status)).length || 0;

  return NextResponse.json({
    stats: {
      totalBookings:  bookings.count || 0,
      activeTrips:    active,
      revenue:        revenue,
      totalDrivers:   drivers.count || 0,
      completionRate: bookings.count ? ((completed.length / bookings.count) * 100).toFixed(1) : 0,
      avgRating:      4.91,
    },
  });
}
