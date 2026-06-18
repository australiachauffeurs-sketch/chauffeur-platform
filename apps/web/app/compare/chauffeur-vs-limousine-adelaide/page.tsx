import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Chauffeur vs Limousine Adelaide — What's the Difference?",
  description:
    "Comparing chauffeur cars and limousines in Adelaide. Modern sedans and SUVs win for corporate, airport, and winery travel. Limos suit school formals and weddings. Read the full breakdown.",
  alternates: { canonical: `${SITE_URL}/compare/chauffeur-vs-limousine-adelaide` },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Chauffeur vs Limousine Adelaide — What's the Difference?",
  description:
    "An honest comparison of chauffeur cars and stretch limousines in Adelaide, covering vehicle quality, occasions, pricing, and corporate suitability.",
  author: { "@type": "Organization", name: "Australia Chauffeurs" },
  publisher: {
    "@type": "Organization",
    name: "Australia Chauffeurs",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-01-01",
  dateModified: "2026-06-01",
  mainEntityOfPage: `${SITE_URL}/compare/chauffeur-vs-limousine-adelaide`,
};

const rows = [
  { feature: "Vehicle type", chauffeur: "Mercedes-Benz, BMW, Genesis, Kia EV6", limo: "Stretched Holden Caprice or Hummer" },
  { feature: "Interior quality", chauffeur: "Factory luxury — clean, modern, quiet", limo: "Custom fit-out — varies widely" },
  { feature: "Typical occasion", chauffeur: "Corporate, airport, winery, weddings", limo: "School formals, bucks/hens, nightlife" },
  { feature: "Passenger capacity", chauffeur: "1–7 (sedan to large SUV)", limo: "8–14 (stretch configuration)" },
  { feature: "Discretion", chauffeur: "Low-profile, professional appearance", limo: "High-visibility by design" },
  { feature: "On-time reliability", chauffeur: "Flight tracking, real-time routing", limo: "Fixed itinerary, less flexible" },
  { feature: "ABN & tax invoice", chauffeur: "Provided as standard", limo: "Not always available" },
  { feature: "Price range", chauffeur: "From ~$120 airport transfer", limo: "From ~$350 for 3-hour hire" },
];

