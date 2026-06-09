import type { Metadata } from "next";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";
const S = "https://chauffeur-platform-web.vercel.app";
export const metadata: Metadata = {
  title: "Port Adelaide Chauffeur | Luxury Car Hire & Airport Transfers Port Adelaide",
  description: "Chauffeur service in Port Adelaide. Airport transfers from $88, cruise ship terminal pickups, corporate hire & event transport around Port Adelaide. 24/7 availability.",
  keywords: ["chauffeur Port Adelaide","Port Adelaide airport transfer","cruise ship terminal chauffeur Port Adelaide","luxury car Port Adelaide","private driver Port Adelaide SA","Port Adelaide to CBD transfer"],
  alternates: { canonical: `${S}/locations/port-adelaide` },
};
const suburb: SuburbData = {
  name: "Port Adelaide", slug: "port-adelaide", postcode: "5015", region: "INNER NORTH-WEST",
  tagline: "Port Adelaide's trusted chauffeur — from the docks to anywhere",
  heroKeyword: "Chauffeur & Transfer Service",
  description: "Serving Port Adelaide's cruise terminal, heritage precinct, Semaphore Road and all surrounding suburbs with professional chauffeur transport — including cruise passenger pickup and drop-off.",
  distanceFromCBD: "15km", distanceFromAirport: "11km", airportTime: "~22 min",
  routes: [
    { to: "Adelaide Airport", price: "$88", time: "~22 min" },
    { to: "Adelaide CBD", price: "$85", time: "~25 min" },
    { to: "Glenelg", price: "$90", time: "~28 min" },
    { to: "Barossa Valley", price: "$200", time: "~65 min" },
    { to: "McLaren Vale", price: "$165", time: "~55 min" },
    { to: "North Adelaide", price: "$92", time: "~28 min" },
  ],
  landmarks: [
    { name: "Port Adelaide Cruise Terminal", note: "Passenger ship pickup & drop-off" },
    { name: "Port Adelaide Heritage Precinct", note: "Museum & waterfront area" },
    { name: "Semaphore Road", note: "Beach esplanade & restaurants" },
    { name: "Port Adelaide Magistrates Court", note: "Legal & professional transfers" },
    { name: "Port Canal Shopping Centre", note: "Retail precinct" },
    { name: "Birkenhead", note: "Industrial & marine precinct" },
  ],
};
export default function PortAdelaidePage() { return <SuburbPageTemplate suburb={suburb} />; }
