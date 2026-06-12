/**
 * Centralized SEO config & JSON-LD schema builders.
 * Swap NEXT_PUBLIC_SITE_URL when moving to a custom domain — everything follows.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://chauffeur-platform-web.vercel.app";

export const BUSINESS = {
  name: "Elite Chauffeurs Australia",
  phone: "+61 8 8000 0000",
  email: "bookings@elitechauffeurs.au",
  locality: "Adelaide",
  region: "SA",
  postcode: "5000",
  country: "AU",
  lat: -34.9285,
  lng: 138.6007,
  rating: "4.9",
  reviewCount: "247",
};

type Crumb = { name: string; path: string };

export function buildBreadcrumb(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: `${SITE_URL}${c.path}`,
      })),
    ],
  };
}

export function buildTaxiService(opts: {
  name: string;
  description?: string;
  price?: string | number;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    provider: { "@type": "LocalBusiness", name: BUSINESS.name, telephone: BUSINESS.phone },
    areaServed: (opts.areaServed || ["Adelaide"]).map((a) => ({ "@type": "Place", name: a })),
    ...(opts.price
      ? {
          offers: {
            "@type": "Offer",
            price: String(opts.price),
            priceCurrency: "AUD",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function buildFAQ(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function buildEvent(opts: {
  name: string;
  startDate: string;
  endDate?: string;
  venue: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: opts.name,
    startDate: opts.startDate,
    ...(opts.endDate ? { endDate: opts.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: opts.venue,
      address: { "@type": "PostalAddress", addressLocality: "Adelaide", addressRegion: "SA", addressCountry: "AU" },
    },
    description: opts.description,
    organizer: { "@type": "Organization", name: opts.name },
  };
}

export function buildReviewList(
  reviews: { author: string; rating: number; body: string; date: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating,
      reviewCount: BUSINESS.reviewCount,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
      reviewBody: r.body,
      datePublished: r.date,
    })),
  };
}

/** Serialize schema safely for a <script type="application/ld+json"> tag */
export function jsonLd(schema: object): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
