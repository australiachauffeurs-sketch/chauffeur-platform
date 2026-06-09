import type { Metadata } from "next";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Victor Harbor Chauffeur | Luxury Transfers from Adelaide to Victor Harbor SA",
  description: "Private chauffeur transfers from Adelaide to Victor Harbor. Airport pickup then direct to the Fleurieu Peninsula — from $185. Whale-watching season, weddings & retreats.",
  keywords: ["chauffeur Victor Harbor","Adelaide to Victor Harbor transfer","Victor Harbor airport transfer","luxury car Victor Harbor","private driver Victor Harbor SA","Fleurieu Peninsula chauffeur","Victor Harbor wedding car"],
  alternates: { canonical: `${S}/locations/victor-harbor` },
};
const suburb: SuburbData = {
  name: "Victor Harbor", slug: "victor-harbor", postcode: "5211", region: "FLEURIEU PENINSULA",
  tagline: "Premier chauffeur connecting Adelaide to the Fleurieu Peninsula",
  heroKeyword: "Chauffeur & Transfer Service",
  description: "Luxury private transfers from Adelaide CBD or Adelaide Airport directly to Victor Harbor and the Fleurieu Peninsula — for retreats, whale-watching weekends, weddings and long stays.",
  distanceFromCBD: "84km", distanceFromAirport: "90km", airportTime: "~80 min",
  routes: [
    { to: "Adelaide Airport", price: "$185", time: "~80 min" },
    { to: "Adelaide CBD", price: "$175", time: "~75 min" },
    { to: "McLaren Vale", price: "$90", time: "~40 min" },
    { to: "Port Elliot", price: "$35", time: "~12 min" },
    { to: "Goolwa", price: "$45", time: "~18 min" },
    { to: "Glenelg", price: "$180", time: "~78 min" },
  ],
  landmarks: [
    { name: "Victor Harbor town centre", note: "Esplanade & Ocean Street" },
    { name: "Granite Island Causeway", note: "Tourist attraction — guided transfers" },
    { name: "Encounter Bay", note: "Beachfront homes & accommodation" },
    { name: "McCracken Country Club", note: "Golf & events venue" },
    { name: "Victor Harbor holiday homes", note: "All Airbnb & accommodation pickups" },
    { name: "Port Elliot & Middleton", note: "Neighbouring surf towns" },
  ],
};
export default function VictorHarborPage() { return <SuburbPageTemplate suburb={suburb} />; }
