import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Chauffeur by the Hour Adelaide | Hourly Hire from $125/hr",
  description: "Book an Adelaide chauffeur by the hour — meetings, shopping, day use or events. Sedan from $125/hr, SUV from $155/hr. Minimum 2 hours. No hidden fees.",
  keywords: ["chauffeur by the hour Adelaide","hourly chauffeur hire Adelaide","hourly car hire Adelaide","chauffeur day hire Adelaide","Adelaide hourly car service","by the hour chauffeur Adelaide"],
  alternates: { canonical: `${S}/services/hourly-hire` },
};
export default function HourlyHirePage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background:"linear-gradient(135deg,#09090B 0%,#0d0d00 100%)", padding:"76px 24px", textAlign:"center" }}>
          <p style={{ color:"#C9A84C", fontWeight:700, letterSpacing:"0.18em", fontSize:12, marginBottom:14 }}>⏱ SERVICE</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.15, maxWidth:780, margin:"0 auto 18px" }}>
            Chauffeur by the Hour<br /><span style={{ color:"#C9A84C" }}>Adelaide Hourly Hire</span>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:16, maxWidth:560, margin:"0 auto 28px", lineHeight:1.7 }}>Need a chauffeur for a few hours? Multiple meetings across the city, a shopping trip, a day at the races — book by the hour and your driver stays with you the entire time.</p>
          <Link href="/book?service=hourly" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"16px 40px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Hourly Hire →</Link>
        </section>
        <section style={{ padding:"56px 24px", background:"#09090B" }}>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            <h2 style={{ color:"#fff", fontSize:24, fontWeight:800, marginBottom:24 }}>Hourly Hire Pricing</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16, marginBottom:36 }}>
              {[["Luxury Sedan","$125/hr","Min 2 hours","Mercedes E-Class / BMW 5 Series"],["Luxury SUV","$155/hr","Min 2 hours","Lexus LX / Mercedes GLE"],["Stretch Limo","$220/hr","Min 3 hours","Up to 10 passengers"],["Executive Van","$175/hr","Min 2 hours","Up to 7 passengers"]].map(([v,p,m,n]) => (
                <div key={v} style={{ background:"#17171A", borderRadius:16, padding:22, border:"1px solid #2A2A30" }}>
                  <p style={{ color:"#fff", fontWeight:700, fontSize:15, marginBottom:4 }}>{v}</p>
                  <p style={{ color:"#C9A84C", fontWeight:900, fontSize:26 }}>{p}</p>
                  <p style={{ color:"#6B7280", fontSize:11, marginBottom:8 }}>{m}</p>
                  <p style={{ color:"#9CA3AF", fontSize:12 }}>{n}</p>
                </div>
              ))}
            </div>
            <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, marginBottom:20 }}>Popular Hourly Hire Uses</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:14, marginBottom:32 }}>
              {[
                { icon:"💼", title:"Multi-Stop Business Day", desc:"Chauffeur waits while you attend meetings across Adelaide CBD, suburban offices and client sites" },
                { icon:"🛍", title:"Shopping & Personal Errands", desc:"Rundle Mall, King William Street, Burnside Village — driver waits, helps with bags, no parking stress" },
                { icon:"🍷", title:"Restaurant & Entertainment", desc:"Evening out — dinner in the CBD, a show, drinks after. Fixed cost, no surge on the way home" },
                { icon:"🏇", title:"Adelaide Races Day", desc:"Morphettville or Victoria Park — arrive in style, have a drink, get home safely" },
              ].map(u => (
                <div key={u.title} style={{ background:"#17171A", borderRadius:14, padding:20, border:"1px solid #2A2A30" }}>
                  <div style={{ fontSize:28, marginBottom:10 }}>{u.icon}</div>
                  <h3 style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:8 }}>{u.title}</h3>
                  <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.6 }}>{u.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:14, padding:22 }}>
              <p style={{ color:"#C9A84C", fontWeight:700, fontSize:14, marginBottom:10 }}>How Hourly Hire Works</p>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.7 }}>Book your start time and duration. Your chauffeur arrives 10 minutes early and stays with you for the full period. Need to extend? Add time on the day at the same hourly rate. Payment is taken at booking for the minimum hours, with any extension billed after.</p>
            </div>
          </div>
        </section>
        <section style={{ background:"#09090B", padding:"52px 24px", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:900, marginBottom:12 }}>Book Hourly Hire</h2>
          <p style={{ color:"#6B7280", marginBottom:24 }}>Minimum 2 hours · All vehicles available · 24/7</p>
          <Link href="/book?service=hourly" style={{ display:"inline-block", background:"#C9A84C", color:"#09090B", padding:"15px 42px", borderRadius:13, fontWeight:900, fontSize:16, textDecoration:"none" }}>Book Now →</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
