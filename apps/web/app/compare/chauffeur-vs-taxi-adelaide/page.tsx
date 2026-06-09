import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Chauffeur vs Taxi Adelaide — Why More Adelaideans Are Switching",
  description:
    "Chauffeur vs taxi in Adelaide: honest price and quality comparison. Fixed fare vs meter, luxury vehicle vs standard cab, professional driver vs any driver. See which is right for you.",
  keywords: [
    "chauffeur vs taxi Adelaide",
    "Adelaide taxi alternative",
    "luxury car vs taxi Adelaide",
    "is a chauffeur cheaper than a taxi Adelaide",
    "taxi vs private driver Adelaide",
    "Adelaide cab alternative luxury",
    "airport taxi vs chauffeur Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/compare/chauffeur-vs-taxi-adelaide` },
};

export default function ChauffeurVsTaxiPage() {
  const compare = [
    { feature: "Pricing Model", chauffeur: "Fixed price quoted & locked before you book", taxi: "Meter running — final fare unknown until you arrive" },
    { feature: "Vehicle Standard", chauffeur: "Late-model luxury sedan, SUV or limousine — always immaculate", taxi: "Standard cab — age, cleanliness and comfort varies widely" },
    { feature: "Airport Pickups", chauffeur: "Meet & greet in arrivals, flight tracking, luggage assistance", taxi: "Taxi rank queue — wait can be 20–40 minutes after landing" },
    { feature: "Corporate Invoicing", chauffeur: "Monthly invoice, GST receipt, expense-ready", taxi: "Paper receipt only — not always GST-compliant" },
    { feature: "Booking in Advance", chauffeur: "Book days/weeks ahead — guaranteed vehicle at exact time", taxi: "Advance booking unreliable — driver allocation not guaranteed" },
    { feature: "Driver Professionalism", chauffeur: "Uniformed, trained in executive protocols & discretion", taxi: "Driver standard varies — no uniform or protocol requirements" },
    { feature: "Complimentary Items", chauffeur: "Water, mints, phone charger & Wi-Fi on many vehicles", taxi: "No complimentary items standard" },
    { feature: "Group & Large Luggage", chauffeur: "Luxury van for up to 7 pax — large luggage capacity confirmed", taxi: "Limited to standard boot — maxi-taxi must be specifically requested" },
  ];

  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0d1017 100%)", padding: "76px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 14 }}>ADELAIDE COMPARISON</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4.5vw,3.2rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 18px" }}>
            Chauffeur vs Taxi in Adelaide<br /><span style={{ color: "#C9A84C" }}>Why More People Are Making the Switch</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 600, margin: "0 auto 30px", lineHeight: 1.7 }}>
            When the price difference is smaller than you expect — and the experience difference is larger than you expect.
          </p>
        </section>

        <section style={{ padding: "60px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 36 }}>Feature Comparison</h2>
            <div style={{ background: "#17171A", borderRadius: 16, border: "1px solid #2A2A30", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 2fr 2fr", background: "#111", padding: "14px 24px" }}>
                <span style={{ color: "#6B7280", fontSize: 11, fontWeight: 700 }}>FEATURE</span>
                <span style={{ color: "#C9A84C", fontSize: 13, fontWeight: 800, textAlign: "center" }}>🤵 Elite Chauffeur</span>
                <span style={{ color: "#6B7280", fontSize: 13, fontWeight: 700, textAlign: "center" }}>🚕 Taxi</span>
              </div>
              {compare.map((row, i) => (
                <div key={row.feature} style={{ display: "grid", gridTemplateColumns: "1.4fr 2fr 2fr", borderTop: "1px solid #2A2A30", padding: "18px 24px", gap: 16, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                  <span style={{ color: "#9CA3AF", fontSize: 13, fontWeight: 700, alignSelf: "center" }}>{row.feature}</span>
                  <p style={{ color: "#D1D5DB", fontSize: 13, lineHeight: 1.5 }}>
                    <span style={{ color: "#4ADE80" }}>✓ </span>{row.chauffeur}
                  </p>
                  <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.5 }}>{row.taxi}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Price reality check */}
        <section style={{ padding: "56px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 24 }}>The Price Reality — Closer Than You Think</h2>
            <p style={{ color: "#9CA3AF", fontSize: 15, lineHeight: 1.75, marginBottom: 20 }}>
              Many Adelaideans assume a chauffeur costs 3× a taxi. The reality? For airport transfers and longer routes,
              the difference is often $15–$25 — and with a chauffeur, you've locked in that price in advance,
              while the taxi meter can add unexpected time charges if you hit traffic on the South Eastern Freeway.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { route: "Adelaide Airport → CBD", chauffeur: "$89 (fixed)", taxi: "$65–$95 (metered + airport levy)" },
                { route: "CBD → Glenelg", chauffeur: "$75 (fixed)", taxi: "$55–$85 (metered)" },
                { route: "Airport → Mount Barker", chauffeur: "$145 (fixed)", taxi: "$130–$185 (metered)" },
                { route: "Airport → Barossa Valley", chauffeur: "$195 (fixed)", taxi: "$200–$280 (metered)" },
              ].map(p => (
                <div key={p.route} style={{ background: "#17171A", borderRadius: 14, padding: 18, border: "1px solid #2A2A30" }}>
                  <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{p.route}</p>
                  <p style={{ color: "#4ADE80", fontSize: 13 }}>🤵 {p.chauffeur}</p>
                  <p style={{ color: "#6B7280", fontSize: 13, marginTop: 4 }}>🚕 {p.taxi}</p>
                </div>
              ))}
            </div>
            <p style={{ color: "#4B5563", fontSize: 12, marginTop: 16 }}>
              * Taxi prices are estimates based on Adelaide metered rates + airport levy. Actual fares vary with traffic.
            </p>
          </div>
        </section>

        <section style={{ background: "#09090B", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 30, fontWeight: 900, marginBottom: 12 }}>Try a Chauffeur for Your Next Trip</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 28 }}>See your fixed price before you book — no commitment required.</p>
          <Link href="/book" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "17px 44px", borderRadius: 13, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Get My Fixed Quote →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
