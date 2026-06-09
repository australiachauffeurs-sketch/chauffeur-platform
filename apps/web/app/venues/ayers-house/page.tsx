import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Ayers House Chauffeur | Wedding, Gala Dinner & Event Car Service Adelaide",
  description: "Luxury chauffeur for Ayers House weddings, gala dinners and private events on North Terrace. Arrive in style — chauffeur drops at the heritage front entrance. From $65.",
  keywords: ["Ayers House chauffeur","Ayers House wedding car","Ayers House gala dinner transport","chauffeur North Terrace Adelaide","Ayers House event car","luxury car Ayers House"],
  alternates: { canonical: `${S}/venues/ayers-house` },
};
export default function AyersHousePage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0a0800 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>🏛 AYERS HOUSE — NORTH TERRACE, ADELAIDE</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Chauffeur for Ayers House<br /><span style={{ color:"#C9A84C" }}>Weddings · Galas · Private Events</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:580, margin:"0 auto 28px", lineHeight:1.7 }}>Adelaide's most prestigious heritage venue deserves an arrival to match. Your chauffeur delivers you to the sandstone entrance of Ayers House — impeccably dressed and precisely on time.</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/book?to=Ayers+House+Adelaide" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 36px", borderRadius:13, fontWeight:900, fontSize:15, textDecoration:"none" }}>Book Event Transfer →</Link>
            <Link href="/services/wedding-cars" style={{ display:"inline-block", border:"2px solid #C9A84C", color:"#C9A84C", padding:"15px 36px", borderRadius:13, fontWeight:700, fontSize:15, textDecoration:"none" }}>View Wedding Cars →</Link>
          </div>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <h2 style={{ color:"#fff", fontSize:24, fontWeight:800, marginBottom:28 }}>Our Ayers House Services</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:16, marginBottom:32 }}>
              {[
                { icon:"💍", title:"Wedding Day Transfers", desc:"Bridal car arrival, bridal party shuttle, guest transport and honeymoon sendoff" },
                { icon:"🥂", title:"Gala Dinner Transport", desc:"Return service from CBD hotels and suburbs — pre-booked fixed fare, no surge" },
                { icon:"🎂", title:"Private Celebration Packages", desc:"Milestone birthdays, anniversaries, engagement dinners — we handle the transport" },
                { icon:"🤝", title:"Corporate Event Transport", desc:"Multi-vehicle coordination for corporate dinners, product launches and client events" },
              ].map(s => (
                <div key={s.title} style={{ background:"#17171A", borderRadius:16, padding:22, border:"1px solid #2A2A30" }}>
                  <div style={{ fontSize:32, marginBottom:12 }}>{s.icon}</div>
                  <h3 style={{ color:"#C9A84C", fontWeight:700, fontSize:15, marginBottom:8 }}>{s.title}</h3>
                  <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
              {[["CBD hotels → Ayers House","$48","~5 min"],["Glenelg → Ayers House","$82","~22 min"],["Airport → Ayers House","$89","~25 min"],["Norwood → Ayers House","$62","~15 min"]].map(([r,p,t]) => (
                <div key={r} style={{ background:"#17171A", borderRadius:14, padding:"18px 20px", border:"1px solid #2A2A30" }}>
                  <p style={{ color:"#fff", fontWeight:600, fontSize:13, marginBottom:4 }}>{r}</p>
                  <p style={{ color:"#C9A84C", fontWeight:900, fontSize:20 }}>{p}</p>
                  <p style={{ color:"#6B7280", fontSize:11 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"52px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:900, marginBottom:12 }}>Book Your Ayers House Chauffeur</h2>
          <p style={{ color:"#6B7280", marginBottom:24 }}>Heritage elegance, modern luxury transport</p>
          <Link href="/book?to=Ayers+House+Adelaide" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
