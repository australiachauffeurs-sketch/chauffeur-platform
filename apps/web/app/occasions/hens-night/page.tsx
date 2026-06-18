import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Hens Night Chauffeur Adelaide | Australia Chauffeurs",
  description:
    "Luxury hens night chauffeur Adelaide. Decorated SUV or van for up to 7 guests — winery tours, Glenelg beach, city dining and beyond. From $175/hr. Call (08) 7078 1777.",
  keywords: [
    "hens night chauffeur Adelaide",
    "hens party transport Adelaide",
    "hens night limo Adelaide",
    "winery tour hens night Adelaide",
    "Glenelg hens night chauffeur",
    "group chauffeur Adelaide",
    "hens night SUV Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/occasions/hens-night` },
};

const faqs = [
  {
    q: "How many guests can you accommodate for a hens night?",
    a: "Our premium SUVs seat up to 5 guests comfortably, and our luxury people-mover vans accommodate up to 7 guests — perfect for the whole hens group travelling together.",
  },
  {
    q: "Can you decorate the vehicle?",
    a: "Absolutely. We offer complimentary balloon and ribbon decorations in your chosen colours. Just let us know your theme when you book and we'll have the vehicle dressed before pickup.",
  },
  {
    q: "Do you cover winery visits in the Adelaide Hills and McLaren Vale?",
    a: "Yes. We regularly run hens night wine tours to Hahndorf, Shaw + Smith, d'Arenberg, and Wirra Wirra among others. Your chauffeur will wait at each venue while you enjoy your tasting.",
  },
  {
    q: "What is the minimum booking duration?",
    a: "Our minimum hire is 3 hours, which gives you plenty of time to visit a winery or two, head to Glenelg for sunset cocktails, and arrive at your dinner venue in style.",
  },
  {
    q: "Can we make multiple stops across Adelaide?",
    a: "Yes — our hourly hire service is designed exactly for this. You set the itinerary and we drive. Common hens night routes include Norwood for lunch, the city for cocktails, and Glenelg for dinner.",
  },
];

