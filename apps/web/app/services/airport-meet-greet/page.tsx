import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Airport Meet & Greet Service Adelaide | Australia Chauffeurs",
  description:
    "Our driver meets you in the arrivals hall with a name board, monitors your flight for delays, assists with luggage, and escorts you to your vehicle. From $89.",
  keywords: [
    "airport meet and greet Adelaide",
    "Adelaide airport arrivals service",
    "chauffeur meet greet ADL",
    "Adelaide airport name board pickup",
    "international arrivals chauffeur Adelaide",
    "domestic arrivals chauffeur Adelaide",
    "airport greeting service Adelaide",
    "Adelaide airport luggage assistance",
  ],
  alternates: { canonical: `${SITE_URL}/services/airport-meet-greet` },
  openGraph: {
    title: "Airport Meet & Greet Service Adelaide | Australia Chauffeurs",
    description:
      "Your driver meets you in arrivals with a name board — flight tracked, luggage handled, vehicle waiting. Adelaide Airport, one terminal.",
    url: `${SITE_URL}/services/airport-meet-greet`,
    images: [{ url: "/images/airport.jpg", width: 1200, height: 630, alt: "Meet and Greet Adelaide Airport" }],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Airport Meet & Greet Service Adelaide",
  provider: {
    "@type": "LocalBusiness",
    name: "Australia Chauffeurs",
    address: { "@type": "PostalAddress", addressLocality: "Adelaide", addressRegion: "SA", addressCountry: "AU" },
  },
  areaServed: { "@type": "City", name: "Adelaide" },
  description: "Professional meet and greet chauffeur service at Adelaide Airport. Driver meets you in arrivals hall with name board, monitors flight, assists with luggage.",
  offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", price: "89", priceCurrency: "AUD", description: "From $89 — sedan" } },
  url: `${SITE_URL}/services/airport-meet-greet`,
};

const steps = [
  { n: "1", title: "Book Online in 60 Seconds", body: "Select your flight number, arrival date, destination, and vehicle class. We confirm instantly via email and SMS." },
  { n: "2", title: "We Track Your Flight Live", body: "Our dispatch system monitors your flight from the moment it departs. If it's delayed, we adjust — your driver won't leave for the airport early." },
  { n: "3", title: "Driver Enters the Terminal", body: "Your chauffeur arrives in the Adelaide Airport arrivals hall 20 minutes before your scheduled landing and waits with a printed name board." },
  { n: "4", title: "Meet in Arrivals", body: "Adelaide Airport has a single terminal. Both domestic and international passengers exit into the same ground-level arrivals hall — just walk out and look for your name." },
  { n: "5", title: "Luggage & Escort to Vehicle", body: "Your driver takes your bags, escorts you through the car park to your waiting vehicle, and loads everything securely before departure." },
  { n: "6", title: "Relax All the Way Home", body: "Chilled or ambient cabin, phone charger on board, quiet ride — your driver takes the most efficient route and drops you door to door." },
];

const included = [
  "Name-board greeting in the arrivals hall",
  "Live flight monitoring — no charge for delays",
  "Up to 60 minutes free wait after landing",
  "Luggage trolley assistance to the vehicle",
  "Child seat available on request (no extra charge)",
  "Complimentary bottled water",
  "SMS/email confirmation & driver details",
  "Fixed price — no meter, no surge pricing",
];

const faqs = [
  {
    q: "Does Adelaide Airport have separate domestic and international terminals?",
    a: "No. Adelaide Airport (ADL) operates from a single integrated terminal. Domestic and international passengers both clear into the same arrivals hall on the ground floor. Your driver waits inside that hall — there is no confusion about which terminal to go to.",
  },
  {
    q: "What if my international flight is delayed overseas?",
    a: "We track your flight from origin. If your flight from Singapore, Dubai, or Dubai is running three hours late, we don't send your driver early — we adjust the pickup time automatically. You will not be charged waiting fees for airline delays.",
  },
  {
    q: "How long will the driver wait after landing?",
    a: "We build in 60 minutes of free waiting time from the moment wheels-down is recorded. That covers immigration, baggage claim, and customs for international arrivals. If you're held longer, call us — we'll keep the driver there.",
  },
  {
    q: "Can I book meet & greet for a domestic flight?",
    a: "Yes. Meet & greet is available for all arriving flights — interstate Qantas, Virgin, Rex, and international flights all use the same hall. The service is identical regardless of whether the flight is domestic or international.",
  },
  {
    q: "Is there an extra charge compared to a standard kerbside pickup?",
    a: "Meet & greet includes a small terminal access fee ($15) built into the quoted price. Your $89+ fare already includes it — there's no surprise charge on arrival.",
  },
  {
    q: "Can I add meet & greet to a corporate account booking?",
    a: "Yes. Corporate account holders can add meet & greet as a default preference on all bookings, or toggle it per trip in the booking portal.",
  },
];

