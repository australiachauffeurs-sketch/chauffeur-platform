import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Late Night Airport Transfers Adelaide — 24/7 Chauffeur Service",
  description:
    "2am pickup? Red-eye arrival? Overnight flight into ADL? Our chauffeurs run 24 hours, 7 days. Flight monitored, no delay surcharge, safe and discreet.",
  keywords: [
    "late night airport transfer Adelaide",
    "24 hour airport chauffeur Adelaide",
    "2am airport pickup Adelaide",
    "overnight flight Adelaide transfer",
    "red-eye airport transfer Adelaide",
    "after midnight airport Adelaide",
    "shift worker airport transfer Adelaide",
    "early morning airport Adelaide chauffeur",
  ],
  alternates: { canonical: `${SITE_URL}/services/late-night-airport-transfers` },
  openGraph: {
    title: "Late Night Airport Transfers Adelaide — 24/7",
    description: "2am pickup, 4am departure, red-eye arrival — our chauffeurs operate all night. Flight tracked. No delay surcharge.",
    url: `${SITE_URL}/services/late-night-airport-transfers`,
    images: [{ url: "/images/airport.jpg", width: 1200, height: 630, alt: "Late Night Airport Transfer Adelaide" }],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Late Night Airport Transfers Adelaide",
  provider: {
    "@type": "LocalBusiness",
    name: "Australia Chauffeurs",
    address: { "@type": "PostalAddress", addressLocality: "Adelaide", addressRegion: "SA", addressCountry: "AU" },
    openingHours: "Mo-Su 00:00-23:59",
  },
  areaServed: { "@type": "City", name: "Adelaide" },
  description: "24/7 late night airport chauffeur transfers in Adelaide. Flight monitoring, no delay surcharge, safe overnight pickups from $89.",
  url: `${SITE_URL}/services/late-night-airport-transfers`,
};

const promises = [
  { icon: "🕐", title: "Available Every Hour of the Night", body: "Midnight, 2am, 4am, 5:30am — we don't close. Every booking is staffed by a rested, fully licensed chauffeur regardless of the hour." },
  { icon: "✈️", title: "Flight Monitored Automatically", body: "Our dispatch system watches your inbound flight in real time. Whether your red-eye from Sydney lands on time or 90 minutes late, your driver adjusts — you don't need to call." },
  { icon: "$", title: "No Delay Surcharge", body: "If your overnight Qantas or Virgin flight is delayed, you will not be charged extra waiting time for an airline delay. The quoted fare is the fare you pay." },
  { icon: "🔒", title: "Safety at Every Pickup", body: "All vehicles are registered, insured, and GPS-tracked. Our chauffeurs are police-checked and hold current SA commercial passenger vehicle authorisation. You can share your live trip with a contact." },
  { icon: "📱", title: "Driver Details Sent in Advance", body: "You receive your chauffeur's name, photo, vehicle registration, and mobile number 60 minutes before pickup — so you know exactly who to look for in the dark." },
  { icon: "🌡️", title: "Cabin Ready on Arrival", body: "Climate controlled, clean, and quiet. Water in the armrest. Whether you've just flown 14 hours from London or finished a double shift, the ride home is ready for you." },
];

const useCases = [
  { who: "Red-Eye Travellers", detail: "Flights from Sydney, Melbourne, Brisbane, and Perth frequently arrive in Adelaide between 11pm and 2am. Instead of waiting for an Uber surge or a taxi queue at midnight, your chauffeur is already waiting." },
  { who: "International Long-Haul Arrivals", detail: "Emirates, Singapore Airlines, and Cathay Pacific flights connecting through east-coast hubs often land in Adelaide at unpredictable overnight hours. We track the whole journey." },
  { who: "Shift Workers & FIFO", detail: "Mining, healthcare, aviation, and emergency workers operate on rosters that don't align with standard business hours. We provide reliable, punctual transfers at 3am just as we do at 3pm." },
  { who: "Early Morning Departures", detail: "If your flight departs at 6am, you need to leave home by 4:30am. Our driver is at your door on time — fully alert, vehicle pre-warmed in winter, route planned." },
  { who: "Event Transfers After Late Nights", detail: "Post-concert, post-gala, late dinner — we also serve late-night transfers from city venues to the airport for early next-morning flights." },
];

