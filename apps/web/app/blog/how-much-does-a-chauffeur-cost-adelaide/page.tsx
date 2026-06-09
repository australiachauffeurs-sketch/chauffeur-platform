import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "How Much Does a Chauffeur Cost in Adelaide? 2026 Price Guide",
  description: "Real Adelaide chauffeur prices for 2026 — airport transfers, hourly hire, wine tours, corporate and wedding. See exactly what you'll pay before you book.",
  keywords: ["how much does a chauffeur cost Adelaide","Adelaide chauffeur prices 2026","chauffeur cost Adelaide","luxury car hire Adelaide price","airport chauffeur price Adelaide","chauffeur vs taxi cost Adelaide"],
  alternates: { canonical: `${S}/blog/how-much-does-a-chauffeur-cost-adelaide` },
};
const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Much Does a Chauffeur Cost in Adelaide? 2026 Price Guide",
  author: { "@type": "Organization", name: "Elite Chauffeurs Australia" },
  publisher: { "@type": "Organization", name: "Elite Chauffeurs Australia" },
  datePublished: "2026-01-20",
};
export default function ChauffeurCostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0a0d00 100%)", padding:"72px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>PRICING GUIDE · 2026</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:900, lineHeight:1.2, maxWidth:780, margin:"0 auto 20px" }}>
            How Much Does a Chauffeur Cost<br /><span style={{ color:"#C9A84C" }}>in Adelaide? (2026 Prices)</span>
          </h1>
          <p style={{ color:"#9CA3AF", maxWidth:580, margin:"0 auto", lineHeight:1.7, fontSize:16 }}>Real prices. No fluff. Here's exactly what a professional chauffeur service costs in Adelaide for every type of booking.</p>
        </section>
        <article style={{ maxWidth:760, margin:"0 auto", padding:"52px 24px" }}>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:16 }}>Airport Transfer Prices (Fixed)</h2>
          <div style={{ overflowX:"auto", marginBottom:36 }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#17171A" }}>
                  {["Route","Sedan","SUV","Van"].map(h => <th key={h} style={{ color:"#C9A84C", padding:"12px 16px", textAlign:"left", fontSize:13 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[["CBD → Airport","$89","$109","$135"],["Glenelg → Airport","$95","$118","$145"],["North Adelaide → Airport","$85","$105","$130"],["Norwood → Airport","$92","$112","$138"],["Barossa → Airport","$185","$215","$260"],["McLaren Vale → Airport","$152","$178","$218"],["Hahndorf → Airport","$138","$160","$198"]].map(r => (
                  <tr key={r[0]} style={{ borderBottom:"1px solid #2A2A30" }}>
                    {r.map((c,i) => <td key={i} style={{ color: i===0 ? "#fff" : "#C9A84C", padding:"12px 16px", fontSize:13, fontWeight: i===0 ? 400 : 700 }}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:16 }}>Hourly Hire Prices</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14, marginBottom:36 }}>
            {[["Luxury Sedan","$125/hr","Min 2 hours"],["Luxury SUV","$155/hr","Min 2 hours"],["Stretch Limo","$220/hr","Min 3 hours"],["Executive Van","$175/hr","Min 2 hours"]].map(([v,p,m]) => (
              <div key={v} style={{ background:"#17171A", borderRadius:14, padding:20, border:"1px solid #2A2A30" }}>
                <p style={{ color:"#fff", fontWeight:700, fontSize:14, marginBottom:4 }}>{v}</p>
                <p style={{ color:"#C9A84C", fontWeight:900, fontSize:22 }}>{p}</p>
                <p style={{ color:"#6B7280", fontSize:11 }}>{m}</p>
              </div>
            ))}
          </div>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:16 }}>Specialty Service Prices</h2>
          <div style={{ background:"#17171A", borderRadius:16, padding:22, border:"1px solid #2A2A30", marginBottom:32 }}>
            {[["Barossa Valley Full-Day Tour","$595 (up to 8 hrs, sedan)"],["McLaren Vale Half-Day Tour","$395 (4 hrs, sedan)"],["Adelaide Hills Day Tour","$295 (4 hrs, sedan)"],["Wedding Car — Sedan","From $350 (3 hrs)"],["Wedding Car — Stretch Limo","From $650 (3 hrs)"],["School Formal","From $195 (return)"],["Airport → Wine Region","$185–$210 one-way"]].map(([s,p]) => (
              <div key={s} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #2A2A30" }}>
                <span style={{ color:"#9CA3AF", fontSize:13 }}>{s}</span>
                <span style={{ color:"#C9A84C", fontWeight:700, fontSize:13 }}>{p}</span>
              </div>
            ))}
          </div>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:14 }}>What Affects the Price?</h2>
          <p style={{ color:"#9CA3AF", lineHeight:1.8, marginBottom:14 }}>Adelaide chauffeur prices are influenced by: distance, vehicle type, time of day (after-hours surcharge applies 10pm–6am), number of passengers, and any waiting time. All our prices are fixed — the price quoted is the price you pay, regardless of traffic.</p>
          <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:22, marginBottom:32 }}>
            <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:10 }}>Is a Chauffeur More Expensive Than Uber?</p>
            <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.7 }}>For standard trips, a chauffeur is typically 15–25% more than UberX base fare. However, during surge times — airport departures on a Sunday, post-concert, peak weekends — Uber easily costs 2–4× more. With a chauffeur the price is always fixed. Read our full comparison: <Link href="/compare/chauffeur-vs-uber-adelaide" style={{ color:"#C9A84C" }}>Chauffeur vs Uber Adelaide →</Link></p>
          </div>
          <div style={{ textAlign:"center" }}>
            <Link href="/pricing" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"14px 36px", borderRadius:12, fontWeight:900, textDecoration:"none", marginRight:12 }}>Full Price List →</Link>
            <Link href="/book" style={{ display:"inline-block", border:"2px solid #C9A84C", color:"#C9A84C", padding:"14px 36px", borderRadius:12, fontWeight:700, textDecoration:"none" }}>Get Instant Quote →</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
