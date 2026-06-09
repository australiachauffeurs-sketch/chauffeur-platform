import type { Metadata } from "next";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "McLaren Vale Chauffeur | Winery Tours & Airport Transfers from Adelaide",
  description: "Luxury chauffeur to McLaren Vale from Adelaide. Winery day tours, airport transfers from $155, d'Arenberg, Wirra Wirra & Chapel Hill visits. Private driver — sip safely.",
  keywords: ["McLaren Vale chauffeur","McLaren Vale winery tour driver","Adelaide to McLaren Vale transfer","McLaren Vale airport transfer","private driver McLaren Vale","d'Arenberg chauffeur","Wirra Wirra transfer","McLaren Vale wine tour Adelaide"],
  alternates: { canonical: `${S}/locations/mclaren-vale` },
};
const suburb: SuburbData = {
  name: "McLaren Vale", slug: "mclaren-vale", postcode: "5171", region: "FLEURIEU PENINSULA",
  tagline: "Private chauffeur for McLaren Vale's world-class wine region",
  heroKeyword: "Winery Chauffeur & Transfer",
  description: "McLaren Vale is just 45 minutes south of Adelaide CBD — and your private chauffeur means you can taste as much Shiraz as you like, safely. Winery tours, accommodation transfers and full-day packages.",
  distanceFromCBD: "42km", distanceFromAirport: "46km", airportTime: "~52 min",
  routes: [
    { to: "Adelaide Airport", price: "$155", time: "~52 min" },
    { to: "Adelaide CBD", price: "$140", time: "~46 min" },
    { to: "Glenelg", price: "$130", time: "~42 min" },
    { to: "Victor Harbor", price: "$90", time: "~40 min" },
    { to: "Barossa Valley", price: "$260", time: "~100 min" },
    { to: "Hahndorf", price: "$185", time: "~65 min" },
  ],
  landmarks: [
    { name: "d'Arenberg Cube", note: "Iconic winery — Osborn Road" },
    { name: "Wirra Wirra Winery", note: "McMurtrie Road — classic estate" },
    { name: "Chapel Hill Winery", note: "Chapel Hill Road" },
    { name: "Coriole Vineyards", note: "Chaffeys Road" },
    { name: "McLaren Vale township", note: "Main Street restaurants & cellar doors" },
    { name: "Serafino Wines", note: "Kangarilla Road — events & functions" },
  ],
};
export default function McLarenValePage() { return <SuburbPageTemplate suburb={suburb} />; }
