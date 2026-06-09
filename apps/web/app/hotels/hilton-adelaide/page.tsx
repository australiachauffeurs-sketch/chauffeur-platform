import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Hilton Adelaide Chauffeur | Airport Transfer & Hotel Car Service",
  description: "Premium chauffeur for Hilton Adelaide guests. Airport transfers from $89, winery tours, corporate car hire. Driver meets you in Hilton lobby on Victoria Square. 24/7 service.",
  keywords: ["Hilton Adelaide chauffeur","Hilton Adelaide airport transfer","car service Hilton Adelaide","hotel chauffeur Hilton Adelaide","private driver Hilton Adelaide","Hilton Adelaide transport"],
  alternates: { canonical: `${S}/hotels/hilton-adelaide` },
};
export default function HiltonAdelaidePage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d0d1a 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🏨 HILTON ADELAIDE — VICTORIA SQUARE</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Chauffeur Service for<br /><span style={{ color:"#C9A84C" }}>Hilton Adelaide Guests</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:560, margin:"0 auto 28px", lineHeight:1.7 }}>Your driver meets you at the Hilton Adelaide entrance on Victoria Square. Airport runs, wine region day trips and corporate transfers — arranged in advance or on the day.</p>
          <Link href="/book?from=Hilton+Adelaide" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book from Hilton Adelaide →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <h2 style={{ color:"#fff", fontSize:26, fontWeight:800, textAlign:"center", marginBottom:28 }}>Popular Routes from Hilton Adelaide</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
              {[["→ Adelaide Airport","$89","~25 min"],["→ Glenelg Beach","$72","~20 min"],["→ Barossa Valley","$190","~60 min"],["→ McLaren Vale","$150","~48 min"],["→ Hahndorf","$98","~32 min"],["→ North Adelaide","$50","~8 min"]].map(([r,p,t]) => (
                <div key={r} style={{ background:"#17171A", borderRadius:14, padding:"18px 20px", border:"1px solid #2A2A30", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div><p style={{ color:"#fff", fontWeight:600, fontSize:13 }}>Hilton {r}</p><p style={{ color:"#6B7280", fontSize:11 }}>{t}</p></div>
                  <p style={{ color:"#C9A84C", fontWeight:900, fontSize:20 }}>{p}</p>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:20, marginTop:28 }}>
              <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:8 }}>📍 Pickup Details — Hilton Adelaide</p>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.6 }}>233 Victoria Square, Adelaide SA 5000. Your chauffeur meets you at the main entrance. Notify the concierge or contact your driver directly via the details sent at booking confirmation.</p>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"52px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:900, marginBottom:12 }}>Book Your Hotel Transfer</h2>
          <p style={{ color:"#6B7280", marginBottom:24 }}>24/7 · Fixed price · Instant confirmation</p>
          <Link href="/book?from=Hilton+Adelaide" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
