import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Stamford Grand Glenelg Chauffeur | Airport Transfer & Luxury Car Service",
  description: "Premium chauffeur for Stamford Grand Glenelg guests. Airport transfers from $95 — just 15 minutes to ADL. Winery tours, CBD transfers & event transport. 24/7 availability.",
  keywords: ["Stamford Grand Glenelg chauffeur","Stamford Grand airport transfer","Glenelg hotel chauffeur","Stamford Grand Moseley Square transfer","luxury car Stamford Grand Glenelg","Glenelg beach hotel chauffeur"],
  alternates: { canonical: `${S}/hotels/stamford-grand-glenelg` },
};
export default function StamfordGrandPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0a0f18 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🏨 STAMFORD GRAND — MOSELEY SQUARE, GLENELG</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Chauffeur Service for<br /><span style={{ color:"#C9A84C" }}>Stamford Grand Glenelg Guests</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:560, margin:"0 auto 28px", lineHeight:1.7 }}>The Stamford Grand is Adelaide's beachside grand dame — and you're only 15 minutes from the airport. Your chauffeur collects you at Moseley Square.</p>
          <Link href="/book?from=Stamford+Grand+Glenelg" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book from Stamford Grand →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
              {[["→ Adelaide Airport","$95","~15 min"],["→ Adelaide CBD","$74","~22 min"],["→ Barossa Valley","$240","~80 min"],["→ McLaren Vale","$185","~55 min"],["→ Hahndorf","$140","~46 min"],["→ North Adelaide","$88","~28 min"]].map(([r,p,t]) => (
                <div key={r} style={{ background:"#17171A", borderRadius:14, padding:"18px 20px", border:"1px solid #2A2A30", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div><p style={{ color:"#fff", fontWeight:600, fontSize:13 }}>Stamford Grand {r}</p><p style={{ color:"#6B7280", fontSize:11 }}>{t}</p></div>
                  <p style={{ color:"#C9A84C", fontWeight:900, fontSize:20 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"48px 24px", textAlign:"center" }}>
          <Link href="/book?from=Stamford+Grand+Glenelg" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Your Chauffeur →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
