import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Chauffeur for Law Firms & Barristers Adelaide | Confidential Legal Travel",
  description:
    "Discreet chauffeur service for Adelaide law firms, barristers and in-house counsel. Court transfers, client meetings, Supreme Court — professional and confidential.",
  keywords: [
    "chauffeur for law firms Adelaide",
    "barrister chauffeur Adelaide",
    "Supreme Court Adelaide chauffeur",
    "legal chauffeur Adelaide",
    "confidential chauffeur Adelaide",
    "court transfer Adelaide",
    "law firm car hire Adelaide",
    "solicitor chauffeur Adelaide",
    "legal executive transport Adelaide",
    "client meeting transfer Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/corporate/legal-firms` },
  openGraph: {
    title: "Chauffeur for Law Firms & Barristers Adelaide | Australia Chauffeurs",
    description: "Discreet, reliable chauffeur for Adelaide legal professionals. Court transfers, client meetings, airport pickups.",
    url: `${SITE_URL}/corporate/legal-firms`,
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Legal Profession Chauffeur Service Adelaide",
  provider: {
    "@type": "LocalBusiness",
    name: "Australia Chauffeurs",
    telephone: "(08) 7078 1777",
    email: "bookings@australiachauffeurs.com.au",
    address: { "@type": "PostalAddress", addressLocality: "Adelaide", addressRegion: "SA", addressCountry: "AU" },
  },
  description:
    "Confidential chauffeur transfers for law firms, barristers, QCs and in-house legal teams in Adelaide. Supreme Court of South Australia, District Court, Magistrates Court, and inter-office client meetings.",
  areaServed: { "@type": "City", name: "Adelaide" },
};

const FEATURES = [
  { icon: "🔒", title: "Absolute Discretion & Confidentiality", desc: "Our chauffeurs are trained to respect attorney-client privilege. No conversations repeated, no routes disclosed, NDA signing available on request for sensitive matters." },
  { icon: "⚖", title: "All Adelaide Courts Covered", desc: "Supreme Court of SA (Victoria Square), District Court (Sir Samuel Way Building), Magistrates Court, and the Environment Resources and Development Court — we know every entrance." },
  { icon: "⏱", title: "Punctual to the Minute", desc: "Hearings don't wait. We track your schedule and allow buffer time for parking, security, and robing. You will not be late." },
  { icon: "🤵", title: "Immaculately Presented Vehicles", desc: "Late-model Mercedes-Benz and BMW sedans. Your client sees a polished, professional service from the moment they are collected." },
  { icon: "📱", title: "PA & Practice Manager Bookings", desc: "Your PA or office administrator can book, amend, and cancel on your behalf through our priority line or email portal. Monthly invoicing available." },
  { icon: "✈", title: "Visiting Counsel Airport Transfers", desc: "Interstate silks and barristers flying into Adelaide Airport for special leave hearings receive a seamless, meet-and-greet service with name board." },
];

const FAQS = [
  {
    q: "Which courts in Adelaide do you service?",
    a: "We cover all courts in the Adelaide CBD and surrounds: the Supreme Court of South Australia (Victoria Square), the District Court of South Australia (Sir Samuel Way Building, Victoria Square), the Adelaide Magistrates Court (Franklin Street), the Environment Resources and Development Court (Gouger Street), the Federal Court of Australia (Roma Mitchell Commonwealth Law Courts), and the Family Court. We also service the Elizabeth and Christies Beach Magistrates Courts.",
  },
  {
    q: "Can I trust your drivers to handle sensitive client information discreetly?",
    a: "Yes. All Australia Chauffeurs drivers sign confidentiality agreements and are trained to remain silent unless addressed. We do not disclose client names, destinations, or travel patterns. For matters requiring additional assurance, we can arrange for a driver-specific NDA to be signed before the engagement.",
  },
  {
    q: "Do you offer account billing for law firms?",
    a: "Yes. We provide monthly consolidated invoices, making it straightforward to allocate transfer costs against client matters. Invoices can include matter number references if provided at the time of booking. GST tax receipts are included as standard.",
  },
  {
    q: "Can you coordinate airport pickups for interstate or overseas counsel?",
    a: "Absolutely. We offer a full meet-and-greet service at Adelaide Airport — your driver will be at the arrivals hall with a name board, assist with luggage, and have the vehicle waiting at the kerb. We monitor flight arrivals in real time.",
  },
  {
    q: "What if a hearing runs longer than expected?",
    a: "We ask that you keep us updated via a quick text message if timings shift. Your driver will wait at no additional charge for up to 30 minutes beyond the scheduled departure time on corporate account bookings. For longer delays, our dispatch team will reschedule or send a relief vehicle.",
  },
];

export default function LegalFirmsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0a0a1a 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
          <span style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#C9A84C", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
            LEGAL &amp; PROFESSIONAL
          </span>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.2, maxWidth: 780, margin: "20px auto 16px" }}>
            Discreet Chauffeur for{" "}
            <span style={{ color: "#C9A84C" }}>Adelaide Law Firms &amp; Barristers</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 17, maxWidth: 620, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Supreme Court, District Court, client meetings, airport pickups for visiting counsel — handled with absolute punctuality and professional discretion.
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
              Why Adelaide&apos;s Legal Profession Relies on Us
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
              Punctuality, discretion, and impeccable presentation — the standards your clients expect.
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

        {/* Courts list */}
        <section style={{ padding: "64px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 12 }}>
              Adelaide Courts We Service Daily
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 15, textAlign: "center", marginBottom: 36 }}>
              We know every drop-off point, parking restriction, and security entrance.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                "Supreme Court of SA — Victoria Square",
                "District Court — Sir Samuel Way Building",
                "Adelaide Magistrates Court — Franklin St",
                "Federal Court — Roma Mitchell Law Courts",
                "Family Court of Australia — Adelaide",
                "ERD Court — Gouger Street",
                "Elizabeth Magistrates Court",
                "Christies Beach Magistrates Court",
              ].map(c => (
                <div key={c} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#17171A", borderRadius: 12, padding: "14px 16px", border: "1px solid #2A2A30" }}>
                  <span style={{ color: "#C9A84C", fontWeight: 900, flexShrink: 0 }}>✓</span>
                  <span style={{ color: "#D1D5DB", fontSize: 13 }}>{c}</span>
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
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 14 }}>Open a Firm Account Today</h2>
          <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 500, margin: "0 auto 36px" }}>
            Monthly invoicing, matter-number billing, and a single point of contact for your whole practice. No setup fee.
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
