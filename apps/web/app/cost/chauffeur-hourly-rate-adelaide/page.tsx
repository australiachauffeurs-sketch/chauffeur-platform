import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Chauffeur Hourly Rate Adelaide 2026 — How Much Does Hourly Hire Cost?",
  description:
    "Adelaide chauffeur hourly hire from $125/hr sedan, $145/hr SUV, $165/hr van. Minimum 2 hours. When hourly hire beats point-to-point — winery tours, events, multi-stop days.",
  keywords: [
    "chauffeur hourly rate Adelaide",
    "hourly hire chauffeur Adelaide",
    "how much does hourly chauffeur cost Adelaide",
    "Adelaide chauffeur by the hour",
    "winery tour chauffeur Adelaide cost",
    "chauffeur hire Adelaide per hour",
    "corporate chauffeur hourly Adelaide",
    "chauffeur hourly 2026 Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/cost/chauffeur-hourly-rate-adelaide` },
  openGraph: {
    title: "Chauffeur Hourly Rate Adelaide 2026 | Hourly Hire Cost Guide",
    description: "Sedan from $125/hr, SUV from $145/hr, van from $165/hr. Min 2 hours. Full pricing guide + when hourly hire makes sense.",
    url: `${SITE_URL}/cost/chauffeur-hourly-rate-adelaide`,
    images: [{ url: "/images/sedan.jpg", width: 1200, height: 630, alt: "Chauffeur Hourly Rate Adelaide" }],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a chauffeur cost per hour in Adelaide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chauffeur hourly hire in Adelaide starts from $125 per hour for a sedan, $145 per hour for an SUV, and $165 per hour for a van. A minimum 2-hour booking applies. All prices are GST-inclusive.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum hire period for an Adelaide chauffeur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum booking period for hourly hire is 2 hours. This applies to all vehicle classes — sedan, SUV, and van.",
      },
    },
  ],
};

const rates = [
  { vehicle: "Sedan", capacity: "Up to 3 passengers", luggage: "3 large bags", rate: "$125/hr", min: "$250 (2 hr min)", note: "BMW 5 Series or similar" },
  { vehicle: "SUV", capacity: "Up to 5 passengers", luggage: "5 large bags", rate: "$145/hr", min: "$290 (2 hr min)", note: "Mercedes GLE or similar" },
  { vehicle: "Van", capacity: "Up to 8 passengers", luggage: "8+ bags", rate: "$165/hr", min: "$330 (2 hr min)", note: "Mercedes Vito or similar" },
];

const examples = [
  {
    title: "Barossa Valley Winery Tour — 6 Hours",
    vehicle: "SUV (2 couples)",
    calc: "6 hrs × $145/hr",
    total: "$870",
    perPax: "$217 per person",
    detail: "Pickup from Adelaide CBD, visit 3 wineries, lunch stop, return. Driver waits throughout. No parking stress, everyone drinks.",
  },
  {
    title: "Wedding Day Chauffeur — 4 Hours",
    vehicle: "Sedan",
    calc: "4 hrs × $125/hr",
    total: "$500",
    perPax: "For bride & groom",
    detail: "Venue to ceremony to photoshoot locations to reception. Driver on standby the entire time. No rigid schedule required.",
  },
  {
    title: "Corporate Roadshow — 8 Hours",
    vehicle: "SUV",
    calc: "8 hrs × $145/hr",
    total: "$1,160",
    perPax: "Full day, multi-stop",
    detail: "Executive visiting 5 clients across metro Adelaide. Driver waits outside each meeting, vehicle pre-cooled, documents organised.",
  },
  {
    title: "McLaren Vale Day Trip — 5 Hours",
    vehicle: "Van (6 friends)",
    calc: "5 hrs × $165/hr",
    total: "$825",
    perPax: "$137 per person",
    detail: "Saturday day trip from city to wineries and the Willunga Farmers Market. Cheaper per person than multiple Ubers. Everyone relaxes.",
  },
  {
    title: "Hens Night Transfers — 3 Hours",
    vehicle: "Van",
    calc: "3 hrs × $165/hr",
    total: "$495",
    perPax: "~$62 for 8 pax",
    detail: "Pickup from home, Rundle Street bar hop, restaurant, return. Driver handles parking and timing — no one gets stranded.",
  },
];

