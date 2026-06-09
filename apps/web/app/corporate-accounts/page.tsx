import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Corporate Accounts Adelaide | Business Chauffeur Account — Elite Chauffeurs",
  description:
    "Open a corporate chauffeur account with Elite Chauffeurs Adelaide. Monthly invoicing, GST receipts, dedicated account manager, priority dispatch & negotiated rates for Adelaide businesses.",
  keywords: [
    "corporate chauffeur account Adelaide",
    "business car service account Adelaide",
    "corporate travel account SA",
    "monthly billing chauffeur Adelaide",
    "GST receipt car hire Adelaide",
    "executive car account Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/corporate-accounts` },
};

export default function CorporateAccountsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #09090B 0%, #0D1117 100%)", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.2em", fontSize: 13, marginBottom: 16 }}>
            💼 CORPORATE ACCOUNTS
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 860, margin: "0 auto 20px" }}>
            A Smarter Way for Adelaide Businesses<br />
            <span style={{ color: "#C9A84C" }}>to Manage Executive Travel</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 18, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.7 }}>
            One account. All your executives. Monthly invoicing. Zero admin headache.
          </p>
          <Link href="/book" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 44px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
            Apply for Corporate Account →
          </Link>
        </section>

        {/* Benefits grid */}
        <section style={{ padding: "72px 24px", background: "#09090B" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: 48 }}>
              Everything Your Business Needs
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {[
                { icon: "🧾", title: "Monthly Consolidated Invoice", desc: "One invoice at month-end for all trips. Fully itemised with passenger, route and date for easy cost-centre allocation." },
                { icon: "🏛", title: "GST-Compliant Tax Receipts", desc: "Full ABN-compliant GST receipts for every trip. Seamless integration with your accounting software." },
                { icon: "💲", title: "Negotiated Corporate Rates", desc: "Volume-based pricing with locked rates for your regular routes. Save 15–25% vs standard pricing." },
                { icon: "👤", title: "Dedicated Account Manager", desc: "One contact for everything — bookings, invoicing, disputes and special requests. Direct phone and email." },
                { icon: "🚀", title: "Priority Dispatch", desc: "Corporate accounts receive priority vehicle dispatch, especially during peak periods and bad weather." },
                { icon: "📱", title: "Multi-User Portal", desc: "Your PA, travel manager or multiple office staff can book, view and manage all travel in one dashboard." },
                { icon: "📊", title: "Monthly Travel Reports", desc: "Detailed reports on spend by department, employee, vehicle type and route. Perfect for budget management." },
                { icon: "🔐", title: "No Credit Card Per Trip", desc: "Book without needing a card each time. Everything billed to your account — frictionless for your team." },
              ].map(b => (
                <div key={b.title} style={{ background: "#17171A", borderRadius: 16, padding: 24, border: "1px solid #2A2A30" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{b.icon}</div>
                  <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{b.title}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who uses this */}
        <section style={{ padding: "72px 24px", background: "#111113" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ color: "#fff", fontSize: 30, fontWeight: 800, marginBottom: 36 }}>
              Trusted by Adelaide Businesses Across Every Industry
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {[
                "Law Firms", "Accounting Firms", "Mining Companies", "Defence Contractors",
                "Healthcare Groups", "Real Estate Agencies", "Hotel Groups", "Universities",
                "Construction Companies", "Finance & Banking", "Government Departments", "Tech Companies",
              ].map(i => (
                <span key={i} style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#D1D5DB", padding: "9px 18px", borderRadius: 20, fontSize: 14 }}>
                  {i}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#09090B", padding: "72px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, marginBottom: 16 }}>
            Ready to Open Your Account?
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 17, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Takes 5 minutes. No setup fee. No minimum spend. Your account is active same business day.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "18px 40px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none" }}>
              Apply Online →
            </Link>
            <a href="tel:+61880000000" style={{ display: "inline-block", border: "2px solid #C9A84C", color: "#C9A84C", padding: "18px 40px", borderRadius: 14, fontWeight: 700, fontSize: 17, textDecoration: "none" }}>
              Call Us: (08) 8000 0000
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
