import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";
const BUSINESS_NAME = "Elite Chauffeurs Australia";
const PHONE = "+61 8 8000 0000";
const PHONE_RAW = "+61880000000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elite Chauffeurs Adelaide | #1 Luxury Car Service & Airport Transfers",
    template: "%s | Elite Chauffeurs Adelaide",
  },
  description:
    "Adelaide's premier chauffeur service. Luxury airport transfers from Adelaide Airport, corporate car hire, wedding chauffeurs & special events. Available 24/7. Book online instantly.",
  keywords: [
    "chauffeur service Adelaide",
    "airport transfer Adelaide",
    "Adelaide Airport chauffeur",
    "luxury car hire Adelaide",
    "corporate chauffeur Adelaide",
    "wedding car Adelaide",
    "limousine hire Adelaide",
    "private driver Adelaide",
    "Adelaide CBD chauffeur",
    "executive car service Adelaide",
    "chauffeur hire South Australia",
    "ATAR transfer Adelaide",
    "school formal car Adelaide",
    "wine tour chauffeur Barossa",
    "Glenelg chauffeur",
    "Mount Barker chauffeur",
    "Port Adelaide chauffeur",
    "chauffeur near me Adelaide",
  ],
  authors: [{ name: BUSINESS_NAME, url: SITE_URL }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    title: "Elite Chauffeurs Adelaide | Luxury Airport Transfers & Corporate Car Hire",
    description:
      "Book Adelaide's finest chauffeur service. Airport transfers, corporate hire, weddings & events. Professional drivers, luxury fleet, 24/7 availability.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Elite Chauffeurs Adelaide — Luxury Car Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Chauffeurs Adelaide | Luxury Car Service",
    description:
      "Adelaide's premier chauffeur service for airport transfers, corporate hire & weddings. Book instantly.",
    images: ["/images/hero.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_ID",
  },
  category: "transportation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    description:
      "Adelaide's premier luxury chauffeur and car hire service. Specialising in airport transfers, corporate travel, weddings and special events across South Australia.",
    url: SITE_URL,
    telephone: PHONE,
    priceRange: "$$$$",
    image: [`${SITE_URL}/images/hero.jpg`, `${SITE_URL}/images/luxury.jpg`],
    logo: `${SITE_URL}/images/hero.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Adelaide CBD",
      addressLocality: "Adelaide",
      addressRegion: "SA",
      postalCode: "5000",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -34.9285,
      longitude: 138.6007,
    },
    areaServed: [
      { "@type": "City", name: "Adelaide" },
      { "@type": "City", name: "Glenelg" },
      { "@type": "City", name: "Port Adelaide" },
      { "@type": "City", name: "Mount Barker" },
      { "@type": "City", name: "Barossa Valley" },
      { "@type": "City", name: "McLaren Vale" },
      { "@type": "AdministrativeArea", name: "South Australia" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Chauffeur Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Airport Transfer Adelaide" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Chauffeur Adelaide" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Car Hire Adelaide" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Winery & Wine Tour Transfer" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Special Events Chauffeur" } },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "247",
      bestRating: "5",
    },
    sameAs: [
      "https://www.facebook.com/elitechauffeursa",
      "https://www.instagram.com/elitechauffeursa",
      "https://www.linkedin.com/company/elite-chauffeurs-australia",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    description: "Luxury chauffeur service in Adelaide, South Australia",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/book?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Canonical */}
        <link rel="canonical" href={SITE_URL} />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
