import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Playford Hotel Adelaide Chauffeur | Airport Transfer & Luxury Car Service",
  description: "Premium chauffeur for Playford Hotel Adelaide guests. Airport transfers from $89, winery tours, corporate hire. Driver meets at Playford Hotel entrance on North Terrace.",
  keywords: ["Playford Hotel Adelaide chauffeur","Playford Hotel airport transfer","luxury car Playford Hotel Adelaide","chauffeur North Terrace Adelaide hotel","Playford MGallery transport"],
  alternates: { canonical: `${S}/hotels/playford-hotel-adelaide` },
};
export default function PlayfordHotelPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0a0f18 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🏨 PLAYFORD HOTEL — NORTH TERRACE, ADELAIDE</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Chauffeur Service for<br /><span style={{ color:"#C9A84C" }}>Playford Hotel Adelaide Guests</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:560, margin:"0 auto 28px", lineHeight:1.7 }}>The Playford MGallery sets the standard for boutique luxury on North Terrace — your chauffeur service should do the same. Airport transfers, wine region tours and corporate hire, all seamlessly arranged.</p>
          <Link href="/book?from=Playford+Hotel+Adelaide" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book from Playford Hotel →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:22 }}>Popular Routes from Playford Hotel</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
              {[["→ Adelaide Airport","$89","~24 min"],["→ Glenelg","$75","~22 min"],["→ Barossa Valley","$192","~58 min"],["→ McLaren Vale","$152","~48 min"],["→ Hahndorf","$98","~30 min"],["→ Adelaide Oval","$48","~5 min"]].map(([r,p,t]) => (
                <div key={r} style={{ background:"#17171A", borderRadius:14, padding:"18px 20px", border:"1px solid #2A2A30", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div><p style={{ color:"#fff", fontWeight:600, fontSize:13 }}>Playford {r}</p><p style={{ color:"#6B7280", fontSize:11 }}>{t}</p></div>
                  <p style={{ color:"#C9A84C", fontWeight:900, fontSize:20 }}>{p}</p>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:20, marginTop:24 }}>
              <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:8 }}>📍 Pickup Point</p>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.6 }}>120 North Terrace, Adelaide SA 5000. Your driver meets at the North Terrace entrance. Text message sent on arrival with driver name and vehicle.</p>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"48px 24px", textAlign:"center" }}>
          <Link href="/book?from=Playford+Hotel+Adelaide" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Your Chauffeur →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
