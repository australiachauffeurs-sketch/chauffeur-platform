import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Mining & Resources Chauffeur Adelaide | FIFO Executive Transfers SA",
  description:
    "Professional chauffeur for mining and resources executives in South Australia. FIFO transfers, Parafield Airport, Port Augusta, Whyalla — 24/7 reliability.",
  keywords: [
    "mining chauffeur Adelaide",
    "FIFO executive transfer Adelaide",
    "resources sector chauffeur SA",
    "Parafield Airport chauffeur",
    "mining executive car hire Adelaide",
    "Port Augusta chauffeur",
    "Whyalla chauffeur transfer",
    "fly-in fly-out Adelaide chauffeur",
    "mining site transfer South Australia",
    "executive SUV Adelaide mining",
  ],
  alternates: { canonical: `${SITE_URL}/corporate/mining-resources` },
  openGraph: {
    title: "Mining & Resources Chauffeur Adelaide | Australia Chauffeurs",
    description: "FIFO transfers, site visits and executive car hire for mining and resources professionals across South Australia.",
    url: `${SITE_URL}/corporate/mining-resources`,
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mining & Resources Executive Chauffeur Adelaide",
  provider: {
    "@type": "LocalBusiness",
    name: "Australia Chauffeurs",
    telephone: "(08) 7078 1777",
    email: "bookings@australiachauffeurs.com.au",
    address: { "@type": "PostalAddress", addressLocality: "Adelaide", addressRegion: "SA", addressCountry: "AU" },
  },
  description:
    "Chauffeur transfers for mining and resources executives in South Australia. FIFO airport transfers from Parafield (YPPF) and Adelaide Airport, long-distance runs to Port Augusta, Whyalla, and regional mine sites.",
  areaServed: [
    { "@type": "City", name: "Adelaide" },
    { "@type": "City", name: "Port Augusta" },
    { "@type": "City", name: "Whyalla" },
  ],
};

const FEATURES = [
  { icon: "✈", title: "Parafield Airport Transfers (YPPF)", desc: "Dedicated pickup and drop-off at Parafield Airport (ICAO: YPPF) for charter and light aircraft arrivals. Flight-monitoring included so we're there when you land." },
  { icon: "🚗", title: "Executive Sedan & SUV Fleet", desc: "Mercedes-Benz E-Class sedans and large-body SUVs to accommodate executives, site managers, and their gear. Tinted windows, leather interior, reliable climate control." },
  { icon: "⏱", title: "24/7 Early-Morning Departures", desc: "Mine rosters don't follow business hours. We operate around the clock — 3 am departures, midnight returns, no surcharges for unsociable hours on corporate accounts." },
  { icon: "🛣", title: "Long-Distance Site Runs", desc: "Transfers to Port Augusta (310 km), Whyalla (395 km), Coober Pedy (850 km) and remote SA sites. Fixed corporate pricing per route, no meter surprises." },
  { icon: "🤵", title: "Discreet, Professional Drivers", desc: "All chauffeurs are police-checked and sign NDAs on request. Sensitive commercial conversations stay in the vehicle." },
  { icon: "🧾", title: "Project Billing & Purchase Orders", desc: "Invoice against project codes, cost centres, or purchase orders. Monthly statements with full GST tax receipts for your accounts team." },
];

const FAQS = [
  {
    q: "Do you service Parafield Airport for charter and FIFO flights?",
    a: "Yes. We monitor flight data for Parafield Airport (ICAO: YPPF) and adjust pickup times accordingly. We handle both scheduled charter arrivals and private aircraft, ensuring your executives are met on the tarmac or at the terminal.",
  },
  {
    q: "Can you transport fly-in guests directly to Adelaide CBD hotels or mine offices?",
    a: "Absolutely. We coordinate full-itinerary transfers — Parafield or Adelaide Airport arrivals through to CBD hotels, client offices, or directly out to regional sites. We can also turn around same-day for departures.",
  },
  {
    q: "Do you cover long-distance routes to Port Augusta or Whyalla?",
    a: "Yes. We regularly run Adelaide CBD to Port Augusta (approx. 3.5 hrs) and Adelaide to Whyalla (approx. 4 hrs). Corporate route pricing is fixed and available on request. We also cover Olympic Dam, Roxby Downs, and one-way transfers to regional airports.",
  },
  {
    q: "What vehicles are available for mining executive transfers?",
    a: "We offer executive sedans (Mercedes-Benz E-Class) for single executives and large-body SUVs for site managers requiring additional luggage space. All vehicles are late-model, air-conditioned, and fully insured for passenger transport.",
  },
  {
    q: "Can we set up a corporate account for ongoing project travel?",
    a: "Yes. We offer dedicated corporate accounts with monthly invoicing, project code billing, and a single point of contact for all bookings. There is no setup fee and no minimum spend. Contact us at bookings@australiachauffeurs.com.au to get started.",
  },
];

