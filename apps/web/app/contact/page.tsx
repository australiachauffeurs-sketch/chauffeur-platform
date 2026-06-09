import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Contact Elite Chauffeurs Adelaide | 24/7 Bookings & Enquiries",
  description:
    "Contact Elite Chauffeurs Adelaide — call, email or book online 24/7. Corporate account enquiries, large group bookings and general questions welcome.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Elite Chauffeurs Adelaide",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "LocalBusiness",
    name: "Elite Chauffeurs Australia",
    telephone: "+61 8 8000 0000",
    email: "bookings@elitechauffeurs.com.au",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Adelaide",
      addressRegion: "SA",
      postalCode: "5000",
      addressCountry: "AU",
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "00:00",
      closes: "23:59",
    }],
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        <section style={{ background: "#09090B", padding: "72px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 14 }}>GET IN TOUCH</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 900, marginBottom: 16 }}>
            Contact Us
          </h1>
          <p style={{ color: "#6B7280", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
            Available 24 hours a day, 7 days a week — including public holidays.
          </p>
        </section>

        <section style={{ padding: "60px 24px 80px", background: "#09090B" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 20 }}>
            {[
              {
                icon: "📞",
                title: "Phone",
                detail: "(08) 8000 0000",
                sub: "24/7 — answered immediately",
                href: "tel:+61880000000",
                cta: "Call Now",
              },
              {
                icon: "✉",
                title: "Email",
                detail: "bookings@elitechauffeurs.com.au",
                sub: "Reply within 30 minutes",
                href: "mailto:bookings@elitechauffeurs.com.au",
                cta: "Send Email",
              },
              {
                icon: "💬",
                title: "WhatsApp",
                detail: "+61 400 000 000",
                sub: "Message us any time",
                href: "https://wa.me/61400000000",
                cta: "Open WhatsApp",
              },
              {
                icon: "🚗",
                title: "Book Online",
                detail: "Instant confirmation",
                sub: "Fixed price quote in 60 seconds",
                href: "/book",
                cta: "Book a Ride",
              },
            ].map(c => (
              <div key={c.title} style={{ background: "#17171A", borderRadius: 18, padding: 24, border: "1px solid #2A2A30", textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
                <h2 style={{ color: "#fff", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{c.title}</h2>
                <p style={{ color: "#C9A84C", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{c.detail}</p>
                <p style={{ color: "#6B7280", fontSize: 12, marginBottom: 16 }}>{c.sub}</p>
                <a href={c.href} style={{ display: "block", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", padding: "11px", borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                  {c.cta} →
                </a>
              </div>
            ))}
          </div>

          {/* Address */}
          <div style={{ maxWidth: 480, margin: "48px auto 0", background: "#17171A", borderRadius: 18, padding: 28, border: "1px solid #2A2A30", textAlign: "center" }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>📍</p>
            <h2 style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Service Area</h2>
            <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.7 }}>
              Elite Chauffeurs Adelaide<br />
              Adelaide CBD, South Australia 5000<br />
              <span style={{ color: "#6B7280" }}>Serving greater Adelaide & all of SA</span>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
