import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Point-to-Point Chauffeur Adelaide | Fixed Price Transfers",
  description:
    "Fixed-price chauffeur transfers between any two points in Adelaide. No meter, no surge pricing, no surprises. Book online and receive an instant quote.",
  keywords: [
    "point to point chauffeur Adelaide",
    "fixed price transfer Adelaide",
    "Adelaide chauffeur fixed fare",
    "CBD to airport Adelaide",
    "Adelaide to Barossa chauffeur",
    "Adelaide to McLaren Vale transfer",
    "fixed price car hire Adelaide",
    "no surge pricing Adelaide chauffeur",
  ],
  alternates: { canonical: `${SITE_URL}/services/point-to-point` },
  openGraph: {
    title: "Point-to-Point Chauffeur Adelaide | Fixed Price",
    description: "Booked, fixed-price chauffeur transfers between any two points. No meter. No surge. Instant quote online.",
    url: `${SITE_URL}/services/point-to-point`,
    images: [{ url: "/images/sedan.jpg", width: 1200, height: 630, alt: "Point to Point Chauffeur Adelaide" }],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Point-to-Point Chauffeur Transfer Adelaide",
  provider: {
    "@type": "LocalBusiness",
    name: "Australia Chauffeurs",
    address: { "@type": "PostalAddress", addressLocality: "Adelaide", addressRegion: "SA", addressCountry: "AU" },
  },
  areaServed: [
    { "@type": "City", name: "Adelaide" },
    { "@type": "State", name: "South Australia" },
  ],
  description: "Fixed-price point-to-point chauffeur transfers between any two locations in Adelaide and South Australia. No meter, no surge pricing.",
  url: `${SITE_URL}/services/point-to-point`,
};

const popularRoutes = [
  { from: "Adelaide CBD", to: "Adelaide Airport", sedan: "$89", suv: "$108", van: "$135", km: "7 km" },
  { from: "Glenelg", to: "Adelaide Airport", sedan: "$92", suv: "$110", van: "$138", km: "10 km" },
  { from: "Adelaide CBD", to: "Barossa Valley", sedan: "$192", suv: "$225", van: "$276", km: "70 km" },
  { from: "Adelaide CBD", to: "McLaren Vale", sedan: "$152", suv: "$178", van: "$218", km: "43 km" },
  { from: "Adelaide CBD", to: "Adelaide Hills", sedan: "$118+", suv: "$142+", van: "$174+", km: "30 km+" },
  { from: "Adelaide CBD", to: "Hahndorf", sedan: "$135", suv: "$160", van: "$195", km: "29 km" },
  { from: "Adelaide CBD", to: "Port Adelaide", sedan: "$95", suv: "$115", van: "$142", km: "14 km" },
  { from: "North Adelaide", to: "Adelaide Airport", sedan: "$92", suv: "$110", van: "$138", km: "9 km" },
];

const steps = [
  { n: "1", title: "Enter Your Pickup & Drop-Off", body: "Type in any two addresses in Adelaide or regional SA. Our instant pricing engine calculates the fixed fare immediately — no quote request, no waiting." },
  { n: "2", title: "Select Your Vehicle Class", body: "Choose sedan (up to 3 passengers), SUV (up to 5), or van (up to 8). The price you see is the price you pay — GST included, tolls included." },
  { n: "3", title: "Confirm & Pay Securely", body: "Pay by card at booking or select account invoicing. You receive instant email and SMS confirmation with your booking reference." },
  { n: "4", title: "Driver Arrives On Time", body: "Your chauffeur arrives at the specified address at the booked time — not 'within a window'. A courtesy SMS is sent 10 minutes before arrival." },
  { n: "5", title: "Door-to-Door Service", body: "Your driver assists with luggage, opens doors, and drives the most efficient route to your destination. No detours, no unnecessary stops." },
];

const ptpVsHourly = [
  { aspect: "Best for", ptp: "Single journey — A to B, done", hourly: "Multi-stop, waiting time, open itinerary" },
  { aspect: "Pricing model", ptp: "Fixed price based on distance", hourly: "Per hour — min. 2 hours" },
  { aspect: "Waiting time", ptp: "Not included (short stops fine)", hourly: "Waiting is included in the hire block" },
  { aspect: "Typical use", ptp: "Airport, hotel, venue, hospital", hourly: "Winery tour, events, corporate road show" },
  { aspect: "Predictability", ptp: "Exact fare at booking", hourly: "Total depends on hours used" },
];

const faqs = [
  {
    q: "What does 'fixed price' actually mean?",
    a: "The fare quoted online is the exact amount charged to your card — regardless of traffic, time of day, or how long the journey takes. Unlike ride-share apps, we don't apply surge pricing at peak times or for bad weather. The price you see when you book is the price on your receipt.",
  },
  {
    q: "Are tolls included in the quoted fare?",
    a: "Yes. All tolls on the route are built into your fixed quote. There are no tolls on the main Adelaide Airport corridor, but for routes using the South Eastern Freeway or Northern Expressway, any applicable tolls are pre-included.",
  },
  {
    q: "Can I book a point-to-point for regional SA — e.g. Adelaide to Barossa?",
    a: "Absolutely. Point-to-point transfers operate throughout South Australia. Common regional routes include Adelaide to Barossa Valley wineries, Adelaide to McLaren Vale, Adelaide to Victor Harbor, Hahndorf, and the Adelaide Hills. Get an instant quote online.",
  },
  {
    q: "What's the difference between point-to-point and hourly hire?",
    a: "Point-to-point is for a direct journey from A to B with no extended waiting. Hourly hire (minimum 2 hours) is better when you need the vehicle and driver on standby — such as a winery tour with multiple stops, an evening where you want to make several venue visits, or a corporate road show.",
  },
  {
    q: "Is GST included in the quoted price?",
    a: "Yes. All quoted fares are GST-inclusive. If you require a tax invoice for business expenses, one is automatically generated and emailed at the time of booking.",
  },
  {
    q: "Can I add a stop en route?",
    a: "Brief stops — petrol station, picking someone up from a nearby address — are fine and won't affect the fare. Extended waits (over 10 minutes) may incur a small wait time fee. For trips with multiple planned stops and waiting, hourly hire is more cost-effective.",
  },
];

