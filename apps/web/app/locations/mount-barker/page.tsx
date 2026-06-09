import type { Metadata } from "next";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Mount Barker Chauffeur | Airport Transfers & Luxury Car Hire Adelaide Hills",
  description: "Professional chauffeur service in Mount Barker & Adelaide Hills. Airport transfers to ADL from $145. Executive car hire, Hills wedding transport & winery tours. Book 24/7.",
  keywords: ["chauffeur Mount Barker","Mount Barker airport transfer","Adelaide Hills chauffeur","luxury car hire Mount Barker","Mount Barker to Adelaide Airport","Adelaide Hills limousine","private driver Mount Barker SA"],
  alternates: { canonical: `${SITE_URL}/locations/mount-barker` },
};

const suburb: SuburbData = {
  name: "Mount Barker",
  slug: "mount-barker",
  postcode: "5251",
  region: "ADELAIDE HILLS",
  tagline: "Adelaide Hills' premium chauffeur service for airport runs and local events",
  heroKeyword: "Chauffeur Service",
  description: "Serving Mount Barker and the broader Adelaide Hills with luxury airport transfers, corporate car hire and event transport. Experienced in navigating the Hills with punctuality.",
  distanceFromCBD: "30km",
  distanceFromAirport: "44km",
  airportTime: "~45 min",
  routes: [
    { to: "Adelaide Airport", price: "$145", time: "~45 min" },
    { to: "Adelaide CBD", price: "$110", time: "~35 min" },
    { to: "Hahndorf", price: "$45", time: "~12 min" },
    { to: "Barossa Valley", price: "$165", time: "~60 min" },
    { to: "McLaren Vale", price: "$200", time: "~70 min" },
    { to: "Glenelg", price: "$155", time: "~50 min" },
  ],
  landmarks: [
    { name: "Mount Barker CBD", note: "Gawler Street & surrounds" },
    { name: "Mount Barker High School", note: "School formals & events" },
    { name: "Adelaide Hills Wineries", note: "Petaluma, Deviation Road & more" },
    { name: "Darrenberg Cube (Hahndorf area)", note: "Winery tour pickup" },
    { name: "Mount Barker Medical Centre", note: "Medical & corporate transfers" },
    { name: "Hills residential areas", note: "Totness, Nairne, Littlehampton & all 5251" },
  ],
};

export default function MountBarkerPage() {
  return <SuburbPageTemplate suburb={suburb} />;
}
