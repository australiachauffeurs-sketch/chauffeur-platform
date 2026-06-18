import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Cruise Ship & Airport Combo Transfer Adelaide | Australia Chauffeurs",
  description:
    "Cruise ship and airport combo chauffeur transfers Adelaide. Outer Harbor cruise terminal, Adelaide Airport, meet-and-greet, full luggage handling. Call (08) 7078 1777.",
  keywords: [
    "cruise ship transfer Adelaide",
    "Outer Harbor cruise terminal chauffeur",
    "airport cruise combo transfer Adelaide",
    "Adelaide cruise port chauffeur",
    "airport to cruise terminal Adelaide",
    "meet and greet cruise Adelaide",
    "luggage handling chauffeur Adelaide",
  ],
  alternates: { canonical: `${SITE_URL}/occasions/airport-cruise-transfer` },
};

const faqs = [
  {
    q: "Which cruise terminal in Adelaide do you service?",
    a: "We service the Outer Harbor Cruise Terminal at Outer Harbor — the primary cruise embarkation and disembarkation point for South Australia. We also cover any Port Adelaide waterfront transfers for smaller vessels.",
  },
  {
    q: "Can you combine an airport pickup with a cruise terminal drop-off in one booking?",
    a: "Yes — this is one of our most popular booking types. We meet you at Adelaide Airport arrivals, assist with luggage, and transfer you directly to the Outer Harbor cruise terminal for embarkation. One booking, one price, no stress.",
  },
  {
    q: "Do you offer meet-and-greet at the airport?",
    a: "Yes. Your chauffeur will be waiting in the arrivals hall with a name sign, help with all luggage, and escort you to the vehicle. We track your flight in real time and adjust if there are any delays.",
  },
  {
    q: "What if our cruise arrives earlier or later than expected?",
    a: "We monitor cruise arrival schedules in real time. If your ship docks early or late, we adjust the chauffeur schedule accordingly — you won't be waiting, and you won't be charged for someone else's delay.",
  },
  {
    q: "How much luggage can you accommodate?",
    a: "Our sedans handle 2–3 large cases comfortably. Our SUVs accommodate 4–5 large cases plus carry-on. For larger groups or extensive cruise luggage, our people-mover with trailer arrangement is available — just advise us at booking.",
  },
];

