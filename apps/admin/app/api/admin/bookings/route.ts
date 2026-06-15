import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    console.error("[Admin bookings] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return NextResponse.json({ error: "Supabase not configured — check environment variables", bookings: [], total: 0 }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "all";
  const search = searchParams.get("search")?.toLowerCase() || "";
  const page   = parseInt(searchParams.get("page") || "1");
  const limit  = parseInt(searchParams.get("limit") || "50");
  const offset = (page - 1) * limit;

  try {
    let query = supabase
      .from("bookings")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data: bookings, error, count } = await query;

    if (error) {
      console.error("[Admin bookings] Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Collect unique customer_ids and driver_ids for batch lookups
    const customerIds = [...new Set((bookings || []).map((b: any) => b.customer_id).filter(Boolean))];
    const driverIds   = [...new Set((bookings || []).map((b: any) => b.driver_id).filter(Boolean))];

    const [custRes, drvRes] = await Promise.all([
      customerIds.length
        ? supabase.from("customers").select("id, first_name, last_name, email, phone").in("id", customerIds)
        : { data: [] },
      driverIds.length
        ? supabase.from("drivers").select("id, first_name, last_name").in("id", driverIds)
        : { data: [] },
    ]);

    const custMap: Record<string, any> = {};
    (custRes.data || []).forEach((c: any) => { custMap[c.id] = c; });

    const drvMap: Record<string, any> = {};
    (drvRes.data || []).forEach((d: any) => { drvMap[d.id] = d; });

    const normalized = (bookings || []).map((b: any) => {
      const cust = b.customer_id ? custMap[b.customer_id] : null;
      const drv  = b.driver_id   ? drvMap[b.driver_id]   : null;

      const customerName = cust
        ? `${cust.first_name || ""} ${cust.last_name || ""}`.trim() || cust.email || "Guest"
        : b.customer_name || "Guest";

      const driverName = drv
        ? `${drv.first_name || ""} ${drv.last_name || ""}`.trim()
        : null;

      return {
        id:             b.id,
        customer:       customerName,
        customer_email: cust?.email || null,
        customer_phone: cust?.phone || null,
        pickup:         b.pickup_address  || "—",
        dropoff:        b.dropoff_address || "—",
        vehicle:        b.vehicle_category || "sedan",
        date: b.scheduled_at
          ? new Date(b.scheduled_at).toLocaleString("en-AU", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
          : b.created_at
          ? new Date(b.created_at).toLocaleString("en-AU", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
          : "—",
        status:          b.status         || "pending",
        amount:          b.total_amount   || 0,
        payment_method:  b.payment_method || "cash",
        payment_status:  b.payment_status || "pending",
        driver:          driverName,
        driver_id:       b.driver_id      || null,
        booking_type:    b.booking_type,
        flight_number:   b.flight_number,
        passengers:      b.passengers,
        luggage:         b.luggage,
        special_requests: b.special_requests,
        distance_km:     b.distance_km,
        notes:           b.special_requests,
      };
    });

    // Client-side search filter (after Supabase query)
    const filtered = search
      ? normalized.filter((b: any) =>
          b.customer?.toLowerCase().includes(search) ||
          b.id?.toLowerCase().includes(search) ||
          b.pickup?.toLowerCase().includes(search) ||
          b.dropoff?.toLowerCase().includes(search)
        )
      : normalized;

    return NextResponse.json({ bookings: filtered, total: count || 0 });
  } catch (err: any) {
    console.error("[Admin bookings] Error:", err);
    return NextResponse.json({ error: "Failed to load bookings" }, { status: 500 });
  }
}
