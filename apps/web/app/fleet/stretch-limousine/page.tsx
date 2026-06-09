import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Stretch Limousine Hire Adelaide | Wedding, Formal & Special Events",
  description: "Adelaide stretch limousine hire for weddings, school formals and special celebrations. Up to 10 passengers — from $220/hr, 3-hour minimum. Floor-to-ceiling privacy glass.",
  keywords: ["stretch limousine hire Adelaide","limo hire Adelaide","Adelaide limo wedding","school formal limo Adelaide","stretch limo Adelaide price","limousine hire Adelaide event"],
  alternates: { canonical: `${S}/fleet/stretch-limousine` },
};
export default function StretchLimoPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d000d 100%)", padding:"72px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🎉 ELITE CHAUFFEURS FLEET</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Stretch Limousine<br /><span style={{ color:"#C9A84C" }}>Weddings · Formals · Celebrations</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:540, margin:"0 auto 28px", lineHeight:1.7 }}>Some occasions deserve the full limousine experience. Up to 10 passengers, privacy glass, interior lighting — the grand arrival that makes the moment unforgettable.</p>
          <Link href="/book?vehicle=limousine" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book the Limo →</Link>
        </section>
        <section style={{ padding:"52px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:28 }}>
              <div style={{ background:"#17171A", borderRadius:16, padding:24, border:"1px solid #2A2A30" }}>
                <h2 style={{ color:"#C9A84C", fontWeight:700, fontSize:17, marginBottom:16 }}>Limousine Specs</h2>
                {[["Capacity","Up to 10 passengers"],["Minimum hire","3 hours"],["Hourly rate","$220/hr"],["Interior","LED lighting, leather"],["Sound system","Full premium audio"],["Privacy","Floor-to-ceiling tinted glass"],["Beverages","BYO (glasses provided)"]].map(([l,v]) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #2A2A30" }}>
                    <span style={{ color:"#6B7280", fontSize:13 }}>{l}</span>
                    <span style={{ color:"#fff", fontSize:13 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 style={{ color:"#fff", fontSize:18, fontWeight:700, marginBottom:14 }}>Popular Packages</h3>
                {[["School Formal (3 hrs)","$660","Return to venue + home"],["Wedding Day (4 hrs)","$880","Church + reception"],["Wedding Day (5 hrs)","$1,100","Photos + reception"],["Celebration Package (3 hrs)","$660","Birthday, hens, anniversary"],["Barossa Winery Tour (6 hrs)","$1,320","Multiple winery stops"]].map(([s,p,n]) => (
                  <div key={s} style={{ background:"#17171A", borderRadius:12, padding:"14px 16px", border:"1px solid #2A2A30", marginBottom:8 }}>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ color:"#fff", fontSize:13 }}>{s}</span>
                      <span style={{ color:"#C9A84C", fontWeight:700, fontSize:14 }}>{p}</span>
                    </div>
                    <p style={{ color:"#6B7280", fontSize:11, margin:"4px 0 0" }}>{n}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"48px 24px", textAlign:"center" }}>
          <Link href="/book?vehicle=limousine" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book the Limo →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
