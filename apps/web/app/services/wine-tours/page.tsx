import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Barossa Valley & McLaren Vale Wine Tour Chauffeur Adelaide",
  description:
    "Explore Barossa Valley, McLaren Vale, Clare Valley & Adelaide Hills wineries in style. Private wine tour chauffeur from Adelaide — sip safely, arrive in luxury. Book a custom winery day trip.",
  keywords: [
    "wine tour chauffeur Adelaide",
    "Barossa Valley chauffeur",
    "McLaren Vale winery transfer",
    "Adelaide wine tour driver",
    "private winery tour Adelaide",
    "designated driver wine tour SA",
    "Clare Valley winery chauffeur",
    "Adelaide Hills winery tour",
    "day trip chauffeur Adelaide",
    "wine region transfer Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/services/wine-tours` },
};

export default function WineToursPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: "linear-gradient(135deg, #09090B 0%, #0a1a0a 100%)", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.2em", fontSize: 13, marginBottom: 16 }}>
            🍷 WINERY & WINE TOUR TRANSFERS
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 20px" }}>
            Private Winery Tours from Adelaide<br />
            <span style={{ color: "#C9A84C" }}>Barossa · McLaren Vale · Clare Valley</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 18, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Taste without limits. Your private chauffeur drives — you relax, sip, and enjoy
            SA's world-class wine regions safely and in total comfort.
          </p>
          <Link href="/book?service=wine-tour" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 44px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Plan My Wine Tour →
          </Link>
        </section>

        <section style={{ padding: "72px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: 48 }}>
              Popular Wine Tour Routes
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {[
                { name: "Barossa Valley Day Tour", duration: "Full day (8 hrs)", price: "from $595", wineries: "Visit 3–4 estates including Penfolds, Jacob's Creek & boutique cellars", highlight: "Australia's most famous wine region — 1hr from Adelaide" },
                { name: "McLaren Vale Wine Tour", duration: "Half or full day", price: "from $395", wineries: "d'Arenberg, Wirra Wirra, Chapel Hill & more", highlight: "45 min from Adelaide CBD — stunning coastal views" },
                { name: "Adelaide Hills Winery Tour", duration: "Half day (4 hrs)", price: "from $295", wineries: "Hahndorf Hill, Bird in Hand, Shaw + Smith", highlight: "Closest wine region — 30 min from the city" },
                { name: "Clare Valley Tour", duration: "Full day (9 hrs)", price: "from $695", wineries: "Riesling Trail estates — Grosset, Jim Barry, Kilikanoon", highlight: "SA's premium Riesling heartland" },
              ].map(t => (
                <div key={t.name} style={{ background: "#17171A", borderRadius: 20, padding: 24, border: "1px solid #2A2A30" }}>
                  <h3 style={{ color: "#C9A84C", fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{t.name}</h3>
                  <p style={{ color: "#6B7280", fontSize: 12, marginBottom: 4 }}>{t.duration}</p>
                  <p style={{ color: "#C9A84C", fontWeight: 900, fontSize: 22, marginBottom: 12 }}>{t.price}</p>
                  <p style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 8 }}>{t.wineries}</p>
                  <p style={{ color: "#D1D5DB", fontSize: 12, fontStyle: "italic", marginBottom: 16 }}>📍 {t.highlight}</p>
                  <Link href="/book?service=wine-tour" style={{ display: "block", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", padding: "11px", borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: "none", textAlign: "center" }}>
                    Book This Tour →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#09090B", padding: "72px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, marginBottom: 16 }}>Plan Your Winery Day Trip</h2>
          <p style={{ color: "#9CA3AF", fontSize: 17, marginBottom: 36 }}>Custom itineraries available. Tell us your preferences and we'll build the perfect tour.</p>
          <Link href="/book?service=wine-tour" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "20px 52px", borderRadius: 14, fontWeight: 900, fontSize: 18, textDecoration: "none" }}>
            Get a Custom Quote →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
