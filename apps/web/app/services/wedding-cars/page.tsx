import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Wedding Cars Adelaide | Luxury Bridal Chauffeur Hire",
  description:
    "Make your wedding day unforgettable with Adelaide's finest wedding car hire. Stretch limousines, luxury sedans & SUVs for bride, bridal party & guest transfers. Ribbon & decoration included.",
  keywords: [
    "wedding cars Adelaide",
    "wedding chauffeur Adelaide",
    "bridal car hire Adelaide",
    "stretch limo hire Adelaide",
    "wedding limousine Adelaide",
    "luxury wedding car Adelaide",
    "bridal transport Adelaide",
    "wedding car hire South Australia",
    "Adelaide Hills wedding cars",
    "McLaren Vale wedding transport",
  ],
  alternates: { canonical: `${SITE_URL}/services/wedding-cars` },
  openGraph: {
    title: "Wedding Cars Adelaide | Elite Chauffeurs",
    description: "Luxury wedding car hire across Adelaide. Stretch limos, sedans & SUVs — ribbon included, professionally dressed chauffeurs.",
    url: `${SITE_URL}/services/wedding-cars`,
    images: [{ url: "/images/limo.jpg", width: 1200, height: 630, alt: "Luxury Wedding Car Adelaide" }],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wedding Car Hire Adelaide",
  provider: { "@type": "LocalBusiness", name: "Elite Chauffeurs Australia", telephone: "+61 8 8000 0000" },
  description: "Luxury wedding car hire in Adelaide. Stretch limousines, luxury sedans and SUVs for bridal party and guest transfers across South Australia.",
  areaServed: [
    { "@type": "City", name: "Adelaide" },
    { "@type": "Place", name: "Adelaide Hills" },
    { "@type": "Place", name: "McLaren Vale" },
    { "@type": "Place", name: "Barossa Valley" },
  ],
};

export default function WeddingCarsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #09090B 0%, #150a0a 100%)", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.2em", fontSize: 13, marginBottom: 16 }}>
            💍 WEDDING CAR HIRE ADELAIDE
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 20px" }}>
            Arrive in <span style={{ color: "#C9A84C" }}>Absolute Luxury</span><br />
            on Your Most Important Day
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 18, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.7 }}>
            From the stretch limousine to intimate luxury sedans — we provide the perfect
            vehicle and a professionally dressed chauffeur for every moment of your wedding day.
          </p>
          <Link href="/book?service=wedding" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 44px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Check Availability →
          </Link>
          <p style={{ color: "#6B7280", marginTop: 16, fontSize: 13 }}>
            Free consultation · Custom packages available
          </p>
        </section>

        {/* Vehicles */}
        <section style={{ padding: "72px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: 48 }}>
              Our Wedding Fleet
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {[
                { vehicle: "Stretch Limousine", capacity: "Up to 10 passengers", price: "from $650", icon: "🤍", features: ["Chilled champagne on board", "Red carpet service", "Ribbon & bow decoration", "Interior mood lighting"] },
                { vehicle: "Luxury Sedan", capacity: "Up to 3 passengers", price: "from $350", icon: "🚗", features: ["Mercedes-Benz or equivalent", "White ribbon & bow", "Professionally dressed driver", "Door-to-door escort"] },
                { vehicle: "Luxury SUV", capacity: "Up to 6 passengers", price: "from $450", icon: "🚙", features: ["Ideal for bridal party", "Tinted windows", "Extra luggage space", "Children's seat available"] },
              ].map(v => (
                <div key={v.vehicle} style={{ background: "#17171A", borderRadius: 20, border: "1px solid rgba(201,168,76,0.3)", overflow: "hidden" }}>
                  <div style={{ background: "rgba(201,168,76,0.08)", padding: "24px 24px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 8 }}>{v.icon}</div>
                    <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{v.vehicle}</h3>
                    <p style={{ color: "#6B7280", fontSize: 13 }}>{v.capacity}</p>
                    <p style={{ color: "#C9A84C", fontWeight: 900, fontSize: 22, marginTop: 8 }}>{v.price}</p>
                  </div>
                  <div style={{ padding: "16px 24px 24px" }}>
                    {v.features.map(f => (
                      <p key={f} style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: "#C9A84C" }}>✓</span> {f}
                      </p>
                    ))}
                    <Link href="/book?service=wedding" style={{ display: "block", marginTop: 16, background: "#C9A84C", color: "#09090B", padding: "12px", borderRadius: 10, fontWeight: 800, fontSize: 14, textDecoration: "none", textAlign: "center" }}>
                      Book {v.vehicle} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Venues */}
        <section style={{ padding: "72px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>
              Popular Adelaide Wedding Venues We Service
            </h2>
            <p style={{ color: "#6B7280", marginBottom: 36 }}>We know every venue in SA — our drivers navigate seamlessly</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {[
                "Adelaide Oval", "National Wine Centre", "Ayers House", "Oaks on Market",
                "Mossop's at the Bay", "The Playford Hotel", "Chapel on the Hill", "Elbow Room",
                "Middleton Grange", "d'Arenberg Cube", "Seppeltsfield Winery", "Jacobs Creek",
                "Hahndorf venues", "Victor Harbor venues", "Kangaroo Island retreats",
              ].map(v => (
                <span key={v} style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#D1D5DB", padding: "8px 16px", borderRadius: 20, fontSize: 13 }}>
                  {v}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "linear-gradient(135deg, #150a00 0%, #09090B 100%)", padding: "72px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, marginBottom: 16 }}>
            Let's Make Your Day Perfect
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 17, marginBottom: 36 }}>
            Check availability for your wedding date and get a tailored package quote.
          </p>
          <Link href="/book?service=wedding" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "20px 52px", borderRadius: 14, fontWeight: 900, fontSize: 18, textDecoration: "none" }}>
            Check Your Date →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