export default function AirportCruiseTransferPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#09090B", color: "#F5F5F5", fontFamily: "Georgia, serif" }}>

        {/* Hero */}
        <section
          style={{
            padding: "100px 24px 72px",
            textAlign: "center",
            background: "linear-gradient(160deg, #09090B 60%, #080e12 100%)",
            borderBottom: "1px solid #10202a",
          }}
        >
          <p style={{ color: "#C9A84C", letterSpacing: "0.2em", fontSize: "13px", textTransform: "uppercase", marginBottom: "16px" }}>
            Occasions — Airport & Cruise Transfers
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "24px" }}>
            Cruise Ship & Airport Combo Transfers Adelaide
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#B0B0B0", maxWidth: "660px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Seamless connections between Adelaide Airport and the Outer Harbor Cruise Terminal. Meet-and-greet arrivals, full luggage handling, and real-time flight and vessel tracking — so your journey starts and ends without a single worry.
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
              Book Transfer
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

        {/* Transfer Types */}
        <section style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "12px" }}>Transfer Options</h2>
          <p style={{ color: "#B0B0B0", lineHeight: 1.8, marginBottom: "36px" }}>
            Whether you're embarking on a cruise or returning from one, we cover every leg of the journey with the same five-star standard.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {[
              {
                title: "Airport → Cruise Terminal",
                desc: "Fly into Adelaide Airport, meet your chauffeur in arrivals, and transfer directly to Outer Harbor Cruise Terminal for embarkation. Ideal for interstate and international cruise guests.",
              },
              {
                title: "Cruise Terminal → Airport",
                desc: "Disembark at Outer Harbor and transfer directly to Adelaide Airport for your onward flight. We time the pickup to your vessel's docking schedule.",
              },
              {
                title: "Hotel → Cruise Terminal",
                desc: "Staying in Adelaide pre-cruise? We'll collect you and all luggage from your CBD hotel and deliver you to the terminal with time to spare.",
              },
              {
                title: "Cruise Terminal → Hotel / Home",
                desc: "Arrive back in Adelaide and be taken directly to your home or hotel — no navigating public transport with heavy luggage after a long voyage.",
              },
              {
                title: "Full Combo Booking",
                desc: "Book the inbound airport pickup and outbound cruise terminal drop-off (or return journey) in one booking. One point of contact, consistent service both ways.",
              },
              {
                title: "Port Adelaide Day Excursion",
                desc: "Have a day in port before embarkation? We can take you on a city tour, winery visit, or Glenelg lunch and return you to the terminal on time.",
              },
            ].map((item) => (
              <div key={item.title} style={{ background: "#111113", border: "1px solid #10202a", borderRadius: "8px", padding: "24px" }}>
                <h3 style={{ color: "#C9A84C", fontSize: "1rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#B0B0B0", fontSize: "0.92rem", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section style={{ padding: "56px 24px", background: "#0d0d10", borderTop: "1px solid #1e1e24", borderBottom: "1px solid #1e1e24" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "32px" }}>What Every Transfer Includes</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              {[
                { title: "Meet & Greet with Name Sign", desc: "Your chauffeur waits in arrivals holding your name — no hunting for a driver after a long flight or voyage." },
                { title: "Full Luggage Handling", desc: "We load and unload every bag. From the baggage carousel to the vehicle to your cabin or front door." },
                { title: "Flight & Vessel Tracking", desc: "We monitor your flight or cruise arrival in real time. Delays don't cost you — we adjust automatically." },
                { title: "Complimentary Wait Time", desc: "30 minutes complimentary wait included on all airport and cruise terminal arrivals to allow for customs and luggage." },
                { title: "Chilled Water Onboard", desc: "Arrive refreshed. Bottled water and a cool, comfortable cabin after a long journey." },
                { title: "No Hidden Fees", desc: "All-inclusive pricing — no surcharges for luggage, early morning pickups, or terminal wait fees." },
              ].map((item) => (
                <div key={item.title} style={{ borderLeft: "3px solid #C9A84C", paddingLeft: "16px" }}>
                  <p style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: "6px" }}>{item.title}</p>
                  <p style={{ color: "#B0B0B0", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicles & Pricing */}
        <section style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ color: "#C9A84C", fontSize: "1.7rem", marginBottom: "12px" }}>Vehicles & Pricing</h2>
          <p style={{ color: "#B0B0B0", lineHeight: 1.8, marginBottom: "36px" }}>Flat-rate point-to-point pricing between key locations. All-inclusive, no surprises.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {[
              { vehicle: "Luxury Sedan", seats: "1–3 passengers", rate: "From $95", note: "Mercedes-Benz E-Class or S-Class. Up to 3 large suitcases. Adelaide Airport ↔ Outer Harbor or CBD." },
              { vehicle: "Premium SUV", seats: "Up to 5 passengers", rate: "From $125", note: "BMW X7 or Mercedes GLS. Generous boot for 4–5 large cases. Families and couples with cruise luggage." },
              { vehicle: "Luxury People-Mover", seats: "Up to 7 passengers", rate: "From $155", note: "Groups travelling together. Multiple large cases accommodated. Ideal for family cruise departures." },
            ].map((v) => (
              <div key={v.vehicle} style={{ background: "#111113", border: "1px solid #10202a", borderRadius: "8px", padding: "28px" }}>
                <h3 style={{ color: "#FFFFFF", fontSize: "1.1rem", marginBottom: "4px" }}>{v.vehicle}</h3>
                <p style={{ color: "#C9A84C", fontSize: "0.85rem", marginBottom: "12px" }}>{v.seats}</p>
                <p style={{ color: "#C9A84C", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px" }}>{v.rate}</p>
                <p style={{ color: "#B0B0B0", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>{v.note}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "#777", fontSize: "0.85rem", marginTop: "20px" }}>
            Rates shown are indicative point-to-point minimums. Final quote based on exact pickup/drop-off addresses. 30-min complimentary wait included on all airport and cruise arrivals.
          </p>
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
          <h2 style={{ color: "#FFFFFF", fontSize: "2rem", marginBottom: "16px" }}>Start Your Journey the Right Way</h2>
          <p style={{ color: "#B0B0B0", marginBottom: "32px", maxWidth: "520px", margin: "0 auto 32px" }}>
            Book your cruise or airport transfer online, or call <strong style={{ color: "#C9A84C" }}>(08) 7078 1777</strong> for a tailored quote.
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
