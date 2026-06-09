import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Adelaide Airport to McLaren Vale Chauffeur | Private Transfer ADL → Wineries",
  description: "Private luxury transfer from Adelaide Airport direct to McLaren Vale wineries and accommodation. From $155 — sedan, SUV, van. Flight tracking included. Book instantly.",
  keywords: ["Adelaide Airport to McLaren Vale","ADL airport McLaren Vale transfer","chauffeur airport to McLaren Vale","private transfer airport McLaren Vale","d'Arenberg airport pickup","McLaren Vale winery transfer from airport"],
  alternates: { canonical: `${S}/routes/adelaide-airport-to-mclaren-vale` },
};
export default function AirportToMcLarenValePage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0f0a00 100%)", padding:"80px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>✈ ADL AIRPORT → 🍷 McLAREN VALE</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:800, margin:"0 auto 18px" }}>
            Adelaide Airport to McLaren Vale<br /><span style={{ color:"#C9A84C" }}>Direct Private Chauffeur</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:17, maxWidth:580, margin:"0 auto 30px", lineHeight:1.7 }}>
            Land at ADL and head straight to McLaren Vale wine country — no connection needed. Fixed $155, private vehicle, flight tracking included.
          </p>
          <Link href="/book?from=Adelaide+Airport&to=McLaren+Vale" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"17px 42px", borderRadius:14, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book — from $155 →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:14, marginBottom:36 }}>
              {[["Distance","~50 km"],["Travel Time","~52 min"],["Sedan","$155"],["SUV","$208"],["Van","$255"],["Flight Tracking","Included"]].map(([l,v]) => (
                <div key={l} style={{ background:"#17171A", borderRadius:14, padding:18, border:"1px solid #2A2A30", textAlign:"center" }}>
                  <p style={{ color:"#6B7280", fontSize:11, marginBottom:5 }}>{l}</p><p style={{ color:"#C9A84C", fontWeight:900, fontSize:20 }}>{v}</p>
                </div>
              ))}
            </div>
            <h2 style={{ color:"#fff", fontSize:24, fontWeight:800, marginBottom:20 }}>Popular McLaren Vale Drop-offs</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 }}>
              {["d'Arenberg Cube — Osborn Road","Wirra Wirra Winery","The Victory Hotel","McLaren Vale township","Serafino Wines & Resort","Coriole Vineyards","Chapel Hill Winery","McLaren Vale holiday accommodation"].map(loc => (
                <div key={loc} style={{ background:"#17171A", borderRadius:12, padding:"14px 16px", border:"1px solid #2A2A30", display:"flex", gap:10 }}>
                  <span style={{ color:"#C9A84C" }}>📍</span><span style={{ color:"#D1D5DB", fontSize:13 }}>{loc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"56px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:28, fontWeight:900, marginBottom:12 }}>Book Your Airport → McLaren Vale Transfer</h2>
          <p style={{ color:"#6B7280", marginBottom:28 }}>Fixed price · Private vehicle · No shared shuttles</p>
          <Link href="/book?from=Adelaide+Airport&to=McLaren+Vale" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"17px 44px", borderRadius:13, fontWeight:900, fontSize:17, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
