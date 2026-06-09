import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "National Wine Centre Chauffeur | Adelaide Wine Event & Corporate Transport",
  description: "Luxury chauffeur to National Wine Centre Adelaide for wine events, corporate functions and Rundle Mall dining. Walk in, drink freely — your chauffeur drives you home safely.",
  keywords: ["National Wine Centre chauffeur","wine event transport Adelaide","chauffeur Botanic Gardens Adelaide","NWC Adelaide car service","corporate wine event chauffeur Adelaide","safe driver wine event"],
  alternates: { canonical: `${S}/venues/national-wine-centre` },
};
export default function NationalWineCentrePage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d0005 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🍷 NATIONAL WINE CENTRE — BOTANIC GARDENS, ADELAIDE</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Chauffeur to the<br /><span style={{ color:"#C9A84C" }}>National Wine Centre Adelaide</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:580, margin:"0 auto 28px", lineHeight:1.7 }}>Wine tastings, Cellar Door events, private corporate functions and gala dinners — enjoy every glass knowing your chauffeur is the designated driver for the evening.</p>
          <Link href="/book?to=National+Wine+Centre+Adelaide" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Wine Event Transfer →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:32 }}>
              <div style={{ background:"#17171A", borderRadius:16, padding:24, border:"1px solid #2A2A30" }}>
                <h3 style={{ color:"#C9A84C", fontWeight:700, fontSize:16, marginBottom:14 }}>Popular Wine Events We Service</h3>
                <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                  {["Cellar Door wine tastings","Tasting Australia events","Corporate wine & dine evenings","Private label launch dinners","Charity gala evenings","Corporate client entertainment"].map(e => (
                    <li key={e} style={{ color:"#9CA3AF", fontSize:13, padding:"6px 0", borderBottom:"1px solid #2A2A30" }}>🍷 {e}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{ color:"#fff", fontSize:18, fontWeight:700, marginBottom:16 }}>Fares to National Wine Centre</h3>
                {[["CBD → NWC","$52","~8 min"],["Glenelg → NWC","$84","~25 min"],["North Adelaide → NWC","$46","~7 min"],["Airport → NWC","$92","~28 min"],["NWC → Home (return)","Same rate","Pre-booked"]].map(([r,p,t]) => (
                  <div key={r} style={{ background:"#17171A", borderRadius:12, padding:"14px 16px", border:"1px solid #2A2A30", marginBottom:8, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div><p style={{ color:"#fff", fontWeight:600, fontSize:13, margin:0 }}>{r}</p><p style={{ color:"#6B7280", fontSize:11, margin:0 }}>{t}</p></div>
                    <p style={{ color:"#C9A84C", fontWeight:900, fontSize:18, margin:0 }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:22 }}>
              <p style={{ color:"#C9A84C", fontWeight:700, fontSize:15, marginBottom:10 }}>🍾 Drink Freely. We Drive.</p>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.7 }}>Pre-book your return chauffeur when you book the event. Fixed price, no surge, no hassle. You focus on the wine — we focus on getting you home safely. Corporate accounts welcome for recurring wine event transport.</p>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"52px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:900, marginBottom:12 }}>Book Your Wine Centre Transfer</h2>
          <Link href="/book?to=National+Wine+Centre+Adelaide" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
