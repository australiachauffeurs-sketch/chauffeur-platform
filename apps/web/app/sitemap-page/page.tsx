import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitemap | Australia Chauffeurs",
  description: "Complete sitemap of all pages on Australia Chauffeurs — services, locations, routes, fleet, blog, and more.",
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "Main Pages",
    links: [
      { label: "Home",                href: "/" },
      { label: "Book a Chauffeur",    href: "/book" },
      { label: "Pricing",             href: "/pricing" },
      { label: "About Us",            href: "/about" },
      { label: "Contact Us",          href: "/contact" },
      { label: "FAQ",                 href: "/faq" },
      { label: "Corporate Accounts",  href: "/corporate-accounts" },
      { label: "Fleet",               href: "/fleet" },
      { label: "Reviews",             href: "/reviews" },
      { label: "Blog",                href: "/blog" },
      { label: "Areas Served",        href: "/areas-served" },
      { label: "Events",              href: "/events" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { label: "Airport Transfers",   href: "/services/airport-transfers" },
      { label: "Corporate Chauffeur", href: "/services/corporate-chauffeur" },
      { label: "Wedding Cars",        href: "/services/wedding-cars" },
      { label: "Wine Tours",          href: "/services/wine-tours" },
      { label: "Special Events",      href: "/services/special-events" },
      { label: "School Formals",      href: "/services/school-formals" },
      { label: "Hourly Hire",         href: "/services/hourly-hire" },
      { label: "Long Distance",       href: "/services/long-distance" },
    ],
  },
  {
    title: "Fleet",
    links: [
      { label: "All Vehicles",        href: "/fleet" },
      { label: "Luxury Sedan",        href: "/fleet/luxury-sedan" },
      { label: "Luxury SUV",          href: "/fleet/luxury-suv" },
      { label: "Stretch Limousine",   href: "/fleet/stretch-limousine" },
      { label: "Executive Van",       href: "/fleet/executive-van" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Adelaide Airport",    href: "/locations/adelaide-airport" },
      { label: "Adelaide CBD",        href: "/locations/adelaide-cbd" },
      { label: "Glenelg",            href: "/locations/glenelg" },
      { label: "North Adelaide",      href: "/locations/north-adelaide" },
      { label: "Norwood",             href: "/locations/norwood" },
      { label: "Mount Barker",        href: "/locations/mount-barker" },
      { label: "Hahndorf",            href: "/locations/hahndorf" },
      { label: "Barossa Valley",      href: "/locations/barossa-valley" },
      { label: "McLaren Vale",        href: "/locations/mclaren-vale" },
      { label: "Stirling",            href: "/locations/stirling" },
      { label: "Port Adelaide",       href: "/locations/port-adelaide" },
      { label: "Victor Harbor",       href: "/locations/victor-harbor" },
      { label: "Unley",               href: "/locations/unley" },
      { label: "Burnside",            href: "/locations/burnside" },
      { label: "Prospect",            href: "/locations/prospect" },
      { label: "Henley Beach",        href: "/locations/henley-beach" },
      { label: "Magill",              href: "/locations/magill" },
      { label: "Parafield",           href: "/locations/parafield" },
    ],
  },
  {
    title: "Popular Routes",
    links: [
      { label: "Adelaide Airport → Barossa Valley",  href: "/routes/adelaide-airport-to-barossa-valley" },
      { label: "Adelaide Airport → Glenelg",         href: "/routes/adelaide-airport-to-glenelg" },
      { label: "Adelaide Airport → McLaren Vale",    href: "/routes/adelaide-airport-to-mclaren-vale" },
      { label: "Adelaide CBD → Airport",             href: "/routes/adelaide-cbd-to-airport" },
      { label: "Adelaide Airport → Mount Barker",    href: "/routes/adelaide-airport-to-mount-barker" },
      { label: "Adelaide Airport → Hahndorf",        href: "/routes/adelaide-airport-to-hahndorf" },
      { label: "Adelaide Airport → Adelaide Hills",  href: "/routes/adelaide-airport-to-adelaide-hills" },
    ],
  },
  {
    title: "Hotels",
    links: [
      { label: "InterContinental Adelaide",  href: "/hotels/intercontinental-adelaide" },
      { label: "Hilton Adelaide",            href: "/hotels/hilton-adelaide" },
      { label: "Sofitel Adelaide",           href: "/hotels/sofitel-adelaide" },
      { label: "Mayfair Hotel Adelaide",     href: "/hotels/mayfair-hotel-adelaide" },
      { label: "Stamford Grand Glenelg",     href: "/hotels/stamford-grand-glenelg" },
      { label: "Playford Hotel Adelaide",    href: "/hotels/playford-hotel-adelaide" },
      { label: "Novotel Barossa",            href: "/hotels/novotel-barossa" },
    ],
  },
  {
    title: "Venues",
    links: [
      { label: "Adelaide Oval",                  href: "/venues/adelaide-oval" },
      { label: "Adelaide Convention Centre",     href: "/venues/adelaide-convention-centre" },
      { label: "Adelaide Entertainment Centre",  href: "/venues/adelaide-entertainment-centre" },
      { label: "Ayers House",                    href: "/venues/ayers-house" },
      { label: "National Wine Centre",           href: "/venues/national-wine-centre" },
    ],
  },
  {
    title: "Comparisons",
    links: [
      { label: "Chauffeur vs Uber Adelaide",  href: "/compare/chauffeur-vs-uber-adelaide" },
      { label: "Chauffeur vs Taxi Adelaide",  href: "/compare/chauffeur-vs-taxi-adelaide" },
    ],
  },
  {
    title: "Blog",
    links: [
      { label: "Adelaide Airport Guide 2026",               href: "/blog/adelaide-airport-guide-2026" },
      { label: "Barossa vs McLaren Vale Day Trip",          href: "/blog/barossa-vs-mclaren-vale-day-trip" },
      { label: "How Much Does a Chauffeur Cost Adelaide",   href: "/blog/how-much-does-a-chauffeur-cost-adelaide" },
      { label: "Corporate Travel Policy Adelaide",          href: "/blog/corporate-travel-policy-adelaide" },
      { label: "Adelaide School Formal Transport Guide",    href: "/blog/adelaide-school-formal-transport-guide" },
      { label: "Best Wedding Venues Adelaide Hills",        href: "/blog/best-wedding-venues-adelaide-hills" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-neutral-950 text-white py-16 px-6 text-center">
        <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Australia Chauffeurs
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Sitemap</h1>
        <p className="text-neutral-400 max-w-xl mx-auto text-base">
          Browse every page on our site — services, locations, routes, fleet, and more.
        </p>
      </section>

      {/* Sections */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xs font-bold tracking-widest uppercase text-amber-500 mb-4 pb-2 border-b border-neutral-200">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-700 hover:text-amber-600 hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <div className="border-t border-neutral-100 py-8 px-6 text-center text-xs text-neutral-400">
        <p>
          Machine-readable sitemap:{" "}
          <Link href="/sitemap.xml" className="text-amber-500 hover:underline">
            /sitemap.xml
          </Link>
        </p>
      </div>
    </main>
  );
}
