import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitemap | Australia Chauffeurs",
  description: "Complete sitemap of all pages on Australia Chauffeurs — services, locations, routes, corporate, occasions, fleet, blog, and more.",
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
      { label: "Airport Transfers",          href: "/services/airport-transfers" },
      { label: "Airport Meet & Greet",       href: "/services/airport-meet-greet" },
      { label: "Late Night Airport Transfers",href: "/services/late-night-airport-transfers" },
      { label: "Point-to-Point Transfers",   href: "/services/point-to-point" },
      { label: "Corporate Chauffeur",        href: "/services/corporate-chauffeur" },
      { label: "Wedding Cars",               href: "/services/wedding-cars" },
      { label: "Wine Tours",                 href: "/services/wine-tours" },
      { label: "Special Events",             href: "/services/special-events" },
      { label: "School Formals",             href: "/services/school-formals" },
      { label: "Hourly Hire",                href: "/services/hourly-hire" },
      { label: "Long Distance",              href: "/services/long-distance" },
    ],
  },
  {
    title: "Corporate",
    links: [
      { label: "Mining & Resources Chauffeur",  href: "/corporate/mining-resources" },
      { label: "Law Firms & Barristers",        href: "/corporate/legal-firms" },
      { label: "Medical & Hospital Transfers",  href: "/corporate/medical-professional" },
      { label: "Conference & Convention",       href: "/corporate/conference-transfers" },
      { label: "Roadshow & Investor Day",       href: "/corporate/roadshow-investor" },
      { label: "FIFO Worker Transfers",         href: "/corporate/fifo-transfers" },
    ],
  },
  {
    title: "Special Occasions",
    links: [
      { label: "Hens Night Chauffeur",          href: "/occasions/hens-night" },
      { label: "Bucks Party Chauffeur",         href: "/occasions/bucks-party" },
      { label: "Debutante Ball Chauffeur",      href: "/occasions/debutante-ball" },
      { label: "Private Winery Day Tour",       href: "/occasions/winery-day-tour" },
      { label: "Golf Club Transfers",           href: "/occasions/golf-transfers" },
      { label: "Cruise Ship & Airport Transfer",href: "/occasions/airport-cruise-transfer" },
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
    title: "Locations — CBD & Inner",
    links: [
      { label: "Adelaide Airport",    href: "/locations/adelaide-airport" },
      { label: "Adelaide CBD",        href: "/locations/adelaide-cbd" },
      { label: "North Adelaide",      href: "/locations/north-adelaide" },
      { label: "Norwood",             href: "/locations/norwood" },
      { label: "Unley",               href: "/locations/unley" },
      { label: "Burnside",            href: "/locations/burnside" },
      { label: "Prospect",            href: "/locations/prospect" },
      { label: "St Peters",           href: "/locations/st-peters" },
      { label: "College Park",        href: "/locations/college-park" },
      { label: "Kent Town",           href: "/locations/kent-town" },
      { label: "Parkside",            href: "/locations/parkside" },
      { label: "Goodwood",            href: "/locations/goodwood" },
      { label: "Wayville",            href: "/locations/wayville" },
    ],
  },
  {
    title: "Locations — Beach & West",
    links: [
      { label: "Glenelg",            href: "/locations/glenelg" },
      { label: "Henley Beach",        href: "/locations/henley-beach" },
      { label: "Port Adelaide",       href: "/locations/port-adelaide" },
      { label: "Semaphore",           href: "/locations/semaphore" },
      { label: "West Beach",          href: "/locations/west-beach" },
      { label: "Brighton",            href: "/locations/brighton" },
      { label: "Grange",              href: "/locations/grange" },
      { label: "Largs Bay",           href: "/locations/largs-bay" },
      { label: "Outer Harbor",        href: "/locations/outer-harbor" },
    ],
  },
  {
    title: "Locations — North & Hills",
    links: [
      { label: "Mawson Lakes",        href: "/locations/mawson-lakes" },
      { label: "Salisbury",           href: "/locations/salisbury" },
      { label: "Modbury",             href: "/locations/modbury" },
      { label: "Tea Tree Gully",      href: "/locations/tea-tree-gully" },
      { label: "Campbelltown",        href: "/locations/campbelltown" },
      { label: "Golden Grove",        href: "/locations/golden-grove" },
      { label: "Greenwith",           href: "/locations/greenwith" },
      { label: "Para Hills",          href: "/locations/para-hills" },
      { label: "Mount Barker",        href: "/locations/mount-barker" },
      { label: "Hahndorf",            href: "/locations/hahndorf" },
      { label: "Stirling",            href: "/locations/stirling" },
      { label: "Crafers",             href: "/locations/crafers" },
      { label: "Aldgate",             href: "/locations/aldgate" },
      { label: "Magill",              href: "/locations/magill" },
    ],
  },
  {
    title: "Locations — South & Fleurieu",
    links: [
      { label: "Victor Harbor",       href: "/locations/victor-harbor" },
      { label: "McLaren Vale",        href: "/locations/mclaren-vale" },
      { label: "Willunga",            href: "/locations/willunga" },
      { label: "McLaren Flat",        href: "/locations/mclaren-flat" },
      { label: "Port Elliot",         href: "/locations/port-elliot" },
      { label: "Goolwa",              href: "/locations/goolwa" },
      { label: "Strathalbyn",         href: "/locations/strathalbyn" },
      { label: "Aldinga Beach",       href: "/locations/aldinga-beach" },
      { label: "Christies Beach",     href: "/locations/christies-beach" },
      { label: "Morphett Vale",       href: "/locations/morphett-vale" },
      { label: "Reynella",            href: "/locations/reynella" },
      { label: "Noarlunga Centre",    href: "/locations/noarlunga-centre" },
    ],
  },
  {
    title: "Locations — Barossa & Regional",
    links: [
      { label: "Barossa Valley",      href: "/locations/barossa-valley" },
      { label: "Tanunda",             href: "/locations/tanunda" },
      { label: "Nuriootpa",           href: "/locations/nuriootpa" },
      { label: "Angaston",            href: "/locations/angaston" },
      { label: "Seppeltsfield",       href: "/locations/seppeltsfield" },
      { label: "Clare",               href: "/locations/clare" },
      { label: "Gawler",              href: "/locations/gawler" },
      { label: "Kapunda",             href: "/locations/kapunda" },
      { label: "Murray Bridge",       href: "/locations/murray-bridge" },
      { label: "Port Augusta",        href: "/locations/port-augusta" },
      { label: "Mount Gambier",       href: "/locations/mount-gambier" },
      { label: "Robe",                href: "/locations/robe" },
      { label: "Kadina",              href: "/locations/kadina" },
      { label: "Port Lincoln",        href: "/locations/port-lincoln" },
    ],
  },
  {
    title: "Popular Routes",
    links: [
      { label: "Adelaide Airport → Barossa Valley",  href: "/routes/adelaide-airport-to-barossa-valley" },
      { label: "Adelaide Airport → Glenelg",         href: "/routes/adelaide-airport-to-glenelg" },
      { label: "Adelaide Airport → McLaren Vale",    href: "/routes/adelaide-airport-to-mclaren-vale" },
      { label: "Adelaide Airport → Tanunda",         href: "/routes/adelaide-airport-to-tanunda" },
      { label: "Adelaide Airport → Hahndorf",        href: "/routes/adelaide-airport-to-hahndorf" },
      { label: "Adelaide Airport → Mount Barker",    href: "/routes/adelaide-airport-to-mount-barker" },
      { label: "Adelaide Airport → Victor Harbor",   href: "/routes/adelaide-airport-to-victor-harbor-region" },
      { label: "Adelaide Airport → Goolwa",          href: "/routes/adelaide-airport-to-goolwa" },
      { label: "Adelaide Airport → Port Elliot",     href: "/routes/adelaide-airport-to-port-elliot" },
      { label: "Adelaide Airport → Clare",           href: "/routes/adelaide-airport-to-clare" },
      { label: "Adelaide Airport → Murray Bridge",   href: "/routes/adelaide-airport-to-murray-bridge" },
      { label: "Adelaide CBD → Airport",             href: "/routes/adelaide-cbd-to-airport" },
    ],
  },
  {
    title: "Events & Festivals",
    links: [
      { label: "Adelaide Fringe Transfers",        href: "/events/adelaide-fringe-transfers" },
      { label: "AFL Gather Round",                 href: "/events/gather-round-transfers" },
      { label: "Adelaide 500",                     href: "/events/adelaide-500-transfers" },
      { label: "WOMADelaide",                      href: "/events/womadelaide-transfers" },
      { label: "LIV Golf Adelaide",                href: "/events/liv-golf-adelaide-transfers" },
      { label: "Tour Down Under",                  href: "/events/tour-down-under-transfers" },
      { label: "Royal Adelaide Show",              href: "/events/royal-adelaide-show-transfers" },
      { label: "Barossa Vintage Festival",         href: "/events/barossa-vintage-festival-transfers" },
      { label: "Sea & Vines",                      href: "/events/sea-and-vines-transfers" },
      { label: "Tasting Australia",                href: "/events/tasting-australia-transfers" },
      { label: "Adelaide Cabaret Festival",        href: "/events/adelaide-cabaret-festival-transfers" },
      { label: "SALA Festival",                    href: "/events/sala-festival-transfers" },
      { label: "Superloop Adelaide",               href: "/events/superloop-adelaide-transfers" },
      { label: "Lights of Lobethal",               href: "/events/christmas-lights-lobethal-transfers" },
      { label: "Feast Festival",                   href: "/events/feast-festival-transfers" },
      { label: "Adelaide Cup Day",                 href: "/events/adelaide-cup-transfers" },
      { label: "New Year's Eve",                   href: "/events/new-years-eve-transfers" },
      { label: "Christmas Party Transfers",        href: "/events/christmas-party-transfers" },
      { label: "Schoolies Week",                   href: "/events/schoolies-transfers" },
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
      { label: "Chauffeur vs Uber Adelaide",         href: "/compare/chauffeur-vs-uber-adelaide" },
      { label: "Chauffeur vs Taxi Adelaide",         href: "/compare/chauffeur-vs-taxi-adelaide" },
      { label: "Chauffeur vs Limousine Adelaide",    href: "/compare/chauffeur-vs-limousine-adelaide" },
      { label: "Best Chauffeur Companies Adelaide",  href: "/compare/best-chauffeur-companies-adelaide" },
      { label: "Chauffeur vs Shuttle Bus Adelaide",  href: "/compare/chauffeur-vs-shuttle-bus-adelaide" },
    ],
  },
  {
    title: "Pricing & Cost Guides",
    links: [
      { label: "Pricing Overview",                   href: "/pricing" },
      { label: "Airport Transfer Cost Adelaide",     href: "/cost/airport-transfer-cost-adelaide" },
      { label: "Chauffeur Hourly Rate Adelaide",     href: "/cost/chauffeur-hourly-rate-adelaide" },
    ],
  },
  {
    title: "Blog",
    links: [
      { label: "Adelaide Airport Guide 2026",               href: "/blog/adelaide-airport-guide-2026" },
      { label: "Barossa vs McLaren Vale Day Trip",          href: "/blog/barossa-vs-mclaren-vale-day-trip" },
      { label: "How Much Does a Chauffeur Cost",            href: "/blog/how-much-does-a-chauffeur-cost-adelaide" },
      { label: "Corporate Travel Policy Adelaide",          href: "/blog/corporate-travel-policy-adelaide" },
      { label: "Adelaide School Formal Transport Guide",    href: "/blog/adelaide-school-formal-transport-guide" },
      { label: "Best Wedding Venues Adelaide Hills",        href: "/blog/best-wedding-venues-adelaide-hills" },
      { label: "Adelaide to Barossa Valley Guide 2026",     href: "/blog/adelaide-to-barossa-valley-guide" },
      { label: "Corporate Chauffeur vs Taxi (The Numbers)", href: "/blog/corporate-chauffeur-vs-taxi-expense" },
      { label: "Adelaide Wedding Transport Guide 2026",     href: "/blog/adelaide-wedding-transport-guide" },
      { label: "Hens Party Adelaide Winery Tour Guide",     href: "/blog/hen-party-adelaide-winery-guide" },
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
          Browse every page on our site — services, locations, routes, corporate, occasions, events, fleet, blog and more.
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
