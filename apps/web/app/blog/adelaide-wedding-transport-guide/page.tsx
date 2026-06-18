import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Adelaide Wedding Transport Guide 2026 — Chauffeur, Limo or Vintage Car?",
  description:
    "Choosing wedding transport in Adelaide? Compare chauffeur cars, stretch limos, and vintage vehicles. Covers timing, photography stops, winery receptions in the Adelaide Hills and Barossa.",
  alternates: { canonical: `${SITE_URL}/blog/adelaide-wedding-transport-guide` },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Adelaide Wedding Transport Guide 2026 — Chauffeur, Limo or Vintage Car?",
  description:
    "A complete guide to wedding transport in Adelaide, covering vehicle choices, timing, photography stops, Hills and Barossa winery receptions, and chauffeur booking tips.",
  author: { "@type": "Organization", name: "Australia Chauffeurs" },
  publisher: {
    "@type": "Organization",
    name: "Australia Chauffeurs",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-01-01",
  dateModified: "2026-06-01",
  mainEntityOfPage: `${SITE_URL}/blog/adelaide-wedding-transport-guide`,
};

export default function WeddingTransportGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <Navbar />
      <main style={{ background: "#09090B", color: "#E5E5E5", minHeight: "100vh" }}>
        {/* Hero */}
        <section
          style={{
            background: "linear-gradient(135deg, #09090B 0%, #111113 100%)",
            borderBottom: "1px solid #1F1F23",
            padding: "80px 24px 60px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ color: "#C9A84C", fontSize: 14, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Adelaide Wedding Planning
            </p>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, color: "#FAFAFA", lineHeight: 1.2, marginBottom: 20 }}>
              Adelaide Wedding Transport Guide 2026 —{" "}
              <span style={{ color: "#C9A84C" }}>Chauffeur, Limo or Vintage Car?</span>
            </h1>
            <p style={{ fontSize: 18, color: "#A1A1AA", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 28px" }}>
              The car you arrive in sets the tone. Here's everything you need to know about wedding transport in Adelaide — from the ceremony to the Hills reception, and every photograph stop in between.
            </p>
            <p style={{ color: "#71717A", fontSize: 14 }}>Updated June 2026 · 7-minute read</p>
          </div>
        </section>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>

          {/* Vehicle options */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 24, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Your Vehicle Options: An Honest Assessment
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Chauffeur sedan/SUV */}
              <div style={{ background: "#111113", border: "1px solid #C9A84C", borderRadius: 12, padding: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                  <h3 style={{ color: "#FAFAFA", fontSize: 19, fontWeight: 700, margin: 0 }}>Modern Chauffeur Sedan / SUV</h3>
                  <span style={{ background: "#1A1508", color: "#C9A84C", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 4 }}>Recommended</span>
                </div>
                <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
                  A late-model Mercedes-Benz S-Class or E-Class, Genesis G80, or equivalent. Clean, modern, and photographed beautifully against both city venues like the Adelaide Town Hall and natural backdrops like Morialta Conservation Park or Belair National Park. The couple arrives exactly on time, the driver holds the door, and the vehicle won't overwhelm the backdrop in photos.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {["Discreet, elegant appearance", "Best for 1–4 passengers", "Works at any venue type", "Flexible timing, no hourly pressure"].map(item => (
                    <div key={item} style={{ display: "flex", gap: 8, color: "#D4D4D8", fontSize: 14 }}>
                      <span style={{ color: "#C9A84C" }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stretch limo */}
              <div style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 28 }}>
                <h3 style={{ color: "#FAFAFA", fontSize: 19, fontWeight: 700, marginBottom: 16 }}>Stretch Limousine</h3>
                <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
                  Best for: large bridal parties (8–14 people) who want to travel together, or weddings with a deliberately celebratory, high-visibility aesthetic. Adelaide limo fleets vary in vehicle age — some are excellent, many are tired. Inspect the vehicle in person before booking. A stretch limo in front of a heritage venue like Ayers House or Carrick Hill looks striking. In front of a modern venue or at a winery reception, less so.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {["Fits 8–14 people", "High-visibility spectacle", "Built-in bar fridge", "Check vehicle age carefully"].map((item, i) => (
                    <div key={item} style={{ display: "flex", gap: 8, color: "#D4D4D8", fontSize: 14 }}>
                      <span style={{ color: i < 2 ? "#C9A84C" : "#EF4444" }}>{i < 2 ? "✓" : "!"}</span> {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Vintage */}
              <div style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 28 }}>
                <h3 style={{ color: "#FAFAFA", fontSize: 19, fontWeight: 700, marginBottom: 16 }}>Vintage or Classic Car</h3>
                <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
                  Rolls-Royce Silver Shadow, Bentley, or a 1950s Jaguar MK2 — classic cars create stunning photographs, particularly at heritage Adelaide venues. The trade-offs: air conditioning may be limited (a real concern at summer weddings), they fit only 1–2 passengers, and they operate on a strict point-to-point hire model with limited flexibility if your schedule shifts. Best used for the ceremony-to-reception leg only, with a chauffeur sedan handling all other transfers.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {["Stunning photography", "1–2 passengers only", "Limited A/C (check model)", "Best for ceremony leg only"].map((item, i) => (
                    <div key={item} style={{ display: "flex", gap: 8, color: "#D4D4D8", fontSize: 14 }}>
                      <span style={{ color: i < 1 ? "#C9A84C" : "#71717A" }}>{i < 1 ? "✓" : "→"}</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Timing */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Getting the Timing Right
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Wedding transport timing is the area where most couples underestimate the detail required. Build your run sheet around the transport — not the other way around. Here's a structure that works for a typical Adelaide ceremony-to-reception day:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { time: "T−90 min", event: "Chauffeur arrives at bridal party prep location (hotel or home)" },
                { time: "T−75 min", event: "Photography at prep location — vehicle used as prop if desired" },
                { time: "T−45 min", event: "Depart for ceremony venue. Allow extra if travelling from the Hills into the city" },
                { time: "T−15 min", event: "Arrive at ceremony venue. Driver holds door, steams dress wrinkles if needed" },
                { time: "T+60 min", event: "Ceremony ends. Chauffeur waits and is available for immediate departure" },
                { time: "T+90 min", event: "Photography circuit — up to 3 stops (30 min each). Popular: Elder Park, Botanic Garden, Morialta" },
                { time: "T+3.5 hr", event: "Depart for reception venue" },
              ].map(item => (
                <div key={item.time} style={{ display: "flex", gap: 20, background: "#111113", border: "1px solid #1F1F23", borderRadius: 10, padding: 16, alignItems: "flex-start" }}>
                  <span style={{ color: "#C9A84C", fontSize: 13, fontWeight: 700, flexShrink: 0, minWidth: 70 }}>{item.time}</span>
                  <span style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.5 }}>{item.event}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15, color: "#71717A", lineHeight: 1.7, marginTop: 16 }}>
              Tell your photographer and your chauffeur the same run sheet. Conflicts between the two are the primary cause of running late.
            </p>
          </section>

          {/* Photography stops */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Best Adelaide Photography Locations on Your Route
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { name: "Elder Park & River Torrens", note: "City backdrop, weeping willows, footbridge. 5 min from most CBD venues." },
                { name: "Botanic Garden of Adelaide", note: "Palm House glasshouse, rose gardens, lake. Free entry, opens early." },
                { name: "Morialta Conservation Park", note: "Waterfall backdrop (seasonal). Best in winter/spring. 20 min from CBD." },
                { name: "McLaren Vale vineyard roads", note: "For Hills/Vale receptions. Vine rows and rolling hills make excellent ceremony exits." },
                { name: "Hahndorf village", note: "German-heritage main street, oaks, stone walls. 30 min from CBD into the Hills." },
                { name: "Carrick Hill, Springfield", note: "Private heritage estate available for wedding photography by permit. Stunning formal garden." },
              ].map(loc => (
                <div key={loc.name} style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 20 }}>
                  <h3 style={{ color: "#C9A84C", fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{loc.name}</h3>
                  <p style={{ color: "#D4D4D8", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{loc.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Winery receptions */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Winery Receptions: Adelaide Hills, McLaren Vale, Barossa
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              South Australian winery receptions have become the most requested wedding format in Adelaide over the past five years. The three main wine regions each have a distinct character:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              {[
                {
                  region: "Adelaide Hills",
                  distance: "25–45 min from CBD",
                  venues: "Longview Vineyard, Deviation Road, Bird in Hand",
                  character: "Elevated, cool-climate. Misty mornings in winter, lush in spring. The drive through Stirling and Aldgate is itself a feature of the day.",
                },
                {
                  region: "McLaren Vale",
                  distance: "40–50 min from CBD",
                  venues: "d'Arenberg Cube, Wirra Wirra, Maxwell Wines",
                  character: "Mediterranean feel. Wide open vineyard views. D'Arenberg's Cube is architecturally striking — one of Australia's most unusual wedding backdrops.",
                },
                {
                  region: "Barossa Valley",
                  distance: "60–75 min from CBD",
                  venues: "Seppeltsfield, Jacob's Creek, Langmeil",
                  character: "Grand heritage estate scale. Seppeltsfield's palm-lined drive is arguably the finest entrance of any Australian winery. Best for full-weekend destination weddings.",
                },
              ].map(r => (
                <div key={r.region} style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <h3 style={{ color: "#FAFAFA", fontSize: 17, fontWeight: 700, margin: 0 }}>{r.region}</h3>
                    <span style={{ color: "#C9A84C", fontSize: 13, fontWeight: 600 }}>{r.distance}</span>
                  </div>
                  <p style={{ color: "#71717A", fontSize: 13, marginBottom: 8 }}>Popular venues: {r.venues}</p>
                  <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{r.character}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              For winery receptions outside Adelaide, a chauffeur is essential — not just for the couple, but for guests who've been drinking since 2pm. We provide guest shuttle services between the CBD or Adelaide Airport and reception venues, with multiple pick-up points and a return service at the end of the night.
            </p>
          </section>

          {/* Booking tips */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 20, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Wedding Transport Booking Tips
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Book your wedding chauffeur 6–12 months in advance for peak season (October–April). Popular Saturdays book out by June the year before.",
                "Share your wedding run sheet with the chauffeur company at booking — not just the pickup address. Every timing detail matters.",
                "Confirm the specific vehicle model and registration in writing before your wedding day. You should know what's arriving.",
                "Ask about a backup vehicle plan. Reputable operators have a contingency fleet or driver-partner arrangement in case of mechanical issues.",
                "For winery receptions, book a return vehicle. Don't rely on guests organising their own transport after 10pm in McLaren Vale.",
                "Tip is never expected but always appreciated — generally 10–15% for exceptional service.",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 16, background: "#111113", border: "1px solid #1F1F23", borderRadius: 10, padding: 16 }}>
                  <span style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, flexShrink: 0, minWidth: 24 }}>{i + 1}.</span>
                  <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section
            style={{
              background: "linear-gradient(135deg, #111113, #0C0C0E)",
              border: "1px solid #C9A84C",
              borderRadius: 16,
              padding: 40,
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#FAFAFA", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
              Book Your Adelaide Wedding Chauffeur
            </h2>
            <p style={{ color: "#A1A1AA", fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
              Bridal party transfers · Winery reception shuttles · Guest transport · Available across Adelaide Hills, McLaren Vale, and Barossa
            </p>
            <Link
              href="/book"
              style={{
                display: "inline-block",
                background: "#C9A84C",
                color: "#09090B",
                fontWeight: 700,
                fontSize: 16,
                padding: "14px 36px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              Enquire About Wedding Transport
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
