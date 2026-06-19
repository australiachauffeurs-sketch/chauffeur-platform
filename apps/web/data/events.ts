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
  {
    slug: "tour-down-under-transfers",
    name: "Tour Down Under",
    shortName: "Tour Down Under",
    venue: "Adelaide CBD & regional SA stage cities",
    startDate: "2027-01-17", endDate: "2027-01-25", season: "January each year",
    description: "The world's best cyclists race through Adelaide's streets and into the hills each January. Whether you're watching the People's Choice Classic criterium or chasing the peloton to a mountain-top finish, we get you there before the road closures hit.",
    tips: [
      "City-centre closures on criterium day start midday — pre-arrange your pickup on a side street",
      "Stage finishes in Paracombe, Willunga Hill and Uraidla fill country roads early — leave 2 hrs buffer",
      "VIP village access at Flinders St is a 3-minute walk from our standard CBD drop zone",
    ],
    popularPickups: [
      { from: "Adelaide Airport → CBD criterium precinct", price: "$89" },
      { from: "CBD → Willunga Hill stage finish", price: "$168" },
      { from: "CBD → Paracombe finish", price: "$128" },
    ],
    faqs: [
      { q: "Can you get me to a Tour Down Under mountain finish?", a: "Yes — we run stage-finish transfers every year. Book early; Willunga Hill in particular books out within days of the route announcement." },
      { q: "How do road closures affect chauffeur pickups during TDU?", a: "Our drivers study the daily closure map and use designated vehicle zones. We'll text you the exact corner when road conditions firm up on the day." },
    ],
  },
  {
    slug: "royal-adelaide-show-transfers",
    name: "Royal Adelaide Show",
    shortName: "Royal Show",
    venue: "Adelaide Showground, Wayville",
    startDate: "2026-08-29", endDate: "2026-09-06", season: "Late August – September",
    description: "SA's biggest agricultural event fills the Wayville showground for nine days. With 500,000 visitors and limited parking, a chauffeur drop at Gate 1 or Gate 10 is the smoothest way in.",
    tips: [
      "Gates open from 9am — the 10–11am window is the busiest arrival spike",
      "Book a timed return: the main exits grid up 30 minutes after the evening fireworks",
      "Families with prams: sedans have the largest bootspace for strollers and bags of show bags",
    ],
    popularPickups: [
      { from: "Adelaide Airport → Showground", price: "$85" },
      { from: "Northern suburbs → Showground", price: "from $112" },
      { from: "Showground → suburbs (evening return)", price: "from $78" },
    ],
    faqs: [
      { q: "Where do chauffeurs drop off at the Adelaide Showground?", a: "Gate 1 on Leader Street and Gate 10 on Goodwood Road are our standard drops — both are steps from the main attractions and avoid the car park queues." },
      { q: "Can you do a return pickup after the Show fireworks?", a: "Yes — book a timed return for 15 minutes after the fireworks finish. Your driver will be staged at the agreed gate." },
    ],
  },
  {
    slug: "adelaide-cabaret-festival-transfers",
    name: "Adelaide Cabaret Festival",
    shortName: "Cabaret Festival",
    venue: "Adelaide Festival Centre, North Terrace",
    startDate: "2027-06-06", endDate: "2027-06-20", season: "June (biennial)",
    description: "The world's largest cabaret festival transforms the Adelaide Festival Centre for two weeks. An evening of cocktails and showstoppers deserves a driver who gets you home without the wait.",
    tips: [
      "Festival Centre is 90 seconds from our King William Road drop zone — no stairs, no searching",
      "Late-night pick-ups (10:30pm–midnight) are peak cabaret season — confirm your return at booking",
      "Combine with a pre-show dinner at Ukiyo or Shobosho in the East End for a seamless night",
    ],
    popularPickups: [
      { from: "Adelaide Airport → Festival Centre", price: "$89" },
      { from: "Glenelg → North Terrace", price: "$78" },
      { from: "Hills suburbs → Festival Centre", price: "from $118" },
    ],
    faqs: [
      { q: "Where is the best drop-off point for the Adelaide Festival Centre?", a: "King William Road outside Elder Park — 60 seconds from the main Festival Centre entrance, no pedestrian crossing needed." },
      { q: "Is parking difficult at the Cabaret Festival?", a: "Yes — North Terrace car parks fill by 7pm on show nights and the after-show exit is slow. A pre-booked chauffeur is far less stressful." },
    ],
  },
  {
    slug: "barossa-vintage-festival-transfers",
    name: "Barossa Vintage Festival",
    shortName: "Barossa Vintage",
    venue: "Tanunda, Nuriootpa & throughout the Barossa Valley",
    startDate: "2027-04-11", endDate: "2027-04-17", season: "Easter week, odd-numbered years",
    description: "Australia's oldest wine and culture festival celebrates harvest across seven Barossa days. Grape stomping, long lunches, winemaker dinners and open cellar doors — you should be drinking, not driving.",
    tips: [
      "Seppeltsfield Road long lunches are the festival's most popular event — book your transfer well ahead",
      "Multi-stop cellar door days are best handled on hourly hire — your driver keeps the itinerary moving",
      "Return transfers from Barossa accommodation to Adelaide Airport are our most common festival leg",
    ],
    popularPickups: [
      { from: "Adelaide Airport → Barossa accommodation", price: "$192" },
      { from: "CBD → Barossa (full-day hourly hire)", price: "from $480/day" },
      { from: "Barossa cellar doors → Adelaide hotel", price: "$192" },
    ],
    faqs: [
      { q: "Can you do a full-day Barossa Vintage Festival itinerary?", a: "Yes — hourly hire (from $125/hr, 4hr min) with your own driver for the day is our most popular Vintage Festival package. One driver, your whole cellar-door list." },
      { q: "How long does it take to drive from Adelaide to the Barossa?", a: "About 55–70 minutes depending on your destination in the valley. We depart when you're ready, not on a bus timetable." },
    ],
  },
  {
    slug: "sea-and-vines-transfers",
    name: "Sea & Vines Festival",
    shortName: "Sea & Vines",
    venue: "McLaren Vale wine region, Fleurieu Peninsula",
    startDate: "2027-06-14", endDate: "2027-06-15", season: "Queen's Birthday long weekend, June",
    description: "McLaren Vale's biggest outdoor food and wine weekend. Long tables under eucalypts, 50+ cellar doors open, and the d'Arenberg Cube overlooking it all — let us handle the Fleurieu Peninsula driving.",
    tips: [
      "The Old Clarendon Winery and Wirra Wirra are our most-requested long-lunch drop points",
      "Book 3+ weeks out — June long weekend is one of our busiest weekends of the year",
      "Combine Friday cellar doors + Saturday festival + Sunday brunch — we'll build the quote",
    ],
    popularPickups: [
      { from: "Adelaide CBD → McLaren Vale (return)", price: "$152 each way" },
      { from: "Airport → McLaren Vale accommodation", price: "$148" },
      { from: "McLaren Vale (full-day hourly hire)", price: "from $420/day" },
    ],
    faqs: [
      { q: "How do I get to McLaren Vale without driving?", a: "Pre-book a fixed-price chauffeur return from the CBD or airport. It's 45 minutes each way through some of SA's best scenery, and you won't need to worry about the drive home." },
      { q: "Is a return transfer to McLaren Vale worth it?", a: "At $304 return for two people, a private chauffeur often costs less than parking + a taxi + lost time — and you can drink freely at every cellar door." },
    ],
  },
  {
    slug: "sala-festival-transfers",
    name: "SALA Festival",
    shortName: "SALA",
    venue: "Venues across South Australia",
    startDate: "2026-08-01", endDate: "2026-08-31", season: "August each year",
    description: "South Australia's most inclusive art festival puts more than 700 exhibitions in pubs, cafés, galleries and pop-ups across the state all August. Let us take you on a curated gallery tour without the parking hunt.",
    tips: [
      "Hourly hire is ideal for multi-venue gallery hops — the driver waits while you browse",
      "Regional SALA venues in Hahndorf, McLaren Vale and the Barossa pair naturally with cellar doors",
      "Evening openings (Thursday–Friday) are popular — pre-book your return from the city",
    ],
    popularPickups: [
      { from: "CBD galleries tour (hourly hire)", price: "from $125/hr" },
      { from: "Airport → Adelaide city hotel", price: "$89" },
      { from: "Hills SALA venues round trip", price: "from $148" },
    ],
    faqs: [
      { q: "Can I book a chauffeur for a SALA gallery tour?", a: "Yes — our hourly hire is perfect for SALA. Tell us your gallery list and we build the most efficient route, wait between venues and bring you home when you're done." },
      { q: "Are any SALA venues hard to reach without a car?", a: "Many of the most interesting SALA shows are in regional pubs, artist studios and rural properties not served by public transport. A chauffeur is often the only practical option." },
    ],
  },
  {
    slug: "superloop-adelaide-transfers",
    name: "Superloop Adelaide International",
    shortName: "Superloop Adelaide",
    venue: "Memorial Drive, Adelaide",
    startDate: "2027-01-07", endDate: "2027-01-11", season: "January each year",
    description: "The ATP Tour's biggest event in the southern hemisphere draws the world's top tennis players to Memorial Drive. With North Adelaide traffic snarled around the complex, a chauffeur drop at Gate 4 beats the car park by 20 minutes.",
    tips: [
      "Morning sessions (from 10am) have lighter traffic — afternoon/evening sessions are the bottleneck",
      "Gate 4 on Montefiore Road is the closest vehicle drop to centre court",
      "Corporate boxes: we coordinate multi-vehicle arrivals to align with your hospitality schedule",
    ],
    popularPickups: [
      { from: "Adelaide Airport → Memorial Drive", price: "$89" },
      { from: "CBD hotels → tennis complex", price: "$58" },
      { from: "Glenelg → Superloop", price: "$76" },
    ],
    faqs: [
      { q: "Where do chauffeurs drop off at Memorial Drive for tennis?", a: "Montefiore Road (Gate 4) is the designated drop zone for private vehicles — steps from the main entrance and the corporate hospitality area." },
      { q: "Can I book a chauffeur for the Superloop finals weekend?", a: "Yes, but book early — the semifinals and finals weekend is our busiest tennis window. We recommend booking the week the draw is announced." },
    ],
  },
  {
    slug: "christmas-lights-lobethal-transfers",
    name: "Christmas Lights of Lobethal",
    shortName: "Lights of Lobethal",
    venue: "Lobethal, Adelaide Hills",
    startDate: "2026-12-05", endDate: "2026-12-24", season: "December each year",
    description: "South Australia's most-loved Christmas tradition turns the Adelaide Hills town of Lobethal into a sea of lights every December evening. A chauffeur lets the whole family enjoy the spectacle without the carpark queue or the late-night drive home through the hills.",
    tips: [
      "Arrive between 9–10pm to catch peak illumination and avoid the worst of the car-park gridlock",
      "Book your return for 45 minutes after arrival — Lobethal empties quickly once the walk is done",
      "The run from Adelaide CBD takes 45–55 minutes through picturesque Hills roads",
    ],
    popularPickups: [
      { from: "Adelaide CBD → Lobethal (return)", price: "$220 return" },
      { from: "Northern suburbs → Lobethal", price: "from $185 return" },
      { from: "Group van (up to 7)", price: "$310 return" },
    ],
    faqs: [
      { q: "Is it worth getting a chauffeur to the Lights of Lobethal?", a: "For families and groups, absolutely. Parking chaos adds 30–60 minutes each way during peak December evenings. A chauffeur drops you at the start of the light walk and picks you up at the end." },
      { q: "Can children ride in the chauffeur vehicles?", a: "Yes — child seats are available on request at no extra charge in sedans and SUVs. Please specify ages when booking." },
    ],
  },
  {
    slug: "feast-festival-transfers",
    name: "Feast Festival",
    shortName: "Feast",
    venue: "Venues across Adelaide CBD & suburbs",
    startDate: "2026-10-30", endDate: "2026-11-15", season: "November each year",
    description: "South Australia's LGBTQ+ arts and culture festival fills two weeks with film, cabaret, parties and community events across Adelaide. Pre-booked fixed-price transfers take the planning stress out of a busy festival fortnight.",
    tips: [
      "Late-night returns from club nights and ticketed events should be pre-booked — demand peaks after midnight",
      "The iconic Fair Day at Elder Park is easily reached from our King William Road drop zone",
      "Groups of 4–7 save significantly using an executive van for a single invoice",
    ],
    popularPickups: [
      { from: "Airport → CBD festival hotel", price: "$89" },
      { from: "Suburbs → Elder Park Fair Day", price: "from $68" },
      { from: "Late-night event returns", price: "fixed, booked ahead" },
    ],
    faqs: [
      { q: "Can I book a chauffeur for late-night Feast Festival events?", a: "Yes — we operate 24/7 and our rates are fixed regardless of the hour. Pre-book your return when you book your outward journey and the price won't change." },
      { q: "Do you service group bookings for Feast Festival?", a: "Absolutely — executive vans seat up to 7 and are popular with friend groups attending Feast events together. One invoice, one driver, no splitting fares on the night." },
    ],
  },
];

export function getEvent(slug: string): EventEntry | undefined {
  return EVENTS.find((e) => e.slug === slug);
}
