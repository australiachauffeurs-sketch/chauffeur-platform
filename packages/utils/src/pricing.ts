import type { PricingConfig, PricingBreakdown, BookingType, VehicleCategory } from "./types";

// ─── Default pricing config (all values in AUD) ───────────────────────────

export const DEFAULT_PRICING: Record<VehicleCategory, PricingConfig> = {
  sedan: {
    vehicleCategory: "sedan",
    baseRatePerKm: 2.8,
    minimumFare: 65,
    airportSurcharge: 15,
    afterHoursSurcharge: 1.25,
    bookingFee: 5,
  },
  suv: {
    vehicleCategory: "suv",
    baseRatePerKm: 3.5,
    minimumFare: 85,
    airportSurcharge: 20,
    afterHoursSurcharge: 1.25,
    bookingFee: 5,
  },
  luxury: {
    vehicleCategory: "luxury",
    baseRatePerKm: 5.5,
    minimumFare: 130,
    airportSurcharge: 30,
    afterHoursSurcharge: 1.3,
    bookingFee: 10,
  },
  van: {
    vehicleCategory: "van",
    baseRatePerKm: 4.0,
    minimumFare: 100,
    airportSurcharge: 25,
    afterHoursSurcharge: 1.2,
    bookingFee: 5,
  },
  stretch_limo: {
    vehicleCategory: "stretch_limo",
    baseRatePerKm: 8.0,
    minimumFare: 200,
    airportSurcharge: 50,
    afterHoursSurcharge: 1.35,
    weddingFlatRate: 1200,
    bookingFee: 15,
  },
};

// ─── Vehicle display info ─────────────────────────────────────────────────

export const VEHICLE_INFO: Record<VehicleCategory, {
  label: string;
  description: string;
  capacity: number;
  icon: string;
}> = {
  sedan: {
    label: "Executive Sedan",
    description: "Mercedes E-Class or similar",
    capacity: 3,
    icon: "🚗",
  },
  suv: {
    label: "Premium SUV",
    description: "Mercedes GLE or similar",
    capacity: 6,
    icon: "🚙",
  },
  luxury: {
    label: "Luxury Sedan",
    description: "Mercedes S-Class or BMW 7 Series",
    capacity: 3,
    icon: "🏎️",
  },
  van: {
    label: "Executive Van",
    description: "Mercedes Viano or similar",
    capacity: 10,
    icon: "🚐",
  },
  stretch_limo: {
    label: "Stretch Limousine",
    description: "Lincoln Town Car Stretch",
    capacity: 8,
    icon: "🎭",
  },
};

// ─── After-hours check (before 6am or after 10pm) ────────────────────────

export function isAfterHours(date: Date): boolean {
  const hour = date.getHours();
  return hour < 6 || hour >= 22;
}

// ─── Core pricing calculation ─────────────────────────────────────────────

export function calculatePrice(params: {
  distanceKm: number;
  durationMinutes: number;
  vehicleCategory: VehicleCategory;
  bookingType: BookingType;
  scheduledAt: Date;
  isAirport: boolean;
  pricingConfig?: Partial<Record<VehicleCategory, PricingConfig>>;
}): PricingBreakdown {
  const {
    distanceKm,
    durationMinutes,
    vehicleCategory,
    bookingType,
    scheduledAt,
    isAirport,
    pricingConfig,
  } = params;

  const config = {
    ...DEFAULT_PRICING[vehicleCategory],
    ...(pricingConfig?.[vehicleCategory] ?? {}),
  };

  // Wedding flat rate
  if (bookingType === "wedding" && config.weddingFlatRate) {
    const gst = config.weddingFlatRate * 0.1;
    return {
      distanceKm,
      durationMinutes,
      baseCharge: config.weddingFlatRate,
      bookingFee: config.bookingFee,
      airportSurcharge: 0,
      afterHoursSurcharge: 0,
      gst,
      total: config.weddingFlatRate + config.bookingFee + gst,
      currency: "AUD",
    };
  }

  // Distance-based calculation
  const distanceCharge = distanceKm * config.baseRatePerKm;
  const baseCharge = Math.max(distanceCharge, config.minimumFare);

  const airportSurchargeAmount = isAirport ? config.airportSurcharge : 0;

  const afterHoursMultiplier = isAfterHours(scheduledAt)
    ? config.afterHoursSurcharge - 1  // e.g. 0.25 = 25% extra
    : 0;
  const afterHoursSurchargeAmount = baseCharge * afterHoursMultiplier;

  const subtotal = baseCharge + config.bookingFee + airportSurchargeAmount + afterHoursSurchargeAmount;
  const gst = subtotal * 0.1; // 10% GST (Australia)
  const total = subtotal + gst;

  return {
    distanceKm,
    durationMinutes,
    baseCharge,
    bookingFee: config.bookingFee,
    airportSurcharge: airportSurchargeAmount,
    afterHoursSurcharge: afterHoursSurchargeAmount,
    gst,
    total,
    currency: "AUD",
  };
}

// ─── Format currency ──────────────────────────────────────────────────────

export function formatAUD(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
  }).format(amount);
}

// ─── Format duration ──────────────────────────────────────────────────────

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
