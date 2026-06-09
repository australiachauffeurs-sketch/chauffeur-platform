import type { Metadata } from "next";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "North Adelaide Chauffeur | Luxury Car Hire & Airport Transfers",
  description: "Elite chauffeur service in North Adelaide. Airport transfers from $95, corporate car hire, restaurant transfers along O'Connell St & Melbourne St. 24/7 availability.",
  keywords: ["chauffeur North Adelaide","North Adelaide airport transfer","luxury car North Adelaide","O'Connell Street chauffeur","Melbourne Street transfer North Adelaide","private driver North Adelaide"],
  alternates: { canonical: `${SITE_URL}/locations/north-adelaide` },
};

const suburb: SuburbData = {
  name: "North Adelaide",
  slug: "north-adelaide",
  postcode: "5006",
  region: "INNER NORTH",
  tagline: "Premier chauffeur for North Adelaide's dining & lifestyle precinct",
  heroKeyword: "Luxury Chauffeur Service",
  description: "Serving North Adelaide's O'Connell Street restaurant precinct, Melbourne Street bars, private schools and Victorian-era residences — with a chauffeur worthy of the neighbourhood.",
  distanceFromCBD: "2km",
  distanceFromAirport: "9km",
  airportTime: "~25 min",
  routes: [
    { to: "Adelaide Airport", price: "$95", time: "~25 min" },
    { to: "Adelaide CBD", price: "$55", time: "~10 min" },
    { to: "Glenelg", price: "$90", time: "~28 min" },
    { to: "Barossa Valley", price: "$210", time: "~65 min" },
    { to: "McLaren Vale", price: "$165", time: "~58 min" },
    { to: "Adelaide Hills", price: "$130", time: "~40 min" },
  ],
  landmarks: [
    { name: "O'Connell Street", note: "Restaurant & café strip — kerb-side pickup" },
    { name: "Melbourne Street", note: "Bars, boutiques & dining — any address" },
    { name: "St Peters College", note: "School pickup/drop-off" },
    { name: "Adelaide Oval surrounds", note: "War Memorial Drive end" },
    { name: "North Adelaide Golf Course", note: "Stanley Street entrance" },
    { name: "Private residences", note: "All streets in 5006 & 5067" },
  ],
};

export default function NorthAdelaideCharffeurPage() {
  return <SuburbPageTemplate suburb={suburb} />;
}
