import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Best Wedding Venues in Adelaide Hills 2026 — Plus Chauffeur Transport Guide",
  description: "Top Adelaide Hills wedding venues for 2026 — with chauffeur transfer prices from Adelaide CBD and airport. Hahndorf, Stirling, Balhannah and beyond.",
  keywords: ["best wedding venues Adelaide Hills","Adelaide Hills wedding venues 2026","wedding chauffeur Adelaide Hills","Hahndorf wedding venue transport","Stirling wedding venue chauffeur","Adelaide Hills wedding car"],
  alternates: { canonical: `${S}/blog/best-wedding-venues-adelaide-hills` },
};
const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Wedding Venues in Adelaide Hills 2026 — Plus Chauffeur Transport Guide",
  author: { "@type": "Organization", name: "Elite Chauffeurs Australia" },
  datePublished: "2026-03-05",
};
const venues = [
  { name:"Sequoia Lodge, Stirling", style:"Rustic luxury, forest setting", guestCap:"Up to 120", fromCBD:"$98", fromAirport:"$128", note:"One of the Hills' most sought-after venues — book 12+ months ahead" },
  { name:"Thorngrove Manor Hotel, Stirling", style:"Gothic luxury castle, ultra-exclusive", guestCap:"Up to 40 (intimate)", fromCBD:"$98", fromAirport:"$128", note:"Incredibly exclusive — perfect for intimate ceremonies" },
  { name:"The Lane Vineyard, Hahndorf", style:"Vineyard & winery, paddock-to-plate", guestCap:"Up to 200", fromCBD:"$98", fromAirport:"$138", note:"Working vineyard with exceptional cellar door restaurant" },
  { name:"Mt Lofty House, Crafers", style:"Country house estate, panoramic views", guestCap:"Up to 180", fromCBD:"$88", fromAirport:"$118", note:"One of SA's most iconic wedding venues" },
  { name:"Ravine Vineyard, McLaren Flat", style:"Vineyard, rustic barn, ocean glimpses", guestCap:"Up to 150", fromCBD:"$148", fromAirport:"$165", note:"South of the Hills — combines Hills and McLaren Vale regions" },
  { name:"Hahndorf Inn", style:"German heritage, charming garden", guestCap:"Up to 100", fromCBD:"$98", fromAirport:"$138", note:"Great for couples wanting authentic Hills character" },
];
export default function WeddingVenuesAdelaideHillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0a000d 100%)", padding:"72px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>WEDDING GUIDE · 2026</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:900, lineHeight:1.2, maxWidth:820, margin:"0 auto 20px" }}>
            Best Wedding Venues<br /><span style={{ color:"#C9A84C" }}>in the Adelaide Hills (2026)</span>
          </h1>
          <p style={{ color:"#9CA3AF", maxWidth:600, margin:"0 auto", lineHeight:1.7, fontSize:16 }}>The Adelaide Hills offer some of South Australia's most stunning wedding settings — rolling vineyards, historic manors and forest estates within an hour of Adelaide. Plus: chauffeur transfer prices from every venue.</p>
        </section>
        <article style={{ maxWidth:860, margin:"0 auto", padding:"52px 24px" }}>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:24 }}>Top Adelaide Hills Wedding Venues</h2>
          <div style={{ display:"grid", gap:20, marginBottom:40 }}>
            {venues.map(v => (
              <div key={v.name} style={{ background:"#17171A", borderRadius:16, padding:24, border:"1px solid #2A2A30" }}>
                <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:12 }}>
                  <h3 style={{ color:"#C9A84C", fontWeight:800, fontSize:17, margin:0 }}>{v.name}</h3>
                  <span style={{ background:"rgba(201,168,76,0.1)", color:"#C9A84C", padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:700 }}>{v.guestCap}</span>
                </div>
                <p style={{ color:"#fff", fontSize:13, marginBottom:8 }}>{v.style}</p>
                <p style={{ color:"#6B7280", fontSize:12, marginBottom:14 }}>💡 {v.note}</p>
                <div style={{ display:"flex", gap:20 }}>
                  <div><p style={{ color:"#6B7280", fontSize:11, margin:"0 0 2px" }}>From CBD</p><p style={{ color:"#C9A84C", fontWeight:700, fontSize:15, margin:0 }}>{v.fromCBD}</p></div>
                  <div><p style={{ color:"#6B7280", fontSize:11, margin:"0 0 2px" }}>From Airport</p><p style={{ color:"#C9A84C", fontWeight:700, fontSize:15, margin:0 }}>{v.fromAirport}</p></div>
                </div>
              </div>
            ))}
          </div>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:16 }}>Wedding Day Chauffeur Tips for Adelaide Hills Venues</h2>
          <ul style={{ listStyle:"none", padding:0, margin:"0 0 32px" }}>
            {["Book your bridal car 6–12 months ahead — Hills venues in spring/summer book fast","Consider a shuttle van for guest groups from CBD hotels to the venue","Allow 45–60 minutes travel time from Adelaide CBD to Hills venues","After-formal shuttle bookings for guests returning to Adelaide are essential — taxis are scarce in the Hills","Your bridal chauffeur can include a Hills photo stop (Stirling, Hahndorf) en route to the venue","Stretch limousines add 20–30 mins to Hills travel time — factor this into your schedule"].map(t => (
              <li key={t} style={{ color:"#9CA3AF", fontSize:14, padding:"8px 0", borderBottom:"1px solid #17171A", display:"flex", gap:10 }}>
                <span style={{ color:"#C9A84C" }}>→</span>{t}
              </li>
            ))}
          </ul>
          <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:24, textAlign:"center" }}>
            <p style={{ color:"#C9A84C", fontWeight:800, fontSize:18, marginBottom:8 }}>Book Your Adelaide Hills Wedding Chauffeur</p>
            <p style={{ color:"#9CA3AF", fontSize:13, marginBottom:20 }}>Bridal cars, guest shuttles, multi-vehicle wedding packages — all Hills venues serviced.</p>
            <Link href="/services/wedding-cars" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"14px 32px", borderRadius:12, fontWeight:900, textDecoration:"none" }}>View Wedding Packages →</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
