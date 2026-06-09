import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Barossa Valley Chauffeur | Winery Tours & Transfers from Adelaide",
  description:
    "Private chauffeur transfers to Barossa Valley from Adelaide. Day wine tours to Penfolds, Jacob's Creek, Seppeltsfield & more. From $195 return. Designated driver — sip safely.",
  keywords: [
    "Barossa Valley chauffeur",
    "Barossa Valley transfer from Adelaide",
    "Barossa Valley wine tour driver",
    "private driver Barossa Valley",
    "Adelaide to Barossa chauffeur",
    "Barossa Valley day trip transport",
    "winery tour driver Barossa",
    "Seppeltsfield chauffeur",
    "Penfolds winery transfer",
  ],
  alternates: { canonical: `${SITE_URL}/locations/barossa-valley` },
};

export default function BarossaValleyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: "linear-gradient(135deg, #09090B 0%, #0f0a00 100%)", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.2em", fontSize: 13, marginBottom: 16 }}>
            🍷 BAROSSA VALLEY CHAUFFEUR
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 20px" }}>
            Private Chauffeur to<br />
            <span style={{ color: "#C9A84C" }}>Barossa Valley from Adelaide</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 18, maxWidth: 620, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Australia's most famous wine region — just 60 minutes from Adelaide CBD.
            Your private chauffeur drives while you taste Shiraz, Riesling and Grenache
            at Penfolds, Jacob's Creek, Seppeltsfield and beyond.
          </p>
          <Link href="/book?service=wine-tour&to=barossa" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 44px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Book Barossa Transfer →
          </Link>
        </section>

        <section style={{ padding: "64px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 36 }}>
              Barossa Valley Pricing
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginBottom: 48 }}>
              {[
                { from: "Adelaide CBD", price: "$195", type: "One-way" },
                { from: "Adelaide CBD", price: "$350", type: "Return (same day)" },
                { from: "Adelaide Airport", price: "$195", type: "One-way" },
                { from: "Full Day Tour (8 hrs)", price: "$595", type: "All-inclusive" },
              ].map(p => (
                <div key={`${p.from}-${p.type}`} style={{ background: "#17171A", borderRadius: 16, padding: 20, border: "1px solid #2A2A30", textAlign: "center" }}>
                  <p style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 4 }}>{p.from}</p>
                  <p style={{ color: "#6B7280", fontSize: 11, marginBottom: 8 }}>{p.type}</p>
                  <p style={{ color: "#C9A84C", fontWeight: 900, fontSize: 28 }}>{p.price}</p>
                </div>
              ))}
            </div>

            <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 24 }}>
              Popular Barossa Wineries We Visit
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 48 }}>
              {[
                "Penfolds Magill Estate & Barossa", "Jacob's Creek Estate", "Seppeltsfield Winery",
                "Henschke Cellars", "Wolf Blass", "Peter Lehmann Wines", "Yalumba Winery",
                "Grant Burge Wines", "Langmeil Winery", "Torbreck Vintners", "Two Hands Wines",
                "Kaesler Wines", "Charles Melton Wines",
              ].map(w => (
                <span key={w} style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#D1D5DB", padding: "8px 14px", borderRadius: 20, fontSize: 13 }}>{w}</span>
              ))}
            </div>

            <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 17, marginBottom: 12 }}>
                🍇 What's Included in a Full Day Tour
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  "Hotel or home pickup in Adelaide",
                  "Professional chauffeur, 8 hours",
                  "Visit 3–4 wineries of your choice",
                  "Lunch at a winery restaurant",
                  "Complimentary water & snacks",
                  "Return to Adelaide at day's end",
                ].map(item => (
                  <p key={item} style={{ color: "#9CA3AF", fontSize: 13, display: "flex", gap: 8 }}>
                    <span style={{ color: "#C9A84C" }}>✓</span>{item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: "#17171A", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Ready for a Barossa Day Trip?</h2>
          <p style={{ color: "#6B7280", marginBottom: 28 }}>Book your private chauffeur and taste the best of Australia's wine country.</p>
          <Link href="/book?service=wine-tour&to=barossa" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 48px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Book Now →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
