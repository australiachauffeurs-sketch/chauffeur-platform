import type { Metadata } from "next";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Norwood Chauffeur | Luxury Car Hire & Airport Transfers from Norwood SA",
  description: "Luxury chauffeur service in Norwood, Adelaide. Airport transfers from $99, corporate hire, The Parade restaurant transfers & wedding cars. Book instantly.",
  keywords: ["chauffeur Norwood Adelaide","Norwood airport transfer","The Parade Norwood chauffeur","car hire Norwood SA","luxury car Norwood","private driver Norwood Adelaide"],
  alternates: { canonical: `${SITE_URL}/locations/norwood` },
};

const suburb: SuburbData = {
  name: "Norwood",
  slug: "norwood",
  postcode: "5067",
  region: "INNER EAST",
  tagline: "Luxury chauffeur serving The Parade and Norwood's vibrant east end",
  heroKeyword: "Luxury Chauffeur Service",
  description: "Premium chauffeur for Norwood residents visiting The Parade's restaurants, heading to Adelaide Airport, or attending corporate and social events across greater Adelaide.",
  distanceFromCBD: "3.5km",
  distanceFromAirport: "11km",
  airportTime: "~28 min",
  routes: [
    { to: "Adelaide Airport", price: "$99", time: "~28 min" },
    { to: "Adelaide CBD", price: "$60", time: "~12 min" },
    { to: "Glenelg", price: "$95", time: "~30 min" },
    { to: "Barossa Valley", price: "$215", time: "~70 min" },
    { to: "McLaren Vale", price: "$168", time: "~60 min" },
    { to: "Hahndorf", price: "$120", time: "~40 min" },
  ],
  landmarks: [
    { name: "The Parade, Norwood", note: "Restaurant & shopping strip" },
    { name: "Norwood Oval", note: "The Parade & Osmond Terrace" },
    { name: "Norwood Morialta High School", note: "School formals & events" },
    { name: "Burnside Village", note: "Shopping centre — Glynburn Rd" },
    { name: "Norwood hotels & B&Bs", note: "All accommodation on request" },
    { name: "Residential — Norwood & Kensington", note: "All streets in 5067–5068" },
  ],
};

export default function NorwoodPage() {
  return <SuburbPageTemplate suburb={suburb} />;
}
