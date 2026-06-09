import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Mayfair Hotel Adelaide Chauffeur | Airport Transfer & Luxury Car Service",
  description: "Premium chauffeur for Mayfair Hotel Adelaide guests. Airport transfers from $89, winery tours & corporate hire. Driver meets at Mayfair Hotel entrance on King William Street.",
  keywords: ["Mayfair Hotel Adelaide chauffeur","Mayfair Hotel Adelaide airport transfer","luxury car Mayfair Adelaide","chauffeur King William Street Adelaide","Mayfair Hotel transport Adelaide"],
  alternates: { canonical: `${S}/hotels/mayfair-hotel-adelaide` },
};
export default function MayfairHotelPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d0d00 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🏨 MAYFAIR HOTEL — KING WILLIAM STREET</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Chauffeur Service for<br /><span style={{ color:"#C9A84C" }}>Mayfair Hotel Adelaide Guests</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:560, margin:"0 auto 28px", lineHeight:1.7 }}>The Mayfair is Adelaide's most distinctive boutique hotel — your chauffeur service should match. From King William Street to the airport, the Barossa or a corporate meeting.</p>
          <Link href="/book?from=Mayfair+Hotel+Adelaide" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book from Mayfair Hotel →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
              {[["→ Adelaide Airport","$89","~24 min"],["→ Glenelg","$73","~20 min"],["→ Barossa Valley","$192","~60 min"],["→ McLaren Vale","$152","~48 min"],["→ Hahndorf","$98","~30 min"],["→ North Adelaide","$48","~8 min"]].map(([r,p,t]) => (
                <div key={r} style={{ background:"#17171A", borderRadius:14, padding:"18px 20px", border:"1px solid #2A2A30", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div><p style={{ color:"#fff", fontWeight:600, fontSize:13 }}>Mayfair {r}</p><p style={{ color:"#6B7280", fontSize:11 }}>{t}</p></div>
                  <p style={{ color:"#C9A84C", fontWeight:900, fontSize:20 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"48px 24px", textAlign:"center" }}>
          <Link href="/book?from=Mayfair+Hotel+Adelaide" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Your Chauffeur →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
