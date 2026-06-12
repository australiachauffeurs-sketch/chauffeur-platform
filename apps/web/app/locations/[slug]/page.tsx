import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";
import { SUBURBS, EXISTING_LOCATION_SLUGS } from "@/data/suburbs";
import { SITE_URL, buildTaxiService, buildFAQ, buildBreadcrumb, jsonLd } from "@/lib/seo";

export const dynamicParams = false;

const DYNAMIC_SUBURBS = SUBURBS.filter((s) => !EXISTING_LOCATION_SLUGS.has(s.slug));

export function generateStaticParams() {
  return DYNAMIC_SUBURBS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = DYNAMIC_SUBURBS.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `Chauffeur ${s.name} | Airport Transfers & Luxury Car Service`,
    description: `Private chauffeur service in ${s.name}, Adelaide. Airport transfers from $${s.sedan} fixed (~${s.min} min), corporate travel, weddings & events. Professional drivers, luxury vehicles, 24/7.`,
    keywords: [
      `chauffeur ${s.name}`,
      `${s.name} airport transfer`,
      `${s.name} to Adelaide Airport`,
      `luxury car service ${s.name}`,
      `private driver ${s.name}`,
      `${s.name} chauffeur service`,
    ],
    alternates: { canonical: `${SITE_URL}/locations/${slug}` },
  };
}

export default async function SuburbPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = DYNAMIC_SUBURBS.find((x) => x.slug === slug);
  if (!s) notFound();

  const data: SuburbData = {
    name: s.name,
    slug: s.slug,
    postcode: s.postcode,
    region: s.region,
    tagline: s.blurb,
    description: `${s.blurb} Elite Chauffeurs provides fixed-price luxury transfers throughout ${s.name} — airport pickups, corporate travel, weddings and wine tours, with professional suited drivers available 24/7.`,
    distanceFromCBD: `${Math.max(2, Math.round(Math.abs(s.km - 7)))} km`,
    distanceFromAirport: `${s.km} km`,
    airportTime: `~${s.min} min`,
    routes: [
      { to: "Adelaide Airport", price: `$${s.sedan}`, time: `~${s.min} min` },
      { to: "Adelaide CBD", price: `$${Math.max(85, s.sedan - 4)}`, time: `~${Math.max(8, s.min - 2)} min` },
      { to: "Barossa Valley", price: `$${s.sedan + 95}`, time: "~70 min" },
      { to: "McLaren Vale", price: `$${s.sedan + 60}`, time: "~50 min" },
    ],
    landmarks: s.landmarks.map((l) => ({ name: l, note: `Pickup & drop-off available` })),
    heroKeyword: "Luxury Chauffeur Service",
  };

  const faqs = [
    {
      q: `How much is a chauffeur from ${s.name} to Adelaide Airport?`,
      a: `A fixed $${s.sedan} in a luxury sedan, $${s.suv} in an SUV or $${s.van} in an executive van — the drive takes about ${s.min} minutes. No surge pricing, ever.`,
    },
    {
      q: `Do you service all of ${s.name}?`,
      a: `Yes — every street in ${s.name} ${s.postcode} and the surrounding ${s.region} area, 24 hours a day. Early-morning airport pickups are our specialty.`,
    },
    {
      q: `Can I book a chauffeur in ${s.name} for a wedding or wine tour?`,
      a: `Absolutely. Alongside airport transfers we run weddings, school formals, corporate hire and Barossa/McLaren Vale wine tours from ${s.name}, all at fixed prices.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            buildTaxiService({
              name: `Chauffeur Service ${s.name}`,
              description: `Luxury fixed-price chauffeur and airport transfer service in ${s.name}, Adelaide.`,
              price: s.sedan,
              areaServed: [s.name, "Adelaide"],
            })
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(buildFAQ(faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            buildBreadcrumb([
              { name: "Areas We Serve", path: "/areas-served" },
              { name: s.name, path: `/locations/${s.slug}` },
            ])
          ),
        }}
      />
      <SuburbPageTemplate suburb={data} />
    </>
  );
}
