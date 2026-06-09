import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Our Fleet | Luxury Chauffeur Vehicles Adelaide — Sedan, SUV, Limo & Van",
  description: "Browse our Adelaide luxury chauffeur fleet — late-model Mercedes, BMW sedans, Lexus SUVs, stretch limousines and executive vans. All vehicles are less than 3 years old.",
  keywords: ["luxury chauffeur fleet Adelaide","chauffeur car Adelaide","Mercedes chauffeur Adelaide","BMW chauffeur Adelaide","stretch limousine Adelaide","luxury SUV hire Adelaide","executive van Adelaide"],
  alternates: { canonical: `${S}/fleet` },
};
const vehicles = [
  { name:"Luxury Sedan", tagline:"The executive standard", capacity:"1–3 passengers · 2 large bags", from:"$89", link:"/fleet/luxury-sedan", features:["Mercedes-Benz E-Class or BMW 5 Series","Climate control + leather interior","Complimentary water & phone charger","Suited for airport, corporate, events"] },
  { name:"Luxury SUV", tagline:"Space and prestige", capacity:"1–4 passengers · 4 large bags", from:"$109", link:"/fleet/luxury-suv", features:["Lexus LX or Mercedes GLE","Elevated ride, commanding presence","Ideal for groups and families","Extra luggage space for wine tours"] },
  { name:"Stretch Limousine", tagline:"The grand arrival", capacity:"Up to 10 passengers", from:"$220/hr", link:"/fleet/stretch-limousine", features:["Floor-to-ceiling privacy glass","Interior lighting & sound system","Premium for weddings & school formals","Minimum 3-hour hire"] },
  { name:"Executive Van", tagline:"Group comfort", capacity:"Up to 7 passengers · 8 bags", from:"$135", link:"/fleet/executive-van", features:["Mercedes Vito or Toyota HiAce Commuter","Group airport transfers","Corporate delegate transport","Conference & event shuttles"] },
];
export default function FleetPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d0d00 100%)", padding:"72px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>ELITE CHAUFFEURS ADELAIDE</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Our Luxury<br /><span style={{ color:"#C9A84C" }}>Chauffeur Fleet</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:560, margin:"0 auto 28px", lineHeight:1.7 }}>All vehicles are less than 3 years old, immaculately maintained, and cleaned before every booking. Pick the right vehicle for your journey.</p>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(440px,1fr))", gap:24 }}>
            {vehicles.map(v => (
              <div key={v.name} style={{ background:"#17171A", borderRadius:18, padding:28, border:"1px solid #2A2A30" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                  <div>
                    <h2 style={{ color:"#fff", fontWeight:900, fontSize:22, margin:"0 0 4px" }}>{v.name}</h2>
                    <p style={{ color:"#6B7280", fontSize:13, margin:0 }}>{v.tagline}</p>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <p style={{ color:"#C9A84C", fontWeight:900, fontSize:22, margin:"0 0 2px" }}>{v.from}</p>
                    <p style={{ color:"#6B7280", fontSize:11, margin:0 }}>from</p>
                  </div>
                </div>
                <p style={{ color:"#9CA3AF", fontSize:13, marginBottom:16 }}>👥 {v.capacity}</p>
                <ul style={{ listStyle:"none", padding:0, margin:"0 0 20px" }}>
                  {v.features.map(f => <li key={f} style={{ color:"#9CA3AF", fontSize:13, padding:"5px 0", borderBottom:"1px solid #2A2A30" }}>✓ {f}</li>)}
                </ul>
                <Link href={v.link} style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"12px 24px", borderRadius:10, fontWeight:900, fontSize:13, textDecoration:"none" }}>View {v.name} →</Link>
              </div>
            ))}
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"52px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:900, marginBottom:12 }}>Ready to Book?</h2>
          <p style={{ color:"#6B7280", marginBottom:24 }}>Select your vehicle during booking — or we'll recommend the best option for your journey.</p>
          <Link href="/book" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
