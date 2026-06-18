import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Private Winery Day Tour Chauffeur Adelaide | Australia Chauffeurs",
  description:
    "Private chauffeur winery day tours from Adelaide — McLaren Vale, Barossa Valley, Adelaide Hills. Custom itineraries, 4–8hr packages, from $125/hr. Call (08) 7078 1777.",
  keywords: [
    "winery tour chauffeur Adelaide",
    "McLaren Vale wine tour chauffeur",
    "Barossa Valley private driver Adelaide",
    "Adelaide Hills winery chauffeur",
    "private wine tour Adelaide",
    "chauffeur winery day trip Adelaide",
    "hourly hire wine tour Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/occasions/winery-day-tour` },
};

const faqs = [
  {
    q: "How long are your winery day tour packages?",
    a: "We offer 4-hour, 6-hour, and 8-hour packages to suit different itineraries. A 4-hour booking works well for a focused McLaren Vale visit with two or three cellar doors. A full 8-hour day is ideal for the Barossa or a comprehensive Adelaide Hills circuit.",
  },
  {
    q: "Can we customise the wineries we visit?",
    a: "Absolutely — the itinerary is entirely yours. Let us know which wineries you'd like to visit (or ask for our recommendations) and we'll plan the route and timing. We're familiar with opening hours and booking requirements at most South Australian cellar doors.",
  },
  {
    q: "Do you recommend any McLaren Vale wineries?",
    a: "Popular stops include d'Arenberg (the Cube is a must), Wirra Wirra, Chapel Hill, Shingleback, and Coriole. We can route you efficiently between them to maximise tasting time without rushing.",
  },
  {
    q: "Can we stop for lunch during the tour?",
    a: "Yes — a long lunch is a highlight of most winery days. We can stop at Uraidla Brewery, The Kitchen Door at Wirra Wirra, Fino Seppeltsfield, or any restaurant you choose. Your chauffeur waits while you dine.",
  },
  {
    q: "Is the wine we purchase safe in the vehicle?",
    a: "Yes. We carry a padded wine carry bag and have boot space to secure purchased bottles carefully. We treat your cellar door haul with the same care as your luggage.",
  },
];

const regions = [
  {
    name: "McLaren Vale",
    duration: "4–6 hrs",
    highlights: "d'Arenberg Cube, Wirra Wirra, Chapel Hill, Coriole, Shingleback. 45 min from the CBD.",
  },
  {
    name: "Adelaide Hills",
    duration: "4–6 hrs",
    highlights: "Shaw + Smith, Hahndorf Hill, Deviation Road, Bird in Hand, Golding Wines.",
  },
  {
    name: "Barossa Valley",
    duration: "6–8 hrs",
    highlights: "Seppeltsfield, Langmeil, Chateau Tanunda, Wolf Blass, Rockford Wines, Fino restaurant.",
  },
  {
    name: "Eden Valley & Clare",
    duration: "7–8 hrs",
    highlights: "Henschke, Pewsey Vale, Grosset, Skillogalee — the great Riesling belt of South Australia.",
  },
];