export default function MiningResourcesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0a0a1a 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
          <span style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#C9A84C", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
            MINING &amp; RESOURCES
          </span>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.2, maxWidth: 780, margin: "20px auto 16px" }}>
            Executive Chauffeur for{" "}
            <span style={{ color: "#C9A84C" }}>Mining &amp; Resources Professionals</span>{" "}
            in South Australia
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 17, maxWidth: 620, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Reliable transfers from Parafield Airport (YPPF) and Adelaide Airport to regional mine sites, Port Augusta, Whyalla, and SA&apos;s resource corridors. Available 24/7 — because rosters don&apos;t stop.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book?service=corporate" style={{ background: "#C9A84C", color: "#09090B", padding: "15px 36px", borderRadius: 8, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Book Corporate Transfer →
            </Link>
            <a href="tel:0870781777" style={{ border: "2px solid rgba(201,168,76,0.4)", color: "#C9A84C", padding: "15px 36px", borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              (08) 7078 1777
            </a>
          </div>
        </section>

        {/* Features grid */}
        <section style={{ padding: "72px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 1060, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 12 }}>
              Purpose-Built for the Resources Sector
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
              We understand fly-in fly-out schedules, project billing, and the need for absolute punctuality on remote-site days.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 24 }}>
              {FEATURES.map(f => (
                <div key={f.title} style={{ background: "#17171A", borderRadius: 16, padding: 28, border: "1px solid #2A2A30" }}>
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{f.icon}</div>
                  <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Route table */}
        <section style={{ padding: "64px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 36 }}>
              Common Mining &amp; Resources Routes
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { route: "Adelaide CBD → Parafield Airport (YPPF)", note: "~30 min" },
                { route: "Adelaide Airport → Port Augusta", note: "~3.5 hrs" },
                { route: "Adelaide CBD → Whyalla", note: "~4 hrs" },
                { route: "Parafield Airport → Olympic Dam / Roxby Downs", note: "~6 hrs" },
                { route: "Adelaide → Port Pirie", note: "~2.5 hrs" },
                { route: "Airport → CBD Hotel → Site Office (multi-leg)", note: "Custom quote" },
              ].map(r => (
                <div key={r.route} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#17171A", borderRadius: 12, padding: "14px 20px", border: "1px solid #2A2A30", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ color: "#D1D5DB", fontSize: 14 }}>✓ &nbsp;{r.route}</span>
                  <span style={{ color: "#C9A84C", fontSize: 13, fontWeight: 700 }}>{r.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "64px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 740, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>Frequently Asked Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {FAQS.map(f => (
                <div key={f.q} style={{ background: "#17171A", borderRadius: 14, padding: "22px 26px", border: "1px solid #2A2A30" }}>
                  <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{f.q}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "linear-gradient(135deg,#0a0a0f 0%,#09090B 100%)", padding: "72px 24px", textAlign: "center", borderTop: "1px solid #1E1E24" }}>
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 14 }}>Ready to Book Your Mine-Site Transfer?</h2>
          <p style={{ color: "#9CA3AF", fontSize: 16, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Call us directly or book online. Corporate accounts and project billing available — no setup fee.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book?service=corporate" style={{ background: "#C9A84C", color: "#09090B", padding: "16px 40px", borderRadius: 8, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Book Online →
            </Link>
            <a href="mailto:bookings@australiachauffeurs.com.au" style={{ border: "2px solid rgba(201,168,76,0.4)", color: "#C9A84C", padding: "16px 40px", borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Email Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
