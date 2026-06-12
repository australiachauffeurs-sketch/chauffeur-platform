"use client";

import Link from "next/link";
import { track } from "@/lib/track";
import { BUSINESS } from "@/lib/seo";

/** Mobile-only sticky bar: Call + Book Now. Rendered once in the root layout. */
export default function StickyCTA() {
  return (
    <>
      <div className="ec-sticky-cta">
        <a
          href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
          onClick={() => track("tel_click", { location: "sticky_bar" })}
          style={{
            flex: 1, textAlign: "center", padding: "14px 0", color: "#C9A84C",
            fontWeight: 800, fontSize: 14, textDecoration: "none",
            borderRight: "1px solid #2A2A30",
          }}
        >
          📞 Call Now
        </a>
        <Link
          href="/book"
          onClick={() => track("begin_booking", { location: "sticky_bar" })}
          style={{
            flex: 1.4, textAlign: "center", padding: "14px 0", background: "#C9A84C",
            color: "#09090B", fontWeight: 900, fontSize: 14, textDecoration: "none",
          }}
        >
          Book Now →
        </Link>
      </div>
      <style>{`
        .ec-sticky-cta {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 60;
          display: none; background: #0D0D0F;
          border-top: 1px solid rgba(201,168,76,0.3);
        }
        @media (max-width: 768px) { .ec-sticky-cta { display: flex; } }
      `}</style>
    </>
  );
}
