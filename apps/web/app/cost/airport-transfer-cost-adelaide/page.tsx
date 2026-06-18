import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "How Much Does an Adelaide Airport Transfer Cost? 2026 Guide",
  description:
    "Adelaide airport transfer prices by suburb — CBD $89, Glenelg $92, Barossa $192. Compared to Uber, taxi, and shuttle bus. Includes GST, no hidden fees.",
  keywords: [
    "Adelaide airport transfer cost",
    "how much does airport transfer cost Adelaide",
    "Adelaide airport taxi price",
    "Adelaide airport chauffeur price",
    "ADL airport transfer price 2026",
    "Adelaide airport to CBD cost",
    "airport transfer vs Uber Adelaide",
    "Adelaide airport shuttle bus cost",
  ],
  alternates: { canonical: `${SITE_URL}/cost/airport-transfer-cost-adelaide` },
  openGraph: {
    title: "Adelaide Airport Transfer Cost 2026 — Full Price Guide",
    description: "Every suburb priced. Chauffeur vs Uber vs taxi vs shuttle — what you actually pay in 2026.",
    url: `${SITE_URL}/cost/airport-transfer-cost-adelaide`,
    images: [{ url: "/images/airport.jpg", width: 1200, height: 630, alt: "Adelaide Airport Transfer Cost Guide" }],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does an Adelaide airport transfer cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adelaide airport transfer prices start from $89 for a sedan to the CBD. Prices vary by destination: Glenelg $92, McLaren Vale $152, Barossa Valley $192. All prices are fixed, GST-inclusive, and include tolls.",
      },
    },
    {
      "@type": "Question",
      name: "Is a chauffeur cheaper than an Uber from Adelaide Airport?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At standard times, Uber is typically $40–$65 for CBD routes. However, Uber applies surge pricing at peak times (Friday evenings, holidays, bad weather) — prices can double or triple. A chauffeur is fixed-price regardless of demand. For longer routes like Barossa or McLaren Vale, chauffeur pricing is competitive.",
      },
    },
  ],
};

const pricingData = [
  { suburb: "Adelaide CBD", distance: "7 km", sedan: "$89", suv: "$108", van: "$135", time: "12 min" },
  { suburb: "Glenelg", distance: "10 km", sedan: "$92", suv: "$110", van: "$138", time: "15 min" },
  { suburb: "North Adelaide", distance: "9 km", sedan: "$92", suv: "$110", van: "$138", time: "14 min" },
  { suburb: "Unley / Parkside", distance: "8 km", sedan: "$90", suv: "$109", van: "$136", time: "13 min" },
  { suburb: "Norwood / Kensington", distance: "9 km", sedan: "$93", suv: "$112", van: "$140", time: "15 min" },
  { suburb: "Port Adelaide", distance: "14 km", sedan: "$95", suv: "$115", van: "$142", time: "18 min" },
  { suburb: "Modbury / Tea Tree Gully", distance: "22 km", sedan: "$108", suv: "$130", van: "$162", time: "25 min" },
  { suburb: "Marion / Oaklands Park", distance: "13 km", sedan: "$95", suv: "$114", van: "$142", time: "18 min" },
  { suburb: "Adelaide Hills (Stirling)", distance: "30 km", sedan: "$118+", suv: "$142+", van: "$174+", time: "35 min" },
  { suburb: "Hahndorf", distance: "29 km", sedan: "$135", suv: "$160", van: "$195", time: "33 min" },
  { suburb: "McLaren Vale", distance: "43 km", sedan: "$152", suv: "$178", van: "$218", time: "45 min" },
  { suburb: "Victor Harbor", distance: "84 km", sedan: "$218", suv: "$260", van: "$318", time: "75 min" },
  { suburb: "Barossa Valley (Tanunda)", distance: "70 km", sedan: "$192", suv: "$225", van: "$276", time: "65 min" },
  { suburb: "Mount Gambier", distance: "440 km", sedan: "$POA", suv: "$POA", van: "$POA", time: "4.5 hrs" },
];

