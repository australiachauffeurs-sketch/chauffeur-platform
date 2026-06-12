/**
 * Adelaide event/seasonal pages — high-converting traffic spikes.
 * Dates use the next occurrence; refresh annually.
 */
export interface EventEntry {
  slug: string;
  name: string;
  shortName: string;
  venue: string;
  startDate: string;
  endDate?: string;
  season: string;          // human-readable timing, evergreen
  description: string;     // unique intro
  tips: string[];          // event-specific transport tips
  popularPickups: { from: string; price: string }[];
  faqs: { q: string; a: string }[];
}

export const EVENTS: EventEntry[] = [
  {
    slug: "adelaide-fringe-transfers",
    name: "Adelaide Fringe Festival",
    shortName: "Adelaide Fringe",
    venue: "Gluttony & The Garden of Unearthly Delights, East End",
    startDate: "2027-02-19", endDate: "2027-03-21", season: "February – March each year",
    description: "The southern hemisphere's biggest arts festival takes over Adelaide's East End for a month. Parking disappears, surge pricing spikes after late shows — a pre-booked chauffeur is the smart way in and out.",
    tips: [
      "Book your return BEFORE the show — post-Fringe surge on rideshare regularly hits 2.5–4×",
      "Drop-off at Rundle Street East or East Terrace puts you 2 minutes from Gluttony's gates",
      "Late-night pickups (11pm–1am) are our busiest Fringe window — reserve early",
    ],
    popularPickups: [
      { from: "Adelaide Airport → East End", price: "$92" },
      { from: "Glenelg → Fringe precinct", price: "$78" },
      { from: "Adelaide Hills → East End", price: "$120+" },
    ],
    faqs: [
      { q: "How do I avoid surge pricing after Fringe shows?", a: "Pre-book a fixed-price chauffeur return. Your price is locked when you book — even at 12:30am on a Saturday during Mad March." },
      { q: "Where do chauffeurs drop off for Gluttony and the Garden?", a: "East Terrace and Rundle Street East are the closest legal drop points — about a 2-minute walk to both venues. Your driver will message you the exact pickup spot for the return." },
    ],
  },
  {
    slug: "liv-golf-adelaide-transfers",
    name: "LIV Golf Adelaide",
    shortName: "LIV Golf",
    venue: "The Grange Golf Club",
    startDate: "2027-02-12", endDate: "2027-02-14", season: "February each year",
    description: "Australia's loudest golf weekend brings 90,000+ fans to The Grange. With limited on-course parking and packed shuttles, a private chauffeur drop at the gate is the premium play.",
    tips: [
      "The Grange is only ~10 minutes from Adelaide Airport — perfect for fly-in fly-out fans",
      "Gate drop-offs beat the park-and-ride queues by 30–45 minutes on tournament days",
      "Group vans (up to 7) are the most cost-effective way for corporate groups",
    ],
    popularPickups: [
      { from: "Adelaide Airport → The Grange", price: "$95" },
      { from: "CBD hotels → The Grange", price: "$88" },
      { from: "Glenelg → The Grange", price: "$82" },
    ],
    faqs: [
      { q: "Can you drop off at The Grange Golf Club gates?", a: "Yes — we use the designated rideshare/chauffeur drop zone metres from the main entry, and pre-arrange your return pickup point before the final group finishes." },
      { q: "Do you do corporate groups for LIV Golf?", a: "Yes — executive vans seat up to 7, and we coordinate multi-vehicle corporate transfers with one invoice." },
    ],
  },
  {
    slug: "gather-round-transfers",
    name: "AFL Gather Round",
    shortName: "Gather Round",
    venue: "Adelaide Oval, Norwood Oval & Barossa Park",
    startDate: "2027-04-08", endDate: "2027-04-11", season: "April each year",
    description: "Every AFL club, one state, one massive weekend. With games split across Adelaide Oval, Norwood and the Barossa, a chauffeur lets you stack multiple games a day without parking once.",
    tips: [
      "Doing an Oval + Norwood double-header? We wait between games so you don't lose your ride",
      "Barossa Park games: lock in your return early — country rideshare supply is near zero",
      "Airport → hotel → game packages available for interstate fans",
    ],
    popularPickups: [
      { from: "Adelaide Airport → CBD hotels", price: "$89" },
      { from: "CBD → Norwood Oval", price: "$58" },
      { from: "CBD → Barossa Park (Lyndoch)", price: "$185" },
    ],
    faqs: [
      { q: "Can one booking cover multiple Gather Round games?", a: "Yes — book hourly hire (from $125/hr) and your chauffeur stays with you across venues, or book point-to-point legs between games." },
      { q: "How early should I book for Gather Round?", a: "At least 2–3 weeks out. Adelaide's entire fleet sells out across Gather Round weekend, especially Barossa legs." },
    ],
  },
  {
    slug: "womadelaide-transfers",
    name: "WOMADelaide",
    shortName: "WOMADelaide",
    venue: "Botanic Park, Adelaide",
    startDate: "2027-03-05", endDate: "2027-03-08", season: "March long weekend",
    description: "Four days of world music under Botanic Park's Moreton Bay figs. Hackney Road becomes a crawl by 5pm — your chauffeur knows the back way in and the quiet exit after the headliner.",
    tips: [
      "Plane Tree Drive and Hackney Road are the closest drop points to the main gates",
      "Pre-book a 10:30–11:30pm return window to beat the post-headliner rush",
      "Families: child seats are free on request in sedans and SUVs",
    ],
    popularPickups: [
      { from: "Adelaide Airport → Botanic Park", price: "$92" },
      { from: "Glenelg → WOMADelaide", price: "$80" },
      { from: "Adelaide Hills → Botanic Park", price: "$115+" },
    ],
    faqs: [
      { q: "Where's the best WOMADelaide drop-off?", a: "Hackney Road near the main gate, or Plane Tree Drive for the eastern entrance. Your driver confirms the least-congested option on the night." },
      { q: "Is there surge pricing after WOMADelaide?", a: "Not with us — your fixed price is locked at booking, whatever time the last act finishes." },
    ],
  },
  {
    slug: "adelaide-500-transfers",
    name: "VAILO Adelaide 500",
    shortName: "Adelaide 500",
    venue: "Adelaide Street Circuit, East Parklands",
    startDate: "2026-11-26", endDate: "2026-11-29", season: "November each year",
    description: "When the supercars take over the East Parklands, half the CBD's roads close with them. Our drivers run the official access routes daily during race week — no circling, no closed-road surprises.",
    tips: [
      "Wakefield Road and Halifax Street are the most reliable circuit drop points",
      "Book post-concert returns (Sat/Sun night) well ahead — it's the biggest surge window of spring",
      "Corporate suite guests: we coordinate gate-specific drop-offs with your hospitality pass",
    ],
    popularPickups: [
      { from: "Adelaide Airport → Circuit gates", price: "$90" },
      { from: "Glenelg → Adelaide 500", price: "$78" },
      { from: "North Adelaide → Circuit", price: "$55" },
    ],
    faqs: [
      { q: "Which roads close during the Adelaide 500?", a: "Large parts of the East End and parklands circuit close from set-up week. Our drivers hold the daily access map and use the official drop zones — you won't be left two suburbs away." },
      { q: "Can you pick up after the Saturday night concert?", a: "Yes — pre-book a fixed-price return and your driver will be staged at the agreed point as the crowd exits." },
    ],
  },
  {
    slug: "christmas-party-transfers",
    name: "Christmas Party Transfers",
    shortName: "Christmas Parties",
    venue: "Adelaide CBD, wineries & function venues",
    startDate: "2026-11-20", endDate: "2026-12-24", season: "November – December",
    description: "Office party season means everyone books at once. Lock in fixed-price transfers for your team — to the venue, between venues, and safely home — with one corporate invoice.",
    tips: [
      "Book December Fridays 3+ weeks out — they sell out first, every year",
      "Executive vans move 7 people for less than three rideshares",
      "Staggered home-drop runs available: one van, multiple drop-offs, one invoice",
    ],
    popularPickups: [
      { from: "CBD office → McLaren Vale winery", price: "$152" },
      { from: "CBD → Glenelg dinner venues", price: "$74" },
      { from: "Multi-stop home drops (van)", price: "from $175/hr" },
    ],
    faqs: [
      { q: "Can you invoice our company for the Christmas party transfers?", a: "Yes — corporate accounts get consolidated invoicing with cost-centre codes. One booking contact, one invoice, everyone home safe." },
      { q: "Do you do multi-stop drop-offs after the party?", a: "Yes — hourly-hire vans handle staggered home drops across multiple suburbs. It's the most popular Christmas option for teams of 5–7." },
    ],
  },
  {
    slug: "schoolies-transfers",
    name: "Schoolies Week Transfers",
    shortName: "Schoolies",
    venue: "Victor Harbor & Encounter Bay",
    startDate: "2026-11-21", endDate: "2026-11-29", season: "Late November",
    description: "Victor Harbor is SA's schoolies capital — and parents' peace of mind is our specialty. Fixed-price, door-to-door transfers with professional drivers, trip tracking and no strangers behind the wheel.",
    tips: [
      "Parents can book and pay, with live trip visibility for peace of mind",
      "Group vans from Adelaide suburbs split to ~$50 per person each way",
      "Mid-week supply runs and early-exit pickups available on demand",
    ],
    popularPickups: [
      { from: "Adelaide suburbs → Victor Harbor", price: "$245" },
      { from: "Marion / Southern suburbs → Victor", price: "$195" },
      { from: "Victor Harbor → home (return)", price: "$245" },
    ],
    faqs: [
      { q: "Can parents book schoolies transport for their kids?", a: "Yes — most of our schoolies bookings are made by parents. You book and pay, we send driver details before pickup, and you can track the trip." },
      { q: "How much is a group van to Victor Harbor for schoolies?", a: "An executive van (up to 7) is $352 each way — around $50 per person, comparable to shuttle buses but door-to-door at your times." },
    ],
  },
  {
    slug: "new-years-eve-transfers",
    name: "New Year's Eve Transfers",
    shortName: "NYE Adelaide",
    venue: "Glenelg foreshore & Adelaide CBD",
    startDate: "2026-12-31", season: "31 December",
    description: "Adelaide's biggest party night, and the single worst night of the year for surge pricing. A pre-booked chauffeur is the only ride in town with a price that can't triple at 12:05am.",
    tips: [
      "Glenelg's foreshore fireworks crowd tops 50,000 — pre-arrange an exact pickup corner",
      "Midnight–2am pickups must be booked by Christmas; the fleet sells out",
      "Split a van with friends: 7 people home across the suburbs from ~$30 each",
    ],
    popularPickups: [
      { from: "Suburbs → Glenelg fireworks", price: "from $78" },
      { from: "CBD celebrations → home", price: "from $89" },
      { from: "Post-midnight returns", price: "fixed, booked ahead" },
    ],
    faqs: [
      { q: "How much does a ride home cost at midnight on NYE?", a: "With us: exactly what you booked it for — fixed prices don't change with demand. Rideshare the same night has historically peaked at 3–5× normal rates." },
      { q: "Can I book a 12:30am pickup from Glenelg on NYE?", a: "Yes, if you book ahead. We stage drivers around the foreshore and confirm your exact corner before the fireworks." },
    ],
  },
  {
    slug: "adelaide-cup-transfers",
    name: "Adelaide Cup Day",
    shortName: "Adelaide Cup",
    venue: "Morphettville Racecourse",
    startDate: "2027-03-08", season: "March public holiday Monday",
    description: "SA's biggest day on the track. Arrive at Morphettville's members' gate pressed and punctual, and skip the car park crawl when the last race ends.",
    tips: [
      "Members' drop zone is on Morphett Road — we use it for every Cup booking",
      "Book your post-race return for 30–45 min after the last race to dodge the rush",
      "Groups in race-day dress favour SUVs and vans — more room, no creases",
    ],
    popularPickups: [
      { from: "CBD → Morphettville", price: "$68" },
      { from: "Adelaide Airport → Morphettville", price: "$85" },
      { from: "Glenelg → the races", price: "$60" },
    ],
    faqs: [
      { q: "Where do chauffeurs drop off at Morphettville?", a: "The Morphett Road members' drop zone, steps from the main gates. Returns are staged from the same point — your driver messages you when in position." },
      { q: "Can we book a return after the last race?", a: "Yes — most guests book a fixed return 30–45 minutes after the final race. Your price is locked regardless of the crowd." },
    ],
  },
  {
    slug: "tasting-australia-transfers",
    name: "Tasting Australia",
    shortName: "Tasting Australia",
    venue: "Town Square, Victoria Square & regional venues",
    startDate: "2027-05-01", endDate: "2027-05-10", season: "Late April – early May",
    description: "Australia's longest-running eating and drinking festival, with events from Victoria Square to Barossa long lunches. Drink the good stuff — your chauffeur handles the regions.",
    tips: [
      "Regional long-lunch events (Barossa, McLaren Vale, Clare) are our most-booked legs",
      "Hourly hire suits multi-event days: one driver, your whole itinerary",
      "Glasshouse dinner drop-offs go to Victoria Square's eastern edge",
    ],
    popularPickups: [
      { from: "CBD → Barossa long lunch", price: "$192" },
      { from: "CBD → McLaren Vale events", price: "$152" },
      { from: "Airport → Town Square precinct", price: "$89" },
    ],
    faqs: [
      { q: "Do you wait during regional Tasting Australia events?", a: "Yes — book hourly hire and your chauffeur waits at the venue, or book a timed return leg if you know your finish time. Both are fixed-price." },
      { q: "Can you handle a multi-venue festival itinerary?", a: "Absolutely — give us your event list and we'll build a single quote covering every leg, including regional venues." },
    ],
  },
];

export function getEvent(slug: string): EventEntry | undefined {
  return EVENTS.find((e) => e.slug === slug);
}
