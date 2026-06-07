import { NextRequest, NextResponse } from "next/server";

function isAdminRequest(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET;
  if (adminSecret) {
    return req.headers.get("x-admin-secret") === adminSecret;
  }
  const origin  = req.headers.get("origin") || "";
  const referer = req.headers.get("referer") || "";
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";
  return origin.startsWith(adminUrl) || referer.startsWith(adminUrl);
}

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") ||
      (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    // Demo fallback
    return NextResponse.json({
      demo: true,
      stats: {
        totalBookings: 1284, activeTrips: 7, revenue: 48320,
        totalDrivers: 34, totalCustomers: 856, completionRate: 98.2, avgRating: 4.91,
        revenueByCity: [
          { city: "Sydney", pct: 38, revenue: 18360 },
          { city: "Melbourne", pct: 28, revenue: 13530 },
          { city: "Brisbane", pct: 16, revenue: 7731 },
          { city: "Gold Coast", pct: 10, revenue: 4832 },
          { city: "Perth", pct: 8, revenue: 3866 },
        ],
        recentBookings: [
          { id: "BK8821", customer: "James Whitfield", route: "Sydney Airport → CBD", vehicle: "Sedan", status: "confirmed", amount: 142 },
          { id: "BK8820", customer: "Priya Sharma", route: "Crown Casino → MEL Airport", vehicle: "SUV", status: "in_progress", amount: 188 },
        ],
        activeDrivers: [
          { name: "Marcus Thompson", vehicle: "Mercedes E-Class", status: "on_trip", rating: 4.98 },
          { name: "Ahmed Al-Rashid", vehicle: "Mercedes GLE", status: "available", rating: 4.95 },
        ],
      },
    });
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, serviceKey!);

    // ── Parallel queries ──────────────────────────────────────────────────
    const [bookingsRes, driversRes, customersRes, recentRes] = await Promise.all([
      supabase.from("bookings").select("status, total_amount, vehicle_category, pickup_address, dropoff_address, created_at", { count: "exact" }),
      supabase.from("drivers").select("id, first_name, last_name, status, rating, is_approved", { count: "exact" }),
      supabase.from("customers").select("id", { count: "exact" }),
      supabase.from("bookings").select("id, status, total_amount, vehicle_category, pickup_address, dropoff_address, scheduled_at, created_at, customer_id, customers(first_name, last_name)").order("created_at", { ascending: false }).limit(5),
    ]);

    const bookings    = bookingsRes.data || [];
    const drivers     = driversRes.data || [];
    const completed   = bookings.filter(b => b.status === "completed");
    const activeTrips = bookings.filter(b => ["en_route", "arrived", "in_progress"].includes(b.status)).length;
    const revenue     = bookings.reduce((s, b) => s + (b.total_amount || 0), 0);
    const totalBookings = bookingsRes.count || 0;

    // Completion rate
    const completionRate = totalBookings > 0
      ? ((completed.length / totalBookings) * 100).toFixed(1)
      : "0";

    // Avg rating from drivers
    const ratedDrivers = drivers.filter(d => d.rating && d.rating > 0);
    const avgRating = ratedDrivers.length > 0
      ? (ratedDrivers.reduce((s, d) => s + d.rating, 0) / ratedDrivers.length).toFixed(2)
      : "0";

    // Recent bookings formatted for dashboard
    const recentBookings = (recentRes.data || []).map((b: any) => {
      const cust = b.customers as any;
      const customerName = cust
        ? `${cust.first_name || ""} ${cust.last_name || ""}`.trim()
        : "Unknown";
      return {
        id:       b.id?.substring(0, 8)?.toUpperCase() || "—",
        customer: customerName,
        route:    `${(b.pickup_address || "Pickup").substring(0, 30)} → ${(b.dropoff_address || "Dropoff").substring(0, 30)}`,
        vehicle:  (b.vehicle_category || "sedan").replace("_", " "),
        status:   b.status || "pending",
        amount:   b.total_amount || 0,
      };
    });

    // Active drivers formatted
    const activeDrivers = drivers
      .filter(d => d.is_approved)
      .slice(0, 6)
      .map(d => ({
        name:    `${d.first_name || ""} ${d.last_name || ""}`.trim() || "Driver",
        vehicle: "Elite Vehicle",
        status:  d.status || "offline",
        rating:  d.rating || 0,
      }));

    // Revenue by city — approximate from booking addresses
    // Since we don't have city data directly, we'll group what we can
    const cityKeywords: Record<string, string[]> = {
      "Sydney":     ["sydney", "syd"],
      "Melbourne":  ["melbourne", "mel"],
      "Brisbane":   ["brisbane", "bne"],
      "Gold Coast": ["gold coast", "surfers"],
      "Perth":      ["perth", "per"],
      "Adelaide":   ["adelaide", "adl"],
      "Canberra":   ["canberra", "cbr"],
      "Other":      [],
    };

    const cityRevenue: Record<string, number> = {};
    for (const b of bookings) {
      const addr = ((b.pickup_address || "") + " " + (b.dropoff_address || "")).toLowerCase();
      let matched = false;
      for (const [city, keywords] of Object.entries(cityKeywords)) {
        if (city === "Other") continue;
        if (keywords.some(k => addr.includes(k))) {
          cityRevenue[city] = (cityRevenue[city] || 0) + (b.total_amount || 0);
          matched = true;
          break;
        }
      }
      if (!matched) {
        cityRevenue["Other"] = (cityRevenue["Other"] || 0) + (b.total_amount || 0);
      }
    }

    const totalRev = Object.values(cityRevenue).reduce((s, v) => s + v, 0) || 1;
    const revenueByCity = Object.entries(cityRevenue)
      .filter(([, v]) => v > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([city, rev]) => ({
        city,
        revenue: Math.round(rev),
        pct: Math.round((rev / totalRev) * 100),
      }));

    return NextResponse.json({
      stats: {
        totalBookings,
        activeTrips,
        revenue: Math.round(revenue),
        totalDrivers:   driversRes.count || 0,
        totalCustomers: customersRes.count || 0,
        completionRate: parseFloat(completionRate),
        avgRating:      parseFloat(avgRating as string),
        recentBookings,
        activeDrivers,
        revenueByCity: revenueByCity.length > 0 ? revenueByCity : [{ city: "No data yet", revenue: 0, pct: 0 }],
      },
    });

  } catch (err) {
    console.error("[Admin stats] Error:", err);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
