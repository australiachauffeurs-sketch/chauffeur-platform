import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Corporate Chauffeur Adelaide | Executive Car Hire & Business Travel",
  description:
    "Adelaide's leading corporate chauffeur service. Dedicated account management, monthly invoicing, ABN receipts, and a fleet of executive vehicles for your business travel needs.",
  keywords: [
    "corporate chauffeur Adelaide",
    "executive car hire Adelaide",
    "business car service Adelaide",
    "corporate travel Adelaide",
    "corporate account chauffeur",
    "Adelaide CBD corporate transfer",
    "executive driver Adelaide",
    "business travel SA",
    "monthly account chauffeur Adelaide",
    "conference transfer Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/services/corporate-chauffeur` },
  openGraph: {
    title: "Corporate Chauffeur Adelaide | Elite Chauffeurs",
    description: "Executive car hire for Adelaide businesses. Account management, monthly invoicing & 24/7 availability.",
    url: `${SITE_URL}/services/corporate-chauffeur`,
    images: [{ url: "/images/luxury.jpg", width: 1200, height: 630 }],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Corporate Chauffeur Service Adelaide",
  provider: { "@type": "LocalBusiness", name: "Elite Chauffeurs Australia" },
  description: "Executive corporate chauffeur and car hire service for Adelaide businesses. Dedicated account manager, monthly invoicing, GST receipts.",
  areaServed: { "@type": "City", name: "Adelaide" },
};

export default function CorporateChauffeurPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #09090B 0%, #0D1117 100%)", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.2em", fontSize: 13, marginBottom: 16 }}>
            💼 CORPORATE CHAUFFEUR SERVICES
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 20px" }}>
            Executive Car Hire for<br />
            <span style={{ color: "#C9A84C" }}>Adelaide Business & Corporate Travel</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 18, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Impress clients, move executives seamlessly, and manage all your business travel
            from a single corporate account. Monthly invoicing with GST receipts.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book?service=corporate" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 40px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
              Book Now →
            </Link>
            <Link href="/corporate-accounts" style={{ display: "inline-block", border: "2px solid #C9A84C", color: "#C9A84C", padding: "18px 40px", borderRadius: 14, fontWeight: 700, fontSize: 17, textDecoration: "none" }}>
              Corporate Accounts →
            </Link>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: "72px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: 48 }}>
              Why Adelaide's Top Companies Choose Us
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {[
                { icon: "📊", title: "Dedicated Account Manager", desc: "One point of contact for all your bookings. Manage everything from a single corporate portal." },
                { icon: "🧾", title: "Monthly Invoicing & GST Receipts", desc: "Consolidated monthly invoice with full GST tax receipts. Seamless expense reporting." },
                { icon: "🔒", title: "Fixed Corporate Rates", desc: "Negotiate locked rates for regular routes. No surprises — the same price every time." },
                { icon: "📱", title: "Multi-User Booking Portal", desc: "Your PA or travel manager can book on behalf of multiple executives in seconds." },
                { icon: "🤵", title: "Professional Chauffeurs", desc: "All drivers are police-checked, professionally dressed and trained in executive protocols." },
                { icon: "🚗", title: "Late-Model Fleet", desc: "Mercedes-Benz S-Class, BMW 7 Series, Audi A8 — always impeccably presented." },
                { icon: "✈", title: "Conference & Event Transport", desc: "Coordinate multi-vehicle pickups for conferences, AGMs, and corporate events." },
                { icon: "🌏", title: "Interstate Visitor Transfers", desc: "Seamless airport pickups and hotel transfers for your visiting executives and clients." },
              ].map(f => (
                <div key={f.title} style={{ background: "#17171A", borderRadius: 16, padding: 24, border: "1px solid #2A2A30" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
                  <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section style={{ padding: "72px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>
              Common Corporate Use Cases
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 36, textAlign: "left" }}>
              {[
                "CEO & executive airport pickups",
                "Client entertaining & restaurant transfers",
                "Conference shuttle & multi-vehicle coordination",
                "Road show & investor meeting transport",
                "International visitor programmes",
                "End-of-year function transfers",
                "Daily executive commuter runs",
                "Construction site executive visits",
              ].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#17171A", borderRadius: 12, padding: "14px 16px", border: "1px solid #2A2A30" }}>
                  <span style={{ color: "#C9A84C", fontWeight: 900 }}>✓</span>
                  <span style={{ color: "#D1D5DB", fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#09090B", padding: "72px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, marginBottom: 16 }}>
            Open a Corporate Account Today
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 17, marginBottom: 36 }}>
            No setup fees. No minimum spend. Start saving time and impressing clients from day one.
          </p>
          <Link href="/corporate-accounts" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "20px 52px", borderRadius: 14, fontWeight: 900, fontSize: 18, textDecoration: "none" }}>
            Apply for Corporate Account →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
