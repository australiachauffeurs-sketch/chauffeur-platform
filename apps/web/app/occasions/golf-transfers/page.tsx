import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Golf Club Chauffeur Transfers Adelaide | Australia Chauffeurs",
  description:
    "Chauffeur transfers to Adelaide golf clubs — Kooyonga, Royal Adelaide, The Grange, Glenelg Golf Club. Corporate golf days and private transfers. Large boot for clubs. Call (08) 7078 1777.",
  keywords: [
    "golf chauffeur Adelaide",
    "golf transfer Adelaide",
    "Kooyonga Golf Club chauffeur",
    "Royal Adelaide Golf Club transfer",
    "The Grange Golf Club chauffeur",
    "corporate golf day driver Adelaide",
    "golf club transfer Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/occasions/golf-transfers` },
};

const faqs = [
  {
    q: "Can you fit golf clubs and bags in the vehicle?",
    a: "Yes — boot space for golf equipment is a key consideration in our golf transfer vehicles. Our SUVs and sedans have generous boot space for full golf bags. For groups with multiple sets of clubs, our people-mover is recommended.",
  },
  {
    q: "Do you cover corporate golf days with multiple players?",
    a: "Absolutely. We regularly coordinate multi-vehicle bookings for corporate golf days, shuttling players between hotel, course, and post-round dining. We can align with your event coordinator for timing.",
  },
  {
    q: "Which Adelaide golf courses do you service?",
    a: "We cover all major Adelaide courses including Royal Adelaide Golf Club (Seaton), Kooyonga Golf Club (Lockleys), The Grange Golf Club (Grange), Glenelg Golf Club (Novar Gardens), Tanunda Pines, and others on request.",
  },
  {
    q: "Can you wait at the clubhouse while I play?",
    a: "Yes — on hourly hire bookings your chauffeur waits at the course. This is popular for visiting golfers who want transport from their hotel both to and from the round. Flat-rate point-to-point transfers are also available.",
  },
  {
    q: "Do you offer early morning pickups for tee times?",
    a: "Yes. We operate 24 hours and regularly run 5:30am and 6am pickups for early tee times. Just note your tee time at booking and we'll be at your door with time to spare.",
  },
];

const courses = [
  { name: "Royal Adelaide Golf Club", suburb: "Seaton", note: "One of Australia's top-ranked courses. Championship layout." },
  { name: "Kooyonga Golf Club", suburb: "Lockleys", note: "Premier private club, host of multiple Australian Opens." },
  { name: "The Grange Golf Club", suburb: "Grange", note: "36-hole complex. East and West courses for all levels." },
  { name: "Glenelg Golf Club", suburb: "Novar Gardens", note: "Parkland course close to the beach. Popular corporate events venue." },
  { name: "Tanunda Pines Golf Club", suburb: "Barossa Valley", note: "A favourite for golfers combining a round with a winery day." },
  { name: "Mount Osmond Golf Club", suburb: "Mount Osmond", note: "Elevated course with panoramic Adelaide city views." },
];

