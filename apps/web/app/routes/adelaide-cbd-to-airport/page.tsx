import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Adelaide CBD to Airport Chauffeur | Drop-off Transfer from City to ADL",
  description: "Book a luxury chauffeur from Adelaide CBD to Adelaide Airport. Fixed price from $89 — sedan, SUV & van. No surge pricing. On-time guarantee. Book instantly.",
  keywords: ["Adelaide CBD to airport","city to Adelaide Airport transfer","Adelaide CBD airport chauffeur","central Adelaide airport drop off","luxury car city to ADL","private transfer Adelaide city to airport"],
  alternates: { canonical: `${S}/routes/adelaide-cbd-to-airport` },
};
const SCHEMA = { "@context":"https://schema.org","@type":"TaxiService","name":"Adelaide CBD to Airport Chauffeur Transfer","description":"Luxury private chauffeur drop-off from Adelaide CBD to Adelaide Airport (ADL). Fixed fare from $89.","offers":{"@type":"Offer","price":"89","priceCurrency":"AUD"},"provider":{"@type":"LocalBusiness","name":"Elite Chauffeurs Australia","telephone":"+61 8 8000 0000"} };
export default function CBDToAirportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0a0a1a 100%)", padding:"80px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🏙 ADELAIDE CBD → ✈ ADL AIRPORT</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:800, margin:"0 auto 18px" }}>
            Adelaide CBD to Airport<br /><span style={{ color:"#C9A84C" }}>Luxury Chauffeur Drop-Off</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:17, maxWidth:580, margin:"0 auto 30px", lineHeight:1.7 }}>
            Door-to-door from your hotel, office or home in the CBD — straight to the terminal. Fixed price, zero stress. Never miss a flight.
          </p>
          <Link href="/book?from=Adelaide+CBD&to=Adelaide+Airport" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"17px 42px", borderRadius:14, fontWeight:900, fontSize:16, textDecoration:"none" }}>
            Book from $89 →
          </Link>
        </section>
        <section style={{ padding:"60px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16, marginBottom:40 }}>
              {[["Distance","~6 km"],["Travel Time","~25 min"],["Sedan","$89"],["SUV","$120"],["Van (7 pax)","$150"],["Availability","24/7"]].map(([l,v]) => (
                <div key={l} style={{ background:"#17171A", borderRadius:14, padding:20, border:"1px solid #2A2A30", textAlign:"center" }}>
                  <p style={{ color:"#6B7280", fontSize:11, marginBottom:6 }}>{l}</p><p style={{ color:"#C9A84C", fontWeight:900, fontSize:22 }}>{v}</p>
                </div>
              ))}
            </div>
            <h2 style={{ color:"#fff", fontSize:24, fontWeight:800, marginBottom:20 }}>Popular City Pickup Points</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:12 }}>
              {["InterContinental Adelaide — North Terrace","Mayfair Hotel — King William Street","Sofitel Adelaide — Currie Street","Adelaide Convention Centre","Rundle Mall & surrounds","Parliament House precinct","North Terrace cultural precinct","Adelaide Oval — War Memorial Drive","Adelaide Railway Station","Victoria Square / Tarntanyangga"].map(loc => (
                <div key={loc} style={{ background:"#17171A", borderRadius:12, padding:"14px 16px", border:"1px solid #2A2A30", display:"flex", gap:10 }}>
                  <span style={{ color:"#C9A84C" }}>📍</span><span style={{ color:"#D1D5DB", fontSize:13 }}>{loc}</span>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:16, padding:24, marginTop:32 }}>
              <h3 style={{ color:"#C9A84C", fontWeight:700, fontSize:15, marginBottom:10 }}>✈ When Should I Leave?</h3>
              <p style={{ color:"#9CA3AF", fontSize:14, lineHeight:1.7 }}>
                Domestic flights: allow at least 90 minutes before departure. International flights: allow 3 hours. Rush hour (7:30–9am, 4:30–6:30pm) on Sir Donald Bradman Drive adds 5–15 minutes — your chauffeur factors this in automatically when you book.
              </p>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"60px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:28, fontWeight:900, marginBottom:12 }}>Book Your CBD → Airport Transfer</h2>
          <p style={{ color:"#6B7280", marginBottom:28 }}>Instant confirmation · Fixed price · Never miss a flight</p>
          <Link href="/book?from=Adelaide+CBD&to=Adelaide+Airport" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"17px 44px", borderRadius:13, fontWeight:900, fontSize:17, textDecoration:"none" }}>Book Now — from $89 →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