const comparison = [
  { mode: "Chauffeur (Sedan)", cbd: "$89", glenelg: "$92", barossa: "$192", notes: "Fixed price. No surge. Flight tracking included for airport." },
  { mode: "Uber (UberX)", cbd: "$40–$65*", glenelg: "$48–$72*", barossa: "$180–$280*", notes: "Surge pricing applies. Prices double/triple at peak times." },
  { mode: "Taxi (13cabs)", cbd: "$45–$60", glenelg: "$52–$68", barossa: "$190–$220", notes: "Metered. Final price unknown until arrival. No flight tracking." },
  { mode: "Skylink Shuttle Bus", cbd: "$27 pp", glenelg: "$27 pp", barossa: "N/A", notes: "Shared bus. Multiple stops. Journey can take 90+ min for far stops." },
  { mode: "SkyCity Bus (JetBus)", cbd: "$7 pp", glenelg: "N/A", barossa: "N/A", notes: "CBD only. Limited hours. No luggage assistance. Busy at peak times." },
];

const faqs = [
  {
    q: "Do Adelaide airport transfer prices include GST?",
    a: "Yes. All quoted chauffeur fares are GST-inclusive. The price shown is the total you pay — there are no taxes added at checkout. A tax invoice is automatically issued for business bookings.",
  },
  {
    q: "Are tolls included in the quoted price?",
    a: "Yes. All tolls on the route are included in the fixed price. Most Adelaide airport routes do not pass through tolled roads, but where they do (e.g. sections of the Southern Expressway), the toll is pre-built into your fare.",
  },
  {
    q: "Is tipping expected?",
    a: "Tipping is not expected and is entirely at your discretion. Australian chauffeur fares are inclusive — your driver is paid a professional rate. If the service was exceptional, a tip is always appreciated but never required.",
  },
  {
    q: "Why is the chauffeur more expensive than an Uber?",
    a: "At off-peak times, Uber is cheaper for short CBD routes. The chauffeur advantage is price certainty (no surge), professional licensing and insurance, flight monitoring, meet & greet service, and a guaranteed vehicle class. For longer routes, corporate accounts, or group bookings, the price difference narrows significantly.",
  },
  {
    q: "Is the shuttle bus the cheapest option?",
    a: "The Skylink shuttle bus at $27 per person is cheaper for solo travellers, but it's a shared service with multiple stops. For two or more passengers, a chauffeur transfer is often similar in total cost — and significantly faster and more convenient, especially with luggage.",
  },
  {
    q: "How do prices change for SUV and van bookings?",
    a: "SUV fares are approximately 20–25% above sedan prices. Vans (up to 8 passengers) are approximately 50% above sedan prices. Splitting a van between 6 passengers often makes it cost-competitive with individual Uber rides, without the hassle of multiple bookings.",
  },
];

