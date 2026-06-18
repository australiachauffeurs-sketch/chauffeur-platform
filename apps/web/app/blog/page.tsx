import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Chauffeur & Travel Blog Adelaide | Tips, Guides & Local Knowledge",
  description: "Expert guides on Adelaide travel, airport tips, wine region day trips and corporate transport advice from Elite Chauffeurs Adelaide.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

const POSTS = [
  {
    slug: "adelaide-airport-guide-2026",
    title: "Adelaide Airport Complete Guide 2026 — Arrivals, Terminals & Transport",
    excerpt: "Everything arriving passengers need to know about Adelaide Airport (ADL) — terminals, transport options, parking and how to get to your destination fastest.",
    category: "Airport Guide",
    readTime: "8 min read",
    date: "June 2026",
  },
  {
    slug: "adelaide-to-barossa-valley-guide",
    title: "Adelaide to Barossa Valley: Complete Visitor Guide 2026",
    excerpt: "Drive time, best wineries, what to see, when to go and why a private chauffeur changes the entire experience. Everything you need for a perfect Barossa day trip.",
    category: "Wine Regions",
    readTime: "9 min read",
    date: "June 2026",
  },
  {
    slug: "hen-party-adelaide-winery-guide",
    title: "The Ultimate Adelaide Hens Party Winery Tour Guide",
    excerpt: "McLaren Vale vs Barossa vs Adelaide Hills — the best wineries for groups, top lunch spots, what to book and how to plan a hens day the bride will never forget.",
    category: "Occasions",
    readTime: "10 min read",
    date: "June 2026",
  },
  {
    slug: "adelaide-wedding-transport-guide",
    title: "Adelaide Wedding Transport Guide 2026 — Chauffeur, Limo or Vintage Car?",
    excerpt: "Timing, vehicle types, photography stops, Hills winery receptions and how to co-ordinate guest transfers without stress. The complete wedding transport playbook.",
    category: "Weddings",
    readTime: "11 min read",
    date: "June 2026",
  },
  {
    slug: "corporate-chauffeur-vs-taxi-expense",
    title: "Why Adelaide Businesses Use Chauffeurs Instead of Taxis (The Numbers)",
    excerpt: "Tax deductibility, corporate invoicing, time value of travel and productivity on the road. The honest financial case for switching from taxis to a chauffeur account.",
    category: "Corporate",
    readTime: "8 min read",
    date: "June 2026",
  },
  {
    slug: "barossa-vs-mclaren-vale-day-trip",
    title: "Barossa Valley vs McLaren Vale — Which Wine Region for Your Adelaide Day Trip?",
    excerpt: "Two of Australia's greatest wine regions are within 90 minutes of Adelaide. Here's how to choose between the Barossa and McLaren Vale — and how to do each in a day.",
    category: "Wine Regions",
    readTime: "10 min read",
    date: "May 2026",
  },
  {
    slug: "how-much-does-a-chauffeur-cost-adelaide",
    title: "How Much Does a Chauffeur Cost in Adelaide? (2026 Price Guide)",
    excerpt: "Transparent breakdown of chauffeur prices in Adelaide — airport transfers, hourly hire, wedding cars and corporate accounts. Compare costs and find the right option.",
    category: "Pricing Guide",
    readTime: "7 min read",
    date: "May 2026",
  },
  {
    slug: "corporate-travel-policy-adelaide",
    title: "Corporate Travel Policy Template for Adelaide Businesses",
    excerpt: "A practical template for Adelaide companies to formalise their executive transport policy — vehicle standards, booking procedures, expense rules and approved providers.",
    category: "Corporate",
    readTime: "12 min read",
    date: "April 2026",
  },
  {
    slug: "adelaide-school-formal-transport-guide",
    title: "Adelaide School Formal Transport Guide — Limos, Sedans & What to Book",
    excerpt: "Everything parents and students need to know about hiring formal transport in Adelaide. Limo vs sedan, what's included, how early to book and cost breakdown.",
    category: "School Formals",
    readTime: "9 min read",
    date: "March 2026",
  },
  {
    slug: "best-wedding-venues-adelaide-hills",
    title: "Best Wedding Venues in Adelaide Hills — Transport Tips for Every Location",
    excerpt: "Our chauffeurs have visited every major Hills venue. Here's the insider guide to the best Adelaide Hills wedding venues and how to get your guests there and back.",
    category: "Weddings",
    readTime: "11 min read",
    date: "February 2026",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: "#09090B", padding: "72px 24px 48px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 12 }}>TRAVEL BLOG & GUIDES</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, marginBottom: 14 }}>
            Adelaide Travel Guides & Chauffeur Tips
          </h1>
          <p style={{ color: "#6B7280", fontSize: 15, maxWidth: 500, margin: "0 auto" }}>
            Local knowledge from Adelaide's most experienced chauffeur team.
          </p>
        </section>

        <section style={{ padding: "48px 24px 80px", background: "#09090B" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
              {POSTS.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", background: "#17171A", borderRadius: 18, border: "1px solid #2A2A30", overflow: "hidden", textDecoration: "none", transition: "border-color 0.2s" }}>
                  <div style={{ padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <span style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#C9A84C", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                        {post.category}
                      </span>
                      <span style={{ color: "#4B5563", fontSize: 11 }}>{post.readTime}</span>
                    </div>
                    <h2 style={{ color: "#fff", fontWeight: 700, fontSize: 16, lineHeight: 1.45, marginBottom: 10 }}>{post.title}</h2>
                    <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{post.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#374151", fontSize: 11 }}>{post.date}</span>
                      <span style={{ color: "#C9A84C", fontSize: 13, fontWeight: 700 }}>Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
