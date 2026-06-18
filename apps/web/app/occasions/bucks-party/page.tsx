import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Bucks Party Chauffeur Adelaide | Australia Chauffeurs",
  description:
    "Bucks party chauffeur Adelaide — brewery tours, Barossa Valley, Adelaide Hills wineries and city-to-city transfers. Point-to-point or hourly hire for groups. Call (08) 7078 1777.",
  keywords: [
    "bucks party chauffeur Adelaide",
    "bucks night transport Adelaide",
    "brewery tour chauffeur Adelaide",
    "Barossa Valley bucks party",
    "Adelaide Hills winery tour bucks",
    "group chauffeur Adelaide bucks",
    "bucks party driver Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/occasions/bucks-party` },
};

const faqs = [
  {
    q: "Can you take us on a brewery tour around Adelaide?",
    a: "Absolutely. We run bucks party brewery tours to Pirate Life, Big Shed Brewing, Mismatch Brewing in the Adelaide Hills, and Prancing Pony in Totness. Your chauffeur handles all the driving so the whole group can enjoy tastings.",
  },
  {
    q: "Do you cover the Barossa Valley for a bucks day?",
    a: "Yes — Barossa is one of our most popular bucks destinations. We take groups to Seppeltsfield, Wolf Blass, Langmeil, and Jacob's Creek among others. Full-day Barossa packages start from 6 hours.",
  },
  {
    q: "What's the difference between point-to-point and hourly hire?",
    a: "Point-to-point is a single transfer from A to B — ideal for getting the group from accommodation to a venue. Hourly hire gives you a chauffeur on standby for the day so you can visit multiple venues without locking in a schedule.",
  },
  {
    q: "How large a group can you accommodate?",
    a: "Our luxury vans seat up to 7 guests. For larger groups we can coordinate multiple vehicles travelling together. Contact us and we'll arrange the right fleet for your numbers.",
  },
  {
    q: "What if the group wants to add a venue on the fly?",
    a: "No problem — on hourly hire bookings your chauffeur is flexible. Just let them know the new destination and they'll route accordingly. We're here to make the day run smoothly.",
  },
];

export default function BucksPartyPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#09090B", color: "#F5F5F5", fontFamily: "Georgia, serif" }}>

        {/* Hero */}
        <section
          style={{
            padding: "100px 24px 72px",
            textAlign: "center",
            background: "linear-gradient(160deg, #09090B 60%, #0e1208 100%)",
            borderBottom: "1px solid #202a10",
          }}
        >
          <p style={{ color: "#C9A84C", letterSpacing: "0.2em", fontSize: "13px", textTransform: "uppercase", marginBottom: "16px" }}>
            Occasions — Bucks Party
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "24px" }}>
            Bucks Party Chauffeur Adelaide
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#B0B0B0", maxWidth: "640px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Brewery crawls, Barossa Valley wine tours, Adelaide Hills distilleries, or a straight shot into the city — we keep the group moving and the night rolling. Your dedicated chauffeur, your itinerary.
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
              Book Your Bucks Day
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
            Every bucks party booking is handled with the same level of professionalism we bring to corporate clients — reliable, discreet, and on time.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {[
              { title: "Dedicated Chauffeur All Day", desc: "Your driver stays with the group from first pickup to last drop-off. No waiting for rideshares at the end of the night." },
              { title: "Brewery & Winery Wait Time", desc: "We park and wait at every stop — Pirate Life, Mismatch Brewing, Seppeltsfield, wherever you choose." },
              { title: "Point-to-Point or Hourly", desc: "Need a single transfer or a full-day driver? We offer both. Mix and match to suit your plan." },
              { title: "Route Flexibility", desc: "Add a venue, skip one, change order entirely — on hourly hire we adapt to the group's energy on the day." },
              { title: "Chilled Water Onboard", desc: "Bottled water stocked in every vehicle. Ice and cooler bag available on request for BYO." },
              { title: "Safe Ride Home", desc: "We drop every guest to their door at the end of the night — no one left behind, no one in an unknown Uber." },
            ].map((item) => (
              <div key={item.title} style={{ background: "#111113", border: "1px solid #1e2a10", borderRadius: "8px", padding: "24px" }}>
                <h3 style={{ color: "#C9A84C", fontSize: "1rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#B0B0B0", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Packages */}
        <section style={{ padding: "56px 24px", background: "#0d0d10", borderTop: "1px solid #1e1e24", borderBottom: "1px solid #1e1e24" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "24px" }}>Popular Bucks Party Packages</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {[
                { name: "Adelaide Brewery Tour", desc: "Pirate Life Brewing (Port Adelaide) → Big Shed Brewing (Royal Park) → Mismatch Brewing (Adelaide Hills) → city dinner." },
                { name: "Barossa Full Day", desc: "Seppeltsfield, Wolf Blass, and Langmeil for cellar door tastings — 6–8 hours in the valley before heading home." },
                { name: "Adelaide Hills & City", desc: "Prancing Pony Brewery (Totness) → Hahndorf lunch → city bar crawl — Hindley St and Leigh St." },
                { name: "Multi-Venue City Night", desc: "Point-to-point transfers between your chosen venues — sports bar, steak restaurant, rooftop, club — all in one booking." },
              ].map((pkg) => (
                <div key={pkg.name} style={{ borderLeft: "3px solid #C9A84C", paddingLeft: "16px" }}>
                  <p style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: "6px" }}>{pkg.name}</p>
                  <p style={{ color: "#B0B0B0", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>{pkg.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicles & Pricing */}
        <section style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "12px" }}>Vehicles & Pricing</h2>
          <p style={{ color: "#B0B0B0", lineHeight: 1.8, marginBottom: "36px" }}>All rates are fully inclusive. No fuel levies or tolls added after the fact.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {[
              { vehicle: "Luxury Sedan", seats: "Up to 3 guests", rate: "From $125/hr", note: "Mercedes-Benz E-Class. Ideal for point-to-point transfers for the buck and a couple of mates." },
              { vehicle: "Premium SUV", seats: "Up to 5 guests", rate: "From $150/hr", note: "BMW X7 or Mercedes GLS. Plenty of boot space for a change of gear or equipment." },
              { vehicle: "Luxury People-Mover", seats: "Up to 7 guests", rate: "From $175/hr", note: "Keep the whole group together. The most popular choice for bucks brewery and winery tours." },
            ].map((v) => (
              <div key={v.vehicle} style={{ background: "#111113", border: "1px solid #1e2a10", borderRadius: "8px", padding: "28px" }}>
                <h3 style={{ color: "#FFFFFF", fontSize: "1.1rem", marginBottom: "4px" }}>{v.vehicle}</h3>
                <p style={{ color: "#C9A84C", fontSize: "0.85rem", marginBottom: "12px" }}>{v.seats}</p>
                <p style={{ color: "#C9A84C", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px" }}>{v.rate}</p>
                <p style={{ color: "#B0B0B0", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>{v.note}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "#777", fontSize: "0.85rem", marginTop: "20px" }}>Minimum 3-hour hire for group occasions. Point-to-point transfers also available.</p>
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
          <h2 style={{ color: "#FFFFFF", fontSize: "2rem", marginBottom: "16px" }}>Make the Buck's Last Night Epic</h2>
          <p style={{ color: "#B0B0B0", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
            Book online or call <strong style={{ color: "#C9A84C" }}>(08) 7078 1777</strong> for a group quote.
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
      </main>
      <Footer />
    </>
  );
}
