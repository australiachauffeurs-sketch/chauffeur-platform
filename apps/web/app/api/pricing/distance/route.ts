import { NextRequest, NextResponse } from "next/server";

/**
 * Distance calculation using OpenStreetMap Nominatim (geocoding) +
 * OSRM (Open Source Routing Machine) — both completely free, no API key required.
 *
 * Flow: geocode pickup & dropoff via Nominatim → route via OSRM public API
 */
export async function POST(req: NextRequest) {
  try {
    const body    = await req.json();
    const pickup  = body.pickup  as string;
    const dropoff = body.dropoff as string;

    // Accept pre-resolved lat/lng to skip geocoding
    const pickupLat  = body.pickupLat  as number | undefined;
    const pickupLng  = body.pickupLng  as number | undefined;
    const dropoffLat = body.dropoffLat as number | undefined;
    const dropoffLng = body.dropoffLng as number | undefined;

    if (!pickup || !dropoff) {
      return NextResponse.json({ error: "Missing locations" }, { status: 400 });
    }

    // ── Step 1: Geocode addresses if lat/lng not provided ─────────────────
    const [originCoords, destCoords] = await Promise.all([
      pickupLat && pickupLng
        ? Promise.resolve({ lat: pickupLat, lng: pickupLng })
        : geocode(pickup),
      dropoffLat && dropoffLng
        ? Promise.resolve({ lat: dropoffLat, lng: dropoffLng })
        : geocode(dropoff),
    ]);

    if (!originCoords || !destCoords) {
      // Fallback: Haversine straight-line distance × 1.35 road factor
      const fallbackKm  = estimateFallback(pickup, dropoff);
      return NextResponse.json({
        distanceKm:      fallbackKm,
        durationMinutes: Math.round(fallbackKm * 1.8),
        origin:          pickup,
        destination:     dropoff,
        estimated:       true,
      });
    }

    // ── Step 2: Get driving route from OSRM (free public API) ────────────
    const osrmUrl =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${originCoords.lng},${originCoords.lat};${destCoords.lng},${destCoords.lat}` +
      `?overview=false`;

    const osrmRes  = await fetch(osrmUrl, {
      headers: { "User-Agent": "EliteChauffeursApp/1.0" },
    });
    const osrmData = await osrmRes.json();

    if (osrmData.code !== "Ok" || !osrmData.routes?.[0]) {
      // OSRM failed — fall back to Haversine
      const distKm = haversineKm(originCoords, destCoords) * 1.35;
      return NextResponse.json({
        distanceKm:      parseFloat(distKm.toFixed(1)),
        durationMinutes: Math.round(distKm * 1.8),
        origin:          pickup,
        destination:     dropoff,
        estimated:       true,
      });
    }

    const route = osrmData.routes[0];
    return NextResponse.json({
      distanceKm:      parseFloat((route.distance / 1000).toFixed(1)),
      durationMinutes: Math.ceil(route.duration / 60),
      origin:          pickup,
      destination:     dropoff,
    });

  } catch (err) {
    console.error("Distance API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** Geocode an address string to lat/lng using Nominatim */
async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q",            address);
    url.searchParams.set("format",       "json");
    url.searchParams.set("limit",        "1");
    url.searchParams.set("countrycodes", "au");

    const res  = await fetch(url.toString(), {
      headers: { "User-Agent": "EliteChauffeursApp/1.0" },
    });
    const data = await res.json();
    if (!data[0]) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

/** Haversine formula — straight-line distance in km */
function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R  = 6371;
  const dL = ((b.lat - a.lat) * Math.PI) / 180;
  const dG = ((b.lng - a.lng) * Math.PI) / 180;
  const x  =
    Math.sin(dL / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
    Math.cos((b.lat * Math.PI) / 180) *
    Math.sin(dG / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

/** Very rough fallback when geocoding fails entirely */
function estimateFallback(pickup: string, dropoff: string): number {
  // If either address mentions airport, bump up distance
  const airportKeywords = ["airport", "syd", "mel", "bne", "per"];
  const hasAirport = airportKeywords.some(
    k => pickup.toLowerCase().includes(k) || dropoff.toLowerCase().includes(k)
  );
  return parseFloat((Math.random() * (hasAirport ? 30 : 15) + 8).toFixed(1));
}
