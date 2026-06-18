import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Roadshow & Investor Day Chauffeur Adelaide | ASX Corporate Travel",
  description:
    "Time-critical chauffeur for ASX company roadshows and investor days in Adelaide. Multi-leg CBD-airport-venue transfers, same-day turnarounds, executive sedan fleet.",
  keywords: [
    "roadshow chauffeur Adelaide",
    "investor day chauffeur Adelaide",
    "ASX roadshow transport Adelaide",
    "corporate roadshow car hire SA",
    "investor relations chauffeur Adelaide",
    "executive roadshow transfer Adelaide",
    "IPO roadshow chauffeur Adelaide",
    "fund manager transfer Adelaide",
    "CBD to airport executive transfer Adelaide",
    "capital markets chauffeur Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/corporate/roadshow-investor` },
  openGraph: {
    title: "Roadshow & Investor Day Chauffeur Adelaide | Australia Chauffeurs",
    description: "Time-critical multi-leg chauffeur for ASX roadshows, investor days and capital markets events across Adelaide.",
    url: `${SITE_URL}/corporate/roadshow-investor`,
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Roadshow & Investor Day Chauffeur Adelaide",
  provider: {
    "@type": "LocalBusiness",
    name: "Australia Chauffeurs",
    telephone: "(08) 7078 1777",
    email: "bookings@australiachauffeurs.com.au",
    address: { "@type": "PostalAddress", addressLocality: "Adelaide", addressRegion: "SA", addressCountry: "AU" },
  },
  description:
    "Executive chauffeur for ASX company roadshows, IPO investor tours, fund manager meetings, and investor day events in Adelaide. Multi-leg itinerary management, time-critical scheduling, and discreet executive sedan fleet.",
  areaServed: { "@type": "City", name: "Adelaide" },
};

const FEATURES = [
  { icon: "🗓", title: "Multi-Leg Itinerary Management", desc: "Roadshows run to the minute. We build a full day-of schedule: CBD hotel, investor offices, fund manager meetings, lunch venue, airport — and we adapt in real time if any meeting overruns." },
  { icon: "⏱", title: "Time-Critical Precision", desc: "When a flight home closes at 6:40 pm, every meeting matters. We calculate backwards from your hard departure and hold buffer time so you never have to rush." },
  { icon: "🤵", title: "Dedicated Roadshow Driver", desc: "One named driver for the entire day. Your CEO and CFO deal with one person who knows the schedule, the venues, and when to stay silent so you can debrief between stops." },
  { icon: "🔇", title: "Discretion for Market-Sensitive Conversations", desc: "Our drivers understand the sensitivity of pre-announcement discussions. Vehicles have a privacy partition on request. Confidentiality is absolute." },
  { icon: "✈", title: "Airport Connectivity", desc: "Seamless connections to Adelaide Airport for interstate roadshow legs. We time departures to the flight, not the other way around. Flight monitoring included." },
  { icon: "🧾", title: "IR Team Billing & Reporting", desc: "Costs billed to your investor relations team or corporate travel manager with full itemisation. Suitable for inclusion in roadshow budgets and travel expense reports." },
];

const ITINERARY = [
  { time: "7:30 am", leg: "Hotel pickup — InterContinental or Stamford Plaza, North Terrace" },
  { time: "8:00 am", leg: "Fund manager meeting — Pirie Street or Grenfell Street offices" },
  { time: "9:30 am", leg: "Institutional investor — King William Street" },
  { time: "11:00 am", leg: "Broking house presentation — Exchange House, Grenfell Street" },
  { time: "12:30 pm", leg: "Working lunch — CBD restaurant (vehicle on standby)" },
  { time: "2:00 pm", leg: "Retail investor meeting — Collins Street equivalent" },
  { time: "4:30 pm", leg: "Adelaide Airport — interstate connection departure" },
];

const FAQS = [
  {
    q: "Can you manage a full-day roadshow itinerary with six or more stops?",
    a: "Yes, and this is where we excel. We receive your roadshow schedule in advance, map all venues, calculate drive times with traffic buffers, and build a minute-by-minute driver brief. Your IR team receives a final confirmed itinerary the evening before. Any changes on the day are communicated by your team to the driver directly.",
  },
  {
    q: "What happens if a meeting with a fund manager runs long?",
    a: "Your dedicated driver monitors the schedule and will send a discreet message to your IR contact if a buffer is being eroded. We never rush a meeting — instead we recover time on drive legs where possible and keep you informed of your margin to the next hard commitment.",
  },
  {
    q: "Do you provide separate vehicles for analysts and portfolio managers attending the same event?",
    a: "Yes. We can coordinate multiple vehicles for investor days where fund managers, analysts, and portfolio managers are arriving from different locations. All vehicles are managed under one booking with a single invoice for the event.",
  },
  {
    q: "Is the service available for post-IPO and pre-IPO roadshows?",
    a: "Yes. We have worked with Adelaide-listed and ASX-aspirant companies across mining, biotech, and technology sectors. We understand the sensitivity of pre-IPO travel and treat all passenger information as strictly confidential.",
  },
  {
    q: "Can you provide vehicles at short notice for a roadshow added to the calendar late?",
    a: "We maintain reserve capacity for corporate clients and can often accommodate 24–48 hour bookings for roadshow vehicles. Call us directly on (08) 7078 1777 for urgent bookings rather than booking online.",
  },
];

export default function RoadshowInvestorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0a0a1a 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
          <span style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#C9A84C", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
            ROADSHOW &amp; INVESTOR RELATIONS
          </span>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.2, maxWidth: 780, margin: "20px auto 16px" }}>
            Time-Critical Chauffeur for{" "}
            <span style={{ color: "#C9A84C" }}>ASX Roadshows &amp; Investor Days</span>{" "}
            in Adelaide
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 17, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Multi-leg itinerary management for your CEO, CFO, and IR team. One dedicated driver, one consolidated invoice, zero late arrivals to fund manager meetings.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book?service=corporate" style={{ background: "#C9A84C", color: "#09090B", padding: "15px 36px", borderRadius: 8, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Book Roadshow Transfer →
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
              Built for the Demands of Capital Markets Travel
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
              When your CFO has six meetings and a 6:40 pm flight, there is no room for error.
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

        {/* Sample itinerary */}
        <section style={{ padding: "64px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 12 }}>
              Sample Adelaide Roadshow Day
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 15, textAlign: "center", marginBottom: 36 }}>
              A typical ASX small-cap roadshow through Adelaide&apos;s investor community — your schedule will differ, but the precision is the same.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ITINERARY.map(item => (
                <div key={item.time} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "#17171A", borderRadius: 12, padding: "14px 20px", border: "1px solid #2A2A30" }}>
                  <span style={{ color: "#C9A84C", fontWeight: 800, fontSize: 13, minWidth: 68, flexShrink: 0 }}>{item.time}</span>
                  <span style={{ color: "#D1D5DB", fontSize: 14 }}>{item.leg}</span>
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
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 14 }}>Book Your Roadshow Driver</h2>
          <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 500, margin: "0 auto 36px" }}>
            Send us your roadshow schedule and we&apos;ll confirm vehicle availability and pricing within two hours on business days.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book?service=corporate" style={{ background: "#C9A84C", color: "#09090B", padding: "16px 40px", borderRadius: 8, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Book Online →
            </Link>
            <a href="mailto:bookings@australiachauffeurs.com.au" style={{ border: "2px solid rgba(201,168,76,0.4)", color: "#C9A84C", padding: "16px 40px", borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Email Your Schedule
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
