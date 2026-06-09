import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Long Distance Chauffeur Adelaide | SA Country & Interstate Transfers",
  description: "Long distance chauffeur from Adelaide — Barossa, McLaren Vale, Kangaroo Island, Port Augusta, Mount Gambier, Victor Harbor and beyond. Fixed price, professional driver.",
  keywords: ["long distance chauffeur Adelaide","Adelaide country transfer","Adelaide to Kangaroo Island chauffeur","Adelaide to Victor Harbor transfer","Adelaide interstate chauffeur","SA long distance car hire"],
  alternates: { canonical: `${S}/services/long-distance` },
};
const routes = [
  { to:"Barossa Valley", dist:"~70 km", time:"~60 min", sedan:"$192", suv:"$225" },
  { to:"McLaren Vale", dist:"~45 km", time:"~50 min", sedan:"$152", suv:"$180" },
  { to:"Victor Harbor", dist:"~80 km", time:"~75 min", sedan:"$195", suv:"$230" },
  { to:"Mount Barker", dist:"~45 km", time:"~42 min", sedan:"$148", suv:"$175" },
  { to:"Port Augusta", dist:"~310 km", time:"~3.5 hrs", sedan:"$520", suv:"$620" },
  { to:"Mount Gambier", dist:"~450 km", time:"~5 hrs", sedan:"$740", suv:"$890" },
  { to:"Coonawarra", dist:"~380 km", time:"~4.5 hrs", sedan:"$640", suv:"$760" },
  { to:"Kangaroo Island (ferry)", dist:"~110 km", time:"~100 min to Penneshaw", sedan:"$280", suv:"$330" },
];
export default function LongDistancePage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#000d07 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🛣 SERVICE</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Long Distance Chauffeur<br /><span style={{ color:"#C9A84C" }}>Adelaide & South Australia</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:580, margin:"0 auto 28px", lineHeight:1.7 }}>Whether it's a country retreat, wine region visit or a cross-state transfer — we drive you door-to-door across South Australia. Fixed price, professional chauffeur, no surprises.</p>
          <Link href="/book?service=long-distance" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Get a Long Distance Quote →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <h2 style={{ color:"#fff", fontSize:24, fontWeight:800, marginBottom:24 }}>Long Distance Fares from Adelaide</h2>
            <div style={{ overflowX:"auto", marginBottom:36 }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"#17171A" }}>
                    {["Destination","Distance","Time","Sedan","SUV"].map(h => <th key={h} style={{ color:"#C9A84C", padding:"12px 16px", textAlign:"left", fontSize:13 }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {routes.map(r => (
                    <tr key={r.to} style={{ borderBottom:"1px solid #2A2A30" }}>
                      <td style={{ color:"#fff", padding:"12px 16px", fontSize:13 }}>{r.to}</td>
                      <td style={{ color:"#6B7280", padding:"12px 16px", fontSize:13 }}>{r.dist}</td>
                      <td style={{ color:"#6B7280", padding:"12px 16px", fontSize:13 }}>{r.time}</td>
                      <td style={{ color:"#C9A84C", padding:"12px 16px", fontSize:13, fontWeight:700 }}>{r.sedan}</td>
                      <td style={{ color:"#C9A84C", padding:"12px 16px", fontSize:13, fontWeight:700 }}>{r.suv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:32 }}>
              <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:22 }}>
                <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:12 }}>✅ What's Included</p>
                <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                  {["All fuel — no extra charges","All tolls included","Complimentary water","Luggage assistance","Professional uniformed driver","Free 15-minute wait on arrival"].map(f => (
                    <li key={f} style={{ color:"#9CA3AF", fontSize:13, padding:"5px 0", borderBottom:"1px solid #2A2A30" }}>✓ {f}</li>
                  ))}
                </ul>
              </div>
              <div style={{ background:"#17171A", borderRadius:14, padding:22, border:"1px solid #2A2A30" }}>
                <p style={{ color:"#fff", fontWeight:700, fontSize:14, marginBottom:12 }}>Popular Long Distance Uses</p>
                <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                  {["Kangaroo Island holiday (ferry point transfer)","Coonawarra wine region visit","Victor Harbor / Goolwa weekend","Country property transfers","Mine site / FIFO transfers","Barossa full-day wine tour return"].map(u => (
                    <li key={u} style={{ color:"#9CA3AF", fontSize:13, padding:"5px 0", borderBottom:"1px solid #2A2A30" }}>→ {u}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:22 }}>
              <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:8 }}>📍 Destination Not Listed?</p>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.7 }}>We service all of South Australia. If your destination isn't above, use the booking form for an instant quote — or call us at <a href="tel:+61880000000" style={{ color:"#C9A84C" }}>+61 8 8000 0000</a> for a custom long-distance quote within minutes.</p>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"52px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:900, marginBottom:12 }}>Book Your Long Distance Transfer</h2>
          <p style={{ color:"#6B7280", marginBottom:24 }}>Fixed price · All of South Australia · 24/7</p>
          <Link href="/book?service=long-distance" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
