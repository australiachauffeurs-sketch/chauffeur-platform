import type { Metadata } from "next";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Unley Chauffeur | Luxury Car Hire & Airport Transfers — King William Road",
  description: "Premium chauffeur service in Unley, Adelaide. Airport transfers from $92, King William Road restaurant pickups, corporate hire & wedding cars. 24/7 service.",
  keywords: ["chauffeur Unley","Unley airport transfer","King William Road chauffeur Adelaide","luxury car Unley","Unley to Adelaide Airport","private driver Unley SA"],
  alternates: { canonical: `${S}/locations/unley` },
};
const suburb: SuburbData = {
  name: "Unley", slug: "unley", postcode: "5061", region: "INNER SOUTH",
  tagline: "Unley's premier chauffeur service — King William Road to anywhere in SA",
  heroKeyword: "Luxury Chauffeur Service",
  description: "Serving Unley's prestigious King William Road dining precinct, Unley Park homes, Goodwood Road businesses and all surrounding streets with a chauffeur that reflects the neighbourhood's standard.",
  distanceFromCBD: "4km", distanceFromAirport: "9km", airportTime: "~28 min",
  routes: [
    { to: "Adelaide Airport", price: "$92", time: "~28 min" },
    { to: "Adelaide CBD", price: "$55", time: "~12 min" },
    { to: "Glenelg", price: "$78", time: "~22 min" },
    { to: "Barossa Valley", price: "$210", time: "~65 min" },
    { to: "McLaren Vale", price: "$145", time: "~48 min" },
    { to: "Hahndorf", price: "$115", time: "~38 min" },
  ],
  landmarks: [
    { name: "King William Road", note: "Restaurant & boutique strip — any address" },
    { name: "Unley Park", note: "Residential — all streets in 5061" },
    { name: "Goodwood Road", note: "Business district pickups" },
    { name: "Caon Road & surrounds", note: "Millswood & Hyde Park area" },
    { name: "Unley High School", note: "School formal & event transport" },
    { name: "Repat Health Precinct", note: "Medical & corporate transfers" },
  ],
};
export default function UnleyPage() { return <SuburbPageTemplate suburb={suburb} />; }
