import type { Metadata } from "next";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Henley Beach Chauffeur | Airport Transfers & Luxury Car Hire Henley Beach SA",
  description: "Premium chauffeur service at Henley Beach, Adelaide. Airport transfers from $85, Henley Square restaurant pickups, beach events & wedding transport. 24/7 service.",
  keywords: ["chauffeur Henley Beach","Henley Beach airport transfer","Henley Square chauffeur","luxury car Henley Beach","Henley Beach to Adelaide Airport","beach suburb chauffeur Adelaide"],
  alternates: { canonical: `${S}/locations/henley-beach` },
};
const suburb: SuburbData = {
  name: "Henley Beach", slug: "henley-beach", postcode: "5022", region: "WESTERN SUBURBS",
  tagline: "Henley Beach's favourite chauffeur — Henley Square to anywhere",
  heroKeyword: "Chauffeur & Airport Transfer",
  description: "Serving Henley Beach, Fulham, West Beach and surrounding coastal suburbs with professional chauffeur transport for airport runs, events and restaurant evenings.",
  distanceFromCBD: "9km", distanceFromAirport: "5km", airportTime: "~15 min",
  routes: [
    { to: "Adelaide Airport", price: "$85", time: "~15 min" },
    { to: "Adelaide CBD", price: "$75", time: "~22 min" },
    { to: "Glenelg", price: "$55", time: "~14 min" },
    { to: "Barossa Valley", price: "$205", time: "~65 min" },
    { to: "McLaren Vale", price: "$155", time: "~48 min" },
    { to: "North Adelaide", price: "$88", time: "~26 min" },
  ],
  landmarks: [
    { name: "Henley Square", note: "Beach restaurants & cafés" },
    { name: "Henley Beach Main Street", note: "Shopping & dining" },
    { name: "Fulham Gardens", note: "Residential — all streets" },
    { name: "West Beach Caravan Park", note: "Holiday accommodation pickups" },
    { name: "Henley High School", note: "School formal transport" },
    { name: "Beachfront apartments", note: "All coastal accommodation" },
  ],
};
export default function HenleyBeachPage() { return <SuburbPageTemplate suburb={suburb} />; }
