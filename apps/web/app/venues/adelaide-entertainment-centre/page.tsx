import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Adelaide Entertainment Centre Chauffeur | Concert & Event Car Service",
  description: "Luxury chauffeur to Adelaide Entertainment Centre for concerts, comedy shows and sporting events. Pre-booked return — no surge, driver waiting at exit. From $65.",
  keywords: ["Adelaide Entertainment Centre chauffeur","AEC chauffeur","Hindmarsh concert transfer","Adelaide Entertainment Centre car","luxury car AEC Adelaide","concert transport Adelaide"],
  alternates: { canonical: `${S}/venues/adelaide-entertainment-centre` },
};
export default function AECPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0f0a00 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🎭 ADELAIDE ENTERTAINMENT CENTRE — PORT ROAD, HINDMARSH</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Chauffeur to Adelaide<br /><span style={{ color:"#C9A84C" }}>Entertainment Centre</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:560, margin:"0 auto 28px", lineHeight:1.7 }}>Big concerts. International acts. NBA. Footy. Whatever's on at the AEC — your chauffeur gets you there and back with zero stress.</p>
          <Link href="/book?to=Adelaide+Entertainment+Centre" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book AEC Transfer →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <h2 style={{ color:"#fff", fontSize:24, fontWeight:800, marginBottom:28 }}>Fares to Adelaide Entertainment Centre</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
              {[["CBD → AEC","$55–$70","~12 min"],["Glenelg → AEC","$88","~30 min"],["North Adelaide → AEC","$52","~10 min"],["Norwood → AEC","$72","~20 min"],["Airport → AEC","$99","~28 min"],["AEC → Home","Same rate","Pre-booked"]].map(([r,p,t]) => (
                <div key={r} style={{ background:"#17171A", borderRadius:14, padding:"18px 20px", border:"1px solid #2A2A30" }}>
                  <p style={{ color:"#fff", fontWeight:600, fontSize:13, marginBottom:4 }}>{r}</p>
                  <p style={{ color:"#C9A84C", fontWeight:900, fontSize:20 }}>{p}</p>
                  <p style={{ color:"#6B7280", fontSize:11 }}>{t}</p>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:22, marginTop:28 }}>
              <p style={{ color:"#C9A84C", fontWeight:700, fontSize:15, marginBottom:10 }}>⚡ Why Pre-Book Instead of Uber After the Show</p>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.7 }}>Post-concert Uber surge at the AEC regularly hits 2.5–4×. With 15,000+ people leaving at once, rideshare wait times blow out to 30–45 minutes. Your pre-booked chauffeur has a fixed price and is in position before the show ends.</p>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"52px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:900, marginBottom:12 }}>Book Your AEC Transfer</h2>
          <p style={{ color:"#6B7280", marginBottom:24 }}>Fixed price · No surge · Pre-book return</p>
          <Link href="/book?to=Adelaide+Entertainment+Centre" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