export default function ChauffeurVsLimousine() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <Navbar />
      <main style={{ background: "#09090B", color: "#E5E5E5", minHeight: "100vh" }}>
        {/* Hero */}
        <section
          style={{
            background: "linear-gradient(135deg, #09090B 0%, #111113 100%)",
            borderBottom: "1px solid #1F1F23",
            padding: "80px 24px 60px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ color: "#C9A84C", fontSize: 14, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Adelaide Transport Comparison
            </p>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 700, color: "#FAFAFA", lineHeight: 1.2, marginBottom: 20 }}>
              Chauffeur vs Limousine Adelaide —{" "}
              <span style={{ color: "#C9A84C" }}>What's the Difference?</span>
            </h1>
            <p style={{ fontSize: 18, color: "#A1A1AA", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 28px" }}>
              Both involve a driver and a premium experience — but the similarities end there. Here's an honest guide to help you choose the right vehicle for your Adelaide occasion.
            </p>
            <p style={{ color: "#71717A", fontSize: 14 }}>Updated June 2026 · 5-minute read</p>
          </div>
        </section>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>

          {/* Intro */}
          <section style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              When people in Adelaide search for "hire a limo" they often mean they want a premium private vehicle with a driver — which is exactly what a chauffeur car is. But an actual stretch limousine is a very different beast, and knowing the distinction could save you from booking the wrong thing for a board meeting, an airport run, or a winery day in the Barossa.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              As Adelaide's premier chauffeur service, we'll give you the unvarnished truth — including situations where a limo genuinely makes more sense.
            </p>
          </section>

          {/* What is a chauffeur car */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              What Is a Chauffeur Car?
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              A chauffeur car is a late-model luxury sedan or SUV — typically a Mercedes-Benz E-Class or S-Class, BMW 5 or 7 Series, Genesis G80, or an electric vehicle like the Kia EV6 — driven by a professionally trained, background-checked chauffeur. The vehicle looks like any other luxury car on the road, which is the point.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              Chauffeur services in Adelaide are heavily used by corporate clients, executives travelling to the CBD, interstate visitors arriving at Adelaide Airport, and couples celebrating weddings or anniversaries. The emphasis is on reliability, discretion, and genuine luxury — not spectacle.
            </p>
          </section>

          {/* What is a limo */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              What Is a Stretch Limousine?
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              A stretch limousine is a custom-extended vehicle — commonly a Holden Caprice, Ford Excursion, or Hummer H2 — with a party-oriented interior featuring mood lighting, a bar fridge, and bench seating for 8–14 passengers. They are explicitly designed to be noticed.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              In Adelaide, you'll see stretch limos booked for Norwood school formals, city nightlife crawls, and 21st birthday parties. The vehicle age varies — many Adelaide limo fleets run vehicles that are 10–15 years old, which is worth knowing if vehicle condition matters to you.
            </p>
          </section>

          {/* Comparison table */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 24, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Side-by-Side Comparison
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
                <thead>
                  <tr style={{ background: "#111113" }}>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#C9A84C", fontWeight: 600, borderBottom: "2px solid #C9A84C" }}>Feature</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#C9A84C", fontWeight: 600, borderBottom: "2px solid #C9A84C" }}>Chauffeur Car</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#A1A1AA", fontWeight: 600, borderBottom: "2px solid #1F1F23" }}>Stretch Limousine</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.feature} style={{ background: i % 2 === 0 ? "#0C0C0E" : "#09090B" }}>
                      <td style={{ padding: "14px 16px", color: "#A1A1AA", borderBottom: "1px solid #1F1F23", fontWeight: 500 }}>{row.feature}</td>
                      <td style={{ padding: "14px 16px", color: "#E5E5E5", borderBottom: "1px solid #1F1F23" }}>{row.chauffeur}</td>
                      <td style={{ padding: "14px 16px", color: "#71717A", borderBottom: "1px solid #1F1F23" }}>{row.limo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* When to choose each */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 24, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              When to Choose Each
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 24 }}>
                <h3 style={{ color: "#C9A84C", fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Choose a Chauffeur Car For:</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["Adelaide Airport transfers", "Corporate meetings & roadshows", "Winery tours (Barossa, McLaren Vale)", "Wedding transport for the couple", "Conference shuttle runs", "Discreet VIP travel"].map(item => (
                    <li key={item} style={{ color: "#D4D4D8", fontSize: 15, padding: "6px 0", borderBottom: "1px solid #1F1F23", display: "flex", gap: 10 }}>
                      <span style={{ color: "#C9A84C" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 24 }}>
                <h3 style={{ color: "#71717A", fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Consider a Limo For:</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["School formals (large groups)", "21st birthday parties", "Buck's/hen's nights wanting spectacle", "City nightclub crawls", "Large bridal parties (10+ people)"].map(item => (
                    <li key={item} style={{ color: "#71717A", fontSize: 15, padding: "6px 0", borderBottom: "1px solid #1F1F23", display: "flex", gap: 10 }}>
                      <span style={{ color: "#52525B" }}>→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* The corporate angle */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Why Businesses Always Choose Chauffeur Over Limo
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              A stretch limousine pulling up outside a client's office on King William Street or the Adelaide Convention Centre sends exactly the wrong message — it reads as a party vehicle, not a professional one. A late-model Mercedes-Benz or Genesis G80 with a suited chauffeur signals competence and respect for the client's time.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              Beyond optics, chauffeur companies issue proper tax invoices with ABN and GST detail — critical for expense reimbursement through the ATO. Most limo operators are not set up for corporate billing. Chauffeur services also track incoming flights at Adelaide Airport in real time, adjusting pickup times automatically — something a limo hire on a fixed schedule cannot do.
            </p>
          </section>

          {/* CTA */}
          <section
            style={{
              background: "linear-gradient(135deg, #111113, #0C0C0E)",
              border: "1px solid #C9A84C",
              borderRadius: 16,
              padding: 40,
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#FAFAFA", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
              Book Adelaide's Premier Chauffeur Service
            </h2>
            <p style={{ color: "#A1A1AA", fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
              Instant quotes, online booking, and real-time flight tracking. No hidden fees.
            </p>
            <Link
              href="/book"
              style={{
                display: "inline-block",
                background: "#C9A84C",
                color: "#09090B",
                fontWeight: 700,
                fontSize: 16,
                padding: "14px 36px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              Get an Instant Quote
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
