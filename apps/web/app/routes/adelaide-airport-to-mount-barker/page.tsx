import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Adelaide Airport to Mount Barker Transfer | Private Chauffeur ADL → Hills",
  description: "Private luxury chauffeur from Adelaide Airport to Mount Barker and Adelaide Hills. Fixed $145 — meet & greet, flight tracking, door-to-door. Book instantly.",
  keywords: ["Adelaide Airport to Mount Barker","ADL airport Mount Barker transfer","chauffeur airport Adelaide Hills","private transfer airport Mount Barker","Adelaide Airport Hills transfer"],
  alternates: { canonical: `${S}/routes/adelaide-airport-to-mount-barker` },
};
export default function AirportToMountBarkerPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d1007 100%)", padding:"80px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>✈ ADL AIRPORT → 🌿 MOUNT BARKER / ADELAIDE HILLS</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:800, margin:"0 auto 18px" }}>
            Adelaide Airport to Mount Barker<br /><span style={{ color:"#C9A84C" }}>Private Chauffeur Transfer</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:17, maxWidth:580, margin:"0 auto 30px", lineHeight:1.7 }}>
            Direct from ADL arrivals to Mount Barker, Hahndorf or anywhere in the Hills — fixed $145, no shared shuttles, no fuss.
          </p>
          <Link href="/book?from=Adelaide+Airport&to=Mount+Barker" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"17px 42px", borderRadius:14, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book — from $145 →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:14, marginBottom:36 }}>
              {[["Distance","~44 km"],["Travel Time","~45 min"],["Sedan","$145"],["SUV","$195"],["Van","$240"],["Flight Tracking","Included"]].map(([l,v]) => (
                <div key={l} style={{ background:"#17171A", borderRadius:14, padding:18, border:"1px solid #2A2A30", textAlign:"center" }}>
                  <p style={{ color:"#6B7280", fontSize:11, marginBottom:5 }}>{l}</p><p style={{ color:"#C9A84C", fontWeight:900, fontSize:20 }}>{v}</p>
                </div>
              ))}
            </div>
            <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:16 }}>Also Covering Nearby:</h2>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              {["Hahndorf (+$15)","Nairne (+$20)","Littlehampton (+$10)","Totness (+$10)","Balhannah (+$25)","Echunga (+$30)"].map(loc => (
                <span key={loc} style={{ background:"#17171A", border:"1px solid #2A2A30", color:"#D1D5DB", padding:"8px 14px", borderRadius:20, fontSize:13 }}>{loc}</span>
              ))}
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"56px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:28, fontWeight:900, marginBottom:12 }}>Book Your Airport → Hills Transfer</h2>
          <p style={{ color:"#6B7280", marginBottom:28 }}>Fixed price · Door-to-door · Flight monitoring</p>
          <Link href="/book?from=Adelaide+Airport&to=Mount+Barker" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"17px 44px", borderRadius:13, fontWeight:900, fontSize:17, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
