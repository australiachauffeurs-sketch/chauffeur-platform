import type { Metadata } from "next";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Stirling Chauffeur | Airport Transfers & Luxury Car Hire Adelaide Hills",
  description: "Professional chauffeur service in Stirling, Adelaide Hills. Airport transfers from $125, Stirling village pickups, winery tours & corporate hire. Serving the Hills 24/7.",
  keywords: ["chauffeur Stirling Adelaide Hills","Stirling airport transfer","luxury car Stirling SA","Stirling to Adelaide Airport","Adelaide Hills chauffeur Stirling","Aldgate Stirling transfer"],
  alternates: { canonical: `${S}/locations/stirling` },
};
const suburb: SuburbData = {
  name: "Stirling", slug: "stirling", postcode: "5152", region: "ADELAIDE HILLS",
  tagline: "Stirling & Adelaide Hills premium chauffeur service",
  heroKeyword: "Chauffeur Service",
  description: "Serving Stirling, Aldgate, Bridgewater and the broader Adelaide Hills with professional chauffeur transport — from airport runs to winery day trips in the surrounding valleys.",
  distanceFromCBD: "17km", distanceFromAirport: "30km", airportTime: "~40 min",
  routes: [
    { to: "Adelaide Airport", price: "$125", time: "~40 min" },
    { to: "Adelaide CBD", price: "$95", time: "~30 min" },
    { to: "Hahndorf", price: "$55", time: "~18 min" },
    { to: "Barossa Valley", price: "$155", time: "~55 min" },
    { to: "McLaren Vale", price: "$185", time: "~60 min" },
    { to: "Glenelg", price: "$130", time: "~42 min" },
  ],
  landmarks: [
    { name: "Stirling Village", note: "Mount Barker Road shops & cafés" },
    { name: "Aldgate", note: "Residential — all streets 5154" },
    { name: "Bridgewater Inn", note: "Historic pub & function venue" },
    { name: "Mylor & Crafers", note: "Surrounding Hills villages" },
    { name: "Mt Lofty Summit", note: "Tourist & event transfers" },
    { name: "Cleland Wildlife Park", note: "Group & tourist transfers" },
  ],
};
export default function StirlingPage() { return <SuburbPageTemplate suburb={suburb} />; }