const whenHourly = [
  { scenario: "Winery or Cellar Door Tours", reason: "Multiple stops, unpredictable timing, everyone wants to enjoy a drink. Fixed point-to-point doesn't account for extended tasting time." },
  { scenario: "Wedding Day & Formal Events", reason: "You need the vehicle and driver on standby between ceremony, photos, and reception. Hourly gives you flexibility without extra booking hassle." },
  { scenario: "Corporate Roadshows & Multi-Client Days", reason: "Executive making back-to-back client visits. The vehicle waits — you're not booking a new transfer for each meeting." },
  { scenario: "Adelaide Hills / McLaren Vale Day Trips", reason: "When the journey involves wandering between venues without a fixed endpoint time, hourly is far more cost-effective." },
  { scenario: "Group Nights Out (Multi-Venue)", reason: "Bar crawls, restaurant hops, late-night event circuits. One van, one driver, one price — no surge surprises at midnight." },
  { scenario: "Airport + Errands on the Same Trip", reason: "Dropping someone to the airport then continuing to meetings? Hourly covers it all. Point-to-point would require two separate bookings." },
];

const ptpWhenBetter = [
  "Simple A-to-B with no waiting",
  "Airport pickup or drop-off (no extended wait)",
  "Single hotel or venue transfer",
  "When you know the exact end point and time",
];

const faqs = [
  {
    q: "What is included in the hourly hire rate?",
    a: "The hourly rate includes the driver's time, fuel, vehicle running costs, and GST. Tolls are included. Parking at venues is not included — if the driver needs to park in a paid facility while waiting, this is charged at cost and added to the final invoice. Street waiting is always free.",
  },
  {
    q: "Is there a minimum booking period?",
    a: "Yes — the minimum booking for hourly hire is 2 hours across all vehicle classes. This applies regardless of whether you use the full time. A 90-minute errand is still billed at the 2-hour minimum.",
  },
  {
    q: "What happens if I need the driver for longer than booked?",
    a: "If you need to extend your booking on the day, simply ask your driver and they will check availability. Extensions are charged at the standard hourly rate and added to the final invoice or card on file. We recommend building in buffer time for winery tours and events.",
  },
  {
    q: "Can I book hourly hire for airport transfers?",
    a: "You can, but it's usually not the most cost-effective option. A point-to-point transfer from the CBD to the airport is $89 fixed. Hourly hire would cost $250 minimum (2-hour minimum). Hourly makes sense for airport transfers only when combined with other stops — e.g. hotel to meeting to airport on the same booking.",
  },
  {
    q: "Are fuel costs included in the hourly rate?",
    a: "Yes. Fuel is included in the hourly rate. You will never see a fuel surcharge on your invoice. The rate you're quoted is the rate you pay per hour.",
  },
  {
    q: "Can I pay by corporate account or invoice?",
    a: "Yes. Corporate and government clients can set up a monthly account with consolidated invoicing. All bookings on account generate a tax invoice with full GST detail, job reference, and passenger details as required.",
  },
  {
    q: "Is the driver expected to help with luggage during hourly hire?",
    a: "Yes. Chauffeur service means your driver assists with luggage at every stop, opens doors, and handles any loading or unloading. This is standard service — not an add-on.",
  },
];

