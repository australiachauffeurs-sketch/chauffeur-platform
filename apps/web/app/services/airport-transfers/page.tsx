import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Adelaide Airport Transfers | Luxury Chauffeur to & from ADL Airport",
  description:
    "Book a luxury chauffeur transfer to or from Adelaide Airport (ADL). Meet & greet service, flight tracking, on-time guarantee. Sedan, SUV & van available 24/7. Instant online booking.",
  keywords: [
    "Adelaide Airport transfer",
    "chauffeur Adelaide Airport",
    "ADL airport pickup",
    "Adelaide Airport taxi alternative",
    "airport car hire Adelaide",
    "luxury airport transfer Adelaide",
    "Adelaide Airport to CBD",
    "Adelaide Airport to Glenelg",
    "corporate airport transfer Adelaide",
    "meet and greet Adelaide Airport",
  ],
  alternates: { canonical: `${SITE_URL}/services/airport-transfers` },
  openGraph: {
    title: "Adelaide Airport Transfers | Elite Chauffeurs",
    description:
      "Luxury door-to-door airport transfers across greater Adelaide. Flight tracking, meet & greet, 24/7 availability.",
    url: `${SITE_URL}/services/airport-transfers`,
    images: [{ url: "/images/airport.jpg", width: 1200, height: 630, alt: "Adelaide Airport Chauffeur Transfer" }],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Adelaide Airport Transfer Service",
  provider: {
    "@type": "LocalBusiness",
    name: "Elite Chauffeurs Australia",
    telephone: "+61 8 8000 0000",
  },
  areaServed: { "@type": "City", name: "Adelaide" },
  description:
    "Professional luxury chauffeur transfers to and from Adelaide Airport. Available 24/7 with meet & greet, flight tracking, and on-time guarantee.",
  offers: {
    "@type": "Offer",
    priceCurrency: "AUD",
    price: "89",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "89",
      priceCurrency: "AUD",
      unitText: "From $89 one-way",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Airport Transfer Options",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sedan Airport Transfer — from $89" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SUV Airport Transfer — from $120" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury Van Airport Transfer — from $150" } },
    ],
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does an airport transfer from Adelaide Airport to CBD cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our airport transfers from Adelaide Airport (ADL) to Adelaide CBD start from $89 in a luxury sedan. Prices vary by vehicle type and time of day. Get an instant quote online.",
      },
    },
    {
      "@type": "Question",
      name: "Do you track my flight for airport pickups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we monitor your flight in real time. If your flight is delayed or arrives early, your driver adjusts automatically. No extra charge for flight delays.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a meet & greet service at Adelaide Airport?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Your chauffeur meets you in the arrivals hall with a name board, assists with luggage, and escorts you to the vehicle.",
      },
    },
    {
      "@type": "Question",
      name: "How early should I book an airport transfer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book as little as 2 hours in advance, but we recommend booking at least 24 hours ahead for guaranteed availability, especially for early morning or late night flights.",
      },
    },
  ],
};

const ROUTES = [
  { from: "Adelaide Airport", to: "Adelaide CBD", price: "from $89", time: "~25 min" },
  { from: "Adelaide Airport", to: "Glenelg", price: "from $95", time: "~30 min" },
  { from: "Adelaide Airport", to: "North Adelaide", price: "from $95", time: "~30 min" },
  { from: "Adelaide Airport", to: "Mount Barker", price: "from $145", time: "~45 min" },
  { from: "Adelaide Airport", to: "Barossa Valley", price: "from $195", time: "~60 min" },
  { from: "Adelaide Airport", to: "McLaren Vale", price: "from $160", time: "~55 min" },
  { from: "Adelaide CBD", to: "Adelaide Airport", price: "from $89", time: "~25 min" },
  { from: "Glenelg", to: "Adelaide Airport", price: "from $95", time: "~30 min" },
];

