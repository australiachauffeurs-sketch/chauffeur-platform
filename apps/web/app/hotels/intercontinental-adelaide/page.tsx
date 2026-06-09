import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "InterContinental Adelaide Chauffeur | Airport Transfer & Hotel Car Service",
  description:
    "Premium chauffeur service for InterContinental Adelaide guests. Airport transfer from $89 — driver meets you in the hotel lobby. Corporate accounts, winery tours & city transfers available 24/7.",
  keywords: [
    "InterContinental Adelaide chauffeur",
    "InterContinental Adelaide airport transfer",
    "car service InterContinental Adelaide",
    "hotel chauffeur InterContinental Adelaide",
    "private driver InterContinental Adelaide",
    "InterContinental Adelaide transport",
  ],
  alternates: { canonical: `${SITE_URL}/hotels/intercontinental-adelaide` },
};

export default function InterContinentalAdelaidePagePage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0d0d1a 100%)", padding: "76px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 14 }}>
            🏨 INTERCONTINENTAL ADELAIDE
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4.5vw,3.2rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 780, margin: "0 auto 18px" }}>
            Chauffeur Service for<br /><span style={{ color: "#C9A84C" }}>InterContinental Adelaide Guests</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.7 }}>
            Your driver meets you in the hotel lobby at North Terrace. Airport transfers,
            corporate meetings, winery day trips and evening dining — all arranged in advance.
          </p>
          <Link href="/book?from=InterContinental+Adelaide" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "16px 40px", borderRadius: 13, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
            Book from InterContinental →
          </Link>
        </section>

        <section style={{ padding: "60px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 32 }}>
              Popular Routes from InterContinental Adelaide
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
              {[
                ["→ Adelaide Airport", "$89", "~25 min"],
                ["→ Glenelg (beach)", "$75", "~22 min"],
                ["→ Barossa Valley", "$195", "~60 min"],
                ["→ McLaren Vale", "$155", "~52 min"],
                ["→ Hahndorf", "$100", "~32 min"],
                ["→ Rundle Street / Dining", "$25", "~5 min"],
              ].map(([r, p, t]) => (
                <div key={r} style={{ background: "#17171A", borderRadius: 14, padding: "18px 20px", border: "1px solid #2A2A30", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><p style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>InterContinental {r}</p><p style={{ color: "#6B7280", fontSize: 11 }}>{t}</p></div>
                  <p style={{ color: "#C9A84C", fontWeight: 900, fontSize: 20 }}>{p}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 14, padding: 20, marginTop: 28 }}>
              <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>📍 Hotel Pickup Details</p>
              <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.6 }}>
                Your chauffeur meets you in the InterContinental Adelaide lobby on North Terrace. Simply provide your room number and estimated departure time. The concierge can also arrange bookings on your behalf.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: "#09090B", padding: "56px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Book Your Hotel Transfer</h2>
          <p style={{ color: "#6B7280", marginBottom: 28 }}>24/7 · Instant confirmation · Fixed price</p>
          <Link href="/book?from=InterContinental+Adelaide" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "16px 44px", borderRadius: 13, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
            Book Now →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
