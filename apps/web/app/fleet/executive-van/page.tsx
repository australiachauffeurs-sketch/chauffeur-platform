import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Executive Van Chauffeur Adelaide | Group Airport Transfers & Corporate Shuttle",
  description: "Adelaide executive van hire — Mercedes Vito, up to 7 passengers. Group airport transfers, corporate delegate shuttles, conference transport from $135. 24/7 availability.",
  keywords: ["executive van hire Adelaide","group airport transfer Adelaide","corporate shuttle Adelaide","Mercedes Vito chauffeur Adelaide","group chauffeur van Adelaide","conference transport Adelaide"],
  alternates: { canonical: `${S}/fleet/executive-van` },
};
export default function ExecutiveVanPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#000d0a 100%)", padding:"72px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🚐 ELITE CHAUFFEURS FLEET</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Executive Van<br /><span style={{ color:"#C9A84C" }}>Groups · Delegates · Conferences</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:540, margin:"0 auto 28px", lineHeight:1.7 }}>Up to 7 passengers, 8 large bags, suited chauffeur. The smart choice for group airport transfers, delegate transport and corporate events in Adelaide.</p>
          <Link href="/book?vehicle=van" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Executive Van →</Link>
        </section>
        <section style={{ padding:"52px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
            <div style={{ background:"#17171A", borderRadius:16, padding:24, border:"1px solid #2A2A30" }}>
              <h2 style={{ color:"#C9A84C", fontWeight:700, fontSize:17, marginBottom:16 }}>Van Specs</h2>
              {[["Vehicles","Mercedes Vito / Toyota HiAce"],["Capacity","Up to 7 passengers"],["Luggage","8 large bags"],["Year","2022–2025 models"],["Interior","Climate control, comfortable seating"],["For","Groups, families, conferences"]].map(([l,v]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #2A2A30" }}>
                  <span style={{ color:"#6B7280", fontSize:13 }}>{l}</span>
                  <span style={{ color:"#fff", fontSize:13 }}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ color:"#fff", fontSize:18, fontWeight:700, marginBottom:14 }}>Pricing</h3>
              {[["Group Airport Transfer","From $135"],["Hourly Hire","$175/hr (min 2hrs)"],["Conference Shuttle (half-day)","$520"],["Conference Shuttle (full-day)","$980"],["Group Wine Tour (full-day)","$850"]].map(([s,p]) => (
                <div key={s} style={{ background:"#17171A", borderRadius:12, padding:"14px 16px", border:"1px solid #2A2A30", marginBottom:8, display:"flex", justifyContent:"space-between" }}>
                  <span style={{ color:"#fff", fontSize:13 }}>{s}</span>
                  <span style={{ color:"#C9A84C", fontWeight:700, fontSize:14 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"48px 24px", textAlign:"center" }}>
          <Link href="/book?vehicle=van" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Executive Van →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
