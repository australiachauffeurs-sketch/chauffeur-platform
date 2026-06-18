import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Medical & Hospital Chauffeur Adelaide | Surgeon & Specialist Transfers",
  description:
    "Confidential chauffeur for Adelaide medical professionals. Royal Adelaide Hospital, Calvary, Flinders Medical, surgeon transfers — discreet, on-time, every time.",
  keywords: [
    "medical chauffeur Adelaide",
    "hospital chauffeur Adelaide",
    "Royal Adelaide Hospital chauffeur",
    "Flinders Medical Centre chauffeur",
    "Calvary Hospital chauffeur",
    "surgeon transfer Adelaide",
    "specialist chauffeur Adelaide",
    "doctor car hire Adelaide",
    "medical professional transport SA",
    "patient confidential chauffeur Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/corporate/medical-professional` },
  openGraph: {
    title: "Medical & Hospital Chauffeur Adelaide | Australia Chauffeurs",
    description: "Confidential chauffeur transfers for surgeons, specialists and hospital executives across Adelaide's major hospitals.",
    url: `${SITE_URL}/corporate/medical-professional`,
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Medical Professional Chauffeur Service Adelaide",
  provider: {
    "@type": "LocalBusiness",
    name: "Australia Chauffeurs",
    telephone: "(08) 7078 1777",
    email: "bookings@australiachauffeurs.com.au",
    address: { "@type": "PostalAddress", addressLocality: "Adelaide", addressRegion: "SA", addressCountry: "AU" },
  },
  description:
    "Discreet, punctual chauffeur transfers for surgeons, specialists, hospital executives and visiting medical professionals at Royal Adelaide Hospital, Calvary Hospital, Flinders Medical Centre, Lyell McEwin, and the Women's and Children's Hospital.",
  areaServed: { "@type": "City", name: "Adelaide" },
};

const FEATURES = [
  { icon: "🔒", title: "Patient & Clinical Confidentiality", desc: "Our drivers understand the sensitivity of medical travel. No questions asked, no routes or names disclosed. Confidentiality is fundamental to how we operate." },
  { icon: "⏱", title: "Theatre-Schedule Precision", desc: "Operating theatre start times are non-negotiable. We build in buffer time and monitor traffic in real time so your surgeon arrives calm and on schedule." },
  { icon: "🏥", title: "All Major Adelaide Hospitals", desc: "Royal Adelaide Hospital (Port Road), Calvary Adelaide (Wakefield St), Flinders Medical Centre (Bedford Park), Lyell McEwin (Elizabeth Vale), Women's and Children's (King William Rd)." },
  { icon: "✈", title: "Visiting Specialist Airport Pickups", desc: "Interstate surgeons and specialists flying into Adelaide Airport receive a professional meet-and-greet, with direct transfer to the hospital or consulting rooms." },
  { icon: "🚗", title: "Multi-Site Rounds", desc: "Morning rounds covering two or three hospitals in a single booking. We plan the most efficient route so you spend time with patients, not navigating traffic." },
  { icon: "🧾", title: "Practice & Hospital Billing", desc: "Monthly invoices issued to the practice, hospital department, or medical centre. Cost-centre coding and GST receipts as standard." },
];

const FAQS = [
  {
    q: "Which Adelaide hospitals do you service?",
    a: "We regularly service Royal Adelaide Hospital (Port Road, Adelaide), Calvary Adelaide Hospital (149 Wakefield Street), Flinders Medical Centre (Flinders Drive, Bedford Park), Lyell McEwin Hospital (Haydown Road, Elizabeth Vale), Women's and Children's Hospital (72 King William Road, North Adelaide), The Memorial Hospital (North Adelaide), Modbury Hospital, and numerous private hospitals and day surgeries across the CBD and suburbs.",
  },
  {
    q: "Can you handle early-morning theatre transfers?",
    a: "Yes. Early starts — 5:30 am, 6:00 am, 6:30 am — are common for surgical teams and we operate 24/7. There are no early-morning surcharges on corporate medical accounts. Simply provide your required arrival time and we will calculate the pickup accordingly.",
  },
  {
    q: "Do you transfer visiting surgeons from interstate?",
    a: "Yes. We provide a full meet-and-greet service at Adelaide Airport for visiting surgeons, specialists, and medical device representatives. Your driver will be in the arrivals hall with a name board. We monitor flights in real time and adjust for delays.",
  },
  {
    q: "Is passenger information kept private?",
    a: "Absolutely. Australia Chauffeurs treats all passenger details — names, destinations, schedules — as strictly confidential. Our drivers do not discuss passengers or journeys with any third party. We can provide a confidentiality agreement if required by your practice or hospital.",
  },
  {
    q: "Can we bill transfers directly to a hospital department or medical practice?",
    a: "Yes. We issue monthly consolidated invoices that can be directed to a hospital cost centre, practice management system, or individual department. We include reference codes or booking references on invoices on request.",
  },
];

export default function MedicalProfessionalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0a0a1a 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
          <span style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#C9A84C", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
            MEDICAL &amp; HOSPITAL
          </span>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.2, maxWidth: 780, margin: "20px auto 16px" }}>
            Confidential Chauffeur for{" "}
            <span style={{ color: "#C9A84C" }}>Adelaide Medical Professionals</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 17, maxWidth: 620, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Royal Adelaide Hospital, Flinders Medical Centre, Calvary, and beyond — precise scheduling, absolute discretion, and a fleet that reflects the professionalism of your practice.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book?service=corporate" style={{ background: "#C9A84C", color: "#09090B", padding: "15px 36px", borderRadius: 8, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Book Corporate Transfer →
            </Link>
            <a href="tel:0870781777" style={{ border: "2px solid rgba(201,168,76,0.4)", color: "#C9A84C", padding: "15px 36px", borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              (08) 7078 1777
            </a>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: "72px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 1060, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 12 }}>
              Built Around Clinical Schedules
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
              We work around your lists, ward rounds, and theatre schedules — not the other way around.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 24 }}>
              {FEATURES.map(f => (
                <div key={f.title} style={{ background: "#17171A", borderRadius: 16, padding: 28, border: "1px solid #2A2A30" }}>
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{f.icon}</div>
                  <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hospitals */}
        <section style={{ padding: "64px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 12 }}>
              Adelaide Hospitals &amp; Medical Centres We Service
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 15, textAlign: "center", marginBottom: 36 }}>
              We know every entrance, loading zone, and parking restriction at each site.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                "Royal Adelaide Hospital — Port Road",
                "Calvary Adelaide — Wakefield Street",
                "Flinders Medical Centre — Bedford Park",
                "Women's & Children's Hospital — North Adelaide",
                "Lyell McEwin Hospital — Elizabeth Vale",
                "The Memorial Hospital — North Adelaide",
                "Modbury Hospital — Modbury",
                "St Andrews Hospital — Adelaide CBD",
                "Epworth Adelaide — East Terrace",
                "Ashford Hospital — Ashford",
              ].map(h => (
                <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#17171A", borderRadius: 12, padding: "14px 16px", border: "1px solid #2A2A30" }}>
                  <span style={{ color: "#C9A84C", fontWeight: 900, flexShrink: 0 }}>✓</span>
                  <span style={{ color: "#D1D5DB", fontSize: 13 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "64px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 740, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>Frequently Asked Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {FAQS.map(f => (
                <div key={f.q} style={{ background: "#17171A", borderRadius: 14, padding: "22px 26px", border: "1px solid #2A2A30" }}>
                  <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{f.q}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "linear-gradient(135deg,#0a0a0f 0%,#09090B 100%)", padding: "72px 24px", textAlign: "center", borderTop: "1px solid #1E1E24" }}>
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 14 }}>Set Up a Medical Practice Account</h2>
          <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 500, margin: "0 auto 36px" }}>
            Monthly invoicing, department billing, and priority dispatch for theatre mornings. Call us or email to discuss your requirements.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book?service=corporate" style={{ background: "#C9A84C", color: "#09090B", padding: "16px 40px", borderRadius: 8, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Book Online →
            </Link>
            <a href="mailto:bookings@australiachauffeurs.com.au" style={{ border: "2px solid rgba(201,168,76,0.4)", color: "#C9A84C", padding: "16px 40px", borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Email Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
