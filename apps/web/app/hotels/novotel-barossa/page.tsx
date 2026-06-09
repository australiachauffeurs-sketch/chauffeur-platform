import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Novotel Barossa Valley Chauffeur | Airport Transfer & Wine Tour Service",
  description: "Luxury chauffeur for Novotel Barossa Valley Resort guests. Airport transfers from $185, winery tours, Adelaide CBD day trips. Skip the Barossa shuttle — travel in private comfort.",
  keywords: ["Novotel Barossa chauffeur","Novotel Barossa airport transfer","Barossa Valley hotel chauffeur","Novotel Barossa wine tour","luxury car Barossa Valley resort","private transfer Barossa"],
  alternates: { canonical: `${S}/hotels/novotel-barossa` },
};
export default function NovotelBarossaPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d0a00 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🏨 NOVOTEL BAROSSA VALLEY RESORT — ROWLAND FLAT</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Chauffeur Service for<br /><span style={{ color:"#C9A84C" }}>Novotel Barossa Valley Guests</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:580, margin:"0 auto 28px", lineHeight:1.7 }}>You're in the Barossa to enjoy world-class wine — not worry about who's driving. Airport pickup, private winery tours and Adelaide day trips all arranged from your resort.</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/book?from=Novotel+Barossa+Valley" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 36px", borderRadius:13, fontWeight:900, fontSize:15, textDecoration:"none" }}>Book Airport Transfer →</Link>
            <Link href="/services/wine-tours" style={{ display:"inline-block", border:"2px solid #C9A84C", color:"#C9A84C", padding:"15px 36px", borderRadius:13, fontWeight:700, fontSize:15, textDecoration:"none" }}>Winery Tours →</Link>
          </div>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:22 }}>Transfers & Tours from Novotel Barossa</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14, marginBottom:28 }}>
              {[["→ Adelaide Airport","$185","~60 min"],["→ Adelaide CBD","$192","~65 min"],["Barossa Winery Tour (4 hrs)","$295","Full-day available"],["→ McLaren Vale","$280","~90 min"],["→ Hahndorf","$150","~50 min"],["→ Glenelg","$210","~70 min"]].map(([r,p,t]) => (
                <div key={r} style={{ background:"#17171A", borderRadius:14, padding:"18px 20px", border:"1px solid #2A2A30", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div><p style={{ color:"#fff", fontWeight:600, fontSize:13 }}>Novotel {r}</p><p style={{ color:"#6B7280", fontSize:11 }}>{t}</p></div>
                  <p style={{ color:"#C9A84C", fontWeight:900, fontSize:18 }}>{p}</p>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:20 }}>
              <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:8 }}>🍷 Barossa Winery Tour from Your Resort</p>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.6 }}>Staying at the Novotel Barossa? We can create a private winery itinerary — visiting Penfolds, Seppeltsfield, Jacob's Creek, Henschke or any combination. You choose the wineries; we drive and wait. All fixed price, no surge.</p>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"48px 24px", textAlign:"center" }}>
          <Link href="/book?from=Novotel+Barossa+Valley" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Your Chauffeur →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
