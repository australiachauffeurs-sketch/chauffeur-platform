import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Chauffeur vs Airport Shuttle Bus Adelaide — Which is Better?",
  description:
    "Comparing private chauffeur cars and shared airport shuttle buses in Adelaide. For groups of 2+, business travellers, and off-peak arrivals, a chauffeur is faster and often cheaper per head.",
  alternates: { canonical: `${SITE_URL}/compare/chauffeur-vs-shuttle-bus-adelaide` },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Chauffeur vs Airport Shuttle Bus Adelaide — Which is Better?",
  description:
    "A practical comparison of private chauffeur transfers and shared shuttle buses to and from Adelaide Airport (ADL), with cost breakdowns and use-case guidance.",
  author: { "@type": "Organization", name: "Australia Chauffeurs" },
  publisher: {
    "@type": "Organization",
    name: "Australia Chauffeurs",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-01-01",
  dateModified: "2026-06-01",
  mainEntityOfPage: `${SITE_URL}/compare/chauffeur-vs-shuttle-bus-adelaide`,
};

const comparisonRows = [
  { feature: "Pickup location", chauffeur: "Your door — home, hotel, or office", shuttle: "Fixed pickup points, varies by suburb" },
  { feature: "Drop-off at airport", chauffeur: "Direct to your terminal (T1 or T2)", shuttle: "May stop at multiple terminals" },
  { feature: "Waiting for delays", chauffeur: "Flight tracked — driver adjusts automatically", shuttle: "Runs on a fixed schedule" },
  { feature: "Privacy", chauffeur: "You and your party only", shuttle: "Shared with strangers, sometimes 12+ people" },
  { feature: "Luggage", chauffeur: "No limits for your vehicle type", shuttle: "1–2 bags per person typically" },
  { feature: "Off-peak availability", chauffeur: "24/7 including 4am and midnight flights", shuttle: "Limited hours — often not available pre-5am" },
  { feature: "Cost for 1 passenger", chauffeur: "~$130 (CBD to ADL)", shuttle: "~$25–$35" },
  { feature: "Cost for 2 passengers", chauffeur: "~$130 split = $65 each", shuttle: "~$50–$70 combined" },
  { feature: "Cost for 3+ passengers", chauffeur: "~$130–$160 split = $43–$53 each", shuttle: "~$75–$105 combined" },
  { feature: "Corporate invoicing", chauffeur: "GST tax invoice, ABN, corporate accounts", shuttle: "Receipt only in most cases" },
];

