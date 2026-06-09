import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "FAQ — Chauffeur Service Adelaide | Common Questions Answered",
  description:
    "Answers to common questions about Elite Chauffeurs Adelaide — pricing, booking process, fleet, cancellations, airport pickups and more.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

const FAQS = [
  {
    category: "Booking",
    questions: [
      { q: "How do I book a chauffeur in Adelaide?", a: "You can book online in under 60 seconds via our website or mobile app. Enter your pickup/dropoff, select a vehicle, choose your date and time, and confirm. You'll receive instant booking confirmation by SMS and email." },
      { q: "How far in advance should I book?", a: "We recommend booking at least 2–4 hours in advance for standard transfers. For airport pickups, weddings and events, we recommend 24–48 hours. Urgent bookings can be accommodated subject to availability — call us directly." },
      { q: "Can I book for someone else?", a: "Yes. Simply enter your details as the account holder and add the passenger's name in the booking notes. Your driver will be briefed on who to collect." },
    ],
  },
  {
    category: "Pricing",
    questions: [
      { q: "How much does a chauffeur cost in Adelaide?", a: "Our prices start from $89 for an airport transfer to the CBD in a luxury sedan. Prices vary by vehicle type, distance, time of day and service type. Get an instant fixed quote online with no hidden charges." },
      { q: "Are there any extra charges?", a: "No surprise charges. Your quote includes all tolls, parking where applicable, and waiting time allowances (15 min at residential, 45 min at airports after landing). After-hours rate applies midnight–5am." },
      { q: "Do you offer corporate account pricing?", a: "Yes. Corporate accounts receive preferential rates, monthly invoicing, GST receipts, and a dedicated account manager. Apply online or call us to discuss your needs." },
    ],
  },
  {
    category: "Airport Transfers",
    questions: [
      { q: "Do you track my flight?", a: "Yes. We monitor your flight 24 hours before arrival. If your flight is delayed or arrives early, your driver adjusts automatically — at no extra charge." },
      { q: "Where does my driver meet me at Adelaide Airport?", a: "Your chauffeur meets you in the arrivals hall with a name board. After clearing customs, simply look for your driver near the exit doors. We'll send you their contact number so you can reach them directly." },
      { q: "What happens if my flight is cancelled?", a: "We'll cancel your transfer at no charge and rebook when you have a new flight. Just let us know as soon as possible." },
    ],
  },
  {
    category: "Cancellations & Changes",
    questions: [
      { q: "What is your cancellation policy?", a: "Free cancellation up to 2 hours before your scheduled pickup. Cancellations within 2 hours incur a 50% charge. No-shows are charged in full." },
      { q: "Can I change my booking?", a: "Yes. Changes to time, pickup address or vehicle can be made via the app or by calling us, subject to availability. Changes must be made at least 1 hour before pickup." },
    ],
  },
  {
    category: "Vehicles & Drivers",
    questions: [
      { q: "What vehicles do you have?", a: "Our fleet includes luxury sedans (Mercedes-Benz E/S-Class, BMW 5/7 Series), luxury SUVs (Mercedes GLS, BMW X7), executive vans (Mercedes Viano) and stretch limousines. All vehicles are 2022 model or newer." },
      { q: "Are your drivers police-checked?", a: "All our chauffeurs undergo thorough background checks including police clearance, DMV checks, and safe driver training. They are professionally dressed and trained in discretion and protocol." },
      { q: "Is there Wi-Fi in the vehicle?", a: "Select vehicles are equipped with complimentary Wi-Fi. Request Wi-Fi when booking and we'll assign a Wi-Fi-equipped vehicle where available." },
    ],
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.flatMap(cat =>
    cat.questions.map(q => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <Navbar />
      <main>
        <section style={{ background: "#09090B", padding: "72px 24px 48px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.2em", fontSize: 13, marginBottom: 12 }}>HELP CENTRE</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: 16 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: "#6B7280", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            Everything you need to know about Elite Chauffeurs Adelaide.
            Can't find what you need? <Link href="/book" style={{ color: "#C9A84C" }}>Contact us →</Link>
          </p>
        </section>

        <section style={{ padding: "48px 24px 80px", background: "#09090B" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {FAQS.map(cat => (
              <div key={cat.category} style={{ marginBottom: 48 }}>
                <h2 style={{ color: "#C9A84C", fontWeight: 800, fontSize: 20, marginBottom: 24, paddingBottom: 12, borderBottom: "1px solid #2A2A30" }}>
                  {cat.category}
                </h2>
                {cat.questions.map(item => (
                  <details key={item.q} style={{ borderBottom: "1px solid #1E1E22", paddingBottom: 20, marginBottom: 20 }}>
                    <summary style={{ color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", padding: "4px 0", lineHeight: 1.4 }}>
                      {item.q}
                    </summary>
                    <p style={{ color: "#9CA3AF", marginTop: 14, lineHeight: 1.75, fontSize: 15 }}>{item.a}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#17171A", borderTop: "1px solid #2A2A30", padding: "56px 24px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Still have a question?</h2>
          <p style={{ color: "#6B7280", marginBottom: 28 }}>Our team is available 24/7.</p>
          <Link href="/book" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "16px 40px", borderRadius: 12, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
            Book Now or Contact Us →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