export default function HensNightPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#09090B", color: "#F5F5F5", fontFamily: "Georgia, serif" }}>

        {/* Hero */}
        <section
          style={{
            padding: "100px 24px 72px",
            textAlign: "center",
            background: "linear-gradient(160deg, #09090B 60%, #1a1408 100%)",
            borderBottom: "1px solid #2a2010",
          }}
        >
          <p style={{ color: "#C9A84C", letterSpacing: "0.2em", fontSize: "13px", textTransform: "uppercase", marginBottom: "16px" }}>
            Occasions — Hens Night
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "24px" }}>
            Hens Night Chauffeur Adelaide
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#B0B0B0", maxWidth: "640px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Celebrate the bride-to-be in style. Decorated SUV or van for the whole group — wineries, Glenelg beach, city cocktail bars and beyond. Your chauffeur handles every detail so the group never stops celebrating.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/book"
              style={{
                background: "#C9A84C",
                color: "#09090B",
                padding: "14px 32px",
                borderRadius: "4px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Book Your Hens Night
            </Link>
            <a
              href="tel:0870781777"
              style={{
                border: "1px solid #C9A84C",
                color: "#C9A84C",
                padding: "14px 32px",
                borderRadius: "4px",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Call (08) 7078 1777
            </a>
          </div>
        </section>

        {/* What's Included */}
        <section style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "12px" }}>What's Included</h2>
          <p style={{ color: "#B0B0B0", lineHeight: 1.8, marginBottom: "36px" }}>
            Every hens night booking with Australia Chauffeurs comes with a fully professional experience — not just a driver.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {[
              { title: "Vehicle Decorations", desc: "Balloons, ribbons, and personalised signage in your chosen colours — set up before we arrive at your door." },
              { title: "Complimentary Wait Time", desc: "Your chauffeur waits at every winery, restaurant, or cocktail bar — no extra charge for reasonable stops." },
              { title: "Custom Route Planning", desc: "We help you design the perfect itinerary: Adelaide Hills wineries, Glenelg sunset, Rundle Street dining." },
              { title: "Chilled Water & Refreshments", desc: "Bottled water provided. Add a sparkling wine or mocktail pack for the group on request." },
              { title: "Door-to-Door Service", desc: "We collect from the first guest's home and drop each guest safely back at the end of the night." },
              { title: "Group Up to 7", desc: "Our people-mover van keeps the whole group together — no splitting into Ubers mid-celebration." },
            ].map((item) => (
              <div key={item.title} style={{ background: "#111113", border: "1px solid #2a2010", borderRadius: "8px", padding: "24px" }}>
                <h3 style={{ color: "#C9A84C", fontSize: "1rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#B0B0B0", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Routes */}
        <section style={{ padding: "56px 24px", background: "#0d0d10", borderTop: "1px solid #1e1e24", borderBottom: "1px solid #1e1e24" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "24px" }}>Popular Hens Night Routes</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {[
                { route: "Winery Day-into-Evening", desc: "Shaw + Smith or Hahndorf Hill in the Adelaide Hills → city rooftop cocktails → Peel St dinner." },
                { route: "McLaren Vale Wine Tour", desc: "d'Arenberg Cube, Wirra Wirra, and Chapel Hill tastings → Willunga for sunset → Jetty Rd Glenelg." },
                { route: "Glenelg Beach Afternoon", desc: "Moseley Square, beachside brunch, cocktails at The Glenelg Hotel, then city-bound for dinner." },
                { route: "Barossa Valley Experience", desc: "Full-day tour to Seppeltsfield, Langmeil, and Chateau Tanunda — the ultimate hens wine escape." },
              ].map((r) => (
                <div key={r.route} style={{ borderLeft: "3px solid #C9A84C", paddingLeft: "16px" }}>
                  <p style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: "6px" }}>{r.route}</p>
                  <p style={{ color: "#B0B0B0", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicles & Pricing */}
        <section style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "12px" }}>Vehicles & Pricing</h2>
          <p style={{ color: "#B0B0B0", lineHeight: 1.8, marginBottom: "36px" }}>
            All rates are all-inclusive — no fuel levies, no hidden tolls, no surprise add-ons.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {[
              { vehicle: "Luxury Sedan", seats: "Up to 3 guests", rate: "From $125/hr", note: "Mercedes-Benz E-Class or equivalent. Ideal for smaller groups or bride-and-bridesmaids." },
              { vehicle: "Premium SUV", seats: "Up to 5 guests", rate: "From $150/hr", note: "Mercedes GLS or BMW X7. Spacious, comfortable, and perfect for a mid-size hens group." },
              { vehicle: "Luxury Van / People-Mover", seats: "Up to 7 guests", rate: "From $175/hr", note: "Keep the whole group together. Decorated and chilled, with luggage space for accessories and gifts." },
            ].map((v) => (
              <div key={v.vehicle} style={{ background: "#111113", border: "1px solid #2a2010", borderRadius: "8px", padding: "28px" }}>
                <h3 style={{ color: "#FFFFFF", fontSize: "1.1rem", marginBottom: "4px" }}>{v.vehicle}</h3>
                <p style={{ color: "#C9A84C", fontSize: "0.85rem", marginBottom: "12px" }}>{v.seats}</p>
                <p style={{ color: "#C9A84C", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px" }}>{v.rate}</p>
                <p style={{ color: "#B0B0B0", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>{v.note}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "#777", fontSize: "0.85rem", marginTop: "20px" }}>Minimum 3-hour hire. Decorations included at no extra charge.</p>
        </section>

        {/* FAQs */}
        <section style={{ padding: "56px 24px", background: "#0d0d10", borderTop: "1px solid #1e1e24" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "32px" }}>Frequently Asked Questions</h2>
            {faqs.map((faq) => (
              <div key={faq.q} style={{ borderBottom: "1px solid #1e1e24", paddingBottom: "24px", marginBottom: "24px" }}>
                <h3 style={{ color: "#FFFFFF", fontSize: "1rem", marginBottom: "10px" }}>{faq.q}</h3>
                <p style={{ color: "#B0B0B0", lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 24px", textAlign: "center", background: "#09090B" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: "2rem", marginBottom: "16px" }}>Ready to Plan the Perfect Hens Night?</h2>
          <p style={{ color: "#B0B0B0", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
            Book online in minutes or call our team on <strong style={{ color: "#C9A84C" }}>(08) 7078 1777</strong> for a tailored quote.
          </p>
          <Link
            href="/book"
            style={{
              background: "#C9A84C",
              color: "#09090B",
              padding: "16px 40px",
              borderRadius: "4px",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "1.05rem",
            }}
          >
            Book Now
          </Link>
        </section>
      {/* Related pages */}
        <section style={{ background: "#0d0d10", padding: "48px 24px", borderTop: "1px solid #1f1f28" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.15em", fontSize: 11, textTransform: "uppercase", marginBottom: 20 }}>Related Pages</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Link href="/occasions/winery-day-tour" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Winery Day Tour Chauffeur →</Link>
              <Link href="/occasions/bucks-party" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Bucks Party Chauffeur →</Link>
              <Link href="/locations/mclaren-vale" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>McLaren Vale Chauffeur →</Link>
              <Link href="/locations/barossa-valley" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Barossa Valley Transfers →</Link>
              <Link href="/services/hourly-hire" style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#9CA3AF", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Hourly Hire Chauffeur →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
