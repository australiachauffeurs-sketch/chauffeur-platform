import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Chauffeur vs Uber Adelaide — Which is Better for Airport & Corporate Travel?",
  description:
    "Honest comparison: chauffeur service vs Uber in Adelaide. Price, reliability, flight tracking, vehicle quality and corporate invoicing. Find out which is right for your trip.",
  keywords: [
    "chauffeur vs uber Adelaide",
    "uber alternative Adelaide airport",
    "is chauffeur better than uber Adelaide",
    "Adelaide airport uber alternative",
    "corporate car vs uber Adelaide",
    "luxury car service vs uber Adelaide",
    "Uber Black Adelaide alternative",
  ],
  alternates: { canonical: `${SITE_URL}/compare/chauffeur-vs-uber-adelaide` },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Chauffeur vs Uber Adelaide — Which is Better for Airport & Corporate Travel?",
  description: "Honest comparison of chauffeur service versus Uber for Adelaide airport transfers and corporate travel.",
  author: { "@type": "Organization", name: "Elite Chauffeurs Australia" },
  publisher: { "@type": "Organization", name: "Elite Chauffeurs Australia" },
};

const COMPARE = [
  {
    feature: "Pricing",
    chauffeur: "Fixed price locked at booking — what you see is what you pay",
    uber: "Surge pricing active during peak hours, rain, events & public holidays — price can 3x",
    winner: "chauffeur",
  },
  {
    feature: "Vehicle Quality",
    chauffeur: "Late-model Mercedes-Benz, BMW or equivalent — cleaned between every trip",
    uber: "Any car that passes Uber's minimum standards — quality varies significantly",
    winner: "chauffeur",
  },
  {
    feature: "Driver Quality",
    chauffeur: "Police-checked, professionally trained, uniformed chauffeurs",
    uber: "Background check only — no dress code, no formal training",
    winner: "chauffeur",
  },
  {
    feature: "Flight Tracking",
    chauffeur: "Automatic flight monitoring — driver adjusts to delays at no charge",
    uber: "No flight tracking — you book for a time and driver arrives regardless",
    winner: "chauffeur",
  },
  {
    feature: "Meet & Greet",
    chauffeur: "Driver meets you in arrivals hall with name board and assists with luggage",
    uber: "App notification when driver is outside — find your own way to the car park",
    winner: "chauffeur",
  },
  {
    feature: "Corporate Invoicing",
    chauffeur: "Monthly consolidated invoice with GST receipts — seamless expense reporting",
    uber: "Individual receipts per trip — manual expense claim process",
    winner: "chauffeur",
  },
  {
    feature: "Price for Budget Trips",
    chauffeur: "May cost more for very short city trips",
    uber: "Cheaper for casual short rides without surge pricing",
    winner: "uber",
  },
  {
    feature: "Immediate Availability",
    chauffeur: "Best booked in advance — 2–4 hrs min recommended",
    uber: "Available within 5 minutes in most Adelaide suburbs",
    winner: "uber",
  },
  {
    feature: "Child Seats",
    chauffeur: "Available on request — confirmed at booking",
    uber: "Available on some Uber variants — no guarantee",
    winner: "chauffeur",
  },
  {
    feature: "Large Group (7+)",
    chauffeur: "Executive van (7 pax) available, or multiple coordinated vehicles",
    uber: "Limited to standard vehicle sizes — no coordination for groups",
    winner: "chauffeur",
  },
];

export default function ChauffeurVsUberPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0d1017 100%)", padding: "76px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 14 }}>
            HONEST COMPARISON — ADELAIDE
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4.5vw,3.2rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 18px" }}>
            Chauffeur vs Uber in Adelaide<br /><span style={{ color: "#C9A84C" }}>Which Should You Choose?</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 620, margin: "0 auto 30px", lineHeight: 1.7 }}>
            We give you the honest breakdown. For some trips, Uber is fine.
            For airport transfers, corporate travel and anything that matters — here's what the data says.
          </p>
        </section>

        {/* Comparison table */}
        <section style={{ padding: "64px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 36 }}>
              Head-to-Head Comparison
            </h2>

            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 2fr 2fr", background: "#111", borderRadius: "14px 14px 0 0", padding: "14px 20px", gap: 16 }}>
              <span style={{ color: "#6B7280", fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>Feature</span>
              <span style={{ color: "#C9A84C", fontSize: 14, fontWeight: 800, textAlign: "center" }}>🤵 Elite Chauffeur</span>
              <span style={{ color: "#6B7280", fontSize: 14, fontWeight: 700, textAlign: "center" }}>Uber</span>
            </div>

            {COMPARE.map((row, i) => (
              <div key={row.feature} style={{ display: "grid", gridTemplateColumns: "1.5fr 2fr 2fr", borderBottom: i < COMPARE.length - 1 ? "1px solid #1E1E22" : "none", padding: "18px 20px", gap: 16, background: i % 2 === 0 ? "#17171A" : "#141416", borderRadius: i === COMPARE.length - 1 ? "0 0 14px 14px" : 0 }}>
                <span style={{ color: "#9CA3AF", fontSize: 13, fontWeight: 700, alignSelf: "center" }}>{row.feature}</span>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  {row.winner === "chauffeur" && <span style={{ color: "#4ADE80", fontSize: 15, marginTop: 1 }}>✓</span>}
                  <p style={{ color: row.winner === "chauffeur" ? "#D1D5DB" : "#9CA3AF", fontSize: 13, lineHeight: 1.5 }}>{row.chauffeur}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  {row.winner === "uber" && <span style={{ color: "#4ADE80", fontSize: 15, marginTop: 1 }}>✓</span>}
                  <p style={{ color: row.winner === "uber" ? "#D1D5DB" : "#6B7280", fontSize: 13, lineHeight: 1.5 }}>{row.uber}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section style={{ padding: "56px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 24 }}>Our Honest Verdict</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {[
                { icon: "✈", title: "Airport Transfers → Chauffeur wins clearly", desc: "Flight tracking alone makes a chauffeur worth it. An Uber doesn't know your flight is 90 minutes late. Your chauffeur does — and waits." },
                { icon: "💼", title: "Corporate Travel → Chauffeur wins clearly", desc: "Monthly invoicing, GST receipts, consistent vehicle quality, and the professional impression you make when a client watches you step out of a Mercedes S-Class." },
                { icon: "💍", title: "Weddings & Events → Chauffeur wins clearly", desc: "You cannot book a stretch limousine on Uber. Pre-planned, coordinated, punctual — events demand certainty." },
                { icon: "🏃", title: "Quick solo city hop → Uber can work", desc: "For a casual ride on a quiet afternoon with no surge pricing — Uber is cheaper. But if your meeting starts in 45 minutes and traffic's bad, use a chauffeur." },
              ].map(v => (
                <div key={v.title} style={{ background: "#17171A", borderRadius: 14, padding: 22, border: "1px solid #2A2A30", display: "flex", gap: 16 }}>
                  <span style={{ fontSize: 28 }}>{v.icon}</span>
                  <div>
                    <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{v.title}</h3>
                    <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.6 }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#09090B", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 30, fontWeight: 900, marginBottom: 12 }}>
            Ready to Upgrade from Uber?
          </h2>
          <p style={{ color: "#9CA3AF", marginBottom: 28, fontSize: 16 }}>
            Get an instant fixed-price quote. No surge. No surprises.
          </p>
          <Link href="/book" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "17px 44px", borderRadius: 13, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Get Instant Quote →
          </Link>
          <p style={{ color: "#4B5563", marginTop: 14, fontSize: 12 }}>
            Free cancellation · No credit card required to quote
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
