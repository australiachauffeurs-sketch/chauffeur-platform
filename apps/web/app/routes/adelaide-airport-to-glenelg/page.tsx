import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Adelaide Airport to Glenelg Chauffeur | Private Transfer ADL → Glenelg Beach",
  description: "Luxury private transfer from Adelaide Airport (ADL) to Glenelg beach. From $95 — meet & greet, luggage assistance, door-to-hotel service. Book instantly.",
  keywords: ["Adelaide Airport to Glenelg","ADL airport Glenelg transfer","chauffeur Adelaide Airport Glenelg","private transfer airport to Glenelg","Stamford Grand pickup from airport","Glenelg hotel airport transfer"],
  alternates: { canonical: `${S}/routes/adelaide-airport-to-glenelg` },
};
export default function AirportToGlenelgPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0a0f18 100%)", padding:"80px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>✈ ADL AIRPORT → 🌊 GLENELG BEACH</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:800, margin:"0 auto 18px" }}>
            Adelaide Airport to Glenelg<br /><span style={{ color:"#C9A84C" }}>Private Chauffeur Transfer</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:17, maxWidth:580, margin:"0 auto 30px", lineHeight:1.7 }}>
            Land at ADL and arrive at Glenelg beach in 30 minutes. Fixed $95 — no meter, no sharing, straight to your hotel or home.
          </p>
          <Link href="/book?from=Adelaide+Airport&to=Glenelg" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"17px 42px", borderRadius:14, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book — from $95 →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:14, marginBottom:36 }}>
              {[["Distance","~14 km"],["Travel Time","~30 min"],["Sedan","$95"],["SUV","$128"],["Van","$160"],["Flight Tracking","Included"]].map(([l,v]) => (
                <div key={l} style={{ background:"#17171A", borderRadius:14, padding:18, border:"1px solid #2A2A30", textAlign:"center" }}>
                  <p style={{ color:"#6B7280", fontSize:11, marginBottom:5 }}>{l}</p><p style={{ color:"#C9A84C", fontWeight:900, fontSize:20 }}>{v}</p>
                </div>
              ))}
            </div>
            <h2 style={{ color:"#fff", fontSize:24, fontWeight:800, marginBottom:20 }}>Glenelg Drop-off Locations</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 }}>
              {["Stamford Grand Glenelg — Moseley Square","Glenelg Beach apartments — any address","Holdfast Shores marina","Jetty Road restaurants & hotels","Glenelg North & Glenelg South residential","Brighton & Hove — nearby coastal suburbs"].map(loc => (
                <div key={loc} style={{ background:"#17171A", borderRadius:12, padding:"14px 16px", border:"1px solid #2A2A30", display:"flex", gap:10 }}>
                  <span style={{ color:"#C9A84C" }}>📍</span><span style={{ color:"#D1D5DB", fontSize:13 }}>{loc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"56px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:28, fontWeight:900, marginBottom:12 }}>Book Airport → Glenelg Transfer</h2>
          <p style={{ color:"#6B7280", marginBottom:28 }}>Instant confirmation · Flight tracking · Meet & greet</p>
          <Link href="/book?from=Adelaide+Airport&to=Glenelg" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"17px 44px", borderRadius:13, fontWeight:900, fontSize:17, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
