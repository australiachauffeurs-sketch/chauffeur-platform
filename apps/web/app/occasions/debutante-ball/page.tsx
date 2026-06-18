import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Debutante Ball Chauffeur Adelaide | Australia Chauffeurs",
  description:
    "Luxury chauffeur for debutante balls in Adelaide. Formal arrivals at Intercontinental, Hilton, Adelaide Convention Centre and more. Luxury sedan with meet-and-greet. Call (08) 7078 1777.",
  keywords: [
    "debutante ball chauffeur Adelaide",
    "deb ball car Adelaide",
    "formal chauffeur Adelaide",
    "debutante chauffeur hire Adelaide",
    "Intercontinental Adelaide debutante",
    "Adelaide Convention Centre chauffeur",
    "luxury sedan debutante Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/occasions/debutante-ball` },
};

const faqs = [
  {
    q: "Which venues do you service for debutante balls in Adelaide?",
    a: "We regularly provide formal chauffeur arrivals at the InterContinental Adelaide, Hilton Adelaide, Adelaide Convention Centre, Stamford Grand Glenelg, and private function venues across the metropolitan area.",
  },
  {
    q: "Can parents book the chauffeur directly?",
    a: "Yes — the majority of our debutante bookings are made by parents on behalf of their daughter. We work with families to coordinate timing, photography stops, and precise arrival windows so the grand entrance goes exactly to plan.",
  },
  {
    q: "What vehicles are available for a debutante arrival?",
    a: "Our Mercedes-Benz S-Class sedan is the most popular choice — it provides an elegant, formal arrival with the door opened by your chauffeur. We also offer the E-Class for a slightly more compact option at the same standard of service.",
  },
  {
    q: "Will the chauffeur open the door and assist with the gown?",
    a: "Yes. Your chauffeur is trained in formal arrival protocol — they will open the vehicle door, offer a hand for assistance, and ensure the debutante's gown is clear before stepping out. Discretion and poise are central to our service.",
  },
  {
    q: "Can we arrange a photography stop on the way to the venue?",
    a: "Absolutely. Many families choose a scenic stop — Elder Park, the Torrens Riverbank, or North Terrace — for photos before arriving at the venue. We factor this into the schedule at no extra charge.",
  },
];

