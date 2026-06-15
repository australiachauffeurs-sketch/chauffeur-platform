import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [
      totalRes,
      activeRes,
      monthRevenueRes,
      driversRes,
      completedRes,
      cancelledRes,
      recentRes,
      chartRes,
      activeDriversRes,
    ] = await Promise.all([
      // Total bookings
      supabase.from("bookings").select("id", { count: "exact", head: true }),
      // Active trips
      supabase.from("bookings").select("id", { count: "exact", head: true })
        .in("status", ["in_progress", "driver_assigned", "en_route", "arrived"]),
      // Revenue this month
      supabase.from("bookings").select("total_amount")
        .eq("payment_status", "paid")
        .gte("created_at", startOfMonth),
      // Total approved drivers
      supabase.from("drivers").select("id", { count: "exact", head: true })
        .eq("is_approved", true),
      // Completed bookings (for completion rate)
      supabase.from("bookings").select("id", { count: "exact", head: true })
        .eq("status", "completed"),
      // Cancelled bookings
      supabase.from("bookings").select("id", { count: "exact", head: true })
        .eq("status", "cancelled"),
      // Recent bookings (last 8)
      supabase.from("bookings")
        .select("id, pickup_address, dropoff_address, vehicle_category, status, total_amount, created_at, customer_id")
        .order("created_at", { ascending: false })
        .limit(8),
      // Daily revenue last 30 days
      supabase.from("bookings")
        .select("created_at, total_amount")
        .eq("payment_status", "paid")
        .gte("created_at", thirtyDaysAgo),
      // Active drivers
      supabase.from("drivers")
        .select("id, first_name, last_name, vehicle_category, status, rating, is_online")
        .eq("is_approved", true)
        .in("status", ["available", "on_trip"])
        .limit(6),
    ]);

    // Stats
    const totalBookings   = totalRes.count   || 0;
    const activeTrips     = activeRes.count  || 0;
    const totalDrivers    = driversRes.count || 0;
    const completedCount  = completedRes.count || 0;
    const cancelledCount  = cancelledRes.count || 0;
    const donePlusCancelled = completedCount + cancelledCount;
    const completionRate = donePlusCancelled > 0
      ? Math.round((completedCount / donePlusCancelled) * 100)
      : 100;

    const revenue = (monthRevenueRes.data || []).reduce(
      (sum: number, b: any) => sum + (b.total_amount || 0), 0
    );

    // Customer lookups for recent bookings
    const customerIds = [...new Set(
      (recentRes.data || []).map((b: any) => b.customer_id).filter(Boolean)
    )];
    const custRes = customerIds.length
      ? await supabase.from("customers").select("id, first_name, last_name").in("id", customerIds)
      : { data: [] };
    const custMap: Record<string, any> = {};
    (custRes.data || []).forEach((c: any) => { custMap[c.id] = c; });

    const recentBookings = (recentRes.data || []).map((b: any) => {
      const cust = b.customer_id ? custMap[b.customer_id] : null;
      return {
        id:       String(b.id).slice(0, 8).toUpperCase(),
        customer: cust ? `${cust.first_name} ${cust.last_name}`.trim() : "Guest",
        route:    b.dropoff_address
          ? `${b.pickup_address} → ${b.dropoff_address}`
          : b.pickup_address,
        vehicle:  (b.vehicle_category || "sedan").replace("_", " "),
        status:   b.status || "pending",
        amount:   b.total_amount || 0,
      };
    });

    // Daily revenue chart (30 buckets)
    const dailyMap: Record<string, number> = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000);
      dailyMap[d.toISOString().slice(0, 10)] = 0;
    }
    (chartRes.data || []).forEach((b: any) => {
      const day = new Date(b.created_at).toISOString().slice(0, 10);
      if (day in dailyMap) dailyMap[day] += b.total_amount || 0;
    });
    const dailyRevenue = Object.entries(dailyMap).map(([date, amount]) => ({ date, amount }));

    // Revenue by city (extract city from pickup_address, use top 5)
    const allBookings30dRes = await supabase
      .from("bookings")
      .select("pickup_address, total_amount")
      .gte("created_at", thirtyDaysAgo)
      .not("total_amount", "is", null);

    const cityMap: Record<string, number> = {};
    (allBookings30dRes.data || []).forEach((b: any) => {
      if (!b.pickup_address) return;
      // Extract city: last meaningful part before a state/postcode
      const parts = b.pickup_address.split(",").map((s: string) => s.trim());
      const city = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
      if (city) cityMap[city] = (cityMap[city] || 0) + (b.total_amount || 0);
    });
    const maxCityRev = Math.max(...Object.values(cityMap), 1);
    const revenueByCity = Object.entries(cityMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([city, rev]) => ({ city, revenue: Math.round(rev), pct: Math.round((rev / maxCityRev) * 100) }));

    // Active drivers
    const activeDrivers = (activeDriversRes.data || []).map((d: any) => ({
      name:    `${d.first_name} ${d.last_name}`.trim(),
      vehicle: (d.vehicle_category || "sedan").replace("_", " "),
      status:  d.status || "available",
      rating:  d.rating || 5.0,
    }));

    return NextResponse.json({
      stats: {
        totalBookings,
        activeTrips,
        revenue: Math.round(revenue),
        totalDrivers,
        completionRate,
        avgRating: 4.9,
        recentBookings,
        dailyRevenue,
        revenueByCity,
        activeDrivers,
      },
    });
  } catch (err: any) {
    console.error("[Admin stats] Error:", err);
    return NextResponse.json({ error: err.message || "Failed to load stats" }, { status: 500 });
  }
}