export default function ChauffeurVsShuttleBus() {
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
              Adelaide Airport Transport Comparison
            </p>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 700, color: "#FAFAFA", lineHeight: 1.2, marginBottom: 20 }}>
              Chauffeur vs Airport Shuttle Bus Adelaide —{" "}
              <span style={{ color: "#C9A84C" }}>Which is Better?</span>
            </h1>
            <p style={{ fontSize: 18, color: "#A1A1AA", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 28px" }}>
              The shuttle bus looks cheaper until you do the numbers for groups of two or more. Here's the complete breakdown — with real Adelaide pricing.
            </p>
            <p style={{ color: "#71717A", fontSize: 14 }}>Updated June 2026 · 5-minute read</p>
          </div>
        </section>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>

          {/* Intro */}
          <section style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Adelaide Airport (ADL) is just 7km from the CBD — close enough that the transfer decision feels trivial. But for business travellers, families with luggage, or anyone landing on an off-peak flight, the right choice makes a real difference to how your trip starts or ends.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              Shuttle buses have their place — particularly for solo budget travellers arriving at peak hours to central suburbs. But they have hard limitations that a private chauffeur doesn't share.
            </p>
          </section>

          {/* How shuttles work */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              How Adelaide Airport Shuttles Work
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Adelaide has a handful of shared shuttle services operating between the airport and the CBD or select suburbs. They typically operate on a shared-ride model: you book a seat, the van collects multiple passengers, and it drops each person at their address in order. If you're the third stop and the first two are in different directions, you're in for a longer ride.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Most Adelaide shuttle services run between approximately 5am and 10pm, on the hour or half-hour. If your flight lands at midnight or departs at 4:30am — common for interstate connections — you may find no shuttle available at all.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              Shuttle operators also run on their own schedule. A delayed flight means you've missed your booked shuttle slot and need to rebook — at extra cost, and subject to availability.
            </p>
          </section>

          {/* How chauffeur works */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              How a Private Chauffeur Transfer Works
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              You book online, receive confirmation with your driver's details and vehicle registration, and your chauffeur monitors your flight in real time via ADL flight tracking. If your Qantas flight from Sydney is 40 minutes late, your driver already knows — they'll adjust their departure from the holding area accordingly, and you won't be waiting.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Your driver meets you in the arrivals hall with a name board. You go directly — without stops — to your home in Burnside, your hotel on North Terrace, or your client's office in the CBD. Door to door, no detours.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              For early morning departures, the driver arrives at your Glenelg home or Norwood hotel at the agreed time — even at 3:30am. There's no transit point to reach, no shuttle timetable to work around.
            </p>
          </section>

          {/* Comparison table */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 24, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Full Comparison: Chauffeur vs Shuttle Bus
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
                <thead>
                  <tr style={{ background: "#111113" }}>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#C9A84C", fontWeight: 600, borderBottom: "2px solid #C9A84C" }}>Factor</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#C9A84C", fontWeight: 600, borderBottom: "2px solid #C9A84C" }}>Private Chauffeur</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#A1A1AA", fontWeight: 600, borderBottom: "2px solid #1F1F23" }}>Shuttle Bus</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.feature} style={{ background: i % 2 === 0 ? "#0C0C0E" : "#09090B" }}>
                      <td style={{ padding: "14px 16px", color: "#A1A1AA", borderBottom: "1px solid #1F1F23", fontWeight: 500 }}>{row.feature}</td>
                      <td style={{ padding: "14px 16px", color: "#E5E5E5", borderBottom: "1px solid #1F1F23" }}>{row.chauffeur}</td>
                      <td style={{ padding: "14px 16px", color: "#71717A", borderBottom: "1px solid #1F1F23" }}>{row.shuttle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* The group cost argument */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              The Group Cost Argument
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              The assumption that shuttles are cheaper falls apart quickly for groups. A standard sedan chauffeur from Adelaide Airport to the CBD costs around $130. Split between two business travellers from the same company: $65 each — less than two shuttle fares combined, and they travel together, arrive together, and neither has to wait.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              For a family of four flying back from Perth, the maths is even clearer: four shuttle fares at $32 each = $128. A large SUV chauffeur = $160, shared = $40 each. Add in luggage space for a pram and four suitcases with no shuttle limit anxiety, and the chauffeur is the obvious choice.
            </p>
            <div style={{ background: "#111113", border: "1px solid #C9A84C", borderRadius: 12, padding: 24 }}>
              <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Rule of thumb:</p>
              <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                For 2+ passengers travelling to the same Adelaide destination, a private chauffeur is almost always within $10–$20 of the shuttle total — and delivers a vastly superior experience.
              </p>
            </div>
          </section>

          {/* Business traveller section */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Why Business Travellers Always Choose Chauffeur
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              The 25-minute drive from Adelaide Airport to the CBD is productive time. In a private chauffeur vehicle, you can make calls, review the pitch deck on your laptop, or simply decompress before a board meeting. In a shuttle bus, you're folded into a seat next to a stranger with your bags stacked in front of you.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              There is also the question of optics. If your company is flying in an interstate client, meeting them at ADL with a private chauffeur waiting says something. Meeting them at a shuttle bus collection point does not. And when expense time comes, a GST tax invoice with your company's name on it goes through accounting without questions. A shuttle receipt usually doesn't cover the same detail.
            </p>
          </section>

          {/* When to take the shuttle */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              When a Shuttle Bus Actually Makes Sense
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              We'll be fair: if you're a solo budget traveller arriving at 9am with carry-on luggage, heading to a hostel on Gouger Street, the shuttle is a perfectly reasonable option. The service exists for a reason.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              For everyone else — business travellers, families, anyone carrying full luggage, anyone on an irregular flight schedule, anyone going somewhere off the shuttle's fixed route, and anyone whose time is worth money — a private chauffeur is the better option.
            </p>
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
              Book Your Adelaide Airport Chauffeur
            </h2>
            <p style={{ color: "#A1A1AA", fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
              Flight tracking included · No waiting · Door to door · Instant confirmation
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
              Book Airport Transfer
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
