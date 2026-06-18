import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Adelaide to Barossa Valley: Complete Visitor Guide 2026",
  description:
    "Everything you need to know about visiting the Barossa Valley from Adelaide — drive time, the best wineries (Penfolds, Jacob's Creek, Henschke), what to see, and why a chauffeur beats driving yourself.",
  alternates: { canonical: `${SITE_URL}/blog/adelaide-to-barossa-valley-guide` },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Adelaide to Barossa Valley: Complete Visitor Guide 2026",
  description:
    "A complete guide to visiting the Barossa Valley from Adelaide — wineries, lunch spots, drive time, and chauffeur transfer options.",
  author: { "@type": "Organization", name: "Australia Chauffeurs" },
  publisher: {
    "@type": "Organization",
    name: "Australia Chauffeurs",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-01-01",
  dateModified: "2026-06-01",
  mainEntityOfPage: `${SITE_URL}/blog/adelaide-to-barossa-valley-guide`,
};

const wineries = [
  {
    name: "Penfolds Magill Estate & Barossa Cellar",
    suburb: "Nuriootpa",
    highlight: "Home of Grange. The Barossa cellar offers exclusive Grange tasting experiences and barrel-room tours. Book ahead.",
    type: "Icon",
  },
  {
    name: "Jacob's Creek Visitor Centre",
    suburb: "Rowland Flat",
    highlight: "The iconic creek is here. Contemporary tasting bar with themed flights, great views over the vines, and an excellent restaurant.",
    type: "Popular",
  },
  {
    name: "Henschke",
    suburb: "Keyneton",
    highlight: "Makers of Hill of Grace — Australia's most revered single-vineyard Shiraz. Appointment recommended. Drive into the Eden Valley for this one.",
    type: "Prestige",
  },
  {
    name: "Seppeltsfield",
    suburb: "Seppeltsfield",
    highlight: "The 100-Year-Old Tawny experience: taste a vintage Para Tawny from your birth year. Century Cellar tours available.",
    type: "Unique",
  },
  {
    name: "Yalumba",
    suburb: "Angaston",
    highlight: "Australia's oldest family-owned winery (est. 1849). Beautiful bluestone buildings, excellent Viognier, and a working cooperage on site.",
    type: "Heritage",
  },
  {
    name: "Wolf Blass",
    suburb: "Nuriootpa",
    highlight: "Reliably excellent tastings across their tiered range. Well set up for groups. Good café and a strong Shiraz portfolio.",
    type: "Popular",
  },
];

