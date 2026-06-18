import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const S = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Our Fleet | Luxury Chauffeur Vehicles Adelaide — Sedan, SUV, Limo & Van",
  description: "Browse our Adelaide luxury chauffeur fleet — late-model Mercedes, BMW sedans, Lexus SUVs, stretch limousines and executive vans. All vehicles are less than 3 years old.",
  keywords: ["luxury chauffeur fleet Adelaide","chauffeur car Adelaide","Mercedes chauffeur Adelaide","BMW chauffeur Adelaide","stretch limousine Adelaide","luxury SUV hire Adelaide","executive van Adelaide"],
  alternates: { canonical: `${S}/fleet` },
};

const CAT_META: Record<string, { label: string; tagline: string; link: string; icon: string }> = {
  sedan:       { label: "Luxury Sedan",      tagline: "The executive standard",  link: "/fleet/luxury-sedan",      icon: "🚗" },
  luxury:      { label: "Executive Sedan",   tagline: "Premium prestige travel", link: "/fleet/luxury-sedan",      icon: "🚘" },
  suv:         { label: "Luxury SUV",        tagline: "Space and prestige",      link: "/fleet/luxury-suv",        icon: "🚙" },
  stretch_limo:{ label: "Stretch Limousine", tagline: "The grand arrival",       link: "/fleet/stretch-limousine", icon: "🚐" },
  van:         { label: "Executive Van",     tagline: "Group comfort",           link: "/fleet/executive-van",     icon: "🚌" },
  minibus:     { label: "Minibus",           tagline: "Large group transfers",   link: "/fleet/executive-van",     icon: "🚌" },
};

async function getFleet() {
  try {
    const res = await fetch(`${S}/api/fleet`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.vehicles || [];
  } catch {
    return [];
  }
}

function groupByCategory(vehicles: any[]) {
  const map: Record<string, any[]> = {};
  for (const v of vehicles) {
    const cat = v.category || "sedan";
    if (!map[cat]) map[cat] = [];
    map[cat].push(v);
  }
  return map;
}

export default async function FleetPage() {
  const vehicles = await getFleet();
  const grouped  = groupByCategory(vehicles);
  const cats     = Object.keys(grouped);
  const hasFleet = cats.length > 0;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#09090B 0%,#0d0d00 100%)", padding: "72px 24px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, letterSpacing: "0.18em", fontSize: 12, marginBottom: 14 }}>AUSTRALIA CHAUFFEURS</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.9rem,4.5vw,3.2rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 780, margin: "0 auto 18px" }}>
            Our Luxury<br /><span style={{ color: "#C9A84C" }}>Chauffeur Fleet</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.7 }}>
            All vehicles are less than 3 years old, immaculately maintained, and cleaned before every booking.
          </p>
        </section>

        {/* Fleet grid */}
        <section style={{ padding: "56px 24px 72px", background: "#09090B" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>

            {!hasFleet ? (
              /* Empty state — no vehicles in DB yet */
              <div style={{ textAlign: "center", padding: "60px 24px" }}>
                <p style={{ fontSize: 48, marginBottom: 16 }}>🚗</p>
                <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Fleet being updated</h2>
                <p style={{ color: "#6B7280", fontSize: 15, maxWidth: 400, margin: "0 auto 28px" }}>
                  Our vehicles are being added to the system. Please call us to discuss the right vehicle for your journey.
                </p>
                <Link href="/book" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "14px 36px", borderRadius: 12, fontWeight: 900, fontSize: 15, textDecoration: "none" }}>
                  Book Now →
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(440px,1fr))", gap: 24 }}>
                {cats.map(cat => {
                  const meta     = CAT_META[cat] || { label: cat, tagline: "", link: "/book", icon: "🚗" };
                  const list     = grouped[cat];
                  const example  = list[0];
                  const minCap   = Math.min(...list.map((v: any) => v.capacity || 1));
                  const maxCap   = Math.max(...list.map((v: any) => v.capacity || 1));
                  const capLabel = minCap === maxCap ? `${minCap} passengers` : `${minCap}–${maxCap} passengers`;

                  return (
                    <div key={cat} style={{ background: "#17171A", borderRadius: 18, padding: 28, border: "1px solid #2A2A30" }}>
                      {/* Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                        <div>
                          <p style={{ color: "#C9A84C", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>
                            {meta.icon} {meta.label}
                          </p>
                          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 20, margin: "0 0 4px" }}>
                            {example.make} {example.model}
                            {list.length > 1 && (
                              <span style={{ color: "#6B7280", fontSize: 13, fontWeight: 500 }}> +{list.length - 1} more</span>
                            )}
                          </h2>
                          <p style={{ color: "#6B7280", fontSize: 13, margin: 0 }}>{meta.tagline}</p>
                        </div>
                        <span style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#C9A84C", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                          {list.length} vehicle{list.length > 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* Specs */}
                      <div style={{ borderTop: "1px solid #2A2A30", paddingTop: 16, marginBottom: 16 }}>
                        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                          <div>
                            <p style={{ color: "#6B7280", fontSize: 11, margin: "0 0 2px" }}>CAPACITY</p>
                            <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, margin: 0 }}>👥 {capLabel}</p>
                          </div>
                          <div>
                            <p style={{ color: "#6B7280", fontSize: 11, margin: "0 0 2px" }}>YEAR</p>
                            <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, margin: 0 }}>{example.year || "2024"}</p>
                          </div>
                          {example.color && (
                            <div>
                              <p style={{ color: "#6B7280", fontSize: 11, margin: "0 0 2px" }}>COLOUR</p>
                              <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, margin: 0 }}>{example.color}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* All vehicles in this category */}
                      {list.length > 1 && (
                        <div style={{ marginBottom: 16 }}>
                          {list.slice(1).map((v: any) => (
                            <div key={v.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1f1f28" }}>
                              <span style={{ color: "#9CA3AF", fontSize: 12 }}>{v.make} {v.model} {v.year}</span>
                              <span style={{ color: "#6B7280", fontSize: 12 }}>{v.capacity} pax</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div style={{ display: "flex", gap: 10 }}>
                        <Link href={meta.link} style={{ flex: 1, display: "inline-block", background: "transparent", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.4)", padding: "11px 16px", borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: "none", textAlign: "center" }}>
                          Learn More
                        </Link>
                        <Link href="/book" style={{ flex: 1, display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "11px 16px", borderRadius: 10, fontWeight: 900, fontSize: 13, textDecoration: "none", textAlign: "center" }}>
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ background: "#0a0a0d", padding: "52px 24px", textAlign: "center", borderTop: "1px solid #1f1f28" }}>
          <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 900, marginBottom: 12 }}>Not sure which vehicle?</h2>
          <p style={{ color: "#6B7280", marginBottom: 24, maxWidth: 480, margin: "0 auto 24px" }}>
            Tell us your group size and luggage — we'll match you with the right vehicle automatically.
          </p>
          <Link href="/book" style={{ display: "inline-block", background: "#C9A84C", color: "#09090B", padding: "15px 42px", borderRadius: 13, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
            Book Now →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
