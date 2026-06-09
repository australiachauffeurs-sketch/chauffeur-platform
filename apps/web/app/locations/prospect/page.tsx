import type { Metadata } from "next";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Prospect Chauffeur | Luxury Car Hire & Airport Transfers — Prospect Road",
  description: "Luxury chauffeur service in Prospect, Adelaide. Airport transfers from $90, Prospect Road restaurant pickups, corporate hire. Serving Prospect, Nailsworth & surrounds 24/7.",
  keywords: ["chauffeur Prospect Adelaide","Prospect airport transfer","Prospect Road chauffeur","luxury car Prospect","Prospect to Adelaide Airport","private driver Prospect SA"],
  alternates: { canonical: `${S}/locations/prospect` },
};
const suburb: SuburbData = {
  name: "Prospect", slug: "prospect", postcode: "5082", region: "INNER NORTH",
  tagline: "Prospect's premium chauffeur — from the café strip to the airport",
  heroKeyword: "Luxury Chauffeur Service",
  description: "Serving Prospect's vibrant Prospect Road precinct, Nailsworth, Blair Athol and all inner-north suburbs with reliable, professional chauffeur transport.",
  distanceFromCBD: "4.5km", distanceFromAirport: "9km", airportTime: "~25 min",
  routes: [
    { to: "Adelaide Airport", price: "$90", time: "~25 min" },
    { to: "Adelaide CBD", price: "$58", time: "~12 min" },
    { to: "Glenelg", price: "$88", time: "~28 min" },
    { to: "Barossa Valley", price: "$195", time: "~60 min" },
    { to: "McLaren Vale", price: "$155", time: "~52 min" },
    { to: "North Adelaide", price: "$45", time: "~10 min" },
  ],
  landmarks: [
    { name: "Prospect Road", note: "Café, restaurant & shopping strip" },
    { name: "Nailsworth", note: "Residential — all streets 5083" },
    { name: "Blair Athol", note: "North Prospect area" },
    { name: "Prospect Primary & High School", note: "School event transport" },
    { name: "Sefton Park", note: "All residential streets" },
    { name: "St Francis de Sales College", note: "School formal transport" },
  ],
};
export default function ProspectPage() { return <SuburbPageTemplate suburb={suburb} />; }
