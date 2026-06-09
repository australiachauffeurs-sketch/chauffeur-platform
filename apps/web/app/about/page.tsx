import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "About Elite Chauffeurs Adelaide | Adelaide's Premier Luxury Car Service",
  description:
    "Elite Chauffeurs Australia — Adelaide's most trusted luxury chauffeur service. Professional, police-checked drivers. Late-model luxury fleet. 24/7 availability. Proudly South Australian.",
  alternates: { canonical: `${SITE_URL}/about` },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Elite Chauffeurs Australia",
  description: "Learn about Elite Chauffeurs — Adelaide's premier luxury chauffeur service. Our story, team and values.",
  url: `${SITE_URL}/about`,
  mainEntity: {
    "@type": "LocalBusiness",
    name: "Elite Chauffeurs Australia",
    description: "Adelaide's most trusted luxury chauffeur and car hire service, serving the greater Adelaide area and South Australia.",
    foundingLocation: { "@type": "City", name: "Adelaide" },
    areaServed: { "@type": "AdministrativeArea", name: "South Australia" },
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#120d00 100%)", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 14 }}>ABOUT US</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem,5vw,3.4rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 780, margin: "0 auto 18px" }}>
            Adelaide's Most Trusted<br /><span style={{ color: "#C9A84C" }}>Luxury Chauffeur Service</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 17, maxWidth: 640, margin: "0 auto", lineHeight: 1.75 }}>
            Proudly South Australian. Built for clients who expect more than a ride —
            they expect an experience.
          </p>
        </section>

        {/* Story */}
        <section style={{ padding: "72px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2 style={{ color: "#C9A84C", fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Our Story</h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              Elite Chauffeurs was founded with a simple belief: Adelaide deserved a chauffeur service that matched the city's growing status as a world-class destination. Too often, travellers arriving at Adelaide Airport faced unreliable taxis, shared shuttles with strangers, or the surge-priced uncertainty of rideshare apps.
            </p>
            <p style={{ color: "#9CA3AF", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              We built something different. Every vehicle in our fleet is late-model and immaculate. Every driver is police-checked, professionally trained, and understands the discretion and punctuality that corporate and luxury travel demands. Every booking is confirmed with a fixed price — no surprises.
            </p>
            <p style={{ color: "#9CA3AF", fontSize: 16, lineHeight: 1.8 }}>
              Today we serve Adelaide's top law firms, mining companies, hotel groups and private families — as well as international visitors arriving at ADL Airport expecting the best South Australia has to offer.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: "60px 24px", background: "#17171A", borderTop: "1px solid #2A2A30" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 20 }}>
            {[
              { num: "5,000+", label: "Trips Completed" },
              { num: "247+", label: "5-Star Reviews" },
              { num: "4.9★", label: "Average Rating" },
              { num: "24/7", label: "Always Available" },
              { num: "SA-Wide", label: "Coverage Area" },
              { num: "100%", label: "Police-Checked Drivers" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center", background: "#111", borderRadius: 14, padding: "24px 16px", border: "1px solid #2A2A30" }}>
                <p style={{ color: "#C9A84C", fontWeight: 900, fontSize: 28, marginBottom: 6 }}>{s.num}</p>
                <p style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: "64px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>What We Stand For</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20 }}>
              {[
                { icon: "⏱", title: "Punctuality Above All", desc: "We track flights, monitor traffic and plan routes to ensure you are never waiting and never late." },
                { icon: "🤐", title: "Discretion", desc: "What happens in our vehicles, stays there. Our drivers are trained to be present but invisible." },
                { icon: "✨", title: "Immaculate Presentation", desc: "Vehicles are professionally detailed between every booking. Your driver is uniformed and groomed." },
                { icon: "🔒", title: "No Surprises Pricing", desc: "Your fare is quoted and confirmed before you travel. We don't do surge pricing, ever." },
              ].map(v => (
                <div key={v.title} style={{ background: "#17171A", borderRadius: 16, padding: 24, border: "1px solid #2A2A30" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div>
                  <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#09090B", padding: "60px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Experience the Difference</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 28 }}>Book online in 60 seconds — fixed price, instant confirmation.</p>
          <Link href="/book" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "17px 44px", borderRadius: 13, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Book a Ride →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
