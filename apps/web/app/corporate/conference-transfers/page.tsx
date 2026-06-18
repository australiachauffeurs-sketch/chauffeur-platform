import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Conference & Convention Chauffeur Adelaide | Delegate Transfers ACC",
  description:
    "Multi-vehicle conference chauffeur for Adelaide Convention Centre events. Delegate airport transfers, group invoicing, and seamless coordination for ACC and major venues.",
  keywords: [
    "conference chauffeur Adelaide",
    "Adelaide Convention Centre transfers",
    "delegate transfer Adelaide",
    "conference shuttle Adelaide",
    "ACC chauffeur",
    "convention transfer Adelaide",
    "group chauffeur Adelaide",
    "event transport Adelaide",
    "multi-vehicle conference transfer SA",
    "corporate event chauffeur Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/corporate/conference-transfers` },
  openGraph: {
    title: "Conference & Convention Chauffeur Adelaide | Australia Chauffeurs",
    description: "Coordinated delegate transfers for Adelaide Convention Centre and major conference venues. Multi-vehicle, group invoicing.",
    url: `${SITE_URL}/corporate/conference-transfers`,
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Conference & Convention Chauffeur Adelaide",
  provider: {
    "@type": "LocalBusiness",
    name: "Australia Chauffeurs",
    telephone: "(08) 7078 1777",
    email: "bookings@australiachauffeurs.com.au",
    address: { "@type": "PostalAddress", addressLocality: "Adelaide", addressRegion: "SA", addressCountry: "AU" },
  },
  description:
    "Coordinated multi-vehicle chauffeur transfers for conferences and conventions at the Adelaide Convention Centre, Adelaide Oval, Hilton Adelaide, InterContinental Adelaide, and major event venues across South Australia.",
  areaServed: { "@type": "City", name: "Adelaide" },
};

const FEATURES = [
  { icon: "🚗", title: "Multi-Vehicle Fleet Coordination", desc: "From two cars to a coordinated fleet of ten or more, we assign a dedicated logistics coordinator to manage all vehicles, drivers, and schedules under a single booking reference." },
  { icon: "✈", title: "Airport Wave Coordination", desc: "We track multiple incoming flights and dispatch vehicles precisely so that each delegate is met on arrival — no waiting, no missed flights, no confusion at the terminal." },
  { icon: "🏛", title: "Adelaide Convention Centre Specialists", desc: "North Terrace's ACC is our most frequent conference venue. We know every loading dock, VIP entrance, and sponsor parking bay. Seamless kerb-to-door service." },
  { icon: "🧾", title: "Single Group Invoice", desc: "All conference transfers consolidated into one invoice with an itemised breakdown. Invoices can reference delegate names, cost centres, or booking IDs for easy reconciliation." },
  { icon: "📱", title: "Event Coordinator Liaison", desc: "We work directly with your PCO or event manager before and during the conference. Schedule changes, late delegates, and last-minute additions are handled without fuss." },
  { icon: "⏱", title: "On-Call Between Sessions", desc: "Vehicles and drivers remain on standby between conference sessions for speaker transfers, VIP movements, and sponsor entertaining — billed by the hour." },
];

const VENUES = [
  "Adelaide Convention Centre — North Terrace",
  "Adelaide Oval — War Memorial Drive",
  "Hilton Adelaide — Victoria Square",
  "InterContinental Adelaide — North Terrace",
  "Pullman Adelaide — Hindmarsh Square",
  "Stamford Plaza Adelaide — North Terrace",
  "National Wine Centre — Botanic Road",
  "The Gallery — Exhibition Drive",
  "Tonsley Innovation District",
  "UniSA City West Campus — Rose Tce",
];

const FAQS = [
  {
    q: "How many vehicles can you coordinate for a single conference?",
    a: "We regularly coordinate fleets of up to 15 vehicles for major conferences at the Adelaide Convention Centre and Adelaide Oval. For very large events, we can partner with trusted associate operators under a single managed booking. Contact us at least two weeks in advance for events requiring five or more vehicles.",
  },
  {
    q: "Can you handle airport wave arrivals where multiple delegates land at different times?",
    a: "Yes. Our dispatch team monitors all incoming flights and staggers vehicle dispatches accordingly. Each delegate receives a named driver at arrivals. We use a shared schedule sheet updated in real time and shared with your event coordinator.",
  },
  {
    q: "Do you offer a single invoice for the entire conference?",
    a: "Yes. All transfers across the event are consolidated into one invoice issued within five business days of the event concluding. We can include delegate names, session references, and cost-centre codes on the itemised breakdown.",
  },
  {
    q: "What happens if the conference program runs over time?",
    a: "Flexibility is built into our conference pricing. Drivers on standby remain available between sessions and adapt to schedule changes. Your dedicated event coordinator updates all drivers via our dispatch app in real time.",
  },
  {
    q: "Do you handle speaker and VIP transfers separately from general delegates?",
    a: "Yes. We commonly provide a dedicated executive vehicle for keynote speakers and VIP guests while the general delegate fleet handles standard airport runs. All vehicles are late-model and identically presented, so every passenger receives the same professional experience.",
  },
];

export default function ConferenceTransfersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0a0a1a 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
          <span style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#C9A84C", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
            CONFERENCES &amp; CONVENTIONS
          </span>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.2, maxWidth: 780, margin: "20px auto 16px" }}>
            Coordinated Chauffeur Transfers for{" "}
            <span style={{ color: "#C9A84C" }}>Adelaide Conferences &amp; Conventions</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 17, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Multi-vehicle fleet coordination, airport wave arrivals, delegate transfers, and group invoicing — all under a single booking for the Adelaide Convention Centre and major venues.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book?service=corporate" style={{ background: "#C9A84C", color: "#09090B", padding: "15px 36px", borderRadius: 8, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Get a Conference Quote →
            </Link>
            <a href="tel:0870781777" style={{ border: "2px solid rgba(201,168,76,0.4)", color: "#C9A84C", padding: "15px 36px", borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              (08) 7078 1777
            </a>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: "72px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 1060, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 12 }}>
              End-to-End Conference Transport Management
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
              We handle the logistics so your event team can focus on the programme, not the parking.
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

        {/* Venues */}
        <section style={{ padding: "64px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 12 }}>
              Venues We Service Regularly
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 15, textAlign: "center", marginBottom: 36 }}>
              Familiar with every loading dock, VIP entrance, and drop-off restriction at Adelaide&apos;s top event venues.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {VENUES.map(v => (
                <div key={v} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#17171A", borderRadius: 12, padding: "14px 16px", border: "1px solid #2A2A30" }}>
                  <span style={{ color: "#C9A84C", fontWeight: 900, flexShrink: 0 }}>✓</span>
                  <span style={{ color: "#D1D5DB", fontSize: 13 }}>{v}</span>
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
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 14 }}>Request a Conference Transport Quote</h2>
          <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 520, margin: "0 auto 36px" }}>
            Tell us your event dates, delegate numbers, and key venues. We&apos;ll send a fixed-price proposal within 24 hours.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book?service=corporate" style={{ background: "#C9A84C", color: "#09090B", padding: "16px 40px", borderRadius: 8, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Get a Quote →
            </Link>
            <a href="mailto:bookings@australiachauffeurs.com.au" style={{ border: "2px solid rgba(201,168,76,0.4)", color: "#C9A84C", padding: "16px 40px", borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Email Your Brief
            </a>
          </div>
        </section>
      {/* Related pages */}
        <section style={{ background: "#0d0d10", padding: "48px 24px", borderTop: "1px solid #1f1f28" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.15em", fontSize: 11, textTransform: "uppercase", marginBottom: 20 }}>Related Pages</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Link href="/corporate/mining-resources" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Mining & Resources Chauffeur →</Link>
              <Link href="/corporate/roadshow-investor" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Roadshow & Investor Transfers →</Link>
              <Link href="/services/airport-meet-greet" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Airport Meet & Greet →</Link>
              <Link href="/venues/adelaide-convention-centre" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Adelaide Convention Centre →</Link>
              <Link href="/corporate/legal-firms" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Legal Firms Chauffeur →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
