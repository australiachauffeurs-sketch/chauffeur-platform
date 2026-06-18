import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Best Chauffeur Companies in Adelaide 2026 — Honest Review",
  description:
    "Reviewing the best chauffeur car companies in Adelaide SA. What to look for, red flags to avoid, ACROD accreditation, ABN, insurance, and vehicle age. Australia Chauffeurs ranked #1.",
  alternates: { canonical: `${SITE_URL}/compare/best-chauffeur-companies-adelaide` },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Chauffeur Companies in Adelaide 2026 — Honest Review",
  description:
    "An honest guide to choosing the best chauffeur company in Adelaide, covering accreditation, insurance, vehicle age, driver checks, and corporate invoicing.",
  author: { "@type": "Organization", name: "Australia Chauffeurs" },
  publisher: {
    "@type": "Organization",
    name: "Australia Chauffeurs",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-01-01",
  dateModified: "2026-06-01",
  mainEntityOfPage: `${SITE_URL}/compare/best-chauffeur-companies-adelaide`,
};

const faqs = [
  {
    q: "Are chauffeur companies in Adelaide regulated?",
    a: "Yes. All point-to-point transport operators in South Australia must be accredited by the Department for Infrastructure and Transport (DIT). Drivers require a Passenger Transport Driver Authorisation (PTDA). Always ask for both before booking.",
  },
  {
    q: "What is ACROD and why does it matter?",
    a: "ACROD is Australia's national disability parking permit scheme. Operators with ACROD-accessible vehicles can serve passengers with mobility aids. If you or your guest requires accessible transport, confirm the vehicle type before booking.",
  },
  {
    q: "How do I know if a chauffeur company is insured?",
    a: "Legitimate operators carry commercial passenger vehicle insurance and public liability cover (minimum $20M). Ask for the certificate of currency. Consumer-grade personal car insurance does not cover commercial passenger trips.",
  },
  {
    q: "What's a fair price for an Adelaide Airport chauffeur?",
    a: "Expect $110–$160 for a standard sedan from the CBD to Adelaide Airport (ADL). Premium SUVs run $150–$200. Be sceptical of quotes under $90 — they often involve surge pricing, unmarked vehicles, or no-show risk.",
  },
  {
    q: "Can I get a corporate account with monthly invoicing?",
    a: "Australia Chauffeurs offers corporate accounts with centralised billing, GST tax invoices, monthly statements, and dedicated account management. Contact us to set up your account.",
  },
];

const checklistItems = [
  { label: "South Australian DIT accreditation", good: true },
  { label: "Passenger Transport Driver Authorisation (PTDA) for all drivers", good: true },
  { label: "Commercial passenger vehicle insurance ($20M+ public liability)", good: true },
  { label: "Valid ABN and GST-registered (for tax invoices)", good: true },
  { label: "Fleet vehicles under 5 years old", good: true },
  { label: "Online booking with instant confirmation", good: true },
  { label: "Real-time flight tracking for airport pickups", good: true },
  { label: "Background-checked, professional-appearance dress code", good: true },
];

const redFlags = [
  "No ABN or won't provide tax invoice",
  "Driver arrives in a private, unbranded vehicle",
  "No online booking — cash-only WhatsApp arrangements",
  "Fleet vehicles 10+ years old with no photos",
  "No mention of driver authorisation or accreditation",
  "Prices that seem too good to be true (usually are)",
  "No clear cancellation or refund policy",
];

