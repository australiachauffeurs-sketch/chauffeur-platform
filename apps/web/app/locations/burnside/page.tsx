import type { Metadata } from "next";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Burnside Chauffeur | Luxury Car Hire & Airport Transfers — Burnside Village",
  description: "Elite chauffeur service in Burnside, Adelaide. Airport transfers from $99, Burnside Village pickups, corporate hire & event transport. Professional drivers, luxury fleet, 24/7.",
  keywords: ["chauffeur Burnside Adelaide","Burnside airport transfer","Burnside Village chauffeur","luxury car hire Burnside","Burnside to Adelaide Airport","private driver Burnside SA"],
  alternates: { canonical: `${S}/locations/burnside` },
};
const suburb: SuburbData = {
  name: "Burnside", slug: "burnside", postcode: "5066", region: "EASTERN SUBURBS",
  tagline: "Burnside's most trusted luxury chauffeur — Burnside Village to the world",
  heroKeyword: "Luxury Chauffeur Service",
  description: "Serving Burnside's leafy residential streets, Burnside Village, Toorak Gardens and surroundings with a chauffeur service that matches the eastern suburbs' prestige.",
  distanceFromCBD: "5km", distanceFromAirport: "12km", airportTime: "~30 min",
  routes: [
    { to: "Adelaide Airport", price: "$99", time: "~30 min" },
    { to: "Adelaide CBD", price: "$62", time: "~14 min" },
    { to: "Glenelg", price: "$95", time: "~30 min" },
    { to: "Barossa Valley", price: "$220", time: "~70 min" },
    { to: "McLaren Vale", price: "$168", time: "~55 min" },
    { to: "Hahndorf", price: "$120", time: "~40 min" },
  ],
  landmarks: [
    { name: "Burnside Village", note: "Shopping centre — Glynburn Road" },
    { name: "Toorak Gardens", note: "Premium residential — all streets" },
    { name: "Hazelwood Park", note: "Residential area & recreation" },
    { name: "Beaumont", note: "Hills-facing suburb — all addresses" },
    { name: "Burnside Private Hospital", note: "Medical transfers — Kensington Road" },
    { name: "Loreto College Marryatville", note: "School events & formal transport" },
  ],
};
export default function BurnsidePage() { return <SuburbPageTemplate suburb={suburb} />; }
