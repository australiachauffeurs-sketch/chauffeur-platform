import { NextRequest, NextResponse } from "next/server";

/**
 * Address autocomplete using OpenStreetMap Nominatim — completely free, no API key required.
 * Nominatim fair-use policy: max 1 request/second, must include a User-Agent.
 * For a chauffeur app this is well within limits.
 */
export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get("input") ?? "";

  if (!input || input.length < 2) {
    return NextResponse.json({ predictions: [] });
  }

  try {
    // Nominatim geocoding API — free, no key needed
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q",              input);
    url.searchParams.set("format",         "json");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("limit",          "6");
    url.searchParams.set("countrycodes",   "au");   // Australia only
    // Include all feature types so airports, hotels, landmarks all appear
    url.searchParams.set("dedupe",         "1");

    const res = await fetch(url.toString(), {
      headers: {
        // Nominatim requires a descriptive User-Agent
        "User-Agent": "EliteChauffeursApp/1.0 (booking platform)",
        "Accept-Language": "en-AU,en;q=0.9",
      },
      next: { revalidate: 30 }, // cache 30s to reduce API calls
    });

    if (!res.ok) throw new Error(`Nominatim error: ${res.status}`);

    const data: any[] = await res.json();

    // Format response to match the Google Places shape the frontend expects
    const predictions = data.map((item, i) => ({
      place_id:    item.place_id?.toString() ?? `osm_${i}`,
      description: formatAddress(item),
      lat:         parseFloat(item.lat),
      lng:         parseFloat(item.lon),
    }));

    return NextResponse.json({ predictions });

  } catch (err) {
    console.error("[Autocomplete] Nominatim error:", err);
    // Fallback to basic suggestions if Nominatim is down
    return NextResponse.json({
      predictions: [
        { place_id: "f1", description: `${input}, Sydney NSW` },
        { place_id: "f2", description: `${input}, Melbourne VIC` },
      ],
    });
  }
}

/**
 * Build a clean, human-readable address string from Nominatim's result.
 * Prioritises landmark/POI names (airports, hotels, venues) over raw street addresses.
 */
function formatAddress(item: any): string {
  const a    = item.address ?? {};
  const name = item.name ?? "";

  const parts: string[] = [];

  // 1. Lead with the POI name if it's meaningful (airport, hotel, venue, etc.)
  const poiName = a.aeroway ?? a.amenity ?? a.tourism ?? a.leisure ?? a.building ?? a.hotel ?? "";
  if (name && name.toLowerCase() !== (a.road ?? "").toLowerCase()) {
    parts.push(name);
  } else if (poiName && poiName !== name) {
    parts.push(poiName);
  } else if (a.house_number && a.road) {
    parts.push(`${a.house_number} ${a.road}`);
  } else if (a.road) {
    parts.push(a.road);
  }

  // 2. Suburb / locality
  const suburb = a.suburb ?? a.neighbourhood ?? a.quarter ?? a.village ?? a.town ?? a.city_district;
  if (suburb && suburb !== name) parts.push(suburb);

  // 3. City (only if different from suburb)
  const city = a.city ?? a.municipality;
  if (city && city !== suburb) parts.push(city);

  // 4. State abbreviation
  const state = STATE_ABBR[a.state] ?? a.state;
  if (state) parts.push(state);

  // 5. Postcode
  if (a.postcode) parts.push(a.postcode);

  return parts.length > 1 ? parts.join(", ") : item.display_name.split(",").slice(0, 4).join(",").trim();
}

const STATE_ABBR: Record<string, string> = {
  "New South Wales":       "NSW",
  "Victoria":              "VIC",
  "Queensland":            "QLD",
  "Western Australia":     "WA",
  "South Australia":       "SA",
  "Tasmania":              "TAS",
  "Australian Capital Territory": "ACT",
  "Northern Territory":    "NT",
};