export default function ChauffeurHourlyRatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />

      {/* Hero */}
      <section style={{ background: "#09090B", borderBottom: "1px solid #1f1f23", padding: "80px 24px 64px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            2026 Pricing Guide — Adelaide SA
          </p>
          <h1 style={{ color: "#FFFFFF", fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
            Chauffeur Hourly Rate Adelaide — How Much Does Hourly Hire Cost?
          </h1>
          <p style={{ color: "#A1A1AA", fontSize: 18, lineHeight: 1.7, maxWidth: 660, margin: "0 auto 32px" }}>
            Sedan from <strong style={{ color: "#C9A84C" }}>$125/hr</strong>, SUV from <strong style={{ color: "#C9A84C" }}>$145/hr</strong>, van from <strong style={{ color: "#C9A84C" }}>$165/hr</strong>. Minimum 2-hour booking. Full breakdown below.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" style={{ background: "#C9A84C", color: "#09090B", padding: "14px 32px", borderRadius: 6, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
              Book Hourly Hire
            </Link>
            <Link href="/cost/airport-transfer-cost-adelaide" style={{ border: "1px solid #3f3f46", color: "#A1A1AA", padding: "14px 32px", borderRadius: 6, fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
              Airport Transfer Prices
            </Link>
          </div>
        </div>
      </section>

      {/* Rate Cards */}
      <section style={{ background: "#0d0d10", padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>2026 Hourly Hire Rates</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 40 }}>All rates GST-inclusive. Minimum 2-hour booking applies.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {rates.map((r, i) => (
              <div key={i} style={{ background: "#111115", border: i === 0 ? "2px solid #C9A84C" : "1px solid #2a2a2e", borderRadius: 12, padding: "32px 28px" }}>
                {i === 0 && (
                  <div style={{ background: "#C9A84C", color: "#09090B", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 4, display: "inline-block", marginBottom: 16 }}>
                    Most Popular
                  </div>
                )}
                <h3 style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{r.vehicle}</h3>
                <div style={{ color: "#52525B", fontSize: 13, marginBottom: 20 }}>{r.note}</div>
                <div style={{ color: "#C9A84C", fontSize: 36, fontWeight: 900, marginBottom: 4 }}>{r.rate}</div>
                <div style={{ color: "#71717A", fontSize: 13, marginBottom: 24 }}>Min. {r.min}</div>
                <div style={{ borderTop: "1px solid #1f1f23", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ color: "#A1A1AA", fontSize: 13 }}>👥 {r.capacity}</div>
                  <div style={{ color: "#A1A1AA", fontSize: 13 }}>🧳 {r.luggage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Examples */}
      <section style={{ background: "#09090B", padding: "72px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>Real Pricing Examples</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 48 }}>How much common Adelaide hire scenarios actually cost.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {examples.map((e, i) => (
              <div key={i} style={{ background: "#111115", border: "1px solid #1f1f23", borderRadius: 10, padding: "24px 28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{e.title}</h3>
                    <span style={{ color: "#71717A", fontSize: 13 }}>{e.vehicle} · {e.calc}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#C9A84C", fontSize: 24, fontWeight: 800 }}>{e.total}</div>
                    <div style={{ color: "#71717A", fontSize: 13 }}>{e.perPax}</div>
                  </div>
                </div>
                <p style={{ color: "#A1A1AA", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{e.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Choose Hourly */}
      <section style={{ background: "#0d0d10", padding: "72px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>When Hourly Hire Is the Better Choice</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 40 }}>Hourly hire beats point-to-point in these scenarios.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 48 }}>
            {whenHourly.map((w, i) => (
              <div key={i} style={{ background: "#111115", border: "1px solid #1f1f23", borderRadius: 8, padding: "22px 20px" }}>
                <h3 style={{ color: "#C9A84C", fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{w.scenario}</h3>
                <p style={{ color: "#A1A1AA", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{w.reason}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "#111115", border: "1px solid #1f1f23", borderRadius: 10, padding: "28px 32px" }}>
            <h3 style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>When Point-to-Point Is Better</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {ptpWhenBetter.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ color: "#71717A", fontSize: 18 }}>→</span>
                  <span style={{ color: "#A1A1AA", fontSize: 15 }}>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 20 }}>
              <Link href="/services/point-to-point" style={{ color: "#C9A84C", fontSize: 14, textDecoration: "underline" }}>
                See point-to-point pricing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#09090B", padding: "72px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>Hourly Hire FAQ</h2>
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
          <h2 style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Related Services & Guides</h2>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/services/hourly-hire" style={{ border: "1px solid #2a2a2e", color: "#A1A1AA", padding: "12px 24px", borderRadius: 6, textDecoration: "none", fontSize: 14 }}>
              Hourly Hire Service →
            </Link>
            <Link href="/services/wine-tours" style={{ border: "1px solid #2a2a2e", color: "#A1A1AA", padding: "12px 24px", borderRadius: 6, textDecoration: "none", fontSize: 14 }}>
              Wine Tours →
            </Link>
            <Link href="/cost/airport-transfer-cost-adelaide" style={{ border: "1px solid #2a2a2e", color: "#A1A1AA", padding: "12px 24px", borderRadius: 6, textDecoration: "none", fontSize: 14 }}>
              Airport Transfer Costs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#111115", borderTop: "1px solid #1f1f23", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Ready to Book Hourly Hire?</h2>
        <p style={{ color: "#A1A1AA", fontSize: 16, marginBottom: 28 }}>Tell us your date, duration, and vehicle class — we'll confirm availability instantly.</p>
        <Link href="/book" style={{ background: "#C9A84C", color: "#09090B", padding: "16px 40px", borderRadius: 6, fontWeight: 700, fontSize: 17, textDecoration: "none" }}>
          Book Hourly Hire — From $125/hr
        </Link>
      </section>

      <Footer />
    </>
  );
}
