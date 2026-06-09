import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Sofitel Adelaide Chauffeur | Airport Transfer & Luxury Car Service",
  description: "Premium chauffeur service for Sofitel Adelaide guests. Airport transfers from $89, winery day trips, corporate hire. Driver meets at Sofitel entrance on Currie Street. 24/7.",
  keywords: ["Sofitel Adelaide chauffeur","Sofitel Adelaide airport transfer","luxury car Sofitel Adelaide","chauffeur Currie Street Adelaide","Sofitel Adelaide hotel transport","private driver Sofitel Adelaide"],
  alternates: { canonical: `${S}/hotels/sofitel-adelaide` },
};
export default function SofitelAdelaidePage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d0014 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🏨 SOFITEL ADELAIDE — CURRIE STREET</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Chauffeur Service for<br /><span style={{ color:"#C9A84C" }}>Sofitel Adelaide Guests</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:560, margin:"0 auto 28px", lineHeight:1.7 }}>A premium chauffeur matching the Sofitel's luxury standard — airport transfers, wine region tours and corporate transport all arranged seamlessly.</p>
          <Link href="/book?from=Sofitel+Adelaide" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book from Sofitel Adelaide →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <h2 style={{ color:"#fff", fontSize:24, fontWeight:800, textAlign:"center", marginBottom:28 }}>Popular Routes from Sofitel Adelaide</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
              {[["→ Adelaide Airport","$89","~25 min"],["→ Glenelg","$74","~22 min"],["→ Barossa Valley","$192","~60 min"],["→ McLaren Vale","$152","~50 min"],["→ Hahndorf","$100","~32 min"],["→ Norwood / The Parade","$58","~12 min"]].map(([r,p,t]) => (
                <div key={r} style={{ background:"#17171A", borderRadius:14, padding:"18px 20px", border:"1px solid #2A2A30", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div><p style={{ color:"#fff", fontWeight:600, fontSize:13 }}>Sofitel {r}</p><p style={{ color:"#6B7280", fontSize:11 }}>{t}</p></div>
                  <p style={{ color:"#C9A84C", fontWeight:900, fontSize:20 }}>{p}</p>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:20, marginTop:28 }}>
              <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:8 }}>📍 Pickup Details — Sofitel Adelaide</p>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.6 }}>25 Currie Street, Adelaide SA 5000. Your chauffeur meets at the main entrance. The Sofitel concierge can also arrange bookings on your behalf through our concierge partnership.</p>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"48px 24px", textAlign:"center" }}>
          <Link href="/book?from=Sofitel+Adelaide" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