const faqs = [
  {
    q: "Is there an extra charge for late night pickups?",
    a: "Our standard fares apply around the clock. There is no late-night surcharge, no after-hours fee, and no extra charge if your flight is delayed. The price you see at booking is the price you pay.",
  },
  {
    q: "How far in advance should I book a late-night transfer?",
    a: "We recommend booking at least 4 hours in advance to guarantee vehicle availability. For overnight flights arriving between midnight and 5am, booking at the time you purchase your flight ticket is safest — these slots fill quickly on weekends.",
  },
  {
    q: "What if I can't find my driver at 2am?",
    a: "Your driver's name, photo, and mobile number are sent to you before pickup. If you exit arrivals and can't locate them immediately, call directly. Our dispatch line is also staffed 24/7 and can relay the driver's exact location.",
  },
  {
    q: "Do you service early morning departures (4am–6am)?",
    a: "Yes. Early morning departure transfers — pickup from home between 3am and 5am — are one of our most common overnight bookings. Book online and your driver will confirm the pickup time in advance.",
  },
  {
    q: "Can I book for regular shift worker pickups?",
    a: "Yes. Corporate and recurring accounts are available for businesses requiring regular overnight pickups for shift workers, FIFO rosters, or cabin crew. Contact us to set up a standing account.",
  },
];

export default function LateNightAirportTransfersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />

      {/* Hero */}
      <section style={{ background: "#09090B", borderBottom: "1px solid #1f1f23", padding: "80px 24px 64px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Available 24 Hours — 7 Days a Week
          </p>
          <h1 style={{ color: "#FFFFFF", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
            Late Night Airport Transfers Adelaide
          </h1>
          <p style={{ color: "#A1A1AA", fontSize: 18, lineHeight: 1.7, maxWidth: 640, margin: "0 auto 32px" }}>
            2am pickup. Red-eye arrival. Overnight flight into ADL. Our chauffeurs run all night — flight monitored, no delay surcharge, safe and punctual every time.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" style={{ background: "#C9A84C", color: "#09090B", padding: "14px 32px", borderRadius: 6, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
              Book Overnight Transfer
            </Link>
            <Link href="/services/airport-transfers" style={{ border: "1px solid #3f3f46", color: "#A1A1AA", padding: "14px 32px", borderRadius: 6, fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
              All Airport Services
            </Link>
          </div>
        </div>
      </section>

      {/* Availability Banner */}
      <section style={{ background: "#0f0e09", borderBottom: "1px solid #2a2208", padding: "24px" }}>
        <p style={{ color: "#C9A84C", textAlign: "center", fontSize: 15, fontWeight: 600, margin: 0 }}>
          Drivers available every hour — midnight, 2am, 4am, 5:30am. No exceptions. No surcharges.
        </p>
      </section>

      {/* Our Promises */}
      <section style={{ background: "#0d0d10", padding: "72px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>Our Late Night Promise</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 48 }}>What we guarantee on every overnight booking.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {promises.map((p, i) => (
              <div key={i} style={{ background: "#111115", border: "1px solid #1f1f23", borderRadius: 10, padding: "28px 24px" }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{p.icon}</div>
                <h3 style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ color: "#A1A1AA", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Uses This Service */}
      <section style={{ background: "#09090B", padding: "72px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>Who Uses Our Overnight Service</h2>
          <p style={{ color: "#A1A1AA", textAlign: "center", marginBottom: 48 }}>Late-night chauffeurs aren't just for luxury — they're for reliability.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {useCases.map((u, i) => (
              <div key={i} style={{ background: "#111115", border: "1px solid #1f1f23", borderRadius: 8, padding: "24px 28px" }}>
                <h3 style={{ color: "#C9A84C", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{u.who}</h3>
                <p style={{ color: "#A1A1AA", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{u.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: "#0d0d10", padding: "64px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Transparent Late Night Pricing</h2>
          <p style={{ color: "#A1A1AA", marginBottom: 36 }}>Same fares as daytime. No after-hours surcharge.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 16 }}>
            {[
              { type: "Sedan", price: "From $89", note: "CBD to/from airport" },
              { type: "SUV", price: "From $108", note: "CBD to/from airport" },
              { type: "Van", price: "From $135", note: "CBD to/from airport" },
            ].map((v) => (
              <div key={v.type} style={{ background: "#111115", border: "1px solid #2a2a2e", borderRadius: 10, padding: "24px 16px" }}>
                <div style={{ color: "#A1A1AA", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{v.type}</div>
                <div style={{ color: "#C9A84C", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{v.price}</div>
                <div style={{ color: "#52525B", fontSize: 12 }}>{v.note}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "#52525B", fontSize: 13, marginTop: 20 }}>All fares GST inclusive. Fixed price — no meter, no surge. Price varies by destination.</p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#09090B", padding: "72px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>Common Questions</h2>
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
        <h2 style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Book Your Overnight Transfer Now</h2>
        <p style={{ color: "#A1A1AA", fontSize: 16, marginBottom: 28 }}>Instant confirmation. Driver details sent before pickup. No surprises at 2am.</p>
        <Link href="/book" style={{ background: "#C9A84C", color: "#09090B", padding: "16px 40px", borderRadius: 6, fontWeight: 700, fontSize: 17, textDecoration: "none" }}>
          Book 24/7 Airport Transfer
        </Link>
      </section>

      <Footer />
    </>
  );
}