export default function AirportTransferCostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />

      {/* Hero */}
      <section style={{ background: "#09090B", borderBottom: "1px solid #1f1f23", padding: "80px 24px 64px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            2026 Price Guide — Updated June 2026
          </p>
          <h1 style={{ color: "#FFFFFF", fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
            How Much Does an Adelaide Airport Transfer Cost?
          </h1>
          <p style={{ color: "#A1A1AA", fontSize: 18, lineHeight: 1.7, maxWidth: 660, margin: "0 auto 32px" }}>
            Complete price breakdown by suburb — chauffeur sedan, SUV, and van. Plus honest comparison with Uber, taxi, and shuttle bus options.
          </p>
          <Link href="/book" style={{ background: "#C9A84C", color: "#09090B", padding: "14px 32px", borderRadius: 6, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
            Get My Exact Quote
          </Link>
        </div>
      </section>

      {/* Pricing Table */}
      <section style={{ background: "#0d0d10", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>Adelaide Airport Transfer Prices by Suburb</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 12 }}>All prices fixed, GST-inclusive, tolls included. Chauffeur sedan / SUV / van.</p>
          <p style={{ color: "#52525B", textAlign: "center", fontSize: 13, marginBottom: 40 }}>From Adelaide Airport (ADL) to destination, or reverse.</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #C9A84C" }}>
                  {["Suburb / Area", "Distance", "Approx. Time", "Sedan", "SUV", "Van (8 pax)"].map((h) => (
                    <th key={h} style={{ color: "#C9A84C", textAlign: "left", padding: "12px 14px", fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricingData.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1f1f23", background: i % 2 === 0 ? "#111115" : "transparent" }}>
                    <td style={{ color: "#FFFFFF", padding: "13px 14px", fontWeight: 600 }}>{r.suburb}</td>
                    <td style={{ color: "#71717A", padding: "13px 14px" }}>{r.distance}</td>
                    <td style={{ color: "#71717A", padding: "13px 14px" }}>{r.time}</td>
                    <td style={{ color: "#D4D4D8", padding: "13px 14px", fontWeight: 600 }}>{r.sedan}</td>
                    <td style={{ color: "#D4D4D8", padding: "13px 14px" }}>{r.suv}</td>
                    <td style={{ color: "#D4D4D8", padding: "13px 14px" }}>{r.van}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#52525B", fontSize: 13, marginTop: 16 }}>*POA = Price on Application. Contact us for long-distance quotes. Prices above are indicative — enter your exact address for a confirmed fare.</p>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ background: "#09090B", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>Chauffeur vs Uber vs Taxi vs Shuttle Bus</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 40 }}>What you actually pay for common Adelaide Airport routes in 2026.</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #1f1f23" }}>
                  {["Transport Option", "To CBD", "To Glenelg", "To Barossa", "Key Caveat"].map((h) => (
                    <th key={h} style={{ color: "#A1A1AA", textAlign: "left", padding: "12px 14px", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1f1f23", background: i === 0 ? "#0f0e09" : i % 2 === 0 ? "#111115" : "transparent" }}>
                    <td style={{ color: i === 0 ? "#C9A84C" : "#D4D4D8", padding: "13px 14px", fontWeight: i === 0 ? 700 : 500 }}>{r.mode}</td>
                    <td style={{ color: "#D4D4D8", padding: "13px 14px" }}>{r.cbd}</td>
                    <td style={{ color: "#D4D4D8", padding: "13px 14px" }}>{r.glenelg}</td>
                    <td style={{ color: "#D4D4D8", padding: "13px 14px" }}>{r.barossa}</td>
                    <td style={{ color: "#71717A", padding: "13px 14px", fontSize: 12 }}>{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#52525B", fontSize: 12, marginTop: 12 }}>*Uber prices are estimates at standard demand. Surge pricing not reflected — actual cost at peak times is higher. Chauffeur prices are fixed regardless of demand.</p>
        </div>
      </section>

      {/* What's Included */}
      <section style={{ background: "#0d0d10", padding: "64px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>What's Included in the Chauffeur Price?</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 36 }}>The quoted price is the total price.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
            {[
              "GST — no tax added at checkout",
              "All road tolls on the route",
              "Flight monitoring (airport pickups)",
              "Up to 60 min free wait after landing",
              "Luggage assistance at pickup",
              "Complimentary bottled water",
              "Professional, licensed chauffeur",
              "Fixed price — no surge, no meter",
            ].map((item, i) => (
              <div key={i} style={{ background: "#111115", border: "1px solid #1f1f23", borderRadius: 8, padding: "14px 18px", display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ color: "#C9A84C", fontSize: 18 }}>✓</span>
                <span style={{ color: "#D4D4D8", fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#09090B", padding: "72px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>Pricing FAQ</h2>
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

      {/* Related */}
      <section style={{ background: "#0d0d10", padding: "56px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Related Guides</h2>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/cost/chauffeur-hourly-rate-adelaide" style={{ border: "1px solid #2a2a2e", color: "#A1A1AA", padding: "12px 24px", borderRadius: 6, textDecoration: "none", fontSize: 14 }}>
              Chauffeur Hourly Rate Adelaide →
            </Link>
            <Link href="/services/airport-meet-greet" style={{ border: "1px solid #2a2a2e", color: "#A1A1AA", padding: "12px 24px", borderRadius: 6, textDecoration: "none", fontSize: 14 }}>
              Meet &amp; Greet Service →
            </Link>
            <Link href="/services/late-night-airport-transfers" style={{ border: "1px solid #2a2a2e", color: "#A1A1AA", padding: "12px 24px", borderRadius: 6, textDecoration: "none", fontSize: 14 }}>
              Late Night Transfers →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#111115", borderTop: "1px solid #1f1f23", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Ready to Book Your Transfer?</h2>
        <p style={{ color: "#A1A1AA", fontSize: 16, marginBottom: 28 }}>Enter your details and get your exact fixed price — takes 60 seconds.</p>
        <Link href="/book" style={{ background: "#C9A84C", color: "#09090B", padding: "16px 40px", borderRadius: 6, fontWeight: 700, fontSize: 17, textDecoration: "none" }}>
          Book Airport Transfer
        </Link>
      </section>

      <Footer />
    </>
  );
}
