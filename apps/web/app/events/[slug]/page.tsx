import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedLinks from "@/components/seo/RelatedLinks";
import QuoteForm from "@/components/lead/QuoteForm";
import { EVENTS, getEvent } from "@/data/events";
import { SITE_URL, buildEvent, buildFAQ, jsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  return {
    title: `${e.shortName} Chauffeur & Transfers | Fixed Price, No Surge`,
    description: `Pre-book fixed-price chauffeur transfers for ${e.name} (${e.season}). Door-to-gate drop-offs at ${e.venue}, guaranteed returns, no surge pricing. Book early — event dates sell out.`,
    keywords: [
      `${e.shortName} transfers`,
      `${e.shortName} chauffeur`,
      `${e.shortName} transport`,
      `${e.shortName} parking alternative`,
      `${e.venue} drop off`,
    ],
    alternates: { canonical: `${SITE_URL}/events/${slug}` },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();

  const related = [
    ...EVENTS.filter((x) => x.slug !== e.slug).slice(0, 5).map((x) => ({
      label: `${x.shortName} transfers`,
      href: `/events/${x.slug}`,
    })),
    { label: "Special event chauffeur", href: "/services/special-events" },
    { label: "Hourly chauffeur hire", href: "/services/hourly-hire" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            buildEvent({
              name: e.name,
              startDate: e.startDate,
              endDate: e.endDate,
              venue: e.venue,
              description: e.description,
            })
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(buildFAQ(e.faqs)) }} />
      <Navbar />
      <Breadcrumbs
        crumbs={[
          { name: "Events", path: "/events" },
          { name: e.shortName, path: `/events/${e.slug}` },
        ]}
      />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#120d00 100%)", padding: "60px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, alignItems: "center" }}>
            <div>
              <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.16em", fontSize: 12, marginBottom: 12 }}>
                🎟 {e.season.toUpperCase()} · {e.venue.toUpperCase()}
              </p>
              <h1 style={{ color: "#fff", fontSize: "clamp(1.7rem,4vw,2.8rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: 14 }}>
                {e.shortName} Transfers
                <br />
                <span style={{ color: "#C9A84C" }}>Fixed Price · No Surge · Guaranteed Return</span>
              </h1>
              <p style={{ color: "#9CA3AF", fontSize: 15, lineHeight: 1.7 }}>{e.description}</p>
            </div>
            <QuoteForm defaultDropoff={e.venue} service="special_event" />
          </div>
        </section>

        {/* Tips */}
        <section style={{ background: "#09090B", padding: "48px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "#17171A", border: "1px solid #2A2A30", borderRadius: 16, padding: 22 }}>
              <h2 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 17, marginBottom: 14 }}>
                {e.shortName} Transport Tips
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {e.tips.map((t) => (
                  <li key={t} style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.6, padding: "8px 0", borderBottom: "1px solid #2A2A30" }}>
                    💡 {t}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#17171A", border: "1px solid #2A2A30", borderRadius: 16, padding: 22 }}>
              <h2 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 17, marginBottom: 14 }}>Popular {e.shortName} Transfers</h2>
              {e.popularPickups.map((p) => (
                <div key={p.from} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #2A2A30" }}>
                  <span style={{ color: "#fff", fontSize: 13 }}>{p.from}</span>
                  <span style={{ color: "#C9A84C", fontWeight: 800, fontSize: 14 }}>{p.price}</span>
                </div>
              ))}
              <p style={{ color: "#6B7280", fontSize: 11, marginTop: 12 }}>
                Fixed prices — locked at booking, regardless of demand on the night.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: "#09090B", padding: "8px 24px 48px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 18 }}>{e.shortName} — Questions</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {e.faqs.map((f) => (
                <div key={f.q} style={{ background: "#17171A", border: "1px solid #2A2A30", borderRadius: 14, padding: 18 }}>
                  <h3 style={{ color: "#C9A84C", fontSize: 15, fontWeight: 700, margin: "0 0 8px" }}>{f.q}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#09090B", padding: "16px 24px 56px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, marginBottom: 10 }}>
            Lock In Your {e.shortName} Transfer
          </h2>
          <p style={{ color: "#6B7280", marginBottom: 22 }}>{e.season} · Event dates sell out — book early</p>
          <Link
            href={`/book?to=${encodeURIComponent(e.venue)}`}
            style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "15px 42px", borderRadius: 13, fontWeight: 900, fontSize: 16, textDecoration: "none" }}
          >
            Book Now →
          </Link>
        </section>

        <RelatedLinks title="More Adelaide events we cover" links={related} />
      </main>
      <Footer />
    </>
  );
}