export default function BarossaGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <Navbar />
      <main style={{ background: "#09090B", color: "#E5E5E5", minHeight: "100vh" }}>
        {/* Hero */}
        <section
          style={{
            background: "linear-gradient(135deg, #09090B 0%, #111113 100%)",
            borderBottom: "1px solid #1F1F23",
            padding: "80px 24px 60px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ color: "#C9A84C", fontSize: 14, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Adelaide Winery Guide
            </p>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 700, color: "#FAFAFA", lineHeight: 1.2, marginBottom: 20 }}>
              Adelaide to Barossa Valley:{" "}
              <span style={{ color: "#C9A84C" }}>Complete Visitor Guide 2026</span>
            </h1>
            <p style={{ fontSize: 18, color: "#A1A1AA", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 28px" }}>
              The best wineries, drive times, lunch stops, and everything you need to know before your Barossa day trip — including why arriving with a chauffeur changes the experience entirely.
            </p>
            <p style={{ color: "#71717A", fontSize: 14 }}>Updated June 2026 · 8-minute read</p>
          </div>
        </section>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>

          {/* Getting there */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Getting to the Barossa Valley from Adelaide
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              The Barossa Valley sits 70km northeast of Adelaide CBD — approximately 1 hour by car via the Sturt Highway (A20), depending on traffic through Elizabeth and Gawler. The drive is straightforward and largely freeway until Nuriootpa, where the valley opens into rolling vine-covered hills.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              The three main towns you'll orient around are Tanunda (cellar doors and the main strip), Nuriootpa (the commercial centre, home to Penfolds and Wolf Blass), and Angaston (quieter, home to Yalumba). A leisurely day trip allows you to visit three or four cellar doors comfortably.
            </p>
            <div style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {[
                { label: "Distance", value: "~70km" },
                { label: "Drive time", value: "~60 min" },
                { label: "Best day trip", value: "Tues–Sun" },
              ].map(item => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <div style={{ color: "#C9A84C", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{item.value}</div>
                  <div style={{ color: "#71717A", fontSize: 13 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Best wineries */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 8, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Best Barossa Wineries to Visit in 2026
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 24 }}>
              The Barossa has over 150 cellar doors. These six are worth your time for different reasons:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {wineries.map((w) => (
                <div key={w.name} style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 24, display: "flex", gap: 20 }}>
                  <div style={{ flexShrink: 0 }}>
                    <span style={{ background: "#1A1508", color: "#C9A84C", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 4, display: "block", textAlign: "center" }}>{w.type}</span>
                  </div>
                  <div>
                    <h3 style={{ color: "#FAFAFA", fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{w.name}</h3>
                    <p style={{ color: "#71717A", fontSize: 13, marginBottom: 8 }}>{w.suburb}, Barossa Valley</p>
                    <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{w.highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Where to eat */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Where to Eat in the Barossa
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              Lunch in the Barossa is a serious affair. These are the restaurants worth booking ahead:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { name: "1918 Bistro & Grill", location: "Tanunda", note: "Heritage building, excellent local beef and Barossa produce. Booking essential." },
                { name: "Hentley Farm", location: "Seppeltsfield Rd", note: "Fine dining in a restored farmhouse. Multi-course degustation with matched Barossa wines." },
                { name: "Ferment Asian", location: "Tanunda", note: "Asian-inspired wine bar. Unexpected and excellent — great snack plates to pair with tastings." },
                { name: "Jacob's Creek Restaurant", location: "Rowland Flat", note: "On-site restaurant with views over the creek. Reliable quality and easy parking." },
              ].map(r => (
                <div key={r.name} style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 12, padding: 20 }}>
                  <h3 style={{ color: "#C9A84C", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{r.name}</h3>
                  <p style={{ color: "#71717A", fontSize: 13, marginBottom: 8 }}>{r.location}</p>
                  <p style={{ color: "#D4D4D8", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{r.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What to see beyond wine */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Beyond Wine: What Else to See
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              The Barossa is more than cellar doors. The Barossa Valley Way connects the main towns through a landscape of old Lutheran churches, stone cottages, and gum-lined creek beds that photographers love. In spring (September–October), the almond blossom along Seppeltsfield Road is genuinely spectacular.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              The Barossa Farmers Market at Angaston (Saturday mornings) is one of South Australia's best — smallgoods, artisan bread, local cheese, and produce straight from the Valley. Time your departure from Adelaide to arrive by 9am before the best stalls sell out.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              History enthusiasts should note the Seppeltsfield winery complex itself — a National Heritage-listed estate with the original 1878 chateau, palm-lined avenue, and the Para Tawny distillery. The guided heritage walk takes about 90 minutes.
            </p>
          </section>

          {/* Why use a chauffeur */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 16, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Why a Chauffeur Makes Your Barossa Day Better
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              The Barossa's best experience is tasting across four or five cellar doors without designating a driver. Pouring out $38 of a Hill of Grace vertical tasting and then watching your travel partner actually drink it while you stick to water is not the trip you planned.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8", marginBottom: 16 }}>
              With a chauffeur from Australia Chauffeurs, everyone drinks. We collect you from your Adelaide hotel or home, drive to the Barossa, wait while you taste, move between cellar doors at your pace, and return you home safely — with your purchases in the boot. No parking, no driving after wine, no arguing about who had how much.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#D4D4D8" }}>
              Our drivers know the Valley well and can suggest timing adjustments — booking Henschke later in the morning when the crowd has thinned, or skipping a cellar door that's running a private event that day.
            </p>

            <div style={{ background: "#111113", border: "1px solid #C9A84C", borderRadius: 12, padding: 24, marginTop: 24 }}>
              <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Typical Barossa day trip pricing:</p>
              <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                From ~$380 for a sedan (up to 3 guests) for a full day (approximately 8 hours including all transfers and waiting time). Split between a group of 3, that's ~$127 per person — comparable to a guided tour bus, with full flexibility on your itinerary.
              </p>
            </div>
          </section>

          {/* Top tips */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FAFAFA", marginBottom: 20, borderLeft: "3px solid #C9A84C", paddingLeft: 16 }}>
              Top Tips for Your Barossa Visit
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Book cellar door tastings in advance — Henschke, Hentley Farm, and Seppeltsfield heritage tours are all appointment-based.",
                "Visit 3–4 cellar doors maximum in a day. More than that and the tastings blur into each other.",
                "Aim for a 9am departure from Adelaide to reach the Valley by 10am when cellar doors open. Most close by 5pm.",
                "Bring a cooler bag or request your chauffeur carry one — wine purchases need temperature control on the drive back.",
                "The Barossa is dramatically different in winter (June–August): quieter, moody, and often foggy in the mornings — great for photography.",
                "Download the Barossa Wine & Tourism app for cellar door maps and event listings before you arrive.",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 16, background: "#111113", border: "1px solid #1F1F23", borderRadius: 10, padding: 16 }}>
                  <span style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, flexShrink: 0, minWidth: 24 }}>{i + 1}.</span>
                  <p style={{ color: "#D4D4D8", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section
            style={{
              background: "linear-gradient(135deg, #111113, #0C0C0E)",
              border: "1px solid #C9A84C",
              borderRadius: 16,
              padding: 40,
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#FAFAFA", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
              Book a Barossa Valley Chauffeur Day Trip
            </h2>
            <p style={{ color: "#A1A1AA", fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
              Everyone drinks. We drive. Full day from ~$380 including all waiting time.
            </p>
            <Link
              href="/book"
              style={{
                display: "inline-block",
                background: "#C9A84C",
                color: "#09090B",
                fontWeight: 700,
                fontSize: 16,
                padding: "14px 36px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              Book Your Barossa Day Trip
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
