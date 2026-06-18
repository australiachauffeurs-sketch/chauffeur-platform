import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Why Adelaide Businesses Use Chauffeurs Instead of Taxis (The Numbers)",
  description:
    "Corporate chauffeur vs taxi in Adelaide — tax deductibility, GST invoicing, time value, productivity, and real cost comparisons. The CFO-friendly case for switching to a chauffeur account.",
  alternates: { canonical: `${SITE_URL}/blog/corporate-chauffeur-vs-taxi-expense` },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Adelaide Businesses Use Chauffeurs Instead of Taxis (The Numbers)",
  description:
    "A data-driven comparison of corporate chauffeur cars versus taxis in Adelaide, covering tax deductibility, invoicing, time value, and total cost of ownership.",
  author: { "@type": "Organization", name: "Australia Chauffeurs" },
  publisher: {
    "@type": "Organization",
    name: "Australia Chauffeurs",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-01-01",
  dateModified: "2026-06-01",
  mainEntityOfPage: `${SITE_URL}/blog/corporate-chauffeur-vs-taxi-expense`,
};

export default function CorporateChauffeurVsTaxi() {
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
              Corporate Travel · Adelaide
            </p>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 700, color: "#FAFAFA", lineHeight: 1.2, marginBottom: 20 }}>
              Why Adelaide Businesses Use Chauffeurs Instead of Taxis{" "}
              <span style={{ color: "#C9A84C" }}>(The Numbers)</span>
            </h1>
            <p style={{ fontSize: 18, color: "#A1A1AA", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 28px" }}>
              The price difference is smaller than you think. The productivity and invoicing differences are larger than you expect. Here's the full breakdown.
            </p>
            <p style={{ color: "#71717A", fontSize: 14 }}>Updated June 2026 · 6-minute read</p>
          </div>
        </section>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>

          {/* The price gap */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              The Price Gap Is Smaller Than You Think
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              The assumption is that taxis are cheap and chauffeurs are expensive. In Adelaide in 2026, the gap has narrowed considerably — especially once surge pricing and booking fees are factored in.
            </p>
            <div style={{ overflowX: "auto", marginBottom: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
                <thead>
                  <tr style={{ background: "#111113" }}>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#C9A84C", fontWeight: 600, borderBottom: "2px solid #C9A84C" }}>Trip</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#C9A84C", fontWeight: 600, borderBottom: "2px solid #C9A84C" }}>Chauffeur</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#A1A1AA", fontWeight: 600, borderBottom: "2px solid #1F1F23" }}>Taxi / Rideshare</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { trip: "CBD to Adelaide Airport", chauffeur: "$130 fixed", taxi: "$45–$90 (surge varies)" },
                    { trip: "CBD to Norwood (meeting)", chauffeur: "$55 fixed", taxi: "$22–$40" },
                    { trip: "Airport to Mawson Lakes", chauffeur: "$155 fixed", taxi: "$65–$110" },
                    { trip: "CBD to Glenelg", chauffeur: "$75 fixed", taxi: "$30–$55" },
                    { trip: "Late-night airport (post-midnight)", chauffeur: "$145 fixed", taxi: "$80–$160+ surge" },
                  ].map((row, i) => (
                    <tr key={row.trip} style={{ background: i % 2 === 0 ? "#0C0C0E" : "#09090B" }}>
                      <td style={{ padding: "14px 16px", color: "#A1A1AA", borderBottom: "1px solid #1F1F23" }}>{row.trip}</td>
                      <td style={{ padding: "14px 16px", color: "#E5E5E5", borderBottom: "1px solid #1F1F23", fontWeight: 500 }}>{row.chauffeur}</td>
                      <td style={{ padding: "14px 16px", color: "#71717A", borderBottom: "1px solid #1F1F23" }}>{row.taxi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 15, color: "#71717A", lineHeight: 1.7 }}>
              The chauffeur premium ranges from $30–$60 on most typical corporate trips. Before dismissing that as expensive, consider what you're comparing it against.
            </p>
          </section>

          {/* Tax deductibility */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Tax Deductibility and GST: The Accounting Argument
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Any business travel expense that is directly incurred in producing assessable income is deductible under the Income Tax Assessment Act 1997 (s8-1). Both taxis and chauffeur cars qualify — but the documentation requirements differ dramatically.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              To claim a GST input tax credit on business transport under the GST Act, you need a tax invoice for amounts over $82.50. A rideshare receipt typically shows a total amount paid, a booking reference, and maybe a date. A tax invoice requires the supplier's ABN, the words "Tax Invoice," a description of the supply, the GST amount, and the total.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Australia Chauffeurs issues a fully ATO-compliant GST tax invoice on every booking, automatically sent to your nominated email address. For a company running 20 monthly trips, that's 20 correctly documented invoices vs. 20 app receipts that your accounts team has to manually review and often reject for GST claims.
            </p>
            <div style={{ background: "#111113", border: "1px solid #C9A84C", borderRadius: 12, padding: 24 }}>
              <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Example: 20 monthly trips at $130 average</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <p style={{ color: "#71717A", fontSize: 13, marginBottom: 4 }}>Monthly spend</p>
                  <p style={{ color: "#E5E5E5", fontSize: 20, fontWeight: 700, marginBottom: 0 }}>$2,600</p>
                </div>
                <div>
                  <p style={{ color: "#71717A", fontSize: 13, marginBottom: 4 }}>GST claimable (1/11th)</p>
                  <p style={{ color: "#C9A84C", fontSize: 20, fontWeight: 700, marginBottom: 0 }}>$236.36</p>
                </div>
              </div>
              <p style={{ color: "#71717A", fontSize: 14, marginTop: 12, marginBottom: 0 }}>
                With correct tax invoices: $236.36 back every month. With rideshare receipts: $0 if they don't comply with ATO requirements.
              </p>
            </div>
          </section>

          {/* Time value */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              The Time Value Calculation
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Corporate time is expensive. An executive billing at $350/hour — or a sales director whose time generates revenue — costs the business real money when they're standing on Grenfell Street waiting for a rideshare that cancelled, or hunting for a taxi outside Adelaide Convention Centre at 6pm.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 24 }}>
              A chauffeur is confirmed, tracked, and waiting. The driver meets you. You don't walk, wait, or search. For a 10-minute wait reduction per trip, twice a week, that's 1.6 hours per month of senior time reclaimed.
            </p>
            <div style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 24 }}>
              <p style={{ color: "#FAFAFA", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Monthly time value recovered (2 trips/week)</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { rate: "$200/hr rate", value: "$320/month" },
                  { rate: "$350/hr rate", value: "$560/month" },
                  { rate: "$500/hr rate", value: "$800/month" },
                ].map(item => (
                  <div key={item.rate} style={{ textAlign: "center", padding: 12, background: "#0C0C0E", borderRadius: 8 }}>
                    <div style={{ color: "#C9A84C", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{item.value}</div>
                    <div style={{ color: "#71717A", fontSize: 12 }}>{item.rate}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Productivity in car */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Productivity Inside the Vehicle
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              The ride itself is work time. A chauffeur vehicle is quiet, the driver is professional and won't engage in conversation unless invited, and the environment is consistent and predictable. This is a working environment — executives use the 25–40 minute airport transfer to make calls, review presentations, or decompress between commitments.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              A taxi or rideshare varies wildly. Some drivers run constant conversation. Music choice can be unpredictable. Vehicle cleanliness is inconsistent. The quality of the back seat in terms of headroom and legroom can vary from acceptable to genuinely cramped. For back-to-back travel days, this variability adds up to real cognitive load.
            </p>
          </section>

          {/* Corporate invoicing */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Centralised Corporate Invoicing
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Australia Chauffeurs corporate accounts eliminate the reimbursement cycle entirely. Employees book travel against your corporate account, every trip is recorded centrally, and at month-end you receive a single consolidated statement with individual trip details, GST tax invoices attached, and a summary by cost centre or employee if needed.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Compare this to the standard taxi/rideshare process: employee pays from personal account, submits paper or email receipt, accounts team validates and processes reimbursement, employee waits for next pay cycle. That admin cycle costs roughly $15–$25 in accounts team time per expense claim, according to industry benchmarks.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              At 20 trips per month, eliminating individual reimbursements saves $300–$500 in administrative overhead alone.
            </p>
          </section>

          {/* The real total cost */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              The Real Total Cost Comparison
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
                <thead>
                  <tr style={{ background: "#111113" }}>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#C9A84C", fontWeight: 600, borderBottom: "2px solid #C9A84C" }}>Cost Factor (20 trips/month)</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#C9A84C", fontWeight: 600, borderBottom: "2px solid #C9A84C" }}>Chauffeur Account</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#A1A1AA", fontWeight: 600, borderBottom: "2px solid #1F1F23" }}>Taxi / Rideshare</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { factor: "Direct transport cost", chauffeur: "$2,600", taxi: "$1,400–$1,800" },
                    { factor: "GST input credit recovered", chauffeur: "−$236", taxi: "$0 (no valid invoices)" },
                    { factor: "Admin/accounts team time", chauffeur: "$0 (centralised)", taxi: "$300–$500" },
                    { factor: "Executive wait time value", chauffeur: "$0 (driver waiting)", taxi: "$320–$800+" },
                    { factor: "Net effective cost", chauffeur: "~$2,364", taxi: "~$2,020–$2,500" },
                  ].map((row, i) => (
                    <tr key={row.factor} style={{ background: i % 2 === 0 ? "#0C0C0E" : "#09090B" }}>
                      <td style={{ padding: "14px 16px", color: "#A1A1AA", borderBottom: "1px solid #1F1F23" }}>{row.factor}</td>
                      <td style={{ padding: "14px 16px", color: i === 4 ? "#C9A84C" : "#E5E5E5", borderBottom: "1px solid #1F1F23", fontWeight: i === 4 ? 700 : 400 }}>{row.chauffeur}</td>
                      <td style={{ padding: "14px 16px", color: "#71717A", borderBottom: "1px solid #1F1F23" }}>{row.taxi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 15, color: "#71717A", lineHeight: 1.7, marginTop: 16 }}>
              The net cost difference at volume is often negative — corporate chauffeur accounts can be equal to or cheaper than taxi/rideshare on a total cost-of-business basis.
            </p>
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
              Set Up a Corporate Chauffeur Account
            </h2>
            <p style={{ color: "#A1A1AA", fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
              Monthly invoicing · GST tax invoices · No reimbursement admin · 24/7 availability across Adelaide
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/corporate-accounts"
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
                Corporate Accounts
              </Link>
              <Link
                href="/book"
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
                Book a Single Trip
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
