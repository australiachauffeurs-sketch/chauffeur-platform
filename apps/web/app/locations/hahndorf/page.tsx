import type { Metadata } from "next";
import SuburbPageTemplate, { SuburbData } from "@/components/seo/SuburbPageTemplate";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Hahndorf Chauffeur | Luxury Transfers & Winery Tours from Hahndorf SA",
  description: "Chauffeur service to and from Hahndorf, South Australia's oldest German village. Airport transfers from $130, winery tours, Adelaide Hills day trips & wedding cars.",
  keywords: ["chauffeur Hahndorf","Hahndorf airport transfer","Hahndorf to Adelaide Airport","luxury car hire Hahndorf","Hahndorf winery tour","Adelaide Hills chauffeur Hahndorf","private driver Hahndorf SA"],
  alternates: { canonical: `${SITE_URL}/locations/hahndorf` },
};

const suburb: SuburbData = {
  name: "Hahndorf",
  slug: "hahndorf",
  postcode: "5245",
  region: "ADELAIDE HILLS",
  tagline: "Premium chauffeur for SA's most visited heritage village",
  heroKeyword: "Chauffeur & Transfer Service",
  description: "Hahndorf's favourite chauffeur — for wine-trail day trips, airport runs, and private tours of the Adelaide Hills' most charming village and surrounding wineries.",
  distanceFromCBD: "29km",
  distanceFromAirport: "40km",
  airportTime: "~40 min",
  routes: [
    { to: "Adelaide Airport", price: "$130", time: "~40 min" },
    { to: "Adelaide CBD", price: "$100", time: "~32 min" },
    { to: "Mount Barker", price: "$45", time: "~12 min" },
    { to: "Barossa Valley", price: "$160", time: "~55 min" },
    { to: "McLaren Vale", price: "$195", time: "~65 min" },
    { to: "Glenelg", price: "$140", time: "~46 min" },
  ],
  landmarks: [
    { name: "Hahndorf Main Street", note: "German village strip — all restaurants & shops" },
    { name: "The Cedars (Hans Heysen)", note: "Art museum & gallery" },
    { name: "Hahndorf Hill Winery", note: "Winery pickup & drop-off" },
    { name: "Mt Lofty Ranges wineries", note: "Bird in Hand, Shaw + Smith nearby" },
    { name: "Hahndorf Inn", note: "Hotel & function centre" },
    { name: "Adelaide Hills B&Bs", note: "All accommodation in Hahndorf & surrounds" },
  ],
};

export default function HahndorfPage() {
  return <SuburbPageTemplate suburb={suburb} />;
}