export default function GolfTransfersPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#09090B", color: "#F5F5F5", fontFamily: "Georgia, serif" }}>

        {/* Hero */}
        <section
          style={{
            padding: "100px 24px 72px",
            textAlign: "center",
            background: "linear-gradient(160deg, #09090B 60%, #091208 100%)",
            borderBottom: "1px solid #1a2810",
          }}
        >
          <p style={{ color: "#C9A84C", letterSpacing: "0.2em", fontSize: "13px", textTransform: "uppercase", marginBottom: "16px" }}>
            Occasions — Golf Transfers
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "24px" }}>
            Golf Club Chauffeur Transfers Adelaide
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#B0B0B0", maxWidth: "640px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Arrive at Kooyonga, Royal Adelaide, The Grange, or Glenelg Golf Club in the style the occasion deserves. Large boot for clubs, punctual pickup, and a chauffeur who understands the importance of a tee time.
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
              Book Golf Transfer
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

        {/* Courses */}
        <section style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "12px" }}>Adelaide Golf Courses We Service</h2>
          <p style={{ color: "#B0B0B0", lineHeight: 1.8, marginBottom: "36px" }}>
            From championship courses to country clubs, we know the routes and can ensure you arrive in time for your tee.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {courses.map((c) => (
              <div key={c.name} style={{ background: "#111113", border: "1px solid #1a2810", borderRadius: "8px", padding: "22px" }}>
                <h3 style={{ color: "#FFFFFF", fontSize: "1rem", marginBottom: "4px" }}>{c.name}</h3>
                <p style={{ color: "#C9A84C", fontSize: "0.8rem", marginBottom: "10px" }}>{c.suburb}</p>
                <p style={{ color: "#B0B0B0", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>{c.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section style={{ padding: "56px 24px", background: "#0d0d10", borderTop: "1px solid #1e1e24", borderBottom: "1px solid #1e1e24" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "32px" }}>Why Golfers Choose Australia Chauffeurs</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
              {[
                { title: "Boot Space for Clubs", desc: "All vehicles selected for golf transfers have ample boot space. Full sets of clubs loaded and unloaded by your chauffeur." },
                { title: "Early Morning Availability", desc: "We run from 5am for early tee times. Never worry about a rideshare cancellation on the morning of your round." },
                { title: "Corporate Group Coordination", desc: "Multi-vehicle bookings for corporate golf days — players collected from their hotels and delivered to the first tee together." },
                { title: "Post-Round Transfers", desc: "Your chauffeur can return at an agreed time after your round for transfer to lunch, the airport, or your hotel." },
                { title: "Punctuality Guarantee", desc: "We track traffic and plan for it. Your chauffeur arrives 5 minutes early, every time." },
                { title: "Discreet & Professional", desc: "Corporate golf days often involve clients and colleagues. Our chauffeurs are trained to be professional and unobtrusive." },
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
          <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "12px" }}>Vehicles & Pricing</h2>
          <p style={{ color: "#B0B0B0", lineHeight: 1.8, marginBottom: "36px" }}>Point-to-point and hourly hire available. Flat rates for common routes on request.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {[
              { vehicle: "Luxury Sedan", seats: "1–2 golfers", rate: "From $85", note: "Mercedes-Benz E-Class or S-Class. One or two golfers with clubs. Ideal point-to-point transfer." },
              { vehicle: "Premium SUV", seats: "Up to 4 golfers", rate: "From $110", note: "BMW X7 or Mercedes GLS. Spacious boot fits 3–4 full bags. Most popular for groups of 3–4." },
              { vehicle: "Luxury People-Mover", seats: "Up to 7 golfers", rate: "From $175/hr", note: "Corporate golf days and larger groups. All clubs stowed safely, everyone travels together." },
            ].map((v) => (
              <div key={v.vehicle} style={{ background: "#111113", border: "1px solid #1a2810", borderRadius: "8px", padding: "28px" }}>
                <h3 style={{ color: "#FFFFFF", fontSize: "1.1rem", marginBottom: "4px" }}>{v.vehicle}</h3>
                <p style={{ color: "#C9A84C", fontSize: "0.85rem", marginBottom: "12px" }}>{v.seats}</p>
                <p style={{ color: "#C9A84C", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px" }}>{v.rate}</p>
                <p style={{ color: "#B0B0B0", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>{v.note}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "#777", fontSize: "0.85rem", marginTop: "20px" }}>Sedan and SUV rates shown are point-to-point minimums. Hourly hire from $125/hr (sedan). Corporate accounts welcome.</p>
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
          <h2 style={{ color: "#FFFFFF", fontSize: "2rem", marginBottom: "16px" }}>Book Your Golf Transfer Today</h2>
          <p style={{ color: "#B0B0B0", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
            Early tee times, corporate days, or a casual round — call <strong style={{ color: "#C9A84C" }}>(08) 7078 1777</strong> or book online.
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
