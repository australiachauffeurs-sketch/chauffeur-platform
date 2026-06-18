import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "FIFO Transfers Adelaide | Parafield Airport & Mining Site Chauffeur SA",
  description:
    "Reliable FIFO chauffeur from Adelaide to Parafield Airport, Port Augusta, Whyalla and SA mine sites. Early-morning departures, 24/7 service, corporate accounts.",
  keywords: [
    "FIFO transfers Adelaide",
    "FIFO chauffeur South Australia",
    "Parafield Airport FIFO transfer",
    "fly-in fly-out chauffeur Adelaide",
    "mining FIFO transport SA",
    "FIFO driver Adelaide",
    "Port Augusta FIFO transfer",
    "Whyalla FIFO chauffeur",
    "early morning FIFO transfer Adelaide",
    "FIFO worker transport SA",
  ],
  alternates: { canonical: `${SITE_URL}/corporate/fifo-transfers` },
  openGraph: {
    title: "FIFO Transfers Adelaide | Parafield Airport & SA Mine Sites",
    description: "24/7 FIFO chauffeur from Adelaide to Parafield Airport, Port Augusta, Whyalla and beyond. Corporate accounts available.",
    url: `${SITE_URL}/corporate/fifo-transfers`,
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FIFO Transfer Chauffeur Adelaide",
  provider: {
    "@type": "LocalBusiness",
    name: "Australia Chauffeurs",
    telephone: "(08) 7078 1777",
    email: "bookings@australiachauffeurs.com.au",
    address: { "@type": "PostalAddress", addressLocality: "Adelaide", addressRegion: "SA", addressCountry: "AU" },
  },
  description:
    "24/7 fly-in fly-out (FIFO) chauffeur transfers in South Australia. Home-to-Parafield Airport (ICAO: YPPF), Adelaide Airport, Port Augusta, Whyalla, Roxby Downs, and remote mine sites. Corporate roster billing available.",
  areaServed: [
    { "@type": "City", name: "Adelaide" },
    { "@type": "City", name: "Port Augusta" },
    { "@type": "City", name: "Whyalla" },
  ],
};

const FEATURES = [
  { icon: "🌙", title: "24/7 — No Unsociable Hours", desc: "FIFO rosters start at 4 am, end at midnight, and change with little notice. We operate every hour of the day, every day of the year. No surcharges for early-morning or late-night pickups on corporate accounts." },
  { icon: "✈", title: "Parafield Airport Specialists (YPPF)", desc: "Parafield Airport (ICAO: YPPF) is the main hub for SA mining charter flights. We know the terminal layout, charter bays, and security entry requirements. We track your charter flight so your driver is there when you land — not when you were scheduled to land." },
  { icon: "🛣", title: "Long-Haul to Mine Sites", desc: "Direct transfers to Port Augusta (~3.5 hrs), Whyalla (~4 hrs), Port Pirie (~2.5 hrs), Roxby Downs (~6 hrs), and custom routes to remote SA sites. Fixed corporate rates per route." },
  { icon: "🧳", title: "Large-Luggage Vehicles", desc: "FIFO workers carry fly-bags, hard hats, and safety gear. Our large-body SUVs and wagons provide ample boot space without compromising passenger comfort on long runs." },
  { icon: "📆", title: "Roster-Based Recurring Bookings", desc: "Set up your entire swing roster in advance. We schedule all pick-ups and returns automatically so your workers never need to re-book — just show up at the agreed time." },
  { icon: "🧾", title: "Project & Roster Invoicing", desc: "Monthly invoices broken down by worker name, date, and route. Suitable for project cost allocation and site administration. GST receipts included." },
];

const ROUTES = [
  { from: "Adelaide CBD / Suburbs", to: "Parafield Airport (YPPF)", note: "~25–45 min" },
  { from: "Adelaide CBD", to: "Port Augusta", note: "~3.5 hrs" },
  { from: "Adelaide CBD", to: "Whyalla", note: "~4 hrs" },
  { from: "Adelaide CBD", to: "Port Pirie", note: "~2.5 hrs" },
  { from: "Parafield Airport", to: "Olympic Dam / Roxby Downs", note: "~6 hrs" },
  { from: "Adelaide Airport", to: "Parafield Airport (YPPF)", note: "Inter-airport transfer" },
  { from: "Anywhere in Adelaide Metro", to: "Custom SA mine site", note: "Quote on request" },
];

