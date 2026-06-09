import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Luxury Sedan Chauffeur Adelaide | Mercedes E-Class & BMW 5 Series",
  description: "Adelaide's premier luxury sedan chauffeur. Late-model Mercedes-Benz E-Class and BMW 5 Series — airport transfers from $89, corporate hire from $125/hr.",
  keywords: ["luxury sedan chauffeur Adelaide","Mercedes chauffeur Adelaide","BMW chauffeur Adelaide","sedan airport transfer Adelaide","executive sedan hire Adelaide"],
  alternates: { canonical: `${S}/fleet/luxury-sedan` },
};
export default function LuxurySedanPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0a0f18 100%)", padding:"72px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🚘 ELITE CHAUFFEURS FLEET</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Luxury Sedan<br /><span style={{ color:"#C9A84C" }}>Mercedes E-Class · BMW 5 Series</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:540, margin:"0 auto 28px", lineHeight:1.7 }}>The classic executive choice. Late-model European sedan, suited chauffeur, complimentary water — the standard for airport transfers and corporate travel in Adelaide.</p>
          <Link href="/book?vehicle=sedan" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Luxury Sedan →</Link>
        </section>
        <section style={{ padding:"52px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
            <div style={{ background:"#17171A", borderRadius:16, padding:24, border:"1px solid #2A2A30" }}>
              <h2 style={{ color:"#C9A84C", fontWeight:700, fontSize:17, marginBottom:16 }}>Vehicle Specs</h2>
              {[["Vehicles","Mercedes E-Class / BMW 5 Series"],["Capacity","1–3 passengers"],["Luggage","2 large bags"],["Year","2023–2025 models"],["Interior","Black leather, climate control"],["Amenities","Water, charger, Wi-Fi available"]].map(([l,v]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #2A2A30" }}>
                  <span style={{ color:"#6B7280", fontSize:13 }}>{l}</span>
                  <span style={{ color:"#fff", fontSize:13 }}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ color:"#fff", fontSize:18, fontWeight:700, marginBottom:14 }}>Pricing</h3>
              {[["Airport Transfer","From $89"],["Hourly Hire","$125/hr (min 2hrs)"],["Wine Tour (half-day)","$395"],["Wine Tour (full-day)","$595"],["Wedding (3hrs)","$350"]].map(([s,p]) => (
                <div key={s} style={{ background:"#17171A", borderRadius:12, padding:"14px 16px", border:"1px solid #2A2A30", marginBottom:8, display:"flex", justifyContent:"space-between" }}>
                  <span style={{ color:"#fff", fontSize:13 }}>{s}</span>
                  <span style={{ color:"#C9A84C", fontWeight:700, fontSize:14 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"48px 24px", textAlign:"center" }}>
          <Link href="/book?vehicle=sedan" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Luxury Sedan →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
