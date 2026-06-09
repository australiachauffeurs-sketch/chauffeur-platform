"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export interface SuburbData {
  name: string;
  slug: string;
  postcode: string;
  region: string;
  tagline: string;
  description: string;
  distanceFromCBD: string;
  distanceFromAirport: string;
  airportTime: string;
  routes: { to: string; price: string; time: string }[];
  landmarks: { name: string; note: string }[];
  heroKeyword: string;
}

export default function SuburbPageTemplate({ suburb }: { suburb: SuburbData }) {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0d0d16 100%)", padding: "76px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 14, textTransform: "uppercase" }}>
            📍 {suburb.region} · SA {suburb.postcode}
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4.5vw,3.4rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 18px" }}>
            {suburb.heroKeyword}<br /><span style={{ color: "#C9A84C" }}>in {suburb.name}, Adelaide</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 560, margin: "0 auto 30px", lineHeight: 1.7 }}>
            {suburb.description}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`/book?from=${encodeURIComponent(suburb.name)}`}
              style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "16px 38px", borderRadius: 13, fontWeight: 900, fontSize: 15, textDecoration: "none" }}>
              Book from {suburb.name} →
            </Link>
            <Link href={`/book?to=${encodeURIComponent(suburb.name)}`}
              style={{ display: "inline-block", border: "2px solid #C9A84C", color: "#C9A84C", padding: "16px 38px", borderRadius: 13, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Transfer to {suburb.name} →
            </Link>
          </div>
        </section>

        {/* Quick stats */}
        <section style={{ background: "#C9A84C", padding: "16px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 8 }}>
            {[
              `📍 ${suburb.distanceFromCBD} from Adelaide CBD`,
              `✈ ${suburb.distanceFromAirport} from ADL Airport`,
              `🕐 ${suburb.airportTime} to airport`,
              "⭐ 4.9 rating · 247+ reviews",
              "📞 24/7 service",
            ].map(t => <span key={t} style={{ color: "#09090B", fontWeight: 700, fontSize: 13 }}>{t}</span>)}
          </div>
        </section>

        {/* Prices */}
        <section style={{ padding: "64px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 10 }}>
              Fixed Prices from {suburb.name}
            </h2>
            <p style={{ color: "#6B7280", textAlign: "center", marginBottom: 36, fontSize: 14 }}>
              Locked at booking — no meter, no surge, no hidden fees
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
              {suburb.routes.map(r => (
                <Link key={r.to} href={`/book?from=${encodeURIComponent(suburb.name)}&to=${encodeURIComponent(r.to)}`}
                  style={{ background: "#17171A", borderRadius: 14, padding: "18px 20px", border: "1px solid #2A2A30", display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none" }}>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{suburb.name} → {r.to}</p>
                    <p style={{ color: "#6B7280", fontSize: 11 }}>{r.time}</p>
                  </div>
                  <p style={{ color: "#C9A84C", fontWeight: 900, fontSize: 20 }}>{r.price}</p>
                </Link>
              ))}
            </div>
            <p style={{ color: "#374151", fontSize: 11, textAlign: "center", marginTop: 16 }}>
              Prices shown for luxury sedan. SUV and van also available. Includes GST.
            </p>
          </div>
        </section>

        {/* Landmarks */}
        <section style={{ padding: "56px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 28 }}>
              Popular Pickup Points in {suburb.name}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 14 }}>
              {suburb.landmarks.map(l => (
                <div key={l.name} style={{ background: "#17171A", borderRadius: 14, padding: "15px 18px", border: "1px solid #2A2A30" }}>
                  <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: 14 }}>{l.name}</p>
                  <p style={{ color: "#6B7280", fontSize: 12, marginTop: 4 }}>📍 {l.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section style={{ padding: "56px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 32 }}>
              Why {suburb.name} Residents Choose Elite Chauffeurs
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["✓", "Professional, police-checked drivers"],
                ["✓", "Late-model luxury fleet — always clean"],
                ["✓", "Fixed pricing — quoted before you book"],
                ["✓", "Flight tracking for airport runs"],
                ["✓", "24/7 availability — including public holidays"],
                ["✓", "SMS driver tracking — know exactly when they arrive"],
                ["✓", "Child seat available on request"],
                ["✓", "Corporate accounts with monthly invoicing"],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#17171A", borderRadius: 12, padding: "14px 16px", border: "1px solid #2A2A30" }}>
                  <span style={{ color: "#C9A84C", fontWeight: 900 }}>{icon}</span>
                  <span style={{ color: "#D1D5DB", fontSize: 13 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "linear-gradient(135deg,#1a1200 0%,#09090B 100%)", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 30, fontWeight: 900, marginBottom: 12 }}>
            Book Your {suburb.name} Chauffeur
          </h2>
          <p style={{ color: "#9CA3AF", marginBottom: 28, fontSize: 16 }}>
            Instant confirmation · Free cancellation up to 2 hours before pickup
          </p>
          <Link href={`/book?from=${encodeURIComponent(suburb.name)}`}
            style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "17px 46px", borderRadius: 13, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Book Now — Instant Quote →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
