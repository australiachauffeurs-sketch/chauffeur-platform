import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Adelaide Airport Complete Guide 2026 — Arrivals, Terminals & Transport Options",
  description:
    "Everything you need to know about Adelaide Airport (ADL) in 2026. Terminal guide, baggage claim, transport options (taxi, chauffeur, Uber, bus), parking costs and insider tips from locals.",
  keywords: [
    "Adelaide Airport guide 2026",
    "Adelaide Airport arrivals",
    "Adelaide Airport terminals",
    "getting from Adelaide Airport to city",
    "Adelaide Airport transport",
    "ADL airport guide",
    "Adelaide Airport tips",
    "Adelaide Airport car hire",
    "Adelaide Airport parking cost",
  ],
  alternates: { canonical: `${SITE_URL}/blog/adelaide-airport-guide-2026` },
  openGraph: {
    title: "Adelaide Airport Complete Guide 2026",
    description: "Everything arriving passengers need — terminals, transport, parking and local insider tips.",
    url: `${SITE_URL}/blog/adelaide-airport-guide-2026`,
    type: "article",
  },
};

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Adelaide Airport Complete Guide 2026 — Arrivals, Terminals & Transport Options",
  description: "Comprehensive guide to Adelaide Airport for arriving passengers in 2026.",
  author: { "@type": "Organization", name: "Elite Chauffeurs Australia" },
  publisher: { "@type": "Organization", name: "Elite Chauffeurs Australia" },
  datePublished: "2026-06-01",
  dateModified: "2026-06-09",
  url: `${SITE_URL}/blog/adelaide-airport-guide-2026`,
};

