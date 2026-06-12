import Link from "next/link";

export interface RelatedLink {
  label: string;
  href: string;
}

/** Hub-and-spoke internal linking block — place near the bottom of every SEO page. */
export default function RelatedLinks({
  title = "Popular Transfers & Services",
  links,
}: {
  title?: string;
  links: RelatedLink[];
}) {
  if (!links.length) return null;
  return (
    <section style={{ background: "#09090B", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 800, marginBottom: 16 }}>{title}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                background: "#17171A",
                border: "1px solid #2A2A30",
                color: "#D1D5DB",
                padding: "9px 16px",
                borderRadius: 20,
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
