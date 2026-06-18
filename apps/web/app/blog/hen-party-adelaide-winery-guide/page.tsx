import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "The Ultimate Adelaide Hens Party Winery Tour Guide 2026",
  description:
    "Plan the perfect Adelaide hens party winery tour. McLaren Vale vs Barossa vs Adelaide Hills — best wineries for groups, lunch spots, safety tips, and private chauffeur options.",
  alternates: { canonical: `${SITE_URL}/blog/hen-party-adelaide-winery-guide` },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Ultimate Adelaide Hens Party Winery Tour Guide 2026",
  description:
    "Everything you need to plan a hens party winery tour from Adelaide — which wine region to choose, best cellar doors for groups, lunch options, and why a private chauffeur beats a tour bus.",
  author: { "@type": "Organization", name: "Australia Chauffeurs" },
  publisher: {
    "@type": "Organization",
    name: "Australia Chauffeurs",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-01-01",
  dateModified: "2026-06-01",
  mainEntityOfPage: `${SITE_URL}/blog/hen-party-adelaide-winery-guide`,
};

export default function HensPartyWineryGuide() {
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
              Adelaide Hens Party Planning
            </p>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, color: "#FAFAFA", lineHeight: 1.2, marginBottom: 20 }}>
              The Ultimate Adelaide Hens Party{" "}
              <span style={{ color: "#C9A84C" }}>Winery Tour Guide 2026</span>
            </h1>
            <p style={{ fontSize: 18, color: "#A1A1AA", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 28px" }}>
              McLaren Vale, Barossa Valley, or Adelaide Hills? Which wineries work for groups? Where to have lunch? And how to keep everyone safe and sorted. The complete guide.
            </p>
            <p style={{ color: "#71717A", fontSize: 14 }}>Updated June 2026 · 8-minute read</p>
          </div>
        </section>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>

          {/* Intro */}
          <section style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Adelaide is genuinely one of Australia's best cities for a hens party winery tour. You're 40 minutes from three distinct wine regions, each with cellar doors that actively welcome groups — unlike some Yarra Valley counterparts who'd rather not deal with a party of twelve. The climate is friendly, the food is excellent, and the roads between wineries are beautiful rather than stressful.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              Here's everything you need to plan it properly — from which region to choose through to getting everyone home safely at the end of the night.
            </p>
          </section>

          {/* Which region */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 24, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              McLaren Vale vs Barossa Valley vs Adelaide Hills
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                {
                  region: "McLaren Vale",
                  distance: "40–50 min south of Adelaide CBD",
                  vibe: "Relaxed, Mediterranean, flat vineyard roads — easy to navigate between cellar doors",
                  bestFor: "Groups of 6–12 wanting a laid-back full-day experience with great food options",
                  topSpots: ["d'Arenberg Cube (remarkable architecture, group tastings)", "Wirra Wirra (open lawns, great rosé, very group-friendly)", "Maxwell Wines (boutique, great value tastings)", "Coriole (Italian-inspired, excellent olive oil and charcuterie to match)"],
                  highlight: "Best region for hens parties. Cellar doors are closer together, roads are easy, and the d'Arenberg Cube is a natural talking point and photography stop.",
                  recommended: true,
                },
                {
                  region: "Adelaide Hills",
                  distance: "25–40 min from CBD through the winding Hills roads",
                  vibe: "Cool-climate, forested, scenic — more intimate and boutique than the larger valleys",
                  bestFor: "Smaller groups (4–8) who want a more refined, less crowded experience",
                  topSpots: ["Deviation Road (excellent sparkling and pinot, beautiful setting)", "Bird in Hand (great for groups, Italian-style trattoria on site)", "Longview Vineyard (views over the valley, excellent Merlot)", "Sidewood Estate (Apple orchard setting, cider and wine tastings)"],
                  highlight: "Lovely for a relaxed morning tour, especially in autumn. Roads are curvier, so a chauffeur is particularly important here.",
                  recommended: false,
                },
                {
                  region: "Barossa Valley",
                  distance: "60–75 min northeast of Adelaide CBD",
                  vibe: "Grand, heritage, full-day commitment — the furthest but the most iconic",
                  bestFor: "Full-day tours or overnight stays. Better suited to groups with a higher wine interest",
                  topSpots: ["Jacob's Creek (great group tasting facilities, good restaurant)", "Seppeltsfield (100-Year-Old Tawny experience — unique)", "Wolf Blass (large, easy, good Shiraz)", "Rockford Wines (boutique, appointment only — book ahead)"],
                  highlight: "Worth it for a destination-day feel, but the distance means you're committed to a full day. Don't underestimate the drive time after a long tasting afternoon.",
                  recommended: false,
                },
              ].map((r) => (
                <div
                  key={r.region}
                  style={{
                    background: "#111113",
                    border: `1px solid ${r.recommended ? "#C9A84C" : "#1F1F23"}`,
                    borderRadius: 12,
                    padding: 28,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <h3 style={{ color: "#FAFAFA", fontSize: 19, fontWeight: 700, margin: 0 }}>{r.region}</h3>
                    {r.recommended && (
                      <span style={{ background: "#1A1508", color: "#C9A84C", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 4 }}>Most Popular for Hens</span>
                    )}
                  </div>
                  <p style={{ color: "#C9A84C", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{r.distance}</p>
                  <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.6, marginBottom: 12 }}>{r.vibe}</p>
                  <p style={{ color: "#A1A1AA", fontSize: 14, marginBottom: 12 }}><strong style={{ color: "#E5E5E5" }}>Best for:</strong> {r.bestFor}</p>
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ color: "#A1A1AA", fontSize: 14, marginBottom: 8, fontWeight: 600 }}>Top cellar doors:</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                      {r.topSpots.map(spot => (
                        <li key={spot} style={{ color: "#D4D4D8", fontSize: 14, display: "flex", gap: 8 }}>
                          <span style={{ color: "#C9A84C", flexShrink: 0 }}>→</span> {spot}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ background: "#0C0C0E", borderRadius: 8, padding: 14 }}>
                    <p style={{ color: "#A1A1AA", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{r.highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Best wineries for groups */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              What to Look For in a Group-Friendly Cellar Door
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Not every cellar door is set up for a group of ten. When scouting for a hens tour, look for:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "Group bookings accepted", note: "Some boutiques cap at 6. Confirm before committing." },
                { label: "Seated tasting areas", note: "Standing at a counter for 45 minutes with wine doesn't work at scale." },
                { label: "Outdoor space", note: "Lawn areas or terraces let the group spread out and relax." },
                { label: "Food available on site", note: "Platter options or a full kitchen — critically important for pacing." },
                { label: "No 'serious wine only' vibe", note: "Some boutiques actively discourage groups wanting fun over education." },
                { label: "Parking for a large vehicle", note: "If you're arriving in a minibus or large SUV, confirm access." },
              ].map(item => (
                <div key={item.label} style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 10, padding: 16 }}>
                  <p style={{ color: "#C9A84C", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{item.label}</p>
                  <p style={{ color: "#D4D4D8", fontSize: 14, lineHeight: 1.5, margin: 0 }}>{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Lunch options */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Where to Have Lunch
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 20 }}>
              Lunch is the anchor of a great winery day — it slows the drinking pace, gives the group a chance to connect, and sets up a comfortable afternoon. Book a table before you leave Adelaide. These restaurants handle groups well:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  name: "d'Arenberg The Cube Restaurant",
                  region: "McLaren Vale",
                  note: "Degustation or à la carte. The building itself is an Instagram moment. Book well ahead — very popular with tour groups.",
                },
                {
                  name: "Coriole Winery Restaurant",
                  region: "McLaren Vale",
                  note: "Italian-influenced menu, charcuterie boards, estate olive oil. Beautiful garden setting. Excellent for a long leisurely lunch.",
                },
                {
                  name: "Bird in Hand Trattoria",
                  region: "Adelaide Hills (Woodside)",
                  note: "Rustic Italian in a winery setting. Great pizza and pasta for groups, generous portions, good wine list.",
                },
                {
                  name: "Appellation at The Louise",
                  region: "Barossa Valley (Marananga)",
                  note: "Fine dining at its best in the Barossa. Small groups only — maximum 20 pax. Requires a booking weeks in advance.",
                },
              ].map(r => (
                <div key={r.name} style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 20, display: "flex", gap: 20 }}>
                  <div style={{ flexShrink: 0, width: 80, textAlign: "center" }}>
                    <span style={{ background: "#1A1508", color: "#C9A84C", fontSize: 11, fontWeight: 600, padding: "4px 6px", borderRadius: 4, display: "block" }}>{r.region.split(" ")[0]}</span>
                  </div>
                  <div>
                    <h3 style={{ color: "#FAFAFA", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{r.name}</h3>
                    <p style={{ color: "#71717A", fontSize: 13, marginBottom: 6 }}>{r.region}</p>
                    <p style={{ color: "#D4D4D8", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{r.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sample itinerary */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 20, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Sample McLaren Vale Hens Day Itinerary
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { time: "9:30am", item: "Chauffeur collects group from Adelaide hotel or home" },
                { time: "10:15am", item: "Arrive Wirra Wirra — seated tasting session on the lawn" },
                { time: "11:30am", item: "Drive to d'Arenberg Cube — group photo on the Cube exterior" },
                { time: "12:00pm", item: "Lunch at d'Arenberg restaurant or Cube bar (pre-booked)" },
                { time: "2:00pm", item: "Coriole Winery — tasting with charcuterie board pairing" },
                { time: "3:15pm", item: "Maxwell Wines — boutique tasting, purchase favourites" },
                { time: "4:30pm", item: "Chauffeur departs McLaren Vale for Adelaide" },
                { time: "5:30pm", item: "Drop-off at hotel. Group freshens up before dinner" },
                { time: "7:30pm", item: "Dinner reservation in the CBD (group suggest Leigh Street or O'Connell St)" },
              ].map(item => (
                <div key={item.time} style={{ display: "flex", gap: 20, background: "#111113", border: "1px solid #1F1F23", borderRadius: 10, padding: "12px 16px", alignItems: "center" }}>
                  <span style={{ color: "#C9A84C", fontSize: 13, fontWeight: 700, flexShrink: 0, minWidth: 65 }}>{item.time}</span>
                  <span style={{ color: "#D4D4D8", fontSize: 15 }}>{item.item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Safety section */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Safety Tips: Keeping Everyone Looked After
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 20 }}>
              A winery hens day is one of those events where good planning equals everyone home safely and nobody regrets anything. This isn't about being boring — it's about the group getting to the evening in good shape.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Book a private chauffeur vehicle, not a public shuttle. You control the timing and can leave if anyone needs to go early.",
                "Eat before you start drinking. A substantial breakfast before the 9:30am pickup makes a significant difference by 3pm.",
                "Nominate one person to be the group coordinator — someone who has the chauffeur's number and can communicate the group's needs without committee discussion.",
                "Water between tastings. Ask each cellar door for water to be served alongside the wine. Most do this automatically; the good ones always do.",
                "Know what each person's limits are before you go. A quick chat at the start of the day removes the awkwardness of managing it later.",
                "Confirm the return time with your chauffeur and stick to it. The driver can hold the schedule even if the group is having a great time.",
                "Have a plan for the evening that doesn't require driving. If dinner is in the CBD, book a restaurant you can walk to from the hotel.",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 16, background: "#111113", border: "1px solid #1F1F23", borderRadius: 10, padding: 16 }}>
                  <span style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, flexShrink: 0, minWidth: 24 }}>{i + 1}.</span>
                  <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Chauffeur vs tour bus */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Private Chauffeur vs Winery Tour Bus
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Adelaide has several group winery tour operators that run shared buses. They're fine for a solo traveller tagging along to meet people. For a hens party, a private chauffeur is meaningfully better:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#111113", border: "1px solid #C9A84C", borderRadius: 12, padding: 24 }}>
                <h3 style={{ color: "#C9A84C", fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Private Chauffeur</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Your group only — no strangers", "Choose your wineries", "Leave when you want", "Driver knows the group by name", "Flex the itinerary mid-day", "Large SUV fits 6–7 comfortably"].map(item => (
                    <li key={item} style={{ display: "flex", gap: 8, color: "#D4D4D8", fontSize: 14 }}>
                      <span style={{ color: "#C9A84C", flexShrink: 0 }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 24 }}>
                <h3 style={{ color: "#71717A", fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Shared Tour Bus</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Shared with other guests", "Fixed itinerary", "Departs on schedule", "Tour guide may or may not suit", "Can't skip a stop you don't want", "Cheaper per head solo"].map(item => (
                    <li key={item} style={{ display: "flex", gap: 8, color: "#71717A", fontSize: 14 }}>
                      <span style={{ color: "#52525B", flexShrink: 0 }}>→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 20, marginTop: 16 }}>
              <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#C9A84C" }}>On cost:</strong> A private large SUV chauffeur for a McLaren Vale day (approx 8 hours) runs around $480–$560. Divided among 6 people: $80–$93 each. Shared tour buses charge $95–$140 per person. The private chauffeur is often cheaper per head for groups of 5 or more — and it's entirely yours.
              </p>
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
              Book Your Hens Party Winery Chauffeur
            </h2>
            <p style={{ color: "#A1A1AA", fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
              Private vehicle · Your itinerary · McLaren Vale, Adelaide Hills, or Barossa · From ~$480 full day
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
              Get a Group Quote
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
