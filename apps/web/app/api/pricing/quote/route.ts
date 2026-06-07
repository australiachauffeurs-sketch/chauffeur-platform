import { NextRequest, NextResponse } from "next/server";
import { calculatePrice } from "@repo/utils";
import type { VehicleCategory, PricingConfig } from "@repo/utils";

const VEHICLES: VehicleCategory[] = ["sedan", "suv", "luxury", "van", "stretch_limo"];

async function fetchLivePricing(): Promise<Partial<Record<VehicleCategory, PricingConfig>>> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") || (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    return {};
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, serviceKey);
    const { data, error } = await supabase.from("pricing_config").select("*");
    if (error || !data) return {};

    const result: Partial<Record<VehicleCategory, PricingConfig>> = {};
    for (const row of data) {
      result[row.vehicle_category as VehicleCategory] = {
        vehicleCategory:    row.vehicle_category,
        baseRatePerKm:      row.base_rate_per_km,
        minimumFare:        row.minimum_fare,
        airportSurcharge:   row.airport_surcharge,
        afterHoursSurcharge: row.after_hours_mult,
        bookingFee:         row.booking_fee,
        weddingFlatRate:    row.wedding_flat_rate ?? undefined,
      };
    }
    return result;
  } catch {
    return {};
  }
}

export async function POST(req: NextRequest) {
  try {
    const { distanceKm, durationMinutes, bookingType, scheduledAt, isAirport } = await req.json();
    if (!distanceKm || !scheduledAt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const date = new Date(scheduledAt);
    const livePricing = await fetchLivePricing();

    const quotes: Record<string, number> = {};
    const pricingBreakdowns: Record<string, object> = {};

    // Fetch active surge rule
    let surgeMultiplier = 1.0;
    let surgeName: string | null = null;
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (supabaseUrl && (serviceKey?.startsWith("eyJ") || serviceKey?.startsWith("sb_secret_"))) {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, serviceKey);
        const { data: surge } = await supabase.from("surge_rules").select("multiplier, name").eq("is_active", true).single();
        if (surge) {
          surgeMultiplier = surge.multiplier || 1.0;
          surgeName = surge.name || null;
        }
      }
    } catch {
      // surge lookup failure is non-fatal
    }

    for (const cat of VEHICLES) {
      const breakdown = calculatePrice({
        distanceKm,
        durationMinutes: durationMinutes ?? 0,
        vehicleCategory: cat,
        bookingType: bookingType ?? "airport_transfer",
        scheduledAt: date,
        isAirport: isAirport ?? false,
        pricingConfig: livePricing,
      });
      let totalAmount = breakdown.total;
      totalAmount = Math.round(totalAmount * surgeMultiplier * 100) / 100;
      quotes[cat] = totalAmount;
      pricingBreakdowns[cat] = { ...breakdown, total: totalAmount, surgeMultiplier, surgeName };
    }

    return NextResponse.json({ quotes, pricingBreakdowns, surgeMultiplier, surgeName });
  } catch (err) {
    console.error("Quote error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
