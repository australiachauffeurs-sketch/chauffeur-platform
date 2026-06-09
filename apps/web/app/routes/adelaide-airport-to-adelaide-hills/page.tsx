import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Adelaide Airport to Adelaide Hills Chauffeur | Stirling, Hahndorf & Beyond",
  description: "Private chauffeur from Adelaide Airport to the Adelaide Hills — Stirling, Hahndorf, Crafers, Aldgate, Bridgewater. Fixed prices from $128. Flight tracking, meet & greet included.",
  keywords: ["Adelaide Airport to Adelaide Hills","airport transfer Adelaide Hills","chauffeur Stirling from airport","ADL airport to Hahndorf","Crafers Aldgate airport transfer","Adelaide Hills private car"],
  alternates: { canonical: `${S}/routes/adelaide-airport-to-adelaide-hills` },
};
const schema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "Adelaide Airport to Adelaide Hills Chauffeur",
  provider: { "@type": "LocalBusiness", name: "Elite Chauffeurs Australia" },
  areaServed: [{ "@type": "City", name: "Adelaide" }, { "@type": "Place", name: "Adelaide Hills" }],
  offers: { "@type": "Offer", price: "128", priceCurrency: "AUD", availability: "https://schema.org/InStock" },
};
const towns = [
  { name: "Stirling", price: "$128", time: "~30 min" },
  { name: "Hahndorf", price: "$138", time: "~38 min" },
  { name: "Crafers", price: "$118", time: "~25 min" },
  { name: "Aldgate", price: "$135", time: "~35 min" },
  { name: "Bridgewater", price: "$145", time: "~40 min" },
  { name: "Balhannah", price: "$155", time: "~45 min" },
  { name: "Lobethal", price: "$165", time: "~50 min" },
  { name: "Mount Barker", price: "$148", time: "~42 min" },
];
export default function AirportToAdelaideHillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#070d0a 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>✈️ ADELAIDE AIRPORT → ADELAIDE HILLS</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Airport to Adelaide Hills<br /><span style={{ color:"#C9A84C" }}>Stirling · Hahndorf · Crafers & Beyond</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:560, margin:"0 auto 28px", lineHeight:1.7 }}>From the terminal to your Hills retreat in 25–50 minutes. Fixed price, no surge, no meter — your private chauffeur meets you in arrivals and handles your luggage.</p>
          <Link href="/book?from=Adelaide+Airport&to=Adelaide+Hills" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Hills Transfer →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:24 }}>Fixed Prices by Adelaide Hills Town</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14, marginBottom:32 }}>
              {towns.map(t => (
                <div key={t.name} style={{ background:"#17171A", borderRadius:14, padding:"18px 20px", border:"1px solid #2A2A30" }}>
                  <p style={{ color:"#fff", fontWeight:700, fontSize:14, marginBottom:4 }}>Airport → {t.name}</p>
                  <p style={{ color:"#C9A84C", fontWeight:900, fontSize:22 }}>{t.price}</p>
                  <p style={{ color:"#6B7280", fontSize:11 }}>{t.time}</p>
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:28 }}>
              <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:20 }}>
                <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:10 }}>✅ What's Included</p>
                <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                  {["Flight tracking — free wait on delays","Meet & greet in arrivals hall","Name board & welcome message","Luggage to vehicle","Complimentary water","All tolls included in price"].map(f => (
                    <li key={f} style={{ color:"#9CA3AF", fontSize:13, padding:"5px 0", borderBottom:"1px solid #2A2A30" }}>✓ {f}</li>
                  ))}
                </ul>
              </div>
              <div style={{ background:"#17171A", borderRadius:14, padding:20, border:"1px solid #2A2A30" }}>
                <p style={{ color:"#fff", fontWeight:700, fontSize:14, marginBottom:10 }}>🚗 Available Vehicles</p>
                <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                  {[["Luxury Sedan","1-3 pax, 2 bags","$128+"],["Luxury SUV","1-4 pax, 4 bags","$148+"],["Executive Van","1-7 pax, 8 bags","$178+"]].map(([v,cap,p]) => (
                    <li key={v} style={{ padding:"8px 0", borderBottom:"1px solid #2A2A30" }}>
                      <span style={{ color:"#fff", fontSize:13, fontWeight:600 }}>{v}</span>
                      <span style={{ color:"#6B7280", fontSize:11, marginLeft:8 }}>{cap}</span>
                      <span style={{ color:"#C9A84C", fontWeight:700, fontSize:13, float:"right" }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:20 }}>
              <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:8 }}>🏡 Don't See Your Town?</p>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.6 }}>We service all Adelaide Hills towns including Woodside, Nairne, Mylor, Verdun, Kangarilla and beyond. If your suburb isn't listed, use the booking form and we'll calculate your fixed price — or call us at <a href="tel:+61880000000" style={{ color:"#C9A84C" }}>+61 8 8000 0000</a>.</p>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"52px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:900, marginBottom:12 }}>Book Your Adelaide Hills Transfer</h2>
          <p style={{ color:"#6B7280", marginBottom:24 }}>Fixed price · Flight tracked · Direct to your door</p>
          <Link href="/book?from=Adelaide+Airport&to=Adelaide+Hills" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
