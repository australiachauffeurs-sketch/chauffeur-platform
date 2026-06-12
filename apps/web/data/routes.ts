import { SUBURBS, EXISTING_ROUTE_SLUGS, Suburb } from "./suburbs";

export interface RouteEntry {
  slug: string;
  from: string;
  to: string;
  km: number;
  min: number;
  sedan: number;
  suv: number;
  van: number;
  region: string;
  blurb: string;
  landmarks: string[];
  /** related suburb slug for cross-linking, if applicable */
  suburbSlug?: string;
}

/** Airport ↔ suburb matrix, one canonical page per pair (covers both directions). */
const airportRoutes: RouteEntry[] = SUBURBS.map((s: Suburb) => ({
  slug: `adelaide-airport-to-${s.slug}`,
  from: "Adelaide Airport",
  to: s.name,
  km: s.km,
  min: s.min,
  sedan: s.sedan,
  suv: s.suv,
  van: s.van,
  region: s.region,
  blurb: s.blurb,
  landmarks: s.landmarks,
  suburbSlug: s.slug,
}));

/** High-intent special routes beyond the airport matrix. */
const specialRoutes: RouteEntry[] = [
  { slug: "adelaide-cbd-to-barossa-valley", from: "Adelaide CBD", to: "Barossa Valley", km: 60, min: 65, sedan: 192, suv: 225, van: 275, region: "Wine Country",
    blurb: "Skip the drive and arrive at Seppeltsfield or Penfolds relaxed — the classic Adelaide wine-country run.",
    landmarks: ["Seppeltsfield", "Penfolds Barossa", "Jacob's Creek"] },
  { slug: "adelaide-cbd-to-mclaren-vale", from: "Adelaide CBD", to: "McLaren Vale", km: 40, min: 45, sedan: 152, suv: 178, van: 218, region: "Wine Country",
    blurb: "Forty-five minutes from your hotel lobby to d'Arenberg's tasting room — leave the car keys behind.",
    landmarks: ["d'Arenberg Cube", "Wirra Wirra", "Chapel Hill"] },
  { slug: "adelaide-cbd-to-hahndorf", from: "Adelaide CBD", to: "Hahndorf", km: 28, min: 30, sedan: 98, suv: 118, van: 145, region: "Adelaide Hills",
    blurb: "Australia's oldest German settlement, half an hour up the freeway from the city.",
    landmarks: ["Hahndorf Main Street", "The Cedars", "Beerenberg Farm"] },
  { slug: "adelaide-cbd-to-victor-harbor", from: "Adelaide CBD", to: "Victor Harbor", km: 82, min: 80, sedan: 245, suv: 288, van: 352, region: "Fleurieu",
    blurb: "The Fleurieu's holiday capital — fixed price door-to-door, with a Granite Island arrival to remember.",
    landmarks: ["Granite Island", "The Bluff", "Horse-drawn tram"] },
  { slug: "adelaide-airport-to-adelaide-oval", from: "Adelaide Airport", to: "Adelaide Oval", km: 8, min: 15, sedan: 95, suv: 114, van: 142, region: "City",
    blurb: "Land, drop your bags and make the first bounce — direct to the Oval's River Bank entrance.",
    landmarks: ["Adelaide Oval", "Riverbank Precinct", "War Memorial Drive"] },
  { slug: "adelaide-airport-to-outer-harbor-cruise-terminal", from: "Adelaide Airport", to: "Outer Harbor Cruise Terminal", km: 24, min: 32, sedan: 124, suv: 146, van: 180, region: "Port District",
    blurb: "Flight-to-ship without the taxi queue — we track your flight and time the cruise drop-off to your boarding window.",
    landmarks: ["Outer Harbor Passenger Terminal", "North Haven Marina"] },
  { slug: "glenelg-to-barossa-valley", from: "Glenelg", to: "Barossa Valley", km: 70, min: 80, sedan: 240, suv: 282, van: 345, region: "Wine Country",
    blurb: "Beach to Barossa — a full day of cellar doors with a professional driver while everyone tastes.",
    landmarks: ["Seppeltsfield Road", "Tanunda"] },
  { slug: "adelaide-airport-to-monarto-safari-park", from: "Adelaide Airport", to: "Monarto Safari Park", km: 70, min: 60, sedan: 230, suv: 270, van: 330, region: "Murraylands",
    blurb: "The world's biggest open-range safari park outside Africa — door-to-gate with no tour-bus timetable.",
    landmarks: ["Monarto Safari Park", "Murray Bridge"] },
];

export const ROUTES: RouteEntry[] = [...airportRoutes, ...specialRoutes].filter(
  (r) => !EXISTING_ROUTE_SLUGS.has(r.slug)
);

export function getRoute(slug: string): RouteEntry | undefined {
  return ROUTES.find((r) => r.slug === slug);
}
