import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key?.startsWith("eyJ")) {
    return NextResponse.json({
      revenueByDay: [
        { date: "Mon", revenue: 1240 }, { date: "Tue", revenue: 980 },
        { date: "Wed", revenue: 1560 }, { date: "Thu", revenue: 2100 },
        { date: "Fri", revenue: 2800 }, { date: "Sat", revenue: 1900 },
        { date: "Sun", revenue: 1100 },
      ],
      bookingsByStatus: [
        { status: "completed", count: 48 }, { status: "confirmed", count: 12 },
        { status: "pending", count: 5 },   { status: "cancelled", count: 3 },
      ],
      topPickups: [
        { address: "Sydney Airport T1", count: 24 },
        { address: "Martin Place, CBD", count: 18 },
        { address: "Bondi Beach", count: 11 },
        { address: "Star City Casino", count: 8 },
        { address: "Darling Harbour", count: 6 },
      ],
      peakHours: Array.from({ length: 24 }, (_, h) => ({
        hour: h, count: [2,1,0,0,0,3,8,14,12,6,4,5,6,4,3,4,7,11,13,9,6,4,3,2][h],
      })),
      topDrivers: [
        { name: "James Wilson", trips: 28, rating: 4.9, revenue: 4200 },
        { name: "Michael Chen", trips: 22, rating: 4.8, revenue: 3300 },
        { name: "Sarah Patel",  trips: 18, rating: 5.0, revenue: 2700 },
      ],
    });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [{ data: recentBookings }, { data: allBookings }, { data: drivers }] = await Promise.all([
    supabase.from("bookings").select("scheduled_at, total_amount, status").gte("created_at", sevenDaysAgo.toISOString()),
    supabase.from("bookings").select("status, pickup_address, scheduled_at"),
    supabase.from("drivers").select("name, total_trips, avg_rating"),
  ]);

  // Group revenue by day of week
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const revenueByDay = dayNames.map(day => ({
    date: day,
    revenue: (recentBookings || []).filter((b: any) => {
      const d = new Date(b.scheduled_at);
      return dayNames[d.getDay()] === day && b.status === "completed";
    }).reduce((s: number, b: any) => s + (b.total_amount || 0), 0),
  }));

  // Status counts
  const statusCounts: Record<string, number> = {};
  (allBookings || []).forEach((b: any) => { statusCounts[b.status] = (statusCounts[b.status] || 0) + 1; });
  const bookingsByStatus = Object.entries(statusCounts).map(([status, count]) => ({ status, count }));

  // Peak hours
  const hourCounts = Array(24).fill(0);
  (allBookings || []).forEach((b: any) => { const h = new Date(b.scheduled_at).getHours(); hourCounts[h]++; });
  const peakHours = hourCounts.map((count, hour) => ({ hour, count }));

  // Top pickups
  const pickupCounts: Record<string, number> = {};
  (allBookings || []).forEach((b: any) => { if (b.pickup_address) pickupCounts[b.pickup_address] = (pickupCounts[b.pickup_address] || 0) + 1; });
  const topPickups = Object.entries(pickupCounts).sort((a,b) => b[1]-a[1]).slice(0, 5).map(([address, count]) => ({ address, count }));

  return NextResponse.json({ revenueByDay, bookingsByStatus, peakHours, topPickups, topDrivers: drivers?.slice(0,5) || [] });
}
