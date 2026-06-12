import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedLinks from "@/components/seo/RelatedLinks";
import QuoteForm from "@/components/lead/QuoteForm";
import { ROUTES, getRoute } from "@/data/routes";
import { SITE_URL, buildTaxiService, buildFAQ, jsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return ROUTES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = getRoute(slug);
  if (!r) return {};
  return {
    title: `${r.from} to ${r.to} Chauffeur | Fixed Price $${r.sedan}`,
    description: `Private chauffeur from ${r.from} to ${r.to}. Fixed price from $${r.sedan} — no surge, no meter. ~${r.min} min direct transfer, flight tracking & meet-and-greet included. Book online 24/7.`,
    keywords: [
      `${r.from} to ${r.to}`,
      `${r.to} to ${r.from}`,
      `${r.from} to ${r.to} price`,
      `${r.to} airport transfer`,
      `chauffeur ${r.to}`,
      `${r.to} private transfer cost`,
    ],
    alternates: { canonical: `${SITE_URL}/routes/${slug}` },
  };
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = getRoute(slug);
  if (!r) notFound();

  const faqs = [
    {
      q: `How much is a chauffeur from ${r.from} to ${r.to}?`,
      a: `The fixed price is $${r.sedan} for a luxury sedan (1–3 passengers), $${r.suv} for a luxury SUV (1–4 passengers, extra luggage) and $${r.van} for an executive van (up to 7 passengers). The price you book is the price you pay — no surge, no meter, all tolls included.`,
    },
    {
      q: `How long does ${r.from} to ${r.to} take?`,
      a: `The direct drive is approximately ${r.min} minutes (${r.km} km) in normal traffic. Your chauffeur monitors conditions and chooses the fastest route on the day.`,
    },
    {
      q: `Do you also drive from ${r.to} to ${r.from}?`,
      a: `Yes — the same fixed prices apply in both directions. For early-morning pickups from ${r.to}, your chauffeur arrives 10 minutes ahead of schedule and sends a text on arrival.`,
    },
    {
      q: "What if my flight is delayed?",
      a: "Airport pickups include free flight tracking. If your flight lands late, your driver adjusts automatically and waiting time is included — no phone calls needed and no extra charges.",
    },
  ];

  const related = [
    ...ROUTES.filter((x) => x.region === r.region && x.slug !== r.slug)
      .slice(0, 4)
      .map((x) => ({ label: `${x.from} → ${x.to}`, href: `/routes/${x.slug}` })),
    ...(r.suburbSlug ? [{ label: `Chauffeur in ${r.to}`, href: `/locations/${r.suburbSlug}` }] : []),
    { label: "All Adelaide transfers", href: "/areas-served" },
    { label: "Airport transfers", href: "/services/airport-transfers" },
    { label: "Full price list", href: "/pricing" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            buildTaxiService({
              name: `${r.from} to ${r.to} Chauffeur Transfer`,
              description: `Fixed-price private chauffeur between ${r.from} and ${r.to}, Adelaide.`,
              price: r.sedan,
              areaServed: ["Adelaide", r.to],
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildFAQ(faqs)) }}
      />
      <Navbar />
      <Breadcrumbs
        crumbs={[
          { name: "Routes", path: "/areas-served" },
          { name: `${r.from} → ${r.to}`, path: `/routes/${r.slug}` },
        ]}
      />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0d0a00 100%)", padding: "60px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, alignItems: "center" }}>
            <div>
              <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.16em", fontSize: 12, marginBottom: 12 }}>
                ✈️ FIXED PRICE TRANSFER · {r.region.toUpperCase()}
              </p>
              <h1 style={{ color: "#fff", fontSize: "clamp(1.7rem,4vw,2.8rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: 14 }}>
                {r.from} to {r.to} Chauffeur
                <br />
                <span style={{ color: "#C9A84C" }}>From ${r.sedan} · ~{r.min} Minutes</span>
              </h1>
              <p style={{ color: "#9CA3AF", fontSize: 15, lineHeight: 1.7, marginBottom: 18 }}>
                {r.blurb} Your professional chauffeur handles the {r.km} km journey door-to-door —
                fixed price, luxury vehicle, no surge and no taxi queue.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", color: "#D1D5DB", fontSize: 13 }}>
                <span>✓ Fixed ${r.sedan} sedan</span>
                <span>✓ Flight tracking</span>
                <span>✓ Meet &amp; greet</span>
                <span>✓ 24/7</span>
              </div>
            </div>
            <QuoteForm defaultPickup={r.from} defaultDropoff={r.to} service="airport_transfer" />
          </div>
        </section>

        {/* Price table */}
        <section style={{ background: "#09090B", padding: "48px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 18 }}>
              {r.from} → {r.to} Fixed Prices
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
              {[
                ["Luxury Sedan", r.sedan, "1–3 passengers · 2 bags", "Mercedes E-Class / BMW 5 Series"],
                ["Luxury SUV", r.suv, "1–4 passengers · 4 bags", "Lexus LX / Mercedes GLE"],
                ["Executive Van", r.van, "Up to 7 passengers · 8 bags", "Mercedes Vito"],
              ].map(([v, p, cap, model]) => (
                <div key={String(v)} style={{ background: "#17171A", border: "1px solid #2A2A30", borderRadius: 16, padding: 20 }}>
                  <p style={{ color: "#fff", fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{v}</p>
                  <p style={{ color: "#C9A84C", fontWeight: 900, fontSize: 28, margin: "0 0 6px" }}>${p}</p>
                  <p style={{ color: "#9CA3AF", fontSize: 12, margin: "0 0 2px" }}>{cap}</p>
                  <p style={{ color: "#6B7280", fontSize: 11, margin: 0 }}>{model}</p>
                </div>
              ))}
            </div>
            <p style={{ color: "#6B7280", fontSize: 12, marginTop: 12 }}>
              Same fixed prices apply {r.to} → {r.from}. All tolls, fuel and airport fees included. After-hours
              (10pm–6am) surcharge may apply.
            </p>
          </div>
        </section>

        {/* Journey details + landmarks */}
        <section style={{ background: "#09090B", padding: "24px 24px 48px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "#17171A", border: "1px solid #2A2A30", borderRadius: 16, padding: 22 }}>
              <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Journey Details</h3>
              {[
                ["Distance", `~${r.km} km`],
                ["Drive time", `~${r.min} minutes`],
                ["Direction", `Both ways — ${r.from} ↔ ${r.to}`],
                ["Availability", "24 hours, 7 days"],
                ["Cancellation", "Free up to 2 hours before pickup"],
              ].map(([k, v]) => (
                <div key={String(k)} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #2A2A30" }}>
                  <span style={{ color: "#6B7280", fontSize: 13 }}>{k}</span>
                  <span style={{ color: "#fff", fontSize: 13, fontWeight: 600, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#17171A", border: "1px solid #2A2A30", borderRadius: 16, padding: 22 }}>
              <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>
                Popular {r.to} Drop-offs
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {r.landmarks.map((l) => (
                  <li key={l} style={{ color: "#9CA3AF", fontSize: 13, padding: "7px 0", borderBottom: "1px solid #2A2A30" }}>
                    📍 {l}
                  </li>
                ))}
                <li style={{ color: "#9CA3AF", fontSize: 13, padding: "7px 0" }}>📍 Any private address in {r.to}</li>
              </ul>
              <h3 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 16, margin: "18px 0 10px" }}>What's Included</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["Meet & greet with name board (airport pickups)", "Flight tracking — free wait on delays", "Luggage assistance & bottled water", "Professional suited chauffeur"].map((f) => (
                  <li key={f} style={{ color: "#9CA3AF", fontSize: 13, padding: "5px 0" }}>✓ {f}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: "#09090B", padding: "8px 24px 48px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 18 }}>
              {r.from} to {r.to} — Common Questions
            </h2>
            <div style={{ display: "grid", gap: 12 }}>
              {faqs.map((f) => (
                <div key={f.q} style={{ background: "#17171A", border: "1px solid #2A2A30", borderRadius: 14, padding: 18 }}>
                  <h3 style={{ color: "#C9A84C", fontSize: 15, fontWeight: 700, margin: "0 0 8px" }}>{f.q}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#09090B", padding: "24px 24px 56px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, marginBottom: 10 }}>
            Book {r.from} → {r.to}
          </h2>
          <p style={{ color: "#6B7280", marginBottom: 22 }}>Fixed ${r.sedan} · ~{r.min} min · Free cancellation</p>
          <Link
            href={`/book?from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}`}
            style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "15px 42px", borderRadius: 13, fontWeight: 900, fontSize: 16, textDecoration: "none" }}
          >
            Book This Transfer →
          </Link>
        </section>

        <RelatedLinks title={`More transfers near ${r.to}`} links={related} />
      </main>
      <Footer />
    </>
  );
}
