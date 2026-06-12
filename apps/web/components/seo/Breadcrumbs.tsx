import Link from "next/link";
import { buildBreadcrumb, jsonLd } from "@/lib/seo";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Visible breadcrumb trail + BreadcrumbList JSON-LD.
 * Pass crumbs WITHOUT Home (added automatically). Last crumb = current page.
 */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildBreadcrumb(crumbs)) }}
      />
      <nav aria-label="Breadcrumb" style={{ padding: "14px 24px", background: "#09090B" }}>
        <ol
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            listStyle: "none",
            margin: "0 auto",
            padding: 0,
            maxWidth: 1000,
            fontSize: 12,
          }}
        >
          <li>
            <Link href="/" style={{ color: "#9CA3AF", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "#4A4A55" }}>›</span>
                {last ? (
                  <span style={{ color: "#C9A84C", fontWeight: 600 }}>{c.name}</span>
                ) : (
                  <Link href={c.path} style={{ color: "#9CA3AF", textDecoration: "none" }}>
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