export default function DebutanteBallPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#09090B", color: "#F5F5F5", fontFamily: "Georgia, serif" }}>

        {/* Hero */}
        <section
          style={{
            padding: "100px 24px 72px",
            textAlign: "center",
            background: "linear-gradient(160deg, #09090B 60%, #12100e 100%)",
            borderBottom: "1px solid #2a2010",
          }}
        >
          <p style={{ color: "#C9A84C", letterSpacing: "0.2em", fontSize: "13px", textTransform: "uppercase", marginBottom: "16px" }}>
            Occasions — Debutante Ball
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "24px" }}>
            Debutante Ball Chauffeur Adelaide
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#B0B0B0", maxWidth: "640px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            A debutante's formal arrival deserves more than an ordinary car. Our luxury sedan chauffeur service ensures a perfectly timed, elegant entrance at Adelaide's finest ballrooms — with every detail looked after by your family's dedicated driver.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/book"
              style={{
                background: "#C9A84C",
                color: "#09090B",
                padding: "14px 32px",
                borderRadius: "4px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Book Debutante Chauffeur
            </Link>
            <a
              href="tel:0870781777"
              style={{
                border: "1px solid #C9A84C",
                color: "#C9A84C",
                padding: "14px 32px",
                borderRadius: "4px",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Call (08) 7078 1777
            </a>
          </div>
        </section>

        {/* What's Included */}
        <section style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "12px" }}>The Formal Arrival Experience</h2>
          <p style={{ color: "#B0B0B0", lineHeight: 1.8, marginBottom: "36px" }}>
            We understand the significance of a debutante ball. Our service is built around precision, elegance, and making the family proud.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {[
              { title: "Meet-and-Greet at Home", desc: "Your chauffeur arrives at your door in full formal attire, introduces themselves to the family, and assists the debutante into the vehicle." },
              { title: "Gown-Friendly Sedan Interior", desc: "Our S-Class and E-Class sedans offer ample rear cabin space to keep ballgowns pristine throughout the journey." },
              { title: "Photography Stop Included", desc: "A scenic stop at Elder Park, the Torrens, or North Terrace for family photos — factored into your schedule at no extra cost." },
              { title: "Formal Door Protocol", desc: "Your chauffeur opens the door at the venue entrance, assists with the gown, and steps back for the photographer's moment." },
              { title: "Precise Venue Timing", desc: "We liaise with the venue coordinator to ensure arrival is synchronised with the ball's formal introduction sequence." },
              { title: "Return Journey Available", desc: "We can return at your requested time to collect and transport guests home safely after the evening concludes." },
            ].map((item) => (
              <div key={item.title} style={{ background: "#111113", border: "1px solid #2a2010", borderRadius: "8px", padding: "24px" }}>
                <h3 style={{ color: "#C9A84C", fontSize: "1rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#B0B0B0", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Venues */}
        <section style={{ padding: "56px 24px", background: "#0d0d10", borderTop: "1px solid #1e1e24", borderBottom: "1px solid #1e1e24" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "24px" }}>Adelaide Debutante Ball Venues We Service</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              {[
                "InterContinental Adelaide, North Terrace",
                "Hilton Adelaide, Victoria Square",
                "Adelaide Convention Centre, North Terrace",
                "Stamford Grand, Glenelg",
                "Pullman Adelaide, Hindmarsh Square",
                "Eos by SkyCity, North Terrace",
                "Private function venues, Adelaide Hills",
                "Mayfair Hotel, King William St",
              ].map((venue) => (
                <div key={venue} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "#C9A84C", marginTop: "3px", flexShrink: 0 }}>✦</span>
                  <p style={{ color: "#B0B0B0", fontSize: "0.95rem", margin: 0 }}>{venue}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicles & Pricing */}
        <section style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "12px" }}>Vehicles & Pricing</h2>
          <p style={{ color: "#B0B0B0", lineHeight: 1.8, marginBottom: "36px" }}>Flat-rate packages available for debutante arrivals. No surprises, no add-ons.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {[
              { vehicle: "Mercedes-Benz S-Class", seats: "Debutante + 2 guests", rate: "From $145/hr", note: "The flagship formal choice. Commanding road presence, immaculate interior, and the most elegant arrival statement." },
              { vehicle: "Mercedes-Benz E-Class", seats: "Debutante + 2 guests", rate: "From $125/hr", note: "Executive-grade comfort with the same professional chauffeur service. Excellent for suburban to city transfers." },
              { vehicle: "Premium SUV", seats: "Family group up to 5", rate: "From $150/hr", note: "Ideal when the whole family wants to travel together for the formal arrival. BMW X7 or Mercedes GLS." },
            ].map((v) => (
              <div key={v.vehicle} style={{ background: "#111113", border: "1px solid #2a2010", borderRadius: "8px", padding: "28px" }}>
                <h3 style={{ color: "#FFFFFF", fontSize: "1.1rem", marginBottom: "4px" }}>{v.vehicle}</h3>
                <p style={{ color: "#C9A84C", fontSize: "0.85rem", marginBottom: "12px" }}>{v.seats}</p>
                <p style={{ color: "#C9A84C", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px" }}>{v.rate}</p>
                <p style={{ color: "#B0B0B0", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>{v.note}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "#777", fontSize: "0.85rem", marginTop: "20px" }}>Flat-rate point-to-point transfers also available. Photography stop included in all debutante bookings.</p>
        </section>

        {/* FAQs */}
        <section style={{ padding: "56px 24px", background: "#0d0d10", borderTop: "1px solid #1e1e24" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "32px" }}>Frequently Asked Questions</h2>
            {faqs.map((faq) => (
              <div key={faq.q} style={{ borderBottom: "1px solid #1e1e24", paddingBottom: "24px", marginBottom: "24px" }}>
                <h3 style={{ color: "#FFFFFF", fontSize: "1rem", marginBottom: "10px" }}>{faq.q}</h3>
                <p style={{ color: "#B0B0B0", lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 24px", textAlign: "center", background: "#09090B" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: "2rem", marginBottom: "16px" }}>Secure a Flawless Formal Arrival</h2>
          <p style={{ color: "#B0B0B0", marginBottom: "32px", maxWidth: "520px", margin: "0 auto 32px" }}>
            Debutante bookings fill quickly in season. Call <strong style={{ color: "#C9A84C" }}>(08) 7078 1777</strong> or book online today.
          </p>
          <Link
            href="/book"
            style={{
              background: "#C9A84C",
              color: "#09090B",
              padding: "16px 40px",
              borderRadius: "4px",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "1.05rem",
            }}
          >
            Book Now
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
