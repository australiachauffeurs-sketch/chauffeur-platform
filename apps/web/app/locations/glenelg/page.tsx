import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Glenelg Chauffeur Service | Luxury Car Hire & Airport Transfers to Glenelg",
  description:
    "Premium chauffeur service in Glenelg, Adelaide. Airport transfers to/from Glenelg from $95. Luxury sedan, SUV & limousine hire for Jetty Road restaurants, Stamford Grand events & beach functions. 24/7.",
  keywords: [
    "chauffeur Glenelg",
    "Glenelg airport transfer",
    "car hire Glenelg Adelaide",
    "Glenelg to Adelaide Airport",
    "Adelaide Airport to Glenelg",
    "luxury car Glenelg",
    "Stamford Grand chauffeur",
    "Jetty Road Glenelg transfer",
    "Glenelg limousine hire",
    "private driver Glenelg",
  ],
  alternates: { canonical: `${SITE_URL}/locations/glenelg` },
  openGraph: {
    title: "Glenelg Chauffeur & Airport Transfer Service | Elite Chauffeurs Adelaide",
    description: "Luxury door-to-door chauffeur service for Glenelg residents and visitors. Airport transfers from $95.",
    url: `${SITE_URL}/locations/glenelg`,
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Elite Chauffeurs — Glenelg Service Area",
  description: "Luxury chauffeur and car hire service serving Glenelg, Adelaide. Airport transfers, hotel pickups and restaurant runs.",
  areaServed: { "@type": "Place", name: "Glenelg", containedInPlace: { "@type": "City", name: "Adelaide" } },
  telephone: "+61 8 8000 0000",
  priceRange: "$$$$",
};

export default function GlenelgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0a0f18 100%)", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 13, marginBottom: 14 }}>📍 GLENELG — SOUTH AUSTRALIA</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 780, margin: "0 auto 18px" }}>
            Luxury Chauffeur Service<br /><span style={{ color: "#C9A84C" }}>in Glenelg, Adelaide</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 17, maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.7 }}>
            From your Glenelg home or hotel to Adelaide Airport — or anywhere across SA.
            The coast's finest chauffeur, available around the clock.
          </p>
          <Link href="/book?from=Glenelg" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "17px 42px", borderRadius: 14, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
            Book Glenelg Chauffeur →
          </Link>
        </section>

        {/* Prices */}
        <section style={{ padding: "64px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 36 }}>
              Glenelg Fixed Prices
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
              {[
                ["Glenelg → Adelaide Airport", "$95", "~30 min"],
                ["Glenelg → Adelaide CBD", "$75", "~25 min"],
                ["Glenelg → Barossa Valley", "$240", "~80 min"],
                ["Glenelg → McLaren Vale", "$185", "~55 min"],
                ["Glenelg → Adelaide Hills", "$160", "~50 min"],
                ["Glenelg → North Adelaide", "$85", "~28 min"],
              ].map(([r, p, t]) => (
                <div key={r} style={{ background: "#17171A", borderRadius: 14, padding: "18px 20px", border: "1px solid #2A2A30", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><p style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{r}</p><p style={{ color: "#6B7280", fontSize: 11 }}>{t}</p></div>
                  <p style={{ color: "#C9A84C", fontWeight: 900, fontSize: 20 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local knowledge */}
        <section style={{ padding: "64px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 32 }}>Popular Glenelg Pickup Locations</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
              {[
                { place: "Stamford Grand Hotel", note: "Foreshore pickup — Moseley Square" },
                { place: "Glenelg Jetty Road", note: "Restaurant strip — any address" },
                { place: "Holdfast Shores", note: "Marina & Seacliff Hotel area" },
                { place: "Glenelg Beach Apartments", note: "All beachfront accommodation" },
                { place: "Glenelg Town Hall", note: "Moseley Square & surrounds" },
                { place: "Glenelg North & South", note: "All residential streets" },
              ].map(loc => (
                <div key={loc.place} style={{ background: "#17171A", borderRadius: 14, padding: "16px 18px", border: "1px solid #2A2A30" }}>
                  <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: 14 }}>{loc.place}</p>
                  <p style={{ color: "#6B7280", fontSize: 12, marginTop: 4 }}>📍 {loc.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#09090B", padding: "60px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 30, fontWeight: 900, marginBottom: 12 }}>Book Your Glenelg Transfer</h2>
          <p style={{ color: "#6B7280", marginBottom: 28 }}>Instant confirmation · Free cancellation · 24/7 service</p>
          <Link href="/book?from=Glenelg" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "17px 44px", borderRadius: 14, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
            Book Now →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
