import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Chauffeur Pricing Adelaide | Transparent Fixed Rates — No Hidden Fees",
  description:
    "Clear, fixed pricing for all chauffeur services in Adelaide. Airport transfers from $89. No surge pricing, no hidden airport levies. Get an instant quote online.",
  keywords: [
    "chauffeur price Adelaide",
    "airport transfer cost Adelaide",
    "how much chauffeur Adelaide",
    "Adelaide taxi alternative price",
    "luxury car hire price Adelaide",
    "chauffeur rate Adelaide",
    "Adelaide Airport transfer cost",
  ],
  alternates: { canonical: `${SITE_URL}/pricing` },
};

const PRICING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  name: "Elite Chauffeurs Adelaide — Service Pricing",
  description: "Fixed pricing for luxury chauffeur services in Adelaide, South Australia. No hidden fees.",
  priceCurrency: "AUD",
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_SCHEMA) }} />
      <Navbar />
      <main>
        <section style={{ background: "#09090B", padding: "72px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.2em", fontSize: 13, marginBottom: 12 }}>TRANSPARENT PRICING</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.15 }}>
            Fixed Rates — No Surge, No Surprises
          </h1>
          <p style={{ color: "#6B7280", fontSize: 17, maxWidth: 560, margin: "0 auto 16px", lineHeight: 1.7 }}>
            All prices are locked at the time of booking. No meter running.
            No airport levies. No after-dark surcharges (except midnight–5am).
          </p>
        </section>

        <section style={{ padding: "64px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>

            {/* Vehicle tiers */}
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>
              Vehicle Pricing Tiers
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, marginBottom: 64 }}>
              {[
                { tier: "Luxury Sedan", vehicles: "Mercedes-Benz E-Class, BMW 5 Series", capacity: "Up to 3 passengers · 2 bags", base: "$89", perKm: "$2.85/km", icon: "🚗", popular: false },
                { tier: "Premium SUV", vehicles: "Mercedes GLE, BMW X5, Audi Q7", capacity: "Up to 5 passengers · 4 bags", base: "$120", perKm: "$3.50/km", icon: "🚙", popular: true },
                { tier: "Executive Van", vehicles: "Mercedes Viano / V-Class", capacity: "Up to 7 passengers · 7 bags", base: "$150", perKm: "$4.20/km", icon: "🚐", popular: false },
                { tier: "Stretch Limousine", vehicles: "Lincoln / Chrysler Stretch", capacity: "Up to 10 passengers", base: "$350", perKm: "$6.00/km", icon: "🤍", popular: false },
              ].map(v => (
                <div key={v.tier} style={{ background: "#17171A", borderRadius: 20, border: v.popular ? "2px solid #C9A84C" : "1px solid #2A2A30", overflow: "hidden", position: "relative" }}>
                  {v.popular && (
                    <div style={{ background: "#C9A84C", color: "#09090B", textAlign: "center", padding: "6px", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em" }}>
                      MOST POPULAR
                    </div>
                  )}
                  <div style={{ padding: 24 }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>{v.icon}</div>
                    <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{v.tier}</h3>
                    <p style={{ color: "#6B7280", fontSize: 12, marginBottom: 12 }}>{v.vehicles}</p>
                    <p style={{ color: "#C9A84C", fontWeight: 900, fontSize: 28, marginBottom: 4 }}>{v.base}</p>
                    <p style={{ color: "#9CA3AF", fontSize: 12, marginBottom: 16 }}>base fare · then {v.perKm}</p>
                    <p style={{ color: "#4B5563", fontSize: 12, marginBottom: 20 }}>{v.capacity}</p>
                    <Link href="/book" style={{ display: "block", background: v.popular ? "#C9A84C" : "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: v.popular ? "#09090B" : "#C9A84C", padding: "12px", borderRadius: 10, fontWeight: 800, fontSize: 14, textDecoration: "none", textAlign: "center" }}>
                      Book This Vehicle →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Fixed route table */}
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 36 }}>
              Common Fixed Route Prices (Sedan)
            </h2>
            <div style={{ background: "#17171A", borderRadius: 20, border: "1px solid #2A2A30", overflow: "hidden" }}>
              {[
                ["Adelaide Airport → CBD", "$89", "$120", "$150"],
                ["Adelaide Airport → Glenelg", "$95", "$128", "$160"],
                ["Adelaide Airport → North Adelaide", "$95", "$128", "$160"],
                ["Adelaide Airport → Mount Barker", "$145", "$195", "$240"],
                ["Adelaide Airport → Barossa Valley", "$195", "$265", "$320"],
                ["Adelaide CBD → Adelaide Hills", "$110", "$148", "$185"],
                ["Adelaide CBD → McLaren Vale", "$130", "$175", "$215"],
                ["Hourly Hire (min. 2 hrs)", "$110/hr", "$140/hr", "$175/hr"],
              ].map(([route, sedan, suv, van], i) => (
                <div key={route} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", borderBottom: i < 7 ? "1px solid #2A2A30" : "none", padding: "16px 24px", alignItems: "center", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                  <span style={{ color: "#D1D5DB", fontSize: 14 }}>{route}</span>
                  <span style={{ color: "#C9A84C", fontWeight: 700, fontSize: 14, textAlign: "center" }}>{sedan}</span>
                  <span style={{ color: "#9CA3AF", fontSize: 14, textAlign: "center" }}>{suv}</span>
                  <span style={{ color: "#9CA3AF", fontSize: 14, textAlign: "center" }}>{van}</span>
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", background: "#111", padding: "12px 24px" }}>
                <span style={{ color: "#6B7280", fontSize: 11 }}>Route</span>
                <span style={{ color: "#C9A84C", fontSize: 11, textAlign: "center" }}>Sedan</span>
                <span style={{ color: "#6B7280", fontSize: 11, textAlign: "center" }}>SUV</span>
                <span style={{ color: "#6B7280", fontSize: 11, textAlign: "center" }}>Van</span>
              </div>
            </div>

            <p style={{ color: "#4B5563", fontSize: 12, textAlign: "center", marginTop: 16 }}>
              * All prices include GST. After-hours rate (+25%) applies midnight–5am.
              Prices shown are for one-way transfers. Return bookings save 10%.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#17171A", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 12 }}>
            Get an Instant Quote for Your Trip
          </h2>
          <p style={{ color: "#6B7280", marginBottom: 28 }}>Enter your route and get a fixed price in seconds.</p>
          <Link href="/book" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 48px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Get Instant Quote →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