export default function AirportTransfersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <Navbar />

      <main>
        {/* Hero */}
        <section
          style={{
            background: "linear-gradient(135deg, #09090B 0%, #1a1a0e 100%)",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.2em", fontSize: 13, marginBottom: 16 }}>
            ✈ ADELAIDE AIRPORT TRANSFERS
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 20px" }}>
            Luxury Chauffeur Transfers<br />
            <span style={{ color: "#C9A84C" }}>To & From Adelaide Airport</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 18, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Flight tracking · Meet & greet in arrivals · On-time guarantee · 24/7 availability.
            Your driver is waiting — you just walk out.
          </p>
          <Link
            href="/book?service=airport"
            style={{
              display: "inline-block",
              background: "#C9A84C",
              color: "#09090B",
              padding: "18px 44px",
              borderRadius: 14,
              fontWeight: 900,
              fontSize: 17,
              textDecoration: "none",
            }}
          >
            Book Airport Transfer →
          </Link>
          <p style={{ color: "#6B7280", marginTop: 16, fontSize: 13 }}>
            Instant confirmation · Free cancellation up to 2 hours before pickup
          </p>
        </section>

        {/* Trust signals */}
        <section style={{ background: "#C9A84C", padding: "20px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 12 }}>
            {[
              "✈ Real-time flight tracking",
              "🤝 Meet & greet in arrivals",
              "🕐 On-time or we refund",
              "⭐ 4.9 rating · 247+ reviews",
              "📞 24/7 customer support",
            ].map(t => (
              <span key={t} style={{ color: "#09090B", fontWeight: 700, fontSize: 14 }}>{t}</span>
            ))}
          </div>
        </section>

        {/* Popular Routes */}
        <section style={{ padding: "72px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>
              Popular Adelaide Airport Routes
            </h2>
            <p style={{ color: "#6B7280", textAlign: "center", marginBottom: 48, fontSize: 16 }}>
              Fixed prices — no surge, no surprises
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {ROUTES.map(r => (
                <Link
                  key={`${r.from}-${r.to}`}
                  href={`/book?from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}`}
                  style={{
                    display: "block",
                    background: "#17171A",
                    border: "1px solid #2A2A30",
                    borderRadius: 16,
                    padding: "20px 22px",
                    textDecoration: "none",
                    transition: "border-color 0.2s",
                  }}
                >
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                    {r.from} → {r.to}
                  </p>
                  <p style={{ color: "#C9A84C", fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{r.price}</p>
                  <p style={{ color: "#6B7280", fontSize: 13 }}>{r.time} · Book now →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section style={{ padding: "72px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: 48 }}>
              What's Included in Every Transfer
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
              {[
                { icon: "✈", title: "Flight Monitoring", desc: "We track your flight 24 hours before. Delayed? Your driver waits — no extra charge." },
                { icon: "🤝", title: "Meet & Greet", desc: "Chauffeur meets you in arrivals hall with your name board and assists with all luggage." },
                { icon: "🚗", title: "Luxury Vehicle", desc: "Late-model Mercedes-Benz, BMW or equivalent. Immaculately clean interior every trip." },
                { icon: "💧", title: "Complimentary Water", desc: "Chilled bottled water and mints provided in vehicle for every passenger." },
                { icon: "📱", title: "Driver App Updates", desc: "Track your driver's live location. Get SMS and app notifications as they approach." },
                { icon: "🔒", title: "Fixed Pricing", desc: "Quote locked at booking. No meter running. No surge pricing. No airport levies." },
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

        {/* FAQ */}
        <section style={{ padding: "72px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: 48 }}>
              Frequently Asked Questions
            </h2>
            {FAQ_SCHEMA.mainEntity.map((q: any) => (
              <details
                key={q.name}
                style={{ borderBottom: "1px solid #2A2A30", paddingBottom: 20, marginBottom: 20 }}
              >
                <summary style={{ color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", paddingTop: 4 }}>
                  {q.name}
                </summary>
                <p style={{ color: "#9CA3AF", marginTop: 12, lineHeight: 1.7, fontSize: 15 }}>
                  {q.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "linear-gradient(135deg, #1a1500 0%, #09090B 100%)", padding: "72px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, marginBottom: 16 }}>
            Ready to Book Your Transfer?
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 18, marginBottom: 36 }}>
            Get an instant quote and confirm your booking in under 60 seconds.
          </p>
          <Link
            href="/book?service=airport"
            style={{
              display: "inline-block",
              background: "#C9A84C",
              color: "#09090B",
              padding: "20px 52px",
              borderRadius: 14,
              fontWeight: 900,
              fontSize: 18,
              textDecoration: "none",
            }}
          >
            Get Instant Quote →
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
