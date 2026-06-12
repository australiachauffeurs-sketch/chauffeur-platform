import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { EVENTS } from "@/data/events";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Adelaide Event Transfers | Fringe, LIV Golf, Gather Round & More",
  description:
    "Fixed-price chauffeur transfers for every major Adelaide event — Fringe, LIV Golf, Gather Round, WOMADelaide, Adelaide 500, Christmas parties, NYE and more. No surge pricing, guaranteed returns.",
  alternates: { canonical: `${SITE_URL}/events` },
};

export default function EventsHubPage() {
  return (
    <>
      <Navbar />
      <Breadcrumbs crumbs={[{ name: "Events", path: "/events" }]} />
      <main>
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#120d00 100%)", padding: "64px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 14 }}>
            🎟 ADELAIDE EVENT TRANSFERS
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4.5vw,3.2rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 800, margin: "0 auto 16px" }}>
            Every Big Adelaide Event,
            <br />
            <span style={{ color: "#C9A84C" }}>One Fixed-Price Ride</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            Surge pricing peaks exactly when you need a ride most. Pre-book a chauffeur for Adelaide's
            biggest events and your price is locked — door-to-gate, guaranteed return.
          </p>
        </section>
        <section style={{ background: "#09090B", padding: "48px 24px 64px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
            {EVENTS.map((e) => (
              <Link
                key={e.slug}
                href={`/events/${e.slug}`}
                style={{ background: "#17171A", border: "1px solid #2A2A30", borderRadius: 18, padding: 22, textDecoration: "none", display: "block" }}
              >
                <p style={{ color: "#C9A84C", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", margin: "0 0 8px", textTransform: "uppercase" }}>
                  {e.season}
                </p>
                <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: "0 0 8px" }}>{e.shortName}</h2>
                <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.6, margin: "0 0 12px" }}>
                  {e.venue}
                </p>
                <span style={{ color: "#C9A84C", fontWeight: 700, fontSize: 13 }}>View transfers →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