export default function AdelaideAirportGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <Navbar />
      <main>
        <article>
          {/* Header */}
          <header style={{ background: "linear-gradient(135deg,#09090B 0%,#0a0a1a 100%)", padding: "72px 24px 52px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 18 }}>
              <span style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#C9A84C", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Airport Guide</span>
              <span style={{ color: "#4B5563", fontSize: 12, alignSelf: "center" }}>8 min read · June 2026</span>
            </div>
            <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.2, maxWidth: 800, margin: "0 auto 18px" }}>
              Adelaide Airport Complete Guide 2026<br /><span style={{ color: "#C9A84C" }}>Arrivals, Terminals & Transport</span>
            </h1>
            <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 620, margin: "0 auto" }}>
              Written by Adelaide's most-booked chauffeur team — who pick up at ADL every single day.
            </p>
          </header>

          {/* Body */}
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px 80px" }}>
            <div style={{ color: "#D1D5DB", fontSize: 16, lineHeight: 1.85 }}>

              <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 800, marginBottom: 16, marginTop: 0 }}>
                Adelaide Airport (ADL) — Quick Facts
              </h2>
              <p style={{ marginBottom: 20 }}>
                Adelaide Airport is located in West Beach, approximately 6 kilometres west of the Adelaide CBD. It is the main international and domestic gateway for South Australia, handling over 8 million passengers annually across two primary terminals.
              </p>

              <div style={{ background: "#17171A", borderRadius: 14, padding: 22, marginBottom: 28, border: "1px solid #2A2A30" }}>
                <p style={{ color: "#C9A84C", fontWeight: 700, marginBottom: 12 }}>At a glance:</p>
                {[
                  ["IATA Code", "ADL"],
                  ["Distance from CBD", "6 km west (~25 min drive)"],
                  ["Terminals", "T1 (Domestic) · T2 (International)"],
                  ["Airlines", "Qantas, Virgin, Rex, Singapore Airlines, Malaysia Airlines, Qatar Airways, Air New Zealand"],
                  ["Operating hours", "24/7 — flights operate around the clock"],
                ].map(([k, v]) => (
                  <p key={k} style={{ fontSize: 14, marginBottom: 6, color: "#9CA3AF" }}>
                    <strong style={{ color: "#D1D5DB" }}>{k}:</strong> {v}
                  </p>
                ))}
              </div>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 14, marginTop: 36 }}>
                Terminals at Adelaide Airport
              </h2>
              <h3 style={{ color: "#C9A84C", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>Terminal 1 — Domestic</h3>
              <p style={{ marginBottom: 16 }}>
                Terminal 1 handles all domestic flights including Qantas, QantasLink, Virgin Australia, Rex Regional and Bonza. After landing, domestic arrivals collect bags from the baggage carousel and exit through the arrivals hall to ground transport.
              </p>
              <p style={{ marginBottom: 24 }}>
                <strong style={{ color: "#fff" }}>Chauffeur pickup:</strong> Your driver will be waiting at the arrivals exit with a name board. The terminal is compact — you'll see them within 30 seconds of exiting customs.
              </p>

              <h3 style={{ color: "#C9A84C", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>Terminal 2 — International</h3>
              <p style={{ marginBottom: 24 }}>
                Terminal 2 handles international arrivals including Singapore Airlines, Malaysia Airlines, Qatar Airways, Air New Zealand and international charter flights. Allow 45–75 minutes from landing to exiting customs (immigration, biosecurity, and baggage).
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 14, marginTop: 36 }}>
                Transport Options from Adelaide Airport
              </h2>

              <h3 style={{ color: "#C9A84C", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>1. Chauffeur / Private Transfer (Recommended)</h3>
              <p style={{ marginBottom: 12 }}>
                <strong style={{ color: "#fff" }}>Price:</strong> From $89 to Adelaide CBD (fixed)<br />
                <strong style={{ color: "#fff" }}>Wait time:</strong> Zero — driver is waiting when you exit<br />
                <strong style={{ color: "#fff" }}>Best for:</strong> Business travellers, families, anyone with luggage, late-night arrivals
              </p>
              <p style={{ marginBottom: 24 }}>
                A chauffeur transfer means your driver is tracking your flight from departure. If you land early or late, they adjust. You are met in the arrivals hall with a name board. Your driver assists with luggage and escorts you to the vehicle. The price you were quoted is the price you pay.
              </p>

              <h3 style={{ color: "#C9A84C", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>2. Taxi</h3>
              <p style={{ marginBottom: 24 }}>
                <strong style={{ color: "#fff" }}>Price:</strong> $65–$95 to CBD (metered + airport levy)<br />
                <strong style={{ color: "#fff" }}>Wait time:</strong> 5–25 minutes at the taxi rank<br />
                <strong style={{ color: "#fff" }}>Best for:</strong> Solo travellers with minimal luggage and no time pressure
              </p>

              <h3 style={{ color: "#C9A84C", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>3. Rideshare (Uber / DiDi)</h3>
              <p style={{ marginBottom: 24 }}>
                <strong style={{ color: "#fff" }}>Price:</strong> $35–$85 (variable — surge pricing applies during peak hours and events)<br />
                <strong style={{ color: "#fff" }}>Wait time:</strong> 3–8 minutes for matching<br />
                <strong style={{ color: "#fff" }}>Best for:</strong> Casual travellers comfortable navigating to the rideshare pickup zone
              </p>

              <h3 style={{ color: "#C9A84C", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>4. SkyLink Bus (Public Transport)</h3>
              <p style={{ marginBottom: 24 }}>
                <strong style={{ color: "#fff" }}>Price:</strong> Free with valid Metro ticket / Opal card equivalent<br />
                <strong style={{ color: "#fff" }}>Frequency:</strong> Every 15–30 minutes<br />
                <strong style={{ color: "#fff" }}>Travel time:</strong> 45–60 minutes to city centre (stops at multiple locations)<br />
                <strong style={{ color: "#fff" }}>Best for:</strong> Budget travellers with minimal luggage and no time pressure
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 14, marginTop: 36 }}>
                Insider Tips from Our Chauffeurs
              </h2>
              <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                {[
                  "International arrivals: allow 45–75 minutes through customs and biosecurity. Tell your chauffeur your flight number — not a fixed time — so we track actual arrival.",
                  "Peak traffic periods: weekday mornings 7:30–9:00am and afternoons 4:30–6:30pm on Sir Donald Bradman Drive can add 10–15 minutes. A chauffeur monitors this live.",
                  "Late night arrivals: terminal facilities are reduced after 10pm. Having a confirmed chauffeur waiting means you're never stranded.",
                  "Adelaide Cup and major events: surge pricing on rideshare apps can spike 2–3x. A chauffeur's fixed price never changes after booking.",
                  "Barossa Valley & Hills visitors: a direct chauffeur from the airport to your accommodation is often only $30–50 more than a taxi to CBD + regional transport.",
                ].map(tip => (
                  <li key={tip} style={{ display: "flex", gap: 12, marginBottom: 14, background: "#17171A", borderRadius: 12, padding: "14px 16px", border: "1px solid #2A2A30", fontSize: 14 }}>
                    <span style={{ color: "#C9A84C", flexShrink: 0 }}>💡</span>
                    <span style={{ color: "#9CA3AF" }}>{tip}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Box */}
              <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 16, padding: 28, marginTop: 40, textAlign: "center" }}>
                <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Arriving at Adelaide Airport?</p>
                <p style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 20 }}>
                  Book your private chauffeur transfer now — fixed price, flight tracking, meet & greet included.
                </p>
                <Link href="/book?service=airport" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "14px 36px", borderRadius: 12, fontWeight: 900, fontSize: 15, textDecoration: "none" }}>
                  Book Airport Transfer — from $89 →
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
