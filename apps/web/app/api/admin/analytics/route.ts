import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const range = req.nextUrl.searchParams.get("range") || "7"; // days

  if (!url || !key) {
    return NextResponse.json(getDemoData());
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const days     = parseInt(range) || 7;
  const since    = new Date();
  since.setDate(since.getDate() - days);
  const sinceISO = since.toISOString();

  const today      = new Date(); today.setHours(0,0,0,0);
  const weekStart  = new Date(); weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0,0,0,0);

  const [
    { data: rangeBookings },
    { data: allBookings },
    { data: drivers },
    { data: todayBookings },
    { data: weekBookings },
    { data: monthBookings },
    { data: activeTrips },
  ] = await Promise.all([
    supabase.from("bookings").select("created_at, scheduled_at, total_amount, status, pickup_address").gte("created_at", sinceISO),
    supabase.from("bookings").select("status, pickup_address, scheduled_at"),
    supabase.from("drivers").select("id, name, rating, trips: total_trips").order("total_trips", { ascending: false }).limit(10),
    supabase.from("bookings").select("id, total_amount, status").gte("created_at", today.toISOString()),
    supabase.from("bookings").select("id, total_amount, status").gte("created_at", weekStart.toISOString()),
    supabase.from("bookings").select("id, total_amount, status").gte("created_at", monthStart.toISOString()),
    supabase.from("bookings").select("id").eq("status", "in_progress"),
  ]);

  // Revenue by day (last N days)
  const revenueByDay: { date: string; revenue: number; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = i === 0 ? "Today" : i === 1 ? "Yesterday"
      : d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric" });
    const dayStart = new Date(d); dayStart.setHours(0,0,0,0);
    const dayEnd   = new Date(d); dayEnd.setHours(23,59,59,999);
    const dayBooks = (rangeBookings || []).filter((b: any) => {
      const t = new Date(b.created_at).getTime();
      return t >= dayStart.getTime() && t <= dayEnd.getTime();
    });
    revenueByDay.push({
      date: label,
      revenue: dayBooks.filter((b:any) => b.status !== "cancelled").reduce((s:number, b:any) => s + (b.total_amount||0), 0),
      count: dayBooks.length,
    });
  }

  // Status breakdown
  const statusCounts: Record<string,number> = {};
  (allBookings||[]).forEach((b:any) => { statusCounts[b.status] = (statusCounts[b.status]||0)+1; });
  const bookingsByStatus = Object.entries(statusCounts)
    .sort((a,b) => b[1]-a[1])
    .map(([status, count]) => ({ status, count }));

  // Peak hours (all time)
  const hourCounts = Array(24).fill(0);
  (allBookings||[]).forEach((b:any) => { if (b.scheduled_at) hourCounts[new Date(b.scheduled_at).getHours()]++; });
  const peakHours = hourCounts.map((count, hour) => ({ hour, count }));

  // Top pickup locations
  const pickupCounts: Record<string,number> = {};
  (allBookings||[]).forEach((b:any) => { if (b.pickup_address) pickupCounts[b.pickup_address] = (pickupCounts[b.pickup_address]||0)+1; });
  const topPickups = Object.entries(pickupCounts).sort((a,b)=>b[1]-a[1]).slice(0,7).map(([address,count])=>({ address, count }));

  // Top drivers — try to get revenue from bookings table
  const { data: driverRevenue } = await supabase
    .from("bookings")
    .select("driver_id, total_amount")
    .eq("status", "completed")
    .not("driver_id", "is", null);

  const driverRevMap: Record<string,number> = {};
  (driverRevenue||[]).forEach((b:any) => { if (b.driver_id) driverRevMap[b.driver_id] = (driverRevMap[b.driver_id]||0)+(b.total_amount||0); });

  const topDrivers = (drivers||[]).slice(0,5).map((d:any) => ({
    name:    d.name,
    trips:   d.trips || d.total_trips || 0,
    rating:  d.rating || 0,
    revenue: driverRevMap[d.id] || 0,
  }));

  // Headline KPIs
  const completedToday   = (todayBookings||[]).filter((b:any) => b.status!=="cancelled");
  const completedWeek    = (weekBookings||[]).filter((b:any) => b.status!=="cancelled");
  const completedMonth   = (monthBookings||[]).filter((b:any) => b.status!=="cancelled");
  const cancelledMonth   = (monthBookings||[]).filter((b:any) => b.status==="cancelled");
  const totalMonth       = (monthBookings||[]).length;

  const kpis = {
    revenueToday:       completedToday.reduce((s:number,b:any)=>s+(b.total_amount||0),0),
    revenueWeek:        completedWeek.reduce((s:number,b:any)=>s+(b.total_amount||0),0),
    revenueMonth:       completedMonth.reduce((s:number,b:any)=>s+(b.total_amount||0),0),
    bookingsToday:      (todayBookings||[]).length,
    bookingsMonth:      totalMonth,
    activeTrips:        (activeTrips||[]).length,
    cancellationRate:   totalMonth>0 ? Math.round((cancelledMonth.length/totalMonth)*100) : 0,
    avgOrderValue:      completedMonth.length>0 ? Math.round(completedMonth.reduce((s:number,b:any)=>s+(b.total_amount||0),0)/completedMonth.length) : 0,
  };

  return NextResponse.json({ revenueByDay, bookingsByStatus, peakHours, topPickups, topDrivers, kpis });
}

function getDemoData() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return {
    kpis: { revenueToday:1840, revenueWeek:12400, revenueMonth:48320, bookingsToday:6, bookingsMonth:142, activeTrips:3, cancellationRate:4, avgOrderValue:340 },
    revenueByDay: days.map((d,i) => ({ date:d, revenue:[1240,980,1560,2100,2800,1900,1100][i], count:[4,3,5,7,9,6,4][i] })),
    bookingsByStatus: [{ status:"completed",count:48},{ status:"confirmed",count:12},{ status:"pending",count:5},{ status:"in_progress",count:3},{ status:"cancelled",count:3}],
    topPickups: [
      { address:"Brisbane Airport T1", count:24 },{ address:"Queen St Mall, CBD",count:18 },
      { address:"South Bank Parklands",count:11 },{ address:"Fortitude Valley",  count:8 },
      { address:"Southport Station",   count:6  },
    ],
    peakHours: Array.from({length:24},(_,h)=>({ hour:h, count:[2,1,0,0,0,3,8,14,12,6,4,5,6,4,3,4,7,11,13,9,6,4,3,2][h] })),
    topDrivers: [
      { name:"James Wilson", trips:28, rating:4.9, revenue:4200 },
      { name:"Michael Chen", trips:22, rating:4.8, revenue:3300 },
      { name:"Sarah Patel",  trips:18, rating:5.0, revenue:2700 },
      { name:"Grace Nguyen", trips:14, rating:4.7, revenue:2100 },
    ],
  };
}