export default function WineryDayTourPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#09090B", color: "#F5F5F5", fontFamily: "Georgia, serif" }}>

        {/* Hero */}
        <section
          style={{
            padding: "100px 24px 72px",
            textAlign: "center",
            background: "linear-gradient(160deg, #09090B 60%, #100e08 100%)",
            borderBottom: "1px solid #2a2010",
          }}
        >
          <p style={{ color: "#C9A84C", letterSpacing: "0.2em", fontSize: "13px", textTransform: "uppercase", marginBottom: "16px" }}>
            Occasions — Winery Day Tour
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "24px" }}>
            Private Winery Day Tour Chauffeur Adelaide
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#B0B0B0", maxWidth: "640px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            McLaren Vale, Barossa Valley, Adelaide Hills — South Australia's wine regions are world-class and deserve to be explored without designating a driver. Fully private, fully flexible, fully yours.
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
              Book Your Wine Tour
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

        {/* Wine Regions */}
        <section style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "12px" }}>South Australia's Great Wine Regions</h2>
          <p style={{ color: "#B0B0B0", lineHeight: 1.8, marginBottom: "36px" }}>
            All departing from your Adelaide hotel or home address. We know the roads, the cellar doors, and the best lunch spots in every region.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {regions.map((r) => (
              <div key={r.name} style={{ background: "#111113", border: "1px solid #2a2010", borderRadius: "8px", padding: "24px" }}>
                <h3 style={{ color: "#FFFFFF", fontSize: "1.1rem", marginBottom: "4px" }}>{r.name}</h3>
                <p style={{ color: "#C9A84C", fontSize: "0.85rem", marginBottom: "12px" }}>Recommended: {r.duration}</p>
                <p style={{ color: "#B0B0B0", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{r.highlights}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section style={{ padding: "56px 24px", background: "#0d0d10", borderTop: "1px solid #1e1e24", borderBottom: "1px solid #1e1e24" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "32px" }}>What's Included in Every Tour</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
              {[
                { title: "Custom Itinerary Planning", desc: "We work with you before the day to plan the perfect route — wineries, lunch venue, scenic stops, and timing." },
                { title: "Chauffeur Wait Time", desc: "Your driver waits at every cellar door and restaurant. No rushing, no clock-watching — taste at your own pace." },
                { title: "Door-to-Door Service", desc: "Pickup from your Adelaide hotel, Airbnb, or home address. Dropped back the same way at the end of the day." },
                { title: "Chilled Water Onboard", desc: "Hydration matters on a wine day. Bottled water is always stocked. Add a cheese platter pack on request." },
                { title: "Wine Purchase Handling", desc: "Boot space and padded carry bags to transport your cellar door purchases home safely." },
                { title: "Local Knowledge", desc: "Your chauffeur can recommend cellar doors, flag which restaurants need booking, and share region insights." },
              ].map((item) => (
                <div key={item.title} style={{ borderLeft: "3px solid #C9A84C", paddingLeft: "16px" }}>
                  <p style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: "6px" }}>{item.title}</p>
                  <p style={{ color: "#B0B0B0", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicles & Pricing */}
        <section style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "12px" }}>Packages & Pricing</h2>
          <p style={{ color: "#B0B0B0", lineHeight: 1.8, marginBottom: "36px" }}>All-inclusive hourly rates. No fuel levies for regional travel.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {[
              { label: "4-Hour Tour", vehicle: "Luxury Sedan", rate: "From $500", note: "McLaren Vale or Adelaide Hills focused. 2–3 cellar doors + lunch." },
              { label: "6-Hour Tour", vehicle: "Luxury Sedan or SUV", rate: "From $750", note: "Full McLaren Vale or Adelaide Hills circuit. 3–4 cellar doors with a long lunch." },
              { label: "8-Hour Tour", vehicle: "Luxury Sedan or SUV", rate: "From $1,000", note: "Barossa Valley or Clare/Eden Valley. The complete experience — 4–5 producers + Fino or regional dining." },
              { label: "Group Tour", vehicle: "Luxury People-Mover", rate: "From $175/hr", note: "Up to 7 guests. All the same inclusions — ideal for couples, families, or friend groups." },
            ].map((pkg) => (
              <div key={pkg.label} style={{ background: "#111113", border: "1px solid #2a2010", borderRadius: "8px", padding: "28px" }}>
                <h3 style={{ color: "#FFFFFF", fontSize: "1rem", marginBottom: "4px" }}>{pkg.label}</h3>
                <p style={{ color: "#C9A84C", fontSize: "0.8rem", marginBottom: "12px" }}>{pkg.vehicle}</p>
                <p style={{ color: "#C9A84C", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px" }}>{pkg.rate}</p>
                <p style={{ color: "#B0B0B0", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>{pkg.note}</p>
              </div>
            ))}
          </div>
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
          <h2 style={{ color: "#FFFFFF", fontSize: "2rem", marginBottom: "16px" }}>Plan Your Perfect Wine Day</h2>
          <p style={{ color: "#B0B0B0", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
            Book online or call <strong style={{ color: "#C9A84C" }}>(08) 7078 1777</strong> — we'll help you design the itinerary.
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
