import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Adelaide School Formal Transport Guide 2026 | Limo, Sedan & Group Hire",
  description: "Everything parents need to know about booking formal transport in Adelaide. Prices, vehicles, timing tips and how to book a group limo for school formals in 2026.",
  keywords: ["Adelaide school formal transport","school formal limo Adelaide","Year 12 formal car Adelaide","formal night transport Adelaide","group limo hire Adelaide formal","high school formal Adelaide chauffeur"],
  alternates: { canonical: `${S}/blog/adelaide-school-formal-transport-guide` },
};
const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Adelaide School Formal Transport Guide 2026 | Limo, Sedan & Group Hire",
  author: { "@type": "Organization", name: "Elite Chauffeurs Australia" },
  datePublished: "2026-02-20",
};
export default function SchoolFormalGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d000a 100%)", padding:"72px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>FORMAL GUIDE · 2026</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:900, lineHeight:1.2, maxWidth:800, margin:"0 auto 20px" }}>
            Adelaide School Formal<br /><span style={{ color:"#C9A84C" }}>Transport Guide 2026</span>
          </h1>
          <p style={{ color:"#9CA3AF", maxWidth:580, margin:"0 auto", lineHeight:1.7, fontSize:16 }}>Your complete guide to booking formal transport in Adelaide — vehicles, prices, timing and how to get the best deal for a group.</p>
        </section>
        <article style={{ maxWidth:760, margin:"0 auto", padding:"52px 24px" }}>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:16 }}>Vehicle Options for Adelaide School Formals</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:16, marginBottom:36 }}>
            {[
              { v:"Luxury Sedan", cap:"1–3 students", price:"From $195", desc:"Best for a couple or small group arriving together. Late-model Mercedes or BMW." },
              { v:"Luxury SUV", cap:"1–4 students", price:"From $225", desc:"More space for formal attire and corsages. Great for friend groups." },
              { v:"Stretch Limousine", cap:"8–10 students", price:"From $695", desc:"The classic formal experience. Shared between a group, this works out affordable per person." },
              { v:"Executive Van", cap:"6–7 students", price:"From $345", desc:"Practical for larger groups wanting to arrive together without the limo." },
            ].map(v => (
              <div key={v.v} style={{ background:"#17171A", borderRadius:16, padding:22, border:"1px solid #2A2A30" }}>
                <p style={{ color:"#C9A84C", fontWeight:700, fontSize:15, marginBottom:4 }}>{v.v}</p>
                <p style={{ color:"#6B7280", fontSize:12, marginBottom:8 }}>{v.cap} · {v.price}</p>
                <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:16 }}>Formal Night Timeline Tips</h2>
          <div style={{ background:"#17171A", borderRadius:16, padding:22, border:"1px solid #2A2A30", marginBottom:28 }}>
            {[["4:00 PM","Pre-formal photos at home — chauffeur arrives"],["4:30 PM","Depart for pre-formal venue (park, beach, CBD)"],["5:30 PM","Pre-formal photos done, depart for venue"],["6:00 PM","Arrive at formal venue — grand entrance"],["11:30 PM","Return pick-up — home safely"],].map(([t,a]) => (
              <div key={t} style={{ display:"flex", gap:16, padding:"10px 0", borderBottom:"1px solid #2A2A30" }}>
                <span style={{ color:"#C9A84C", fontWeight:700, fontSize:13, minWidth:60 }}>{t}</span>
                <span style={{ color:"#9CA3AF", fontSize:13 }}>{a}</span>
              </div>
            ))}
          </div>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:14 }}>Booking Tips for Parents</h2>
          <ul style={{ listStyle:"none", padding:0, margin:"0 0 32px" }}>
            {["Book 6–8 weeks in advance — Adelaide formal season (Oct–Nov) books fast","Confirm the exact school venue and arrival instructions beforehand","Book return transport at the same time — after-formal rides are hard to get","Verify the vehicle capacity includes formal attire (dresses take more space)","Request a professional in a suit — impressions matter on formal night","Pay fixed price — no surge surprises"].map(t => (
              <li key={t} style={{ color:"#9CA3AF", fontSize:14, padding:"8px 0", borderBottom:"1px solid #17171A", display:"flex", gap:10 }}>
                <span style={{ color:"#C9A84C" }}>→</span>{t}
              </li>
            ))}
          </ul>
          <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:24, textAlign:"center" }}>
            <p style={{ color:"#C9A84C", fontWeight:800, fontSize:18, marginBottom:8 }}>Book Your School Formal Transport</p>
            <p style={{ color:"#9CA3AF", fontSize:13, marginBottom:20 }}>Luxury cars and stretch limos for all Adelaide school formals. Book early — October and November fill fast.</p>
            <Link href="/services/school-formals" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"14px 32px", borderRadius:12, fontWeight:900, textDecoration:"none" }}>View Formal Packages →</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
