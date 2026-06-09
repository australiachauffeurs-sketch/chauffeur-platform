import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Corporate Travel Policy Adelaide: Why Top Companies Use Chauffeurs Over Ubers",
  description: "Why Adelaide's leading law firms, mining companies and professional services firms use a corporate chauffeur account — not Uber Business. Duty of care, GST receipts, reliability.",
  keywords: ["corporate travel policy Adelaide","corporate chauffeur Adelaide","Uber Business vs chauffeur Adelaide","corporate car service Adelaide","duty of care transport Adelaide","GST receipt chauffeur Adelaide"],
  alternates: { canonical: `${S}/blog/corporate-travel-policy-adelaide` },
};
const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Corporate Travel Policy Adelaide: Why Top Companies Use Chauffeurs Over Ubers",
  author: { "@type": "Organization", name: "Elite Chauffeurs Australia" },
  datePublished: "2026-02-08",
};
export default function CorporateTravelPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#00080d 100%)", padding:"72px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>CORPORATE GUIDE · FEBRUARY 2026</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:900, lineHeight:1.2, maxWidth:820, margin:"0 auto 20px" }}>
            Corporate Travel Policy Adelaide:<br /><span style={{ color:"#C9A84C" }}>Why Smart Companies Use Chauffeurs</span>
          </h1>
          <p style={{ color:"#9CA3AF", maxWidth:600, margin:"0 auto", lineHeight:1.7, fontSize:16 }}>Law firms, mining companies, construction majors and professional services firms — here's why the best Adelaide businesses use a corporate chauffeur account instead of Uber Business.</p>
        </section>
        <article style={{ maxWidth:760, margin:"0 auto", padding:"52px 24px" }}>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:16 }}>The 5 Corporate Travel Requirements That Uber Can't Meet</h2>
          {[
            { n:"1", title:"Duty of Care & Insurance", body:"Under Australian work health and safety law, employers have a duty of care for employees in transit. A professional chauffeur service carries commercial passenger vehicle insurance, full background-checked drivers and a documented safety record. Uber's peer-to-peer insurance gap has been well documented in legal disputes. A corporate chauffeur closes that gap." },
            { n:"2", title:"Reliable, Fixed-Price Invoicing with GST", body:"Finance and accounts teams hate Uber Business. Surge pricing blows travel budgets without warning. Expense reconciliation is painful — dozens of individual charges across employee accounts. A corporate chauffeur account provides monthly consolidated invoices with full GST breakdowns, cost centre coding and PO number support." },
            { n:"3", title:"Consistent Driver & Vehicle Standard", body:"When your CEO or international client is in the vehicle, consistency matters. Every Elite Chauffeurs driver wears a suit, arrives 10 minutes early, and drives a late-model luxury vehicle. Uber's driver quality is inconsistent by design — the platform doesn't control the experience." },
            { n:"4", title:"Confidentiality", body:"Senior executives discussing deal terms, legal strategy or acquisition targets don't want that conversation happening in a car whose driver they've never vetted. Our drivers sign confidentiality agreements and are professionally trained to provide private, discreet service." },
            { n:"5", title:"After-Hours Reliability", body:"Clients landing on the 11pm Qantas flight from Sydney need to be picked up — reliably, every time. Uber availability in Adelaide at midnight after a long haul is not guaranteed. Our 24/7 corporate dispatch ensures a car is always available, pre-booked and confirmed." },
          ].map(s => (
            <div key={s.n} style={{ marginBottom:28, paddingLeft:16, borderLeft:"3px solid #C9A84C" }}>
              <h3 style={{ color:"#C9A84C", fontWeight:700, fontSize:16, marginBottom:8 }}>{s.title}</h3>
              <p style={{ color:"#9CA3AF", fontSize:14, lineHeight:1.8 }}>{s.body}</p>
            </div>
          ))}
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:16 }}>What a Corporate Account Includes</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:32 }}>
            {["Monthly consolidated GST invoices","Cost centre / department coding","PO number on each booking","24/7 phone + online booking","Named account manager","Multi-seat access for PAs & EAs","Priority vehicle allocation","Monthly usage reporting"].map(f => (
              <div key={f} style={{ background:"#17171A", borderRadius:12, padding:"12px 16px", border:"1px solid #2A2A30", color:"#9CA3AF", fontSize:13 }}>✓ {f}</div>
            ))}
          </div>
          <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:24, textAlign:"center" }}>
            <p style={{ color:"#C9A84C", fontWeight:800, fontSize:18, marginBottom:8 }}>Set Up a Corporate Account</p>
            <p style={{ color:"#9CA3AF", fontSize:13, marginBottom:20 }}>No minimum spend. No lock-in contract. Cancel anytime. For Adelaide businesses of all sizes.</p>
            <Link href="/corporate-accounts" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"14px 32px", borderRadius:12, fontWeight:900, textDecoration:"none" }}>Apply for Corporate Account →</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