const FAQS = [
  {
    q: "Do you track charter flights at Parafield Airport for FIFO arrivals?",
    a: "Yes. We monitor charter and private aircraft movements at Parafield Airport (ICAO: YPPF) and adjust driver dispatch accordingly. If your charter is delayed, your driver waits — there is no rebooking fee for flight delays on corporate accounts.",
  },
  {
    q: "Can we book recurring FIFO transfers for an entire swing roster?",
    a: "Yes. Provide your roster schedule and we will pre-book every departure and return transfer automatically. Workers receive an SMS confirmation the night before their pickup. Any roster changes should be notified 12 hours in advance where possible.",
  },
  {
    q: "What vehicles do you use for FIFO transfers with equipment and bags?",
    a: "We use large-body SUVs (Toyota LandCruiser-class capacity) for routes requiring extra luggage space. These vehicles comfortably accommodate fly-bags, hard hats, safety boots, and other site equipment alongside two to three passengers.",
  },
  {
    q: "Do you cover early-morning pickups at 3 am or 4 am?",
    a: "Yes, and this is one of our most common FIFO requests. Charter departures from Parafield often leave at first light. We make 3:00 am, 3:30 am, and 4:00 am pickups routinely. There are no additional charges for early morning on corporate accounts.",
  },
  {
    q: "Can the company or contractor be invoiced rather than the individual worker?",
    a: "Yes. We bill directly to the mining company, labour hire contractor, or project entity. Monthly invoices include each worker's name, pickup date, origin, and destination for your project administration records.",
  },
];

export default function FifoTransfersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0a0a1a 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
          <span style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#C9A84C", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
            FIFO &amp; MINING TRANSFERS
          </span>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.2, maxWidth: 780, margin: "20px auto 16px" }}>
            Reliable FIFO Transfers to{" "}
            <span style={{ color: "#C9A84C" }}>Parafield Airport &amp; SA Mine Sites</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 17, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.7 }}>
            24/7 fly-in fly-out chauffeur from Adelaide to Parafield Airport (YPPF), Port Augusta, Whyalla, and remote South Australia sites. Roster billing, early mornings, no surprises.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book?service=corporate" style={{ background: "#C9A84C", color: "#09090B", padding: "15px 36px", borderRadius: 8, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Book FIFO Transfer →
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
              Why SA Mining Companies Book With Us
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
              Rosters don&apos;t bend — but our scheduling does. Built around the realities of fly-in fly-out work in South Australia.
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

        {/* Routes */}
        <section style={{ padding: "64px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 12 }}>
              Common FIFO Routes in South Australia
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 15, textAlign: "center", marginBottom: 36 }}>
              Fixed corporate pricing available on all regular routes. Custom mine-site quotes within 2 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ROUTES.map(r => (
                <div key={r.from + r.to} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#17171A", borderRadius: 12, padding: "14px 20px", border: "1px solid #2A2A30", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ color: "#D1D5DB", fontSize: 14 }}>
                    <span style={{ color: "#C9A84C", marginRight: 8 }}>✓</span>
                    {r.from} → {r.to}
                  </span>
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
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 14 }}>Set Up FIFO Roster Transfers</h2>
          <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 520, margin: "0 auto 36px" }}>
            Send us your swing roster and we&apos;ll handle every transfer automatically. No setup fee. Monthly invoicing to your project or company.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book?service=corporate" style={{ background: "#C9A84C", color: "#09090B", padding: "16px 40px", borderRadius: 8, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Book Online →
            </Link>
            <a href="mailto:bookings@australiachauffeurs.com.au" style={{ border: "2px solid rgba(201,168,76,0.4)", color: "#C9A84C", padding: "16px 40px", borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Email Your Roster
            </a>
          </div>
        </section>
      {/* Related pages */}
        <section style={{ background: "#0d0d10", padding: "48px 24px", borderTop: "1px solid #1f1f28" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.15em", fontSize: 11, textTransform: "uppercase", marginBottom: 20 }}>Related Pages</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Link href="/corporate/mining-resources" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Mining & Resources Chauffeur →</Link>
              <Link href="/services/airport-meet-greet" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Airport Meet & Greet →</Link>
              <Link href="/services/late-night-airport-transfers" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Late Night Airport Transfers →</Link>
              <Link href="/locations/port-augusta" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Port Augusta Transfers →</Link>
              <Link href="/corporate/conference-transfers" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Conference Transfers →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
