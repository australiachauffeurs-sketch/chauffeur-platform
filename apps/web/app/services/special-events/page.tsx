import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Special Events Chauffeur Adelaide | School Formals, Race Day, VVIP & More",
  description:
    "Luxury chauffeur for Adelaide's special occasions — school formals, Adelaide Cup race day, Fringe Festival, corporate functions, VVIP transfers and milestone events. Book your event transport.",
  keywords: [
    "special events chauffeur Adelaide",
    "school formal car hire Adelaide",
    "Adelaide Cup race day transfer",
    "Adelaide Fringe chauffeur",
    "event transport Adelaide",
    "VVIP chauffeur Adelaide",
    "gala dinner transport Adelaide",
    "Clipsal 500 chauffeur",
    "event car hire Adelaide",
    "formal car Adelaide school",
  ],
  alternates: { canonical: `${SITE_URL}/services/special-events` },
};

const EVENTS = [
  { icon: "🎓", name: "School Formals & Debutante Balls", desc: "Make it a night to remember. Stretch limo, SUV or luxury sedan — complete with red carpet treatment." },
  { icon: "🏇", name: "Adelaide Cup Race Day", desc: "Arrive at Morphettville in style. Group bookings welcome. Return service available." },
  { icon: "🎭", name: "Adelaide Fringe & Festival Season", desc: "Avoid parking headaches. Door-to-door from your hotel or home to any venue." },
  { icon: "🥂", name: "Corporate Gala Dinners", desc: "Impress clients and reward staff. Coordinated multi-vehicle pickups for large groups." },
  { icon: "🎤", name: "Concert & Stadium Events", desc: "Beat the traffic. Book a return service to Adelaide Oval, Entertainment Centre & more." },
  { icon: "💒", name: "Engagement & Anniversary", desc: "Milestone moments deserve a special vehicle. Champagne, roses and a dedicated driver." },
  { icon: "🌟", name: "VVIP & Celebrity Transfers", desc: "Discreet, professional service for high-profile guests and visiting executives." },
  { icon: "🏌", name: "Golf Days & Country Club Events", desc: "Transfer to Kooyonga, Glenelg, Royal Adelaide and other prestige clubs." },
];

export default function SpecialEventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: "linear-gradient(135deg, #09090B 0%, #0a0f1a 100%)", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.2em", fontSize: 13, marginBottom: 16 }}>
            🎉 SPECIAL EVENTS TRANSPORT
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 20px" }}>
            Luxury Chauffeur for<br />
            <span style={{ color: "#C9A84C" }}>Adelaide's Special Occasions</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 18, maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Every event deserves a grand arrival. Our chauffeurs bring professional service,
            immaculate vehicles and a touch of luxury to your most important moments.
          </p>
          <Link href="/book?service=events" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 44px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Book Event Transport →
          </Link>
        </section>

        <section style={{ padding: "72px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: 48 }}>
              Events We Specialise In
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {EVENTS.map(e => (
                <div key={e.name} style={{ background: "#17171A", borderRadius: 16, padding: 24, border: "1px solid #2A2A30" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{e.icon}</div>
                  <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{e.name}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.6 }}>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#09090B", padding: "72px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, marginBottom: 12 }}>Planning a Special Event?</h2>
          <p style={{ color: "#9CA3AF", fontSize: 17, marginBottom: 32 }}>Tell us about your event and we'll create a custom transport package.</p>
          <Link href="/book?service=events" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 44px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Get a Custom Quote →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
