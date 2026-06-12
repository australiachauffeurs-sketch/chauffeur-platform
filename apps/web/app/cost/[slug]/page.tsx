import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedLinks from "@/components/seo/RelatedLinks";
import QuoteForm from "@/components/lead/QuoteForm";
import { COST_GUIDES, getCostGuide } from "@/data/costGuides";
import { SITE_URL, buildFAQ, jsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return COST_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getCostGuide(slug);
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    alternates: { canonical: `${SITE_URL}/cost/${slug}` },
  };
}

export default async function CostGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getCostGuide(slug);
  if (!g) notFound();

  const related = [
    ...COST_GUIDES.filter((x) => x.slug !== g.slug).map((x) => ({
      label: x.title.split(":")[0] ?? x.title,
      href: `/cost/${x.slug}`,
    })),
    { label: "Full price list", href: "/pricing" },
    { label: "Chauffeur vs Uber", href: "/compare/chauffeur-vs-uber-adelaide" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(buildFAQ(g.faqs)) }} />
      <Navbar />
      <Breadcrumbs
        crumbs={[
          { name: "Price Guides", path: "/pricing" },
          { name: g.title.split(":")[0] ?? g.title, path: `/cost/${g.slug}` },
        ]}
      />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0a0d00 100%)", padding: "56px 24px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.16em", fontSize: 12, marginBottom: 12 }}>
              💰 2026 PRICE GUIDE
            </p>
            <h1 style={{ color: "#fff", fontSize: "clamp(1.7rem,4vw,2.7rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: 14 }}>
              {g.title}
            </h1>
            <p style={{ color: "#9CA3AF", fontSize: 15, lineHeight: 1.75, maxWidth: 700 }}>{g.intro}</p>
          </div>
        </section>

        {/* Price table */}
        <section style={{ background: "#09090B", padding: "40px 24px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 21, fontWeight: 800, marginBottom: 16 }}>The Numbers</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#17171A" }}>
                    {["Option", "Price", "Notes"].map((h) => (
                      <th key={h} style={{ color: "#C9A84C", padding: "12px 16px", textAlign: "left", fontSize: 13 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {g.priceRows.map((r) => (
                    <tr key={r.label} style={{ borderBottom: "1px solid #2A2A30" }}>
                      <td style={{ color: "#fff", padding: "12px 16px", fontSize: 13 }}>{r.label}</td>
                      <td style={{ color: "#C9A84C", padding: "12px 16px", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap" }}>
                        {r.price}
                      </td>
                      <td style={{ color: "#9CA3AF", padding: "12px 16px", fontSize: 12 }}>{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Factors */}
        <section style={{ background: "#09090B", padding: "16px 24px 40px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 21, fontWeight: 800, marginBottom: 16 }}>What Changes the Price</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {g.factors.map((f) => (
                <div key={f.name} style={{ background: "#17171A", border: "1px solid #2A2A30", borderRadius: 14, padding: 18 }}>
                  <h3 style={{ color: "#C9A84C", fontSize: 15, fontWeight: 700, margin: "0 0 6px" }}>{f.name}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{f.detail}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 14, padding: 20, marginTop: 18 }}>
              <p style={{ color: "#C9A84C", fontWeight: 800, fontSize: 14, margin: "0 0 8px" }}>Our verdict</p>
              <p style={{ color: "#D1D5DB", fontSize: 14, lineHeight: 1.75, margin: 0 }}>{g.verdict}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: "#09090B", padding: "0 24px 40px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 21, fontWeight: 800, marginBottom: 16 }}>Common Questions</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {g.faqs.map((f) => (
                <div key={f.q} style={{ background: "#17171A", border: "1px solid #2A2A30", borderRadius: 14, padding: 18 }}>
                  <h3 style={{ color: "#C9A84C", fontSize: 15, fontWeight: 700, margin: "0 0 8px" }}>{f.q}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section style={{ background: "#09090B", padding: "0 24px 56px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "center" }}>
            <div>
              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, marginBottom: 10 }}>
                Want your exact price?
              </h2>
              <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                Every quote is fixed at booking — the number you see is the number you pay. Or jump straight
                to <Link href="/book" style={{ color: "#C9A84C" }}>online booking</Link> for an instant price.
              </p>
            </div>
            <QuoteForm compact />
          </div>
        </section>

        <RelatedLinks title="More price guides" links={related} />
      </main>
      <Footer />
    </>
  );
}