export default function BestChauffeurCompanies() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <Navbar />
      <main style={{ background: "#09090B", color: "#E5E5E5", minHeight: "100vh" }}>
        {/* Hero */}
        <section
          style={{
            background: "linear-gradient(135deg, #09090B 0%, #111113 100%)",
            borderBottom: "1px solid #1F1F23",
            padding: "80px 24px 60px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ color: "#C9A84C", fontSize: 14, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Adelaide Chauffeur Guide
            </p>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 700, color: "#FAFAFA", lineHeight: 1.2, marginBottom: 20 }}>
              Best Chauffeur Companies in Adelaide 2026 —{" "}
              <span style={{ color: "#C9A84C" }}>Honest Review</span>
            </h1>
            <p style={{ fontSize: 18, color: "#A1A1AA", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 28px" }}>
              We're going to rank ourselves first (obviously), then tell you exactly what to look for so you can verify any operator you're considering. No fluff.
            </p>
            <p style={{ color: "#71717A", fontSize: 14 }}>Updated June 2026 · 7-minute read</p>
          </div>
        </section>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>

          {/* #1 — Australia Chauffeurs */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 8, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              #1 — Australia Chauffeurs (That's Us)
            </h2>
            <p style={{ color: "#71717A", fontSize: 14, marginBottom: 20, paddingLeft: 19 }}>Adelaide, SA · ACN registered · SA DIT accredited</p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              We operate a modern fleet of Mercedes-Benz, Genesis G80, and electric vehicles from Adelaide. Every vehicle is under 5 years old, every driver holds a current Passenger Transport Driver Authorisation, and every booking gets a confirmed GST tax invoice within minutes.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              We cover Adelaide Airport (ADL) transfers 24/7, corporate roadshows across the CBD and Norwood, winery day trips to McLaren Vale and the Barossa Valley, wedding transport, FIFO mine-site runs, and cruise ship port pickups at the Adelaide Passenger Terminal.
            </p>
            <div style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {["SA DIT Accredited", "GST Tax Invoices", "24/7 Airport Tracking", "Online Instant Booking", "Corporate Accounts", "Fleet Under 5 Years Old"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, color: "#D4D4D8", fontSize: 15 }}>
                  <span style={{ color: "#C9A84C", fontSize: 18 }}>✓</span> {item}
                </div>
              ))}
            </div>
          </section>

          {/* What to look for */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 20, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              What to Look For in Any Adelaide Chauffeur Company
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 24 }}>
              South Australia's point-to-point transport industry is regulated but not all operators are equally compliant. Use this checklist before handing over your credit card:
            </p>
            <div style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, overflow: "hidden" }}>
              {checklistItems.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 20px",
                    borderBottom: i < checklistItems.length - 1 ? "1px solid #1F1F23" : "none",
                  }}
                >
                  <span style={{ color: "#C9A84C", fontSize: 18, flexShrink: 0 }}>✓</span>
                  <span style={{ color: "#D4D4D8", fontSize: 15 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Vehicle age matters */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Why Vehicle Age Matters More Than You Think
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              A 2012 Holden Caprice may look presentable in photos, but it will not have current safety assist technology (autonomous emergency braking, lane-keep assist, blind-spot monitoring) and is likely to feel dated compared to a 2023 Mercedes-Benz E-Class. If you're paying for a premium experience, you should be arriving in a vehicle that feels premium.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              Ask any operator: "What is the model year of the vehicle that will collect me?" Legitimate companies can answer instantly. Vague answers like "we have a range of luxury vehicles" often mean older stock.
            </p>
          </section>

          {/* Red flags */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 20, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Red Flags to Avoid
            </h2>
            <div style={{ background: "#111113", border: "1px solid #2D1515", borderRadius: 12, overflow: "hidden" }}>
              {redFlags.map((flag, i) => (
                <div
                  key={flag}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 20px",
                    borderBottom: i < redFlags.length - 1 ? "1px solid #1F1F23" : "none",
                  }}
                >
                  <span style={{ color: "#EF4444", fontSize: 16, flexShrink: 0 }}>✗</span>
                  <span style={{ color: "#D4D4D8", fontSize: 15 }}>{flag}</span>
                </div>
              ))}
            </div>
          </section>

          {/* The driver check question */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Are Drivers Properly Checked?
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              In South Australia, any driver carrying fare-paying passengers must hold a Passenger Transport Driver Authorisation (PTDA) issued by the DIT. This requires a National Police Check, medical clearance, and English language assessment. It is illegal to carry passengers for hire without it.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              All Australia Chauffeurs drivers hold current PTDA credentials. We also conduct additional internal checks and require professional presentation standards (clean dress, no strong fragrances, mobile phone hands-free). Ask any operator to confirm their driver authorisation process in writing.
            </p>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 24, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {faqs.map((faq) => (
                <div key={faq.q} style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 24 }}>
                  <h3 style={{ color: "#C9A84C", fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{faq.q}</h3>
                  <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section
            style={{
              background: "linear-gradient(135deg, #111113, #0C0C0E)",
              border: "1px solid #C9A84C",
              borderRadius: 16,
              padding: 40,
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#FAFAFA", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
              Book Adelaide's #1 Chauffeur Service
            </h2>
            <p style={{ color: "#A1A1AA", fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
              SA DIT accredited · Instant confirmation · Tax invoices · 24/7 airport tracking
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/book"
                style={{
                  display: "inline-block",
                  background: "#C9A84C",
                  color: "#09090B",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "14px 36px",
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                Book Now
              </Link>
              <Link
                href="/corporate-accounts"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "#C9A84C",
                  fontWeight: 600,
                  fontSize: 16,
                  padding: "14px 36px",
                  borderRadius: 8,
                  textDecoration: "none",
                  border: "1px solid #C9A84C",
                }}
              >
                Corporate Accounts
              </Link>
            </div>
          </section>
        </div>
      {/* Related pages */}
      <section style={{ background: "#0d0d10", padding: "48px 24px", borderTop: "1px solid #1f1f28" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.15em", fontSize: 11, textTransform: "uppercase", marginBottom: 20 }}>Related Pages</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link href="/compare/chauffeur-vs-uber-adelaide" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Chauffeur vs Uber Adelaide →</Link>
            <Link href="/compare/chauffeur-vs-taxi-adelaide" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Chauffeur vs Taxi Adelaide →</Link>
            <Link href="/compare/chauffeur-vs-limousine-adelaide" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Chauffeur vs Limousine Adelaide →</Link>
            <Link href="/reviews" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Customer Reviews →</Link>
            <Link href="/about" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>About Australia Chauffeurs →</Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
