import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Adelaide Oval Chauffeur | Car Service for Concerts, AFL, Cricket & Events",
  description: "Luxury chauffeur to and from Adelaide Oval for AFL, cricket, concerts and events. Pre-booked return service — skip the traffic and taxi queues. From $55.",
  keywords: ["chauffeur Adelaide Oval","Adelaide Oval airport transfer","Adelaide Oval concert car","AFL game chauffeur Adelaide","cricket Adelaide Oval transport","event car Adelaide Oval","luxury car Adelaide Oval"],
  alternates: { canonical: `${S}/venues/adelaide-oval` },
};
export default function AdelaideOvalPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d1007 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🏟 ADELAIDE OVAL — WAR MEMORIAL DRIVE</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Chauffeur to Adelaide Oval<br /><span style={{ color:"#C9A84C" }}>AFL · Cricket · Concerts · Events</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:560, margin:"0 auto 28px", lineHeight:1.7 }}>Skip the traffic nightmare after the final siren. Pre-book your return chauffeur before you go in — your driver is waiting when you walk out.</p>
          <Link href="/book?to=Adelaide+Oval" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Oval Transfer →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <h2 style={{ color:"#fff", fontSize:24, fontWeight:800, marginBottom:28 }}>Transfers to & from Adelaide Oval</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14, marginBottom:32 }}>
              {[["CBD hotels → Oval","$45–$65","~8 min"],["Glenelg → Oval","$78","~24 min"],["North Adelaide → Oval","$38","~5 min"],["Norwood → Oval","$68","~18 min"],["Airport → Oval","$95","~26 min"],["Oval → Home (return)","Same rate","Pre-booked"]].map(([r,p,t]) => (
                <div key={r} style={{ background:"#17171A", borderRadius:14, padding:"18px 20px", border:"1px solid #2A2A30" }}>
                  <p style={{ color:"#fff", fontWeight:600, fontSize:13, marginBottom:4 }}>{r}</p>
                  <p style={{ color:"#C9A84C", fontWeight:900, fontSize:20 }}>{p}</p>
                  <p style={{ color:"#6B7280", fontSize:11 }}>{t}</p>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:22 }}>
              <p style={{ color:"#C9A84C", fontWeight:700, fontSize:15, marginBottom:10 }}>💡 Pro Tip: Pre-Book Your Return</p>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.7 }}>After a big match or concert, thousands of people are competing for taxis and rideshares. Uber surge can hit 3–4×. Book your chauffeur before you go in — same fixed price, your driver is there when you need them.</p>
            </div>
            <h3 style={{ color:"#fff", fontSize:20, fontWeight:700, marginTop:36, marginBottom:16 }}>Upcoming Events We're Servicing</h3>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              {["AFL — Power vs Crows","SA vs NSW Cricket","International Test Cricket","Stadium concerts","Corporate suites & hospitality","Rooftop bar events"].map(e => (
                <span key={e} style={{ background:"#17171A", border:"1px solid #2A2A30", color:"#D1D5DB", padding:"8px 14px", borderRadius:20, fontSize:13 }}>{e}</span>
              ))}
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"52px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:900, marginBottom:12 }}>Book Your Adelaide Oval Transfer</h2>
          <p style={{ color:"#6B7280", marginBottom:24 }}>Fixed price · No surge · Pre-book return</p>
          <Link href="/book?to=Adelaide+Oval" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
