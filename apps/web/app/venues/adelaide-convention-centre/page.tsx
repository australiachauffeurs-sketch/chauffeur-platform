import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Adelaide Convention Centre Chauffeur | Conference & Event Transfer Service",
  description: "Professional chauffeur service for Adelaide Convention Centre events, conferences, gala dinners and exhibitions. Multi-vehicle coordination, corporate accounts, 24/7 availability.",
  keywords: ["Adelaide Convention Centre chauffeur","chauffeur convention centre Adelaide","conference transfer Adelaide","Adelaide CC event transport","gala dinner chauffeur Adelaide","AIME Adelaide chauffeur","exhibition transfer Adelaide"],
  alternates: { canonical: `${S}/venues/adelaide-convention-centre` },
};
export default function ConventionCentrePage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d0d1a 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🎪 ADELAIDE CONVENTION CENTRE — NORTH TERRACE</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Chauffeur for Adelaide<br /><span style={{ color:"#C9A84C" }}>Convention Centre Events</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:580, margin:"0 auto 28px", lineHeight:1.7 }}>Conferences, gala dinners, exhibitions, awards nights and corporate events — with coordinated multi-vehicle transport for your delegates and VIP guests.</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/book?to=Adelaide+Convention+Centre" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 36px", borderRadius:13, fontWeight:900, fontSize:15, textDecoration:"none" }}>Book Event Transfer →</Link>
            <Link href="/corporate-accounts" style={{ display:"inline-block", border:"2px solid #C9A84C", color:"#C9A84C", padding:"15px 36px", borderRadius:13, fontWeight:700, fontSize:15, textDecoration:"none" }}>Corporate Account →</Link>
          </div>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <h2 style={{ color:"#fff", fontSize:24, fontWeight:800, marginBottom:28 }}>Event Transport We Coordinate</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
              {[
                { icon:"🎤", title:"Conferences & Summits", desc:"Airport pickup for speakers, delegate shuttle from CBD hotels, coordinated departure" },
                { icon:"🥂", title:"Gala Dinners & Awards", desc:"Return service from CBD hotels and suburbs — no surge pricing after the event" },
                { icon:"🤝", title:"Exhibitions & Trade Shows", desc:"Multi-day event transport for exhibitors, VIP clients and visiting executives" },
                { icon:"🌏", title:"International Delegate Programmes", desc:"Airport pickup, hotel transfers and full-programme transport management" },
              ].map(s => (
                <div key={s.title} style={{ background:"#17171A", borderRadius:16, padding:22, border:"1px solid #2A2A30" }}>
                  <div style={{ fontSize:32, marginBottom:12 }}>{s.icon}</div>
                  <h3 style={{ color:"#C9A84C", fontWeight:700, fontSize:15, marginBottom:8 }}>{s.title}</h3>
                  <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:22, marginTop:28 }}>
              <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:8 }}>📍 ACC Pickup & Drop-off</p>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.6 }}>North Terrace entrance — Riverbank Precinct. For large events, we coordinate with your event organiser for designated pickup bays. Corporate fleet pricing available for 10+ vehicle bookings.</p>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"52px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:900, marginBottom:12 }}>Book Event Transport</h2>
          <p style={{ color:"#6B7280", marginBottom:24 }}>Single bookings or multi-vehicle coordination — we handle both</p>
          <Link href="/book?to=Adelaide+Convention+Centre" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
