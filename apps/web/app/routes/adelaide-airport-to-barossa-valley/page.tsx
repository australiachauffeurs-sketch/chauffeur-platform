import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Adelaide Airport to Barossa Valley Chauffeur | Private Transfer from ADL",
  description:
    "Private luxury chauffeur transfer from Adelaide Airport directly to Barossa Valley wineries and accommodation. Sedan from $195, SUV from $265. No shared shuttles — your vehicle, your schedule. Book online.",
  keywords: [
    "Adelaide Airport to Barossa Valley",
    "ADL airport Barossa Valley transfer",
    "chauffeur Adelaide Airport Barossa",
    "private transfer Adelaide Airport Barossa",
    "Barossa Valley airport shuttle",
    "luxury car Adelaide Airport to Seppeltsfield",
    "Penfolds winery transfer from airport",
  ],
  alternates: { canonical: `${SITE_URL}/routes/adelaide-airport-to-barossa-valley` },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "Adelaide Airport to Barossa Valley Private Transfer",
  description: "Luxury private chauffeur transfer from Adelaide Airport (ADL) to Barossa Valley wineries and accommodation. No shared shuttles.",
  offers: { "@type": "Offer", price: "195", priceCurrency: "AUD" },
  provider: { "@type": "LocalBusiness", name: "Elite Chauffeurs Australia", telephone: "+61 8 8000 0000" },
};

export default function AirportToBarossaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0f0a00 100%)", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 14 }}>
            ✈ ADL AIRPORT → 🍷 BAROSSA VALLEY
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4.5vw,3.2rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 18px" }}>
            Adelaide Airport to<br /><span style={{ color: "#C9A84C" }}>Barossa Valley Private Transfer</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 17, maxWidth: 600, margin: "0 auto 30px", lineHeight: 1.7 }}>
            Land at ADL and travel directly to your Barossa winery or accommodation —
            no waiting for a shared shuttle. Your private chauffeur, ready when you are.
          </p>
          <Link href="/book?from=Adelaide+Airport&to=Barossa+Valley" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "17px 42px", borderRadius: 14, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
            Book This Route — from $195 →
          </Link>
        </section>

        {/* Route details */}
        <section style={{ padding: "60px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16, marginBottom: 48 }}>
              {[
                { label: "Distance", value: "~75 km" },
                { label: "Travel Time", value: "~60 min" },
                { label: "Sedan Price", value: "$195" },
                { label: "SUV Price", value: "$265" },
                { label: "Van (7 pax)", value: "$320" },
                { label: "Availability", value: "24/7" },
              ].map(s => (
                <div key={s.label} style={{ background: "#17171A", borderRadius: 14, padding: 20, border: "1px solid #2A2A30", textAlign: "center" }}>
                  <p style={{ color: "#6B7280", fontSize: 11, marginBottom: 6 }}>{s.label}</p>
                  <p style={{ color: "#C9A84C", fontWeight: 900, fontSize: 22 }}>{s.value}</p>
                </div>
              ))}
            </div>

            <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 20 }}>
              Popular Drop-off Points in Barossa Valley
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
              {[
                "Penfolds Barossa Estate, Nuriootpa",
                "Seppeltsfield Winery, Seppeltsfield",
                "Jacob's Creek Estate, Rowland Flat",
                "Novotel Barossa Valley Resort",
                "The Louise — Marananga",
                "Langmeil Winery, Tanunda",
                "Wolf Blass Estate, Nuriootpa",
                "Henschke Cellars, Keyneton",
              ].map(loc => (
                <div key={loc} style={{ display: "flex", alignItems: "center", gap: 10, background: "#17171A", borderRadius: 12, padding: "13px 16px", border: "1px solid #2A2A30" }}>
                  <span style={{ color: "#C9A84C" }}>📍</span>
                  <span style={{ color: "#D1D5DB", fontSize: 13 }}>{loc}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16, padding: 24, marginTop: 32 }}>
              <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>✈ Flight Tracking Included</h3>
              <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.7 }}>
                We monitor your incoming flight from the moment it departs. If your flight is delayed — by 20 minutes or 3 hours — your driver adjusts automatically.
                There is no extra charge for delays. We are waiting for you, not the other way around.
              </p>
            </div>
          </div>
        </section>

        {/* Reverse route */}
        <section style={{ padding: "52px 24px", background: "#111113", textAlign: "center" }}>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 10 }}>Also available in reverse:</p>
          <Link href="/book?from=Barossa+Valley&to=Adelaide+Airport" style={{ display: "inline-block", border: "2px solid #C9A84C", color: "#C9A84C", padding: "14px 36px", borderRadius: 13, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            🍷 Barossa Valley → ✈ Adelaide Airport →
          </Link>
        </section>

        <section style={{ background: "#09090B", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 30, fontWeight: 900, marginBottom: 12 }}>Book Your Airport–Barossa Transfer</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 28 }}>Instant confirmation · Fixed price · Private vehicle</p>
          <Link href="/book?from=Adelaide+Airport&to=Barossa+Valley" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "17px 44px", borderRadius: 13, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Book Now — from $195 →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
