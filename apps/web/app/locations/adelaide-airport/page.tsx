import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Adelaide Airport Chauffeur | ADL Airport Pickup & Drop-off Service",
  description:
    "Professional chauffeur service to and from Adelaide Airport (ADL). All terminals covered. Meet & greet, flight tracking, luggage assistance. Book instantly — from $89.",
  keywords: [
    "Adelaide Airport chauffeur",
    "ADL airport car service",
    "Adelaide Airport pickup",
    "Adelaide Airport drop off",
    "Adelaide Airport taxi alternative",
    "Adelaide Airport to city",
    "luxury car Adelaide Airport",
    "Adelaide Airport transfer service",
    "airport car hire Adelaide",
    "Adelaide Airport meet and greet",
  ],
  alternates: { canonical: `${SITE_URL}/locations/adelaide-airport` },
  openGraph: {
    title: "Adelaide Airport Chauffeur Service | Elite Chauffeurs",
    description: "Luxury door-to-door transfer to/from Adelaide Airport. Flight tracking & meet & greet included. From $89.",
    url: `${SITE_URL}/locations/adelaide-airport`,
    images: [{ url: "/images/airport.jpg", width: 1200, height: 630 }],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "Elite Chauffeurs — Adelaide Airport Transfer",
  description: "Luxury chauffeur service operating to and from Adelaide Airport (ADL). Meet & greet, flight tracking, all terminals.",
  provider: { "@type": "LocalBusiness", name: "Elite Chauffeurs Australia", telephone: "+61 8 8000 0000" },
  areaServed: { "@type": "Airport", name: "Adelaide Airport", iataCode: "ADL" },
  offers: { "@type": "Offer", price: "89", priceCurrency: "AUD" },
};

export default function AdelaideAirportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        <section style={{ background: "linear-gradient(135deg, #09090B 0%, #0a0a1a 100%)", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.2em", fontSize: 13, marginBottom: 16 }}>
            ✈ ADELAIDE AIRPORT (ADL) — ALL TERMINALS
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 20px" }}>
            Adelaide Airport Chauffeur<br />
            <span style={{ color: "#C9A84C" }}>Pickups & Drop-offs — 24/7</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 18, maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.7 }}>
            We cover Terminal 1 (domestic), Terminal 2 (international) and the General Aviation terminal.
            Your driver is waiting before you land.
          </p>
          <Link href="/book?service=airport&location=ADL" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 44px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Book Adelaide Airport Transfer →
          </Link>
        </section>

        {/* Terminal info */}
        <section style={{ padding: "60px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 36 }}>
              All Adelaide Airport Terminals Covered
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
              {[
                { terminal: "Terminal 1 — Domestic", airlines: "Qantas, Virgin, Rex, Bonza", note: "Driver meets you at exit doors, Arrivals level" },
                { terminal: "Terminal 2 — International", airlines: "Singapore Airlines, Malaysia Airlines, Qatar, Air New Zealand", note: "Meet & greet in international arrivals hall with name board" },
                { terminal: "General Aviation", airlines: "Charter & private aircraft", note: "Kerb-side pickup by arrangement" },
              ].map(t => (
                <div key={t.terminal} style={{ background: "#17171A", borderRadius: 16, padding: 22, border: "1px solid #2A2A30" }}>
                  <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{t.terminal}</h3>
                  <p style={{ color: "#D1D5DB", fontSize: 13, marginBottom: 6 }}>{t.airlines}</p>
                  <p style={{ color: "#6B7280", fontSize: 12 }}>📍 {t.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prices from ADL */}
        <section style={{ padding: "60px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 36 }}>
              Fixed Prices from Adelaide Airport
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {[
                ["ADL → Adelaide CBD", "$89", "~25 min"],
                ["ADL → Glenelg", "$95", "~30 min"],
                ["ADL → North Adelaide", "$95", "~28 min"],
                ["ADL → Norwood", "$99", "~30 min"],
                ["ADL → Stirling / Hills", "$130", "~40 min"],
                ["ADL → Mount Barker", "$145", "~45 min"],
                ["ADL → Barossa Valley", "$195", "~60 min"],
                ["ADL → McLaren Vale", "$160", "~55 min"],
              ].map(([route, price, time]) => (
                <div key={route} style={{ background: "#17171A", borderRadius: 14, padding: "18px 20px", border: "1px solid #2A2A30", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{route}</p>
                    <p style={{ color: "#6B7280", fontSize: 12 }}>{time}</p>
                  </div>
                  <p style={{ color: "#C9A84C", fontWeight: 900, fontSize: 18 }}>{price}</p>
                </div>
              ))}
            </div>
            <p style={{ color: "#4B5563", fontSize: 12, textAlign: "center", marginTop: 20 }}>
              All prices are for luxury sedan. SUV & van also available. Prices include all fees — no surcharges.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#17171A", padding: "60px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Book Your Airport Transfer Now</h2>
          <p style={{ color: "#6B7280", fontSize: 16, marginBottom: 32 }}>Instant confirmation. Free cancellation up to 2 hours before pickup.</p>
          <Link href="/book?service=airport" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 48px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Book Now →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