export default function AirportMeetGreetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />

      {/* Hero */}
      <section style={{ background: "#09090B", borderBottom: "1px solid #1f1f23", padding: "80px 24px 64px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Adelaide Airport — Single Terminal
          </p>
          <h1 style={{ color: "#FFFFFF", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
            Airport Meet &amp; Greet Service
          </h1>
          <p style={{ color: "#A1A1AA", fontSize: 18, lineHeight: 1.7, marginBottom: 32, maxWidth: 620, margin: "0 auto 32px" }}>
            Your chauffeur meets you inside the arrivals hall — name board held high, flight monitored, bags handled. From{" "}
            <strong style={{ color: "#C9A84C" }}>$89</strong> for a sedan.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" style={{ background: "#C9A84C", color: "#09090B", padding: "14px 32px", borderRadius: 6, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
              Book Meet &amp; Greet
            </Link>
            <Link href="/cost/airport-transfer-cost-adelaide" style={{ border: "1px solid #3f3f46", color: "#A1A1AA", padding: "14px 32px", borderRadius: 6, fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
              See All Prices
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section style={{ background: "#0d0d10", padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>What's Included</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 48 }}>Everything you need from wheels-down to your front door.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {included.map((item, i) => (
              <div key={i} style={{ background: "#111115", border: "1px solid #1f1f23", borderRadius: 8, padding: "16px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ color: "#C9A84C", fontSize: 20, lineHeight: 1, flexShrink: 0 }}>✓</span>
                <span style={{ color: "#D4D4D8", fontSize: 15 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ background: "#09090B", padding: "72px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>How It Works</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 48 }}>Six steps from booking to your destination.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {steps.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ background: "#C9A84C", color: "#09090B", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, flexShrink: 0 }}>
                  {s.n}
                </div>
                <div>
                  <h3 style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ color: "#A1A1AA", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: "#0d0d10", padding: "72px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, marginBottom: 8 }}>Meet &amp; Greet Pricing</h2>
          <p style={{ color: "#A1A1AA", marginBottom: 40 }}>Fixed fares — GST included, no hidden extras.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
            {[
              { type: "Sedan", price: "from $89", note: "Up to 3 pax, 3 bags" },
              { type: "SUV", price: "from $108", note: "Up to 5 pax, 5 bags" },
              { type: "Van", price: "from $135", note: "Up to 8 pax, 8 bags" },
            ].map((v) => (
              <div key={v.type} style={{ background: "#111115", border: "1px solid #2a2a2e", borderRadius: 10, padding: "28px 20px" }}>
                <div style={{ color: "#A1A1AA", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{v.type}</div>
                <div style={{ color: "#C9A84C", fontSize: 28, fontWeight: 800, marginBottom: 6 }}>{v.price}</div>
                <div style={{ color: "#71717A", fontSize: 13 }}>{v.note}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "#52525B", fontSize: 13, marginTop: 20 }}>Terminal access fee included. Prices vary by destination — get an exact quote at booking.</p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#09090B", padding: "72px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: "1px solid #1f1f23", paddingBottom: 28 }}>
                <h3 style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{f.q}</h3>
                <p style={{ color: "#A1A1AA", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#111115", borderTop: "1px solid #1f1f23", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Ready to Book Your Meet &amp; Greet?</h2>
        <p style={{ color: "#A1A1AA", fontSize: 16, marginBottom: 28 }}>Enter your flight number and we handle the rest.</p>
        <Link href="/book" style={{ background: "#C9A84C", color: "#09090B", padding: "16px 40px", borderRadius: 6, fontWeight: 700, fontSize: 17, textDecoration: "none" }}>
          Book Now — From $89
        </Link>
      </section>

      {/* Related pages */}
      <section style={{ background: "#0d0d10", padding: "48px 24px", borderTop: "1px solid #1f1f28" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.15em", fontSize: 11, textTransform: "uppercase", marginBottom: 20 }}>Related Pages</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link href="/services/airport-transfers" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Airport Transfers →</Link>
            <Link href="/services/late-night-airport-transfers" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Late Night Airport Transfers →</Link>
            <Link href="/services/point-to-point" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Point-to-Point Transfers →</Link>
            <Link href="/locations/adelaide-airport" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Adelaide Airport Chauffeur →</Link>
            <Link href="/cost/airport-transfer-cost-adelaide" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Airport Transfer Cost Guide →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
