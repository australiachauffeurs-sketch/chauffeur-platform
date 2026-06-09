import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Adelaide Airport to Hahndorf Chauffeur | Fixed Price $138 | Private Transfer",
  description: "Private chauffeur from Adelaide Airport to Hahndorf. Fixed price $138 — no surge, no meter, 38-minute direct transfer to the Adelaide Hills. Book online, pay fixed.",
  keywords: ["Adelaide Airport to Hahndorf","airport transfer Hahndorf","Hahndorf chauffeur from airport","ADL to Hahndorf private car","Hahndorf Adelaide Hills transfer","airport taxi Hahndorf price"],
  alternates: { canonical: `${S}/routes/adelaide-airport-to-hahndorf` },
};
const schema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "Adelaide Airport to Hahndorf Chauffeur Transfer",
  provider: { "@type": "LocalBusiness", name: "Elite Chauffeurs Australia" },
  areaServed: [{ "@type": "City", name: "Adelaide" }, { "@type": "Place", name: "Hahndorf" }],
  offers: { "@type": "Offer", price: "138", priceCurrency: "AUD", availability: "https://schema.org/InStock" },
};
export default function AirportToHahndorfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d0700 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>✈️ ADELAIDE AIRPORT → HAHNDORF</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Airport to Hahndorf Chauffeur<br /><span style={{ color:"#C9A84C" }}>Fixed Price $138 · 38 Minutes</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:560, margin:"0 auto 28px", lineHeight:1.7 }}>Arrive at Adelaide Airport and head straight to the Adelaide Hills. No taxi queues, no surge pricing — your private chauffeur meets you in the arrivals hall with a name board.</p>
          <Link href="/book?from=Adelaide+Airport&to=Hahndorf" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book This Route — $138 →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:32 }}>
              <div style={{ background:"#17171A", borderRadius:16, padding:24, border:"1px solid #2A2A30" }}>
                <h2 style={{ color:"#C9A84C", fontWeight:700, fontSize:16, marginBottom:16 }}>Journey Details</h2>
                {[["From","Adelaide Airport (ADL)"],["To","Hahndorf, Adelaide Hills"],["Distance","~30 km"],["Drive time","~38 minutes"],["Fixed fare","$138"],["Vehicles","Sedan, SUV, Van"]].map(([l,v]) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #2A2A30" }}>
                    <span style={{ color:"#6B7280", fontSize:13 }}>{l}</span>
                    <span style={{ color:"#fff", fontSize:13, fontWeight:600 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ background:"#17171A", borderRadius:16, padding:24, border:"1px solid #2A2A30" }}>
                <h3 style={{ color:"#C9A84C", fontWeight:700, fontSize:16, marginBottom:16 }}>Hahndorf Drop-off Locations</h3>
                <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                  {["The Hahndorf Inn","Hahndorf Resort","The Cedars (Hans Heysen)","Beerenberg Farm","Stirling Hotel","Private residential addresses","Hahndorf Main Street shops","Ambleside Distillers"].map(p => (
                    <li key={p} style={{ color:"#9CA3AF", fontSize:13, padding:"6px 0", borderBottom:"1px solid #2A2A30" }}>📍 {p}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:22 }}>
              <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:10 }}>🛬 Flight Tracking Included</p>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.6 }}>Your chauffeur monitors your flight in real time. If your Qantas, Jetstar or Rex flight is delayed, your driver adjusts — no calls needed from you. Wait time after landing is included at no extra cost.</p>
            </div>
            <div style={{ marginTop:28 }}>
              <h3 style={{ color:"#fff", fontSize:18, fontWeight:700, marginBottom:14 }}>Also From Hahndorf</h3>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                {[["Hahndorf → Barossa Valley","$148"],["Hahndorf → McLaren Vale","$145"],["Hahndorf → CBD","$98"],["Hahndorf → Glenelg","$122"],["Hahndorf → Airport","$138"]].map(([r,p]) => (
                  <div key={r} style={{ background:"#17171A", border:"1px solid #2A2A30", borderRadius:12, padding:"10px 16px" }}>
                    <span style={{ color:"#fff", fontSize:13 }}>{r} — </span>
                    <span style={{ color:"#C9A84C", fontWeight:700, fontSize:13 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"52px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:900, marginBottom:12 }}>Book Adelaide Airport → Hahndorf</h2>
          <p style={{ color:"#6B7280", marginBottom:24 }}>Fixed $138 · Flight tracked · Driver meets you in arrivals</p>
          <Link href="/book?from=Adelaide+Airport&to=Hahndorf" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