export default function PointToPointPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />

      {/* Hero */}
      <section style={{ background: "#09090B", borderBottom: "1px solid #1f1f23", padding: "80px 24px 64px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            No Meter. No Surge. Fixed Price.
          </p>
          <h1 style={{ color: "#FFFFFF", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
            Point-to-Point Chauffeur Adelaide
          </h1>
          <p style={{ color: "#A1A1AA", fontSize: 18, lineHeight: 1.7, maxWidth: 640, margin: "0 auto 32px" }}>
            Book a fixed-price transfer between any two points. Enter the addresses, see the exact price, pay once. Your chauffeur handles everything else.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" style={{ background: "#C9A84C", color: "#09090B", padding: "14px 32px", borderRadius: 6, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
              Get Instant Quote
            </Link>
            <Link href="/cost/airport-transfer-cost-adelaide" style={{ border: "1px solid #3f3f46", color: "#A1A1AA", padding: "14px 32px", borderRadius: 6, fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
              Price Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Routes Table */}
      <section style={{ background: "#0d0d10", padding: "72px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>Popular Adelaide Transfer Routes</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 40 }}>Fixed fares — GST included, all tolls included.</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #C9A84C" }}>
                  {["Route", "Distance", "Sedan", "SUV", "Van"].map((h) => (
                    <th key={h} style={{ color: "#C9A84C", textAlign: "left", padding: "12px 16px", fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {popularRoutes.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1f1f23", background: i % 2 === 0 ? "#111115" : "transparent" }}>
                    <td style={{ color: "#FFFFFF", padding: "14px 16px", fontWeight: 600 }}>{r.from} → {r.to}</td>
                    <td style={{ color: "#71717A", padding: "14px 16px" }}>{r.km}</td>
                    <td style={{ color: "#D4D4D8", padding: "14px 16px" }}>{r.sedan}</td>
                    <td style={{ color: "#D4D4D8", padding: "14px 16px" }}>{r.suv}</td>
                    <td style={{ color: "#D4D4D8", padding: "14px 16px" }}>{r.van}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#52525B", fontSize: 13, marginTop: 16 }}>Don't see your route? All Adelaide and regional SA destinations quoted instantly online.</p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ background: "#09090B", padding: "72px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>How Point-to-Point Booking Works</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 48 }}>From quote to door in five simple steps.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {steps.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ background: "#C9A84C", color: "#09090B", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, flexShrink: 0 }}>
                  {s.n}
                </div>
                <div>
                  <h3 style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ color: "#A1A1AA", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PTP vs Hourly */}
      <section style={{ background: "#0d0d10", padding: "72px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>Point-to-Point vs Hourly Hire</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 40 }}>Choosing the right booking type saves money and hassle.</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #1f1f23" }}>
                  <th style={{ color: "#71717A", textAlign: "left", padding: "12px 16px", fontWeight: 600 }}>Feature</th>
                  <th style={{ color: "#C9A84C", textAlign: "left", padding: "12px 16px", fontWeight: 700 }}>Point-to-Point</th>
                  <th style={{ color: "#A1A1AA", textAlign: "left", padding: "12px 16px", fontWeight: 600 }}>Hourly Hire</th>
                </tr>
              </thead>
              <tbody>
                {ptpVsHourly.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1f1f23", background: i % 2 === 0 ? "#111115" : "transparent" }}>
                    <td style={{ color: "#71717A", padding: "14px 16px", fontWeight: 600 }}>{row.aspect}</td>
                    <td style={{ color: "#D4D4D8", padding: "14px 16px" }}>{row.ptp}</td>
                    <td style={{ color: "#A1A1AA", padding: "14px 16px" }}>{row.hourly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Link href="/services/hourly-hire" style={{ color: "#C9A84C", fontSize: 14, textDecoration: "underline" }}>
              Learn more about hourly hire →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#09090B", padding: "72px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: "1px solid #1f1f23", paddingBottom: 28 }}>
                <h3 style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{f.q}</h3>
                <p style={{ color: "#A1A1AA", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#111115", borderTop: "1px solid #1f1f23", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Know Where You're Going?</h2>
        <p style={{ color: "#A1A1AA", fontSize: 16, marginBottom: 28 }}>Enter your pickup and drop-off to get an exact price in seconds — no account required.</p>
        <Link href="/book" style={{ background: "#C9A84C", color: "#09090B", padding: "16px 40px", borderRadius: 6, fontWeight: 700, fontSize: 17, textDecoration: "none" }}>
          Get My Fixed Price Quote
        </Link>
      </section>

      <Footer />
    </>
  );
}
