/**
 * Adelaide suburbs/regions dataset — powers the route matrix
 * (/routes/adelaide-airport-to-{slug}), dynamic location pages and the sitemap.
 *
 * Slugs here MUST NOT clash with existing static folders under app/locations/
 * (those 15 pages remain hand-crafted; Next.js gives static folders priority
 * for routes, and we exclude overlaps in generateStaticParams).
 */

export interface Suburb {
  name: string;
  slug: string;
  region: string;
  postcode: string;
  km: number;        // distance from Adelaide Airport (approx)
  min: number;       // drive time from airport, minutes (approx)
  sedan: number;     // fixed price AUD
  suv: number;
  van: number;
  blurb: string;     // unique 1–2 sentence local hook
  landmarks: string[];
}

export const SUBURBS: Suburb[] = [
  // ── Beachside ────────────────────────────────────────────────
  { name: "Brighton", slug: "brighton", region: "Beachside", postcode: "5048", km: 12, min: 18, sedan: 98, suv: 118, van: 145,
    blurb: "Brighton's jetty, cafe strip on Jetty Road and relaxed beachside living make it one of Adelaide's most loved coastal suburbs.",
    landmarks: ["Brighton Jetty", "Jetty Road cafes", "Brighton Beach"] },
  { name: "Glenelg North", slug: "glenelg-north", region: "Beachside", postcode: "5045", km: 5, min: 10, sedan: 92, suv: 110, van: 138,
    blurb: "Minutes from both the airport and Moseley Square, Glenelg North puts you between the marina and the tram into the city.",
    landmarks: ["Glenelg Marina", "Patawalonga Lake", "Holdfast Shores"] },
  { name: "Henley Beach South", slug: "henley-beach-south", region: "Beachside", postcode: "5022", km: 7, min: 13, sedan: 94, suv: 112, van: 140,
    blurb: "Quietly residential with the same golden sand as Henley Square, just a short hop north of the airport.",
    landmarks: ["Henley Beach", "Henley Sailing Club"] },
  { name: "West Beach", slug: "west-beach", region: "Beachside", postcode: "5024", km: 4, min: 8, sedan: 89, suv: 105, van: 132,
    blurb: "The closest beach suburb to Adelaide Airport — ideal for crews, holiday parks and early-morning departures.",
    landmarks: ["West Beach Parks", "Adelaide Shores", "Harbour Town Premium Outlets"] },
  { name: "Grange", slug: "grange", region: "Beachside", postcode: "5022", km: 9, min: 15, sedan: 95, suv: 114, van: 142,
    blurb: "Historic jetty, golf links and a long quiet beach — Grange is a favourite for relaxed coastal stays.",
    landmarks: ["Grange Jetty", "Grange Golf Club"] },
  { name: "Semaphore", slug: "semaphore", region: "Beachside", postcode: "5019", km: 16, min: 24, sedan: 108, suv: 128, van: 158,
    blurb: "Semaphore's palm-lined esplanade, heritage pubs and summer carnival give it a classic seaside character.",
    landmarks: ["Semaphore Palais", "Semaphore Road", "Time Ball Tower"] },
  { name: "Largs Bay", slug: "largs-bay", region: "Beachside", postcode: "5016", km: 18, min: 26, sedan: 112, suv: 132, van: 162,
    blurb: "Home of the grand Largs Pier Hotel and broad swimming beaches near the Outer Harbor cruise terminal.",
    landmarks: ["Largs Pier Hotel", "Largs Bay Jetty"] },
  // ── Western ─────────────────────────────────────────────────
  { name: "Fulham", slug: "fulham", region: "Western", postcode: "5024", km: 3, min: 7, sedan: 89, suv: 105, van: 132,
    blurb: "One of the closest suburbs to the terminal — a Fulham pickup is often under ten minutes door to gate.",
    landmarks: ["Fulham Gardens shopping", "River Torrens Linear Park"] },
  { name: "Lockleys", slug: "lockleys", region: "Western", postcode: "5032", km: 3, min: 7, sedan: 89, suv: 105, van: 132,
    blurb: "Leafy streets along the Torrens, minutes from the airport and an easy run into the CBD.",
    landmarks: ["Apex Park", "Lockleys Oval"] },
  { name: "Mile End", slug: "mile-end", region: "Western", postcode: "5031", km: 5, min: 9, sedan: 90, suv: 108, van: 135,
    blurb: "On the city fringe with quick access to the CBD, Adelaide Oval and the airport corridor.",
    landmarks: ["South Road", "Henley Beach Road strip"] },
  { name: "Findon", slug: "findon", region: "Western", postcode: "5023", km: 6, min: 11, sedan: 92, suv: 110, van: 138,
    blurb: "A practical western base with fast routes to the airport, Port Adelaide and the city.",
    landmarks: ["Findon Shopping Centre"] },
  { name: "Woodville", slug: "woodville", region: "Western", postcode: "5011", km: 9, min: 15, sedan: 95, suv: 114, van: 142,
    blurb: "Centred on the historic Woodville Town Hall and an easy link between the port and the city.",
    landmarks: ["Woodville Town Hall", "St Clair Recreation Precinct"] },
  // ── CBD fringe / Inner ───────────────────────────────────────
  { name: "Hindmarsh", slug: "hindmarsh", region: "Inner West", postcode: "5007", km: 7, min: 12, sedan: 92, suv: 110, van: 138,
    blurb: "Home of Adelaide Entertainment Centre and Coopers Stadium — our drivers know its event-night traffic inside out.",
    landmarks: ["Adelaide Entertainment Centre", "Coopers Stadium"] },
  { name: "Thebarton", slug: "thebarton", region: "Inner West", postcode: "5031", km: 6, min: 10, sedan: 90, suv: 108, van: 135,
    blurb: "A revitalised inner-west pocket beside the Torrens, minutes from both the airport and the West End.",
    landmarks: ["Thebarton Theatre", "West End brewery site"] },
  { name: "Kent Town", slug: "kent-town", region: "Inner East", postcode: "5067", km: 10, min: 16, sedan: 96, suv: 115, van: 144,
    blurb: "Just across the parklands from the East End — boutique offices, hotels and Rundle Street at your door.",
    landmarks: ["Rundle Street East", "The Parade West"] },
  { name: "Parkside", slug: "parkside", region: "Inner South", postcode: "5063", km: 9, min: 15, sedan: 95, suv: 114, van: 142,
    blurb: "Quiet, tree-lined and one set of parklands away from the CBD's south-east corner.",
    landmarks: ["Glen Osmond Road", "Victoria Park"] },
  { name: "Goodwood", slug: "goodwood", region: "Inner South", postcode: "5034", km: 8, min: 14, sedan: 94, suv: 112, van: 140,
    blurb: "Goodwood Road's village strip and heritage cinema give this inner-south suburb real character.",
    landmarks: ["Capri Theatre", "Goodwood Road shops"] },
  { name: "Wayville", slug: "wayville", region: "Inner South", postcode: "5034", km: 7, min: 13, sedan: 93, suv: 111, van: 139,
    blurb: "Beside the Adelaide Showground — our most-requested pickup during the Royal Show and major expos.",
    landmarks: ["Adelaide Showground", "Wayville Pavilions"] },
  { name: "Dulwich", slug: "dulwich", region: "Inner East", postcode: "5065", km: 11, min: 17, sedan: 97, suv: 116, van: 146,
    blurb: "One of Adelaide's most prestigious pockets, moments from Victoria Park and the East End.",
    landmarks: ["Dulwich Avenue", "Victoria Park"] },
  { name: "Toorak Gardens", slug: "toorak-gardens", region: "Inner East", postcode: "5065", km: 11, min: 18, sedan: 97, suv: 116, van: 146,
    blurb: "Grand homes and jacaranda streets in Adelaide's blue-ribbon east.",
    landmarks: ["Monreith Avenue gardens"] },
  // ── Eastern ─────────────────────────────────────────────────
  { name: "Kensington", slug: "kensington", region: "Eastern", postcode: "5068", km: 12, min: 19, sedan: 99, suv: 118, van: 148,
    blurb: "Village greens, heritage pubs and The Parade nearby — classic old-Adelaide east.",
    landmarks: ["Kensington Village", "The Rising Sun Inn"] },
  { name: "Magill", slug: "magill", region: "Eastern", postcode: "5072", km: 14, min: 22, sedan: 104, suv: 124, van: 154,
    blurb: "Home to Penfolds Magill Estate — we regularly run cellar-door and dinner transfers here.",
    landmarks: ["Penfolds Magill Estate", "Magill Village"] },
  { name: "Tranmere", slug: "tranmere", region: "Eastern", postcode: "5073", km: 14, min: 22, sedan: 104, suv: 124, van: 154,
    blurb: "A quiet foothills-edge suburb with quick access to The Parade and the city.",
    landmarks: ["Tranmere Village"] },
  { name: "Athelstone", slug: "athelstone", region: "North East", postcode: "5076", km: 18, min: 27, sedan: 112, suv: 132, van: 164,
    blurb: "Gateway to Black Hill and the Gorge — the last suburb before the hills on the north-east side.",
    landmarks: ["Black Hill Conservation Park", "Thorndon Park"] },
  // ── Southern ────────────────────────────────────────────────
  { name: "Mitcham", slug: "mitcham", region: "Southern", postcode: "5062", km: 12, min: 19, sedan: 99, suv: 118, van: 148,
    blurb: "Historic Mitcham Village and the foothills shopping precinct, 20 minutes from the terminal.",
    landmarks: ["Mitcham Shopping Centre", "Brownhill Creek"] },
  { name: "Blackwood", slug: "blackwood", region: "Southern Hills", postcode: "5051", km: 17, min: 27, sedan: 112, suv: 133, van: 165,
    blurb: "Perched in the southern foothills with a busy village centre — a scenic but winding run we know well.",
    landmarks: ["Blackwood roundabout", "Belair National Park"] },
  { name: "Marion", slug: "marion", region: "Southern", postcode: "5043", km: 11, min: 17, sedan: 97, suv: 116, van: 146,
    blurb: "Westfield Marion — SA's biggest shopping centre — plus the SA Aquatic Centre on your doorstep.",
    landmarks: ["Westfield Marion", "SA Aquatic & Leisure Centre"] },
  { name: "Oaklands Park", slug: "oaklands-park", region: "Southern", postcode: "5046", km: 11, min: 17, sedan: 97, suv: 116, van: 146,
    blurb: "Beside Westfield Marion with fast train links and a direct run up Marion Road to the airport.",
    landmarks: ["Oaklands Wetland", "Westfield Marion"] },
  { name: "Hallett Cove", slug: "hallett-cove", region: "Southern Coast", postcode: "5158", km: 22, min: 30, sedan: 122, suv: 144, van: 178,
    blurb: "Famous boardwalk and ancient glacial geology where the suburbs meet the cliffs.",
    landmarks: ["Hallett Cove Boardwalk", "Hallett Cove Conservation Park"] },
  { name: "Seaford", slug: "seaford", region: "Southern Coast", postcode: "5169", km: 33, min: 38, sedan: 142, suv: 168, van: 205,
    blurb: "The southern rail terminus and surf beaches, with McLaren Vale's cellar doors ten minutes inland.",
    landmarks: ["Seaford Beach", "Moana surf breaks"] },
  { name: "Aldinga Beach", slug: "aldinga-beach", region: "Southern Coast", postcode: "5173", km: 42, min: 45, sedan: 158, suv: 186, van: 228,
    blurb: "Drive-on sand, Silver Sands and the Aldinga scrub — the Fleurieu's relaxed beach village.",
    landmarks: ["Aldinga Beach (drive-on)", "Silver Sands"] },
  { name: "Christies Beach", slug: "christies-beach", region: "Southern Coast", postcode: "5165", km: 28, min: 33, sedan: 132, suv: 156, van: 192,
    blurb: "O'Sullivan Beach boat ramp, the Esplanade strip and Port Noarlunga's reef just south.",
    landmarks: ["Christies Beach Esplanade", "Port Noarlunga Reef"] },
  { name: "Morphett Vale", slug: "morphett-vale", region: "Southern", postcode: "5162", km: 24, min: 28, sedan: 125, suv: 148, van: 182,
    blurb: "One of SA's largest suburbs, on the direct corridor between the city and the Fleurieu.",
    landmarks: ["Woodcroft Town Centre"] },
  // ── North / North-East ──────────────────────────────────────
  { name: "Mawson Lakes", slug: "mawson-lakes", region: "Northern", postcode: "5095", km: 18, min: 24, sedan: 112, suv: 132, van: 164,
    blurb: "UniSA's tech campus, lakeside dining and a major interchange — a frequent corporate pickup.",
    landmarks: ["UniSA Mawson Lakes", "Technology Park"] },
  { name: "Salisbury", slug: "salisbury", region: "Northern", postcode: "5108", km: 23, min: 28, sedan: 124, suv: 146, van: 180,
    blurb: "The northern hub city with its own commercial centre and direct expressway access.",
    landmarks: ["Salisbury City Centre", "St Kilda Adventure Playground nearby"] },
  { name: "Elizabeth", slug: "elizabeth", region: "Northern", postcode: "5112", km: 28, min: 32, sedan: 132, suv: 156, van: 192,
    blurb: "Playford's centre with major shopping and events at the Fremont Park precinct.",
    landmarks: ["Elizabeth City Centre"] },
  { name: "Gawler", slug: "gawler", region: "Northern", postcode: "5118", km: 42, min: 45, sedan: 162, suv: 190, van: 232,
    blurb: "SA's oldest country town and the gateway to the Barossa — a common two-stage wine-trip pickup.",
    landmarks: ["Gawler Main Street", "Barossa gateway"] },
  { name: "Golden Grove", slug: "golden-grove", region: "North East", postcode: "5125", km: 25, min: 32, sedan: 128, suv: 150, van: 186,
    blurb: "Master-planned foothills living with The Grove shopping precinct at its heart.",
    landmarks: ["The Grove Shopping Centre", "Cobbler Creek"] },
  { name: "Modbury", slug: "modbury", region: "North East", postcode: "5092", km: 20, min: 27, sedan: 116, suv: 138, van: 170,
    blurb: "Westfield Tea Tree Plaza and the O-Bahn interchange make Modbury the north-east's hub.",
    landmarks: ["Westfield Tea Tree Plaza", "O-Bahn Interchange"] },
  { name: "Tea Tree Gully", slug: "tea-tree-gully", region: "North East", postcode: "5091", km: 22, min: 30, sedan: 120, suv: 142, van: 175,
    blurb: "Historic village at the base of Anstey Hill, where the suburbs meet the vines and trails.",
    landmarks: ["Anstey Hill Recreation Park", "Tea Tree Gully Hotel"] },
  // ── Hills & beyond ──────────────────────────────────────────
  { name: "Crafers", slug: "crafers", region: "Adelaide Hills", postcode: "5152", km: 18, min: 25, sedan: 118, suv: 140, van: 172,
    blurb: "First stop over the tollgate — Mount Lofty's summit and gardens are minutes away.",
    landmarks: ["Mount Lofty Summit", "Crafers interchange"] },
  { name: "Aldgate", slug: "aldgate", region: "Adelaide Hills", postcode: "5154", km: 22, min: 32, sedan: 135, suv: 160, van: 196,
    blurb: "Stone pubs and deep-green gardens in one of the Hills' prettiest villages.",
    landmarks: ["Aldgate Pump Hotel", "Stangate House gardens"] },
  { name: "Bridgewater", slug: "bridgewater", region: "Adelaide Hills", postcode: "5155", km: 24, min: 35, sedan: 145, suv: 170, van: 208,
    blurb: "The historic water-wheel mill and cool-climate calm, 35 minutes from your gate.",
    landmarks: ["Bridgewater Mill", "Cox Creek"] },
  { name: "Lobethal", slug: "lobethal", region: "Adelaide Hills", postcode: "5241", km: 35, min: 50, sedan: 165, suv: 195, van: 238,
    blurb: "Famous for its Christmas Lights of Lobethal and a growing cool-climate wine scene.",
    landmarks: ["Lights of Lobethal", "Lobethal Bierhaus"] },
  { name: "Murray Bridge", slug: "murray-bridge", region: "Murraylands", postcode: "5253", km: 72, min: 62, sedan: 235, suv: 275, van: 335,
    blurb: "The river city on the Princes Highway — a fixed-price intercity run, no meter anxiety.",
    landmarks: ["Murray Bridge wharf", "Monarto Safari Park nearby"] },
  { name: "Victor Harbor Region", slug: "victor-harbor-region", region: "Fleurieu", postcode: "5211", km: 80, min: 75, sedan: 245, suv: 288, van: 352,
    blurb: "Granite Island, whales in winter and the Fleurieu's holiday capital — door-to-door in comfort.",
    landmarks: ["Granite Island", "The Bluff"] },
  { name: "Outer Harbor", slug: "outer-harbor", region: "Port District", postcode: "5018", km: 22, min: 30, sedan: 120, suv: 142, van: 175,
    blurb: "Adelaide's cruise terminal — we meet every arriving ship with name-board service at the gangway exit.",
    landmarks: ["Outer Harbor Cruise Terminal", "North Haven Marina"] },
];

/** Slugs that already exist as hand-crafted static pages under app/locations/ */
export const EXISTING_LOCATION_SLUGS = new Set([
  "adelaide-airport", "adelaide-cbd", "barossa-valley", "glenelg", "mclaren-vale",
  "north-adelaide", "norwood", "unley", "burnside", "prospect", "henley-beach",
  "port-adelaide", "mount-barker", "hahndorf", "stirling", "victor-harbor",
]);

/** Slugs that already exist as hand-crafted static pages under app/routes/ */
export const EXISTING_ROUTE_SLUGS = new Set([
  "adelaide-airport-to-barossa-valley", "adelaide-cbd-to-airport",
  "adelaide-airport-to-glenelg", "adelaide-airport-to-mclaren-vale",
  "adelaide-airport-to-mount-barker", "adelaide-airport-to-hahndorf",
  "adelaide-airport-to-adelaide-hills",
]);
