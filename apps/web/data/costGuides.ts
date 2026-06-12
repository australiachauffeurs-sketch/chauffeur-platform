/**
 * "/cost/*" price-intent guides — capture "how much does X cost" searches
 * with genuinely useful pricing content that converts to bookings.
 */
export interface CostGuide {
  slug: string;
  title: string;        // h1
  metaTitle: string;
  metaDescription: string;
  intro: string;
  priceRows: { label: string; price: string; note: string }[];
  factors: { name: string; detail: string }[];
  verdict: string;
  faqs: { q: string; a: string }[];
}

export const COST_GUIDES: CostGuide[] = [
  {
    slug: "adelaide-airport-to-city-cost",
    title: "Adelaide Airport to City: What a Transfer Really Costs",
    metaTitle: "Adelaide Airport to City Cost 2026 | Taxi vs Uber vs Chauffeur",
    metaDescription:
      "Real 2026 prices for Adelaide Airport to the CBD: taxi $35–55 (metered), Uber $32–80 (surge), private chauffeur $89 fixed. See exactly what you'll pay and when each option makes sense.",
    intro:
      "The 7 km run between Adelaide Airport and the CBD takes 12–18 minutes — but what it costs depends entirely on how you book it. Here's an honest 2026 comparison of every option, including the ones we don't sell.",
    priceRows: [
      { label: "Public bus (Adelaide Metro)", price: "$4.30", note: "~35 min with stops; luggage space limited" },
      { label: "Taxi (metered)", price: "$35–$55", note: "Varies with traffic, time of day + $3 airport fee" },
      { label: "Uber X", price: "$32–$80", note: "Cheap off-peak; surges 1.5–4× at peak landing waves" },
      { label: "Private chauffeur (us)", price: "$89 fixed", note: "Meet & greet, flight tracking, luxury sedan, never surges" },
    ],
    factors: [
      { name: "Time of day", detail: "Metered taxis cost ~20% more on the night tariff (10pm–6am). Rideshare surges with every wave of landings. Fixed-price chauffeurs charge the same at 5am as 5pm (a modest after-hours surcharge may apply 10pm–6am)." },
      { name: "Flight delays", detail: "A taxi queue doesn't care when you actually land. Chauffeur bookings include flight tracking — the driver adjusts to your real arrival at no charge." },
      { name: "Luggage & group size", detail: "Two or more passengers with bags often makes a fixed chauffeur cheaper per person than two surge-priced Ubers." },
      { name: "Waiting & tolls", detail: "Metered options tick over in traffic. Fixed quotes include tolls, fuel and standard waiting." },
    ],
    verdict:
      "Travelling solo, light, off-peak? Rideshare is usually cheapest. Landing at peak times, travelling for business, with family/luggage, or on a schedule? The $89 fixed chauffeur is frequently the same price as a surged Uber — with a guaranteed car, a name board and zero queue.",
    faqs: [
      { q: "How much is a taxi from Adelaide Airport to the city?", a: "Metered taxis typically run $35–$55 to the CBD depending on traffic and tariff, plus the $3 airport rank fee. Night tariffs push the top of that range higher." },
      { q: "Is Uber cheaper than a chauffeur from Adelaide Airport?", a: "Off-peak, yes — Uber X can be $32–40. At busy landing windows surge pricing regularly takes it to $60–80+, at which point an $89 fixed luxury chauffeur with meet & greet is better value." },
      { q: "What's included in the $89 chauffeur price?", a: "A luxury sedan, professional driver meeting you in the arrivals hall with a name board, flight tracking, free delay waiting, luggage help, tolls and fuel. The price is locked at booking." },
    ],
  },
  {
    slug: "chauffeur-cost-adelaide",
    title: "How Much Does a Chauffeur Cost in Adelaide?",
    metaTitle: "Chauffeur Cost Adelaide 2026 | Hourly Rates & Fixed Transfer Prices",
    metaDescription:
      "Adelaide chauffeur prices 2026: airport transfers from $89 fixed, hourly hire from $125/hr, weddings from $350, wine tours from $295. Full transparent price guide — no hidden fees.",
    intro:
      "Chauffeur pricing in Adelaide is simpler than most people expect: fixed point-to-point fares or an hourly rate. Here's the full 2026 price landscape so you can budget before you enquire anywhere.",
    priceRows: [
      { label: "Airport transfer (CBD)", price: "from $89", note: "Fixed, sedan; SUV $109, van $135" },
      { label: "Hourly hire (sedan)", price: "$125/hr", note: "Minimum 2 hours; SUV $155/hr" },
      { label: "Wedding car", price: "from $350", note: "3-hour sedan package; limo from $650" },
      { label: "Wine tour (half-day)", price: "from $295", note: "Adelaide Hills; Barossa full-day $595" },
      { label: "School formal", price: "from $195", note: "Return trip, sedan" },
      { label: "Long distance (Victor Harbor)", price: "$245", note: "Fixed one-way, ~80 km" },
    ],
    factors: [
      { name: "Vehicle class", detail: "Sedans (Mercedes E-Class) are the baseline; SUVs add ~20%, stretch limousines and vans price separately. The chauffeur, fuel and tolls are always included." },
      { name: "Distance vs time", detail: "Point-to-point trips are fixed by distance band. Multi-stop days are cheaper on hourly hire once you pass roughly three legs." },
      { name: "When you travel", detail: "Prices don't surge with demand, but a 10pm–6am after-hours surcharge applies to overnight pickups." },
      { name: "Group size", detail: "A 7-seat executive van at $175/hr often beats three separate rides for group events." },
    ],
    verdict:
      "Expect $89–$160 for most Adelaide point-to-point transfers, $125–$175/hr for hire, and packaged pricing for weddings and tours. If a quote hides fees or 'starts from' a price that keeps moving, ask for fixed — reputable operators lock the number at booking.",
    faqs: [
      { q: "What's the minimum chauffeur booking in Adelaide?", a: "Point-to-point transfers have no minimum — a short fixed-price trip is fine. Hourly hire has a 2-hour minimum (3 hours for stretch limousines)." },
      { q: "Are chauffeur prices per person or per car?", a: "Per car. A $89 airport transfer covers up to 3 passengers in a sedan, so groups often pay less per head than rideshare." },
      { q: "Do Adelaide chauffeurs charge waiting time?", a: "Airport pickups include free waiting via flight tracking. Other pickups include 10–15 minutes grace; beyond that, waiting is billed in 15-minute blocks at the hourly rate." },
    ],
  },
  {
    slug: "adelaide-airport-to-barossa-cost",
    title: "Adelaide Airport to Barossa Valley: Transfer Costs Compared",
    metaTitle: "Adelaide Airport to Barossa Valley Cost | Taxi, Shuttle & Chauffeur Prices",
    metaDescription:
      "What it costs to get from Adelaide Airport to the Barossa Valley in 2026: shared shuttle ~$60pp, taxi $140–180 metered, private chauffeur $185 fixed. Compare and choose.",
    intro:
      "The Barossa is 60+ km from Adelaide Airport — far enough that your transport choice meaningfully changes both the cost and the experience. Here's the honest comparison for the 2026 season.",
    priceRows: [
      { label: "Shared shuttle", price: "~$60 pp", note: "Set timetable, multiple stops, 90+ min" },
      { label: "Taxi (metered)", price: "$140–$180", note: "Meter risk in traffic; availability patchy for return" },
      { label: "Rideshare", price: "$110–$170", note: "Surge-dependent; return pickup from wineries unreliable" },
      { label: "Private chauffeur (us)", price: "$185 fixed", note: "Door-to-cellar-door, ~60 min, luggage + wine space" },
    ],
    factors: [
      { name: "The return leg problem", detail: "Getting TO the Barossa is easy; getting a car OUT of Tanunda at 5pm is not. Pre-booked chauffeur returns are the only guaranteed option." },
      { name: "Per-person maths", detail: "Two or more travellers usually beat the shuttle on a $185 fixed car — without the 90-minute multi-stop run." },
      { name: "Wine cargo", detail: "Cases ride free in our sedans and SUVs; shuttles cap luggage." },
    ],
    verdict:
      "Solo on a budget with time to spare: take the shuttle. Two or more people, an itinerary, or a same-day return: the $185 fixed chauffeur wins on certainty alone — and ties on per-person cost.",
    faqs: [
      { q: "How long is Adelaide Airport to the Barossa?", a: "About 60–70 km depending on your village — roughly 60–70 minutes door-to-door by private car." },
      { q: "Can the chauffeur stop at a winery on the way?", a: "Yes — add a stop at booking (e.g. Jacob's Creek visitor centre) for a small fixed add-on rather than hourly waiting." },
    ],
  },
  {
    slug: "wedding-car-cost-adelaide",
    title: "Wedding Car Hire Costs in Adelaide: The Real Numbers",
    metaTitle: "Wedding Car Cost Adelaide 2026 | Packages from $350",
    metaDescription:
      "Adelaide wedding car prices 2026: sedans from $350, SUVs from $450, stretch limousines from $650. What's included, how timing affects price, and how to avoid hidden extras.",
    intro:
      "Wedding transport quotes in Adelaide range from $300 to $1,500+, and the difference is rarely explained. Here's how packages are actually built, what drives the price, and the questions that expose hidden extras.",
    priceRows: [
      { label: "Luxury sedan package", price: "from $350", note: "3 hours, ribbons, chauffeur in suit" },
      { label: "Luxury SUV package", price: "from $450", note: "3 hours; better for full gowns" },
      { label: "Stretch limousine", price: "from $650", note: "3 hours, up to 10 passengers" },
      { label: "Guest shuttle van", price: "from $345", note: "Ceremony ↔ reception loops" },
      { label: "Extra hour", price: "$125–$220", note: "By vehicle class" },
    ],
    factors: [
      { name: "Hills & winery venues", detail: "Adelaide Hills and vineyard weddings add travel time — most packages price the Hills as +$50–100 over metro." },
      { name: "Saturday peak season", detail: "October–March Saturdays book out first and carry the least discount flexibility. Friday/Sunday dates often save 10–15%." },
      { name: "Photo-run time", detail: "The biggest hidden cost is underestimating photo locations. Build the photographer's plan into your hours upfront." },
    ],
    verdict:
      "Budget $350–$700 for the couple's car and add a guest van if your ceremony and reception are 15+ minutes apart — it's cheaper than guests' goodwill. Confirm in writing: total hours, overtime rate, and that the pictured vehicle is the one that arrives.",
    faqs: [
      { q: "How far in advance should we book wedding cars in Adelaide?", a: "6–12 months for peak-season Saturdays; 3–6 months otherwise. The fleet (especially limousines) is finite and the best dates go first." },
      { q: "What's included in a wedding package?", a: "Vehicle + chauffeur for the package hours, ribbons, red-carpet arrival on request, water on board and a structured run sheet agreed before the day." },
    ],
  },
  {
    slug: "corporate-transfer-cost-adelaide",
    title: "Corporate Transfer Pricing in Adelaide: A Buyer's Guide",
    metaTitle: "Corporate Chauffeur Rates Adelaide | Account Pricing Guide 2026",
    metaDescription:
      "What corporate chauffeur service costs in Adelaide: airport transfers from $89, hourly roadshows from $125/hr, monthly invoicing, no surge. How account pricing works for EAs and travel managers.",
    intro:
      "If you book travel for executives, the question isn't just price — it's predictability, invoicing and whether a car actually shows up at 5:40am. Here's how Adelaide corporate chauffeur pricing works in 2026.",
    priceRows: [
      { label: "Airport transfer (exec sedan)", price: "$89 fixed", note: "CBD pickup; SUV $109" },
      { label: "Hourly / roadshow", price: "$125/hr", note: "Min 2 hrs; multi-stop city days" },
      { label: "Conference shuttle (van)", price: "from $520", note: "Half-day delegate loops" },
      { label: "Account billing", price: "$0", note: "Monthly consolidated invoice, cost-centre codes" },
    ],
    factors: [
      { name: "Volume", detail: "Regular bookings (10+/month) unlock account rates and priority allocation in peak windows." },
      { name: "Cancellation terms", detail: "Free cancellation to 2 hours protects against the meeting that 'moved 15 minutes' five times." },
      { name: "Reporting", detail: "Cost-centre and PO tagging at booking time saves your finance team the spreadsheet." },
    ],
    verdict:
      "Compare on the total: fixed fares + free cancellation + consolidated invoice usually beats nominally-cheaper metered options once admin time and surge risk are counted. Trial an account with a month of real bookings before committing.",
    faqs: [
      { q: "Do corporate accounts get cheaper rates?", a: "Accounts primarily buy certainty: fixed pricing, priority vehicles, monthly invoicing and reporting. Volume discounts apply from around 10 trips/month." },
      { q: "Can multiple staff book under one account?", a: "Yes — unlimited bookers under one account with per-booking cost-centre tags and a single monthly invoice." },
    ],
  },
];

export function getCostGuide(slug: string): CostGuide | undefined {
  return COST_GUIDES.find((g) => g.slug === slug);
}
