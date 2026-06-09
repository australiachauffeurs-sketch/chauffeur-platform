import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Barossa vs McLaren Vale Day Trip from Adelaide — Which Wine Region Wins?",
  description: "Barossa Valley or McLaren Vale for a day trip from Adelaide? We compare drive time, wineries, scenery and food so you can pick the best wine region — and book a chauffeur to drive.",
  keywords: ["Barossa vs McLaren Vale","Barossa Valley day trip Adelaide","McLaren Vale day trip Adelaide","best wine region Adelaide day trip","Barossa or McLaren Vale Adelaide","wine tour day trip Adelaide"],
  alternates: { canonical: `${S}/blog/barossa-vs-mclaren-vale-day-trip` },
};
const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Barossa vs McLaren Vale Day Trip from Adelaide — Which Wine Region Wins?",
  author: { "@type": "Organization", name: "Elite Chauffeurs Australia" },
  publisher: { "@type": "Organization", name: "Elite Chauffeurs Australia" },
  datePublished: "2026-01-12",
  description: "Barossa Valley or McLaren Vale for a day trip from Adelaide? We compare drive time, wineries, scenery and food.",
};
export default function BarossaVsMcLarenValePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d0500 100%)", padding:"72px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>WINE REGION GUIDE · JANUARY 2026</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:900, lineHeight:1.2, maxWidth:800, margin:"0 auto 20px" }}>
            Barossa vs McLaren Vale:<br /><span style={{ color:"#C9A84C" }}>Which Wine Region Day Trip Wins?</span>
          </h1>
          <p style={{ color:"#9CA3AF", maxWidth:580, margin:"0 auto", lineHeight:1.7, fontSize:16 }}>Two of Australia's great wine regions, both within 60 minutes of Adelaide. Here's how they compare — and why the answer might not be obvious.</p>
        </section>
        <article style={{ maxWidth:760, margin:"0 auto", padding:"52px 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:40 }}>
            {[
              { title:"Barossa Valley", facts:["~60 km north of Adelaide","Shiraz country — big, bold reds","Home to Penfolds, Jacobs Creek, Seppeltsfield","German heritage, excellent food","Best for: serious red wine lovers","Chauffeur from CBD: $192"] },
              { title:"McLaren Vale", facts:["~40 km south of Adelaide","Diverse varieties — Grenache, Shiraz, Cab","Home to d'Arenberg, Chapel Hill, Wirra Wirra","Mediterranean feel, stunning sea views","Best for: scenic coastal wine experience","Chauffeur from CBD: $152"] },
            ].map(r => (
              <div key={r.title} style={{ background:"#17171A", borderRadius:16, padding:22, border:"1px solid #2A2A30" }}>
                <h2 style={{ color:"#C9A84C", fontWeight:800, fontSize:18, marginBottom:14 }}>{r.title}</h2>
                <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                  {r.facts.map(f => <li key={f} style={{ color:"#9CA3AF", fontSize:13, padding:"5px 0", borderBottom:"1px solid #2A2A30" }}>• {f}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:16 }}>The Verdict: Which Should You Choose?</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:32 }}>
            {[
              { case:"Choose Barossa if...", points:["You love big, full-bodied Shiraz","You want cellar doors with heritage and history","You're visiting Penfolds' Magill or Grange","You want a full-day immersion in serious wine","You have 6+ hours for the experience"] },
              { case:"Choose McLaren Vale if...", points:["You want scenic drive + ocean views","You prefer lighter, more diverse styles","You're doing a shorter half-day","You want to combine wine + beach","Families welcome — more casual vibe"] },
            ].map(v => (
              <div key={v.case} style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:20 }}>
                <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:10 }}>{v.case}</p>
                <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                  {v.points.map(p => <li key={p} style={{ color:"#9CA3AF", fontSize:13, padding:"4px 0" }}>✓ {p}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:14 }}>Can't Choose? Do Both.</h2>
          <p style={{ color:"#9CA3AF", lineHeight:1.8, marginBottom:20 }}>Some of our guests book a multi-region day trip — Barossa in the morning, McLaren Vale in the afternoon, with a stop in the Adelaide Hills for lunch at Hahndorf. It's a long day (10+ hours) but extraordinary. Your chauffeur handles all the driving while you enjoy every glass.</p>
          <div style={{ background:"#17171A", borderRadius:16, padding:24, border:"1px solid #2A2A30", textAlign:"center" }}>
            <p style={{ color:"#C9A84C", fontWeight:800, fontSize:18, marginBottom:8 }}>🍷 Book Your Wine Region Chauffeur</p>
            <p style={{ color:"#9CA3AF", fontSize:14, marginBottom:20 }}>Barossa, McLaren Vale, or a custom multi-region tour — fixed price, no surge, chauffeur-driven.</p>
            <Link href="/services/wine-tours" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"14px 32px", borderRadius:12, fontWeight:900, textDecoration:"none" }}>View Wine Tour Packages →</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
