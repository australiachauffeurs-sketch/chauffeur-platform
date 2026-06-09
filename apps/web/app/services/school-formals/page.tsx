import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "School Formal Cars Adelaide | Limo Hire for Year 12 Formals SA",
  description:
    "Make your Adelaide school formal unforgettable. Stretch limousine, luxury sedan and SUV hire for Year 12 formals across Adelaide and South Australia. Photo stops, red carpet, safely home. Book early — dates fill fast.",
  keywords: [
    "school formal car hire Adelaide",
    "formal limo Adelaide",
    "Year 12 formal Adelaide car",
    "stretch limo school formal Adelaide",
    "formal car hire Adelaide",
    "school formal limousine South Australia",
    "formal transport Adelaide",
    "debutante ball car Adelaide",
    "Year 12 formal transport SA",
    "prom car Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/services/school-formals` },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "School Formal Car Hire Adelaide",
  description: "Luxury car hire for Adelaide school formals — stretch limousines, luxury sedans and SUVs for Year 12 formal nights across South Australia.",
  provider: { "@type": "LocalBusiness", name: "Elite Chauffeurs Australia", telephone: "+61 8 8000 0000" },
  areaServed: { "@type": "AdministrativeArea", name: "South Australia" },
  offers: { "@type": "Offer", price: "350", priceCurrency: "AUD" },
};

export default function SchoolFormalsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0f0518 100%)", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 14 }}>
            🎓 SCHOOL FORMALS & DEBUTANTE BALLS
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 20px" }}>
            Arrive in Style to Your<br /><span style={{ color: "#C9A84C" }}>Adelaide School Formal</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 17, maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.7 }}>
            The night you'll talk about forever — make it unforgettable from the moment
            the limousine pulls up. Stretch limos, luxury sedans and SUVs for groups large and small.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book?service=formal" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "17px 40px", borderRadius: 13, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
              Check Availability →
            </Link>
            <a href="tel:+61880000000" style={{ display: "inline-block", border: "2px solid #C9A84C", color: "#C9A84C", padding: "17px 40px", borderRadius: 13, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
              Call: (08) 8000 0000
            </a>
          </div>
          <p style={{ color: "#F87171", marginTop: 16, fontSize: 13, fontWeight: 700 }}>
            ⚠ November/December dates book months in advance — secure your date early
          </p>
        </section>

        {/* Packages */}
        <section style={{ padding: "68px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>
              Formal Night Packages
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
              {[
                {
                  name: "Luxury Sedan Package",
                  price: "from $350",
                  capacity: "Up to 3 students",
                  icon: "🚗",
                  features: ["3-hour hire", "Photo stop at chosen location", "Professional chauffeur", "White ribbon & bow", "Complimentary soft drinks"],
                  highlight: false,
                },
                {
                  name: "Stretch Limousine Package",
                  price: "from $650",
                  capacity: "Up to 10 students",
                  icon: "🤍",
                  features: ["4-hour hire", "Interior mood lighting & sound system", "Red carpet arrival at venue", "Champagne (non-alcoholic) on board", "Photo stop included", "White ribbon & bow decoration"],
                  highlight: true,
                },
                {
                  name: "Luxury SUV Package",
                  price: "from $450",
                  capacity: "Up to 6 students",
                  icon: "🚙",
                  features: ["3.5-hour hire", "Premium SUV — BMW X7 or equivalent", "Photo stop included", "Ribbon decoration", "Complimentary refreshments"],
                  highlight: false,
                },
              ].map(pkg => (
                <div key={pkg.name} style={{ background: "#17171A", borderRadius: 20, border: pkg.highlight ? "2px solid #C9A84C" : "1px solid #2A2A30", overflow: "hidden" }}>
                  {pkg.highlight && <div style={{ background: "#C9A84C", color: "#09090B", textAlign: "center", padding: "7px", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em" }}>MOST POPULAR</div>}
                  <div style={{ padding: 24 }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>{pkg.icon}</div>
                    <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{pkg.name}</h3>
                    <p style={{ color: "#6B7280", fontSize: 12, marginBottom: 8 }}>{pkg.capacity}</p>
                    <p style={{ color: "#C9A84C", fontWeight: 900, fontSize: 26, marginBottom: 16 }}>{pkg.price}</p>
                    {pkg.features.map(f => (
                      <p key={f} style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 6, display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ color: "#C9A84C" }}>✓</span>{f}
                      </p>
                    ))}
                    <Link href="/book?service=formal" style={{ display: "block", marginTop: 18, background: pkg.highlight ? "#C9A84C" : "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: pkg.highlight ? "#09090B" : "#C9A84C", padding: "12px", borderRadius: 10, fontWeight: 800, fontSize: 14, textDecoration: "none", textAlign: "center" }}>
                      Book This Package →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools we serve */}
        <section style={{ padding: "60px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 12 }}>
              Adelaide Schools We Regularly Service
            </h2>
            <p style={{ color: "#6B7280", marginBottom: 32, fontSize: 14 }}>We know every venue and every route for formal night</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {[
                "St Peter's College", "Prince Alfred College", "Scotch College Adelaide",
                "Pembroke School", "Loreto College Marryatville", "Mercedes College",
                "Seymour College", "Unley High School", "Adelaide High School",
                "Marryatville High School", "Brighton Secondary School", "Glenunga International",
                "Pulteney Grammar", "Westminster School", "Walford Anglican",
                "St Ignatius College", "Sacred Heart College", "Nazareth College",
              ].map(school => (
                <span key={school} style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#D1D5DB", padding: "8px 14px", borderRadius: 20, fontSize: 13 }}>
                  {school}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "linear-gradient(135deg,#150520 0%,#09090B 100%)", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 30, fontWeight: 900, marginBottom: 12 }}>
            Don't Miss Out — Secure Your Date
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 16, marginBottom: 28 }}>
            Formal night vehicles are the first to be fully booked each year.
            Lock in your date with a small deposit.
          </p>
          <Link href="/book?service=formal" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 48px", borderRadius: 13, fontWeight: 900, fontSize: 18, textDecoration: "none" }}>
            Check My Date →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
