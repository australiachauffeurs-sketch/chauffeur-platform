import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { SITE_URL, BUSINESS, buildReviewList, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Reviews | Elite Chauffeurs Adelaide — Rated 4.9★ by Our Clients",
  description:
    "Read real client reviews of Elite Chauffeurs Adelaide — airport transfers, corporate travel, weddings and wine tours. Rated 4.9 stars across hundreds of trips.",
  alternates: { canonical: `${SITE_URL}/reviews` },
};

const REVIEWS = [
  { author: "Sarah M.", rating: 5, date: "2026-05-18", service: "Airport Transfer",
    body: "Driver was waiting in arrivals with a name board even though our flight landed 40 minutes late. Spotless E-Class, bottled water, and we were home before the taxi queue would have moved. Worth every cent." },
  { author: "James R.", rating: 5, date: "2026-05-02", service: "Corporate",
    body: "We moved our whole executive travel to Elite this year. The monthly invoice with cost centres alone saves our EA hours, and not one missed 6am pickup in five months." },
  { author: "Priya K.", rating: 5, date: "2026-04-22", service: "Wedding",
    body: "Three cars, perfectly coordinated, and a driver who genuinely cared that my dress survived the Hills photo stops. The run sheet they prepared made the whole day stress-free." },
  { author: "Tom & Lisa W.", rating: 5, date: "2026-04-10", service: "Barossa Wine Tour",
    body: "Our driver knew every cellar door and got us a tasting at a winery that was 'fully booked'. Cases of wine rode home safer than we did. Booking the full day was the best decision of the trip." },
  { author: "Michael D.", rating: 4, date: "2026-03-28", service: "Airport Transfer",
    body: "Booked at 11pm for a 4:30am pickup — car arrived at 4:20. Only wish I'd found them before my last three taxi gambles." },
  { author: "Hannah F.", rating: 5, date: "2026-03-15", service: "School Formal",
    body: "As a parent, the live trip visibility sold me. The kids felt like VIPs, I knew exactly where they were, and the price was fixed up front." },
  { author: "Robert C.", rating: 5, date: "2026-02-27", service: "Cruise Transfer",
    body: "Flight to Outer Harbor with two big cases and zero stress. Driver tracked the flight, timed it to our boarding window, and handled the bags end to end." },
  { author: "Emily S.", rating: 5, date: "2026-02-12", service: "Fringe / Events",
    body: "Pre-booked our Fringe return at 12:30am — fixed price while everyone else stared at 3.8x surge. Driver messaged us the exact corner. Flawless." },
];

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            buildReviewList(REVIEWS.map((r) => ({ author: r.author, rating: r.rating, body: r.body, date: r.date })))
          ),
        }}
      />
      <Navbar />
      <Breadcrumbs crumbs={[{ name: "Reviews", path: "/reviews" }]} />
      <main>
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0d0a00 100%)", padding: "64px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 14 }}>
            ★ CLIENT REVIEWS
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4.5vw,3.2rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 760, margin: "0 auto 14px" }}>
            Rated {BUSINESS.rating}★ by the People
            <br />
            <span style={{ color: "#C9A84C" }}>We Drive Every Day</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            {BUSINESS.reviewCount}+ reviews across airport transfers, corporate accounts, weddings,
            wine tours and event nights. Here's a sample of recent feedback.
          </p>
        </section>
        <section style={{ background: "#09090B", padding: "48px 24px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
            {REVIEWS.map((r) => (
              <div key={r.author + r.date} style={{ background: "#17171A", border: "1px solid #2A2A30", borderRadius: 16, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ color: "#C9A84C", fontSize: 14 }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  <span style={{ color: "#6B7280", fontSize: 11 }}>
                    {new Date(r.date).toLocaleDateString("en-AU", { month: "short", year: "numeric" })}
                  </span>
                </div>
                <p style={{ color: "#D1D5DB", fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>"{r.body}"</p>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, margin: 0 }}>
                  {r.author} <span style={{ color: "#6B7280", fontWeight: 400 }}>· {r.service}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ background: "#09090B", padding: "32px 24px 60px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, marginBottom: 10 }}>Experience it yourself</h2>
          <p style={{ color: "#6B7280", marginBottom: 20 }}>Fixed prices · Professional chauffeurs · 24/7</p>
          <Link href="/book" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "15px 42px", borderRadius: 13, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
            Book Your First Ride →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
