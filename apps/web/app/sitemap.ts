import { MetadataRoute } from "next";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Core ──────────────────────────────────────────────────────
    { url: SITE_URL,                         lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/book`,               lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${SITE_URL}/pricing`,            lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/about`,              lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${SITE_URL}/contact`,            lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${SITE_URL}/faq`,                lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/corporate-accounts`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },

    // ── Services ──────────────────────────────────────────────────
    { url: `${SITE_URL}/services/airport-transfers`,   lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE_URL}/services/corporate-chauffeur`, lastModified: now, changeFrequency: "monthly", priority: 0.92 },
    { url: `${SITE_URL}/services/wedding-cars`,        lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/services/wine-tours`,          lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/services/special-events`,      lastModified: now, changeFrequency: "monthly", priority: 0.84 },
    { url: `${SITE_URL}/services/school-formals`,      lastModified: now, changeFrequency: "monthly", priority: 0.83 },
    { url: `${SITE_URL}/services/hourly-hire`,         lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${SITE_URL}/services/long-distance`,       lastModified: now, changeFrequency: "monthly", priority: 0.78 },

    // ── Locations ─────────────────────────────────────────────────
    { url: `${SITE_URL}/locations/adelaide-airport`,   lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE_URL}/locations/adelaide-cbd`,       lastModified: now, changeFrequency: "monthly", priority: 0.90 },
    { url: `${SITE_URL}/locations/glenelg`,            lastModified: now, changeFrequency: "monthly", priority: 0.84 },
    { url: `${SITE_URL}/locations/north-adelaide`,     lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${SITE_URL}/locations/norwood`,            lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${SITE_URL}/locations/mount-barker`,       lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${SITE_URL}/locations/hahndorf`,           lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${SITE_URL}/locations/barossa-valley`,     lastModified: now, changeFrequency: "monthly", priority: 0.83 },
    { url: `${SITE_URL}/locations/mclaren-vale`,       lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${SITE_URL}/locations/stirling`,           lastModified: now, changeFrequency: "monthly", priority: 0.76 },
    { url: `${SITE_URL}/locations/port-adelaide`,      lastModified: now, changeFrequency: "monthly", priority: 0.76 },
    { url: `${SITE_URL}/locations/victor-harbor`,      lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/locations/unley`,              lastModified: now, changeFrequency: "monthly", priority: 0.76 },
    { url: `${SITE_URL}/locations/burnside`,           lastModified: now, changeFrequency: "monthly", priority: 0.76 },
    { url: `${SITE_URL}/locations/prospect`,           lastModified: now, changeFrequency: "monthly", priority: 0.76 },
    { url: `${SITE_URL}/locations/henley-beach`,       lastModified: now, changeFrequency: "monthly", priority: 0.76 },

    // ── Routes ────────────────────────────────────────────────────
    { url: `${SITE_URL}/routes/adelaide-airport-to-barossa-valley`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/routes/adelaide-airport-to-glenelg`,        lastModified: now, changeFrequency: "monthly", priority: 0.86 },
    { url: `${SITE_URL}/routes/adelaide-airport-to-mclaren-vale`,   lastModified: now, changeFrequency: "monthly", priority: 0.84 },
    { url: `${SITE_URL}/routes/adelaide-cbd-to-airport`,            lastModified: now, changeFrequency: "monthly", priority: 0.86 },
    { url: `${SITE_URL}/routes/adelaide-airport-to-mount-barker`,   lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${SITE_URL}/routes/adelaide-airport-to-hahndorf`,       lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${SITE_URL}/routes/adelaide-airport-to-adelaide-hills`, lastModified: now, changeFrequency: "monthly", priority: 0.82 },

    // ── Hotels ────────────────────────────────────────────────────
    { url: `${SITE_URL}/hotels/intercontinental-adelaide`, lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${SITE_URL}/hotels/hilton-adelaide`,           lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${SITE_URL}/hotels/sofitel-adelaide`,          lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${SITE_URL}/hotels/mayfair-hotel-adelaide`,    lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${SITE_URL}/hotels/stamford-grand-glenelg`,    lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${SITE_URL}/hotels/playford-hotel-adelaide`,   lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${SITE_URL}/hotels/novotel-barossa`,           lastModified: now, changeFrequency: "monthly", priority: 0.78 },

    // ── Venue pages ───────────────────────────────────────────────
    { url: `${SITE_URL}/venues/adelaide-oval`,                lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${SITE_URL}/venues/adelaide-convention-centre`,   lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${SITE_URL}/venues/adelaide-entertainment-centre`,lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${SITE_URL}/venues/ayers-house`,                  lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${SITE_URL}/venues/national-wine-centre`,         lastModified: now, changeFrequency: "monthly", priority: 0.78 },

    // ── Comparison pages ──────────────────────────────────────────
    { url: `${SITE_URL}/compare/chauffeur-vs-uber-adelaide`,  lastModified: now, changeFrequency: "monthly", priority: 0.84 },
    { url: `${SITE_URL}/compare/chauffeur-vs-taxi-adelaide`,  lastModified: now, changeFrequency: "monthly", priority: 0.82 },

    // ── Fleet ─────────────────────────────────────────────────────
    { url: `${SITE_URL}/fleet`,                    lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${SITE_URL}/fleet/luxury-sedan`,       lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${SITE_URL}/fleet/luxury-suv`,         lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${SITE_URL}/fleet/stretch-limousine`,  lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${SITE_URL}/fleet/executive-van`,      lastModified: now, changeFrequency: "monthly", priority: 0.78 },

    // ── Blog ──────────────────────────────────────────────────────
    { url: `${SITE_URL}/blog`,                                                     lastModified: now, changeFrequency: "weekly",  priority: 0.72 },
    { url: `${SITE_URL}/blog/adelaide-airport-guide-2026`,                         lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${SITE_URL}/blog/barossa-vs-mclaren-vale-day-trip`,                    lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/blog/how-much-does-a-chauffeur-cost-adelaide`,             lastModified: now, changeFrequency: "monthly", priority: 0.76 },
    { url: `${SITE_URL}/blog/corporate-travel-policy-adelaide`,                    lastModified: now, changeFrequency: "monthly", priority: 0.73 },
    { url: `${SITE_URL}/blog/adelaide-school-formal-transport-guide`,              lastModified: now, changeFrequency: "monthly", priority: 0.73 },
    { url: `${SITE_URL}/blog/best-wedding-venues-adelaide-hills`,                  lastModified: now, changeFrequency: "monthly", priority: 0.73 },
  ];
}
