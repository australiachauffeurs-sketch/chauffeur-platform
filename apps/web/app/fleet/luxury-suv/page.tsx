import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Luxury SUV Chauffeur Adelaide | Lexus LX & Mercedes GLE Hire",
  description: "Premium SUV chauffeur in Adelaide. Lexus LX and Mercedes GLE — airport transfers for families, groups and wine tours from $109. 4 passengers, 4 large bags.",
  keywords: ["luxury SUV chauffeur Adelaide","Lexus chauffeur Adelaide","Mercedes GLE chauffeur Adelaide","SUV airport transfer Adelaide","family chauffeur SUV Adelaide","group SUV hire Adelaide"],
  alternates: { canonical: `${S}/fleet/luxury-suv` },
};
export default function LuxurySUVPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#080d0a 100%)", padding:"72px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🚙 ELITE CHAUFFEURS FLEET</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Luxury SUV<br /><span style={{ color:"#C9A84C" }}>Lexus LX · Mercedes GLE</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:540, margin:"0 auto 28px", lineHeight:1.7 }}>Space, prestige and elevated comfort. Our luxury SUV fleet handles airport runs with heavy luggage, wine region tours with groups, and anything else that needs a bigger, bolder vehicle.</p>
          <Link href="/book?vehicle=suv" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Luxury SUV →</Link>
        </section>
        <section style={{ padding:"52px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
            <div style={{ background:"#17171A", borderRadius:16, padding:24, border:"1px solid #2A2A30" }}>
              <h2 style={{ color:"#C9A84C", fontWeight:700, fontSize:17, marginBottom:16 }}>Vehicle Specs</h2>
              {[["Vehicles","Lexus LX / Mercedes GLE"],["Capacity","1–4 passengers"],["Luggage","4 large bags"],["Year","2023–2025 models"],["Interior","Premium leather, panoramic roof"],["Amenities","Water, charger, extra cargo space"]].map(([l,v]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #2A2A30" }}>
                  <span style={{ color:"#6B7280", fontSize:13 }}>{l}</span>
                  <span style={{ color:"#fff", fontSize:13 }}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ color:"#fff", fontSize:18, fontWeight:700, marginBottom:14 }}>Pricing</h3>
              {[["Airport Transfer","From $109"],["Hourly Hire","$155/hr (min 2hrs)"],["Wine Tour (half-day)","$450"],["Wine Tour (full-day)","$695"],["Wedding (3hrs)","$450"]].map(([s,p]) => (
                <div key={s} style={{ background:"#17171A", borderRadius:12, padding:"14px 16px", border:"1px solid #2A2A30", marginBottom:8, display:"flex", justifyContent:"space-between" }}>
                  <span style={{ color:"#fff", fontSize:13 }}>{s}</span>
                  <span style={{ color:"#C9A84C", fontWeight:700, fontSize:14 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ maxWidth:860, margin:"24px auto 0", background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:20 }}>
            <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:8 }}>When to Choose the SUV</p>
            <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.7 }}>4+ bags from the airport, families with kids, wine tours where you'll be picking up bottles, Adelaide Hills drives where the road quality varies — the SUV handles all of it in comfort and style.</p>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"48px 24px", textAlign:"center" }}>
          <Link href="/book?vehicle=suv" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Luxury SUV →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
