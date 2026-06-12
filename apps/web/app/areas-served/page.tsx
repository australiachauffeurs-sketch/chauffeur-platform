import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { SUBURBS, EXISTING_LOCATION_SLUGS } from "@/data/suburbs";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Areas We Serve | Chauffeur Service Across All Adelaide Suburbs",
  description:
    "Elite Chauffeurs covers every Adelaide suburb and region — beachside, hills, north, south and the wine country. Find your suburb for fixed airport transfer prices and local chauffeur service.",
  alternates: { canonical: `${SITE_URL}/areas-served` },
};

/** Hand-crafted pages that aren't in the dataset */
const EXTRA_LOCATIONS: { name: string; slug: string; region: string }[] = [
  { name: "Adelaide Airport", slug: "adelaide-airport", region: "Western" },
  { name: "Adelaide CBD", slug: "adelaide-cbd", region: "City" },
  { name: "North Adelaide", slug: "north-adelaide", region: "City" },
  { name: "Glenelg", slug: "glenelg", region: "Beachside" },
  { name: "Henley Beach", slug: "henley-beach", region: "Beachside" },
  { name: "Port Adelaide", slug: "port-adelaide", region: "Port District" },
  { name: "Norwood", slug: "norwood", region: "Inner East" },
  { name: "Unley", slug: "unley", region: "Inner South" },
  { name: "Burnside", slug: "burnside", region: "Eastern" },
  { name: "Prospect", slug: "prospect", region: "Inner North" },
  { name: "Stirling", slug: "stirling", region: "Adelaide Hills" },
  { name: "Hahndorf", slug: "hahndorf", region: "Adelaide Hills" },
  { name: "Mount Barker", slug: "mount-barker", region: "Adelaide Hills" },
  { name: "Barossa Valley", slug: "barossa-valley", region: "Wine Country" },
  { name: "McLaren Vale", slug: "mclaren-vale", region: "Wine Country" },
  { name: "Victor Harbor", slug: "victor-harbor", region: "Fleurieu" },
];

export default function AreasServedPage() {
  const all = [
    ...EXTRA_LOCATIONS,
    ...SUBURBS.filter((s) => !EXISTING_LOCATION_SLUGS.has(s.slug)).map((s) => ({
      name: s.name,
      slug: s.slug,
      region: s.region,
    })),
  ];

  const regions = Array.from(new Set(all.map((a) => a.region))).sort();

  return (
    <>
      <Navbar />
      <Breadcrumbs crumbs={[{ name: "Areas We Serve", path: "/areas-served" }]} />
      <main>
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0d0d16 100%)", padding: "64px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 14 }}>
            📍 SERVICE AREA
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4.5vw,3.2rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 820, margin: "0 auto 16px" }}>
            Chauffeur Service Across
            <br />
            <span style={{ color: "#C9A84C" }}>Every Adelaide Suburb</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 620, margin: "0 auto", lineHeight: 1.7 }}>
            From the beaches to the Hills and the wine country beyond — find your suburb below for
            fixed airport-transfer prices, local pickup notes and 24/7 availability.
          </p>
        </section>
        <section style={{ background: "#09090B", padding: "48px 24px 64px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            {regions.map((region) => (
              <div key={region} style={{ marginBottom: 34 }}>
                <h2 style={{ color: "#C9A84C", fontSize: 17, fontWeight: 800, marginBottom: 14, letterSpacing: "0.04em" }}>
                  {region}
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {all
                    .filter((a) => a.region === region)
                    .map((a) => (
                      <Link
                        key={a.slug}
                        href={`/locations/${a.slug}`}
                        style={{ background: "#17171A", border: "1px solid #2A2A30", color: "#D1D5DB", padding: "9px 16px", borderRadius: 20, fontSize: 13, textDecoration: "none" }}
                      >
                        {a.name}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
            <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 14, padding: 20, marginTop: 8 }}>
              <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: 14, margin: "0 0 8px" }}>
                Don't see your suburb?
              </p>
              <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                We service all of greater Adelaide and regional South Australia.{" "}
                <Link href="/book" style={{ color: "#C9A84C" }}>Get an instant quote</Link> for any address,
                or call us 24/7.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
