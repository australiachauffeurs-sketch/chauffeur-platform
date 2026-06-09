import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingPage from "@/components/home/LandingPage";

const SITE_URL = "https://chauffeur-platform-web.vercel.app";

export const metadata: Metadata = {
  title: "Elite Chauffeurs Adelaide | #1 Luxury Car Service, Airport Transfers & Corporate Hire",
  description:
    "Adelaide's premier luxury chauffeur service. Airport transfers from $89, corporate car hire, wedding cars & winery tours. Professional drivers, luxury fleet, available 24/7. Book online in 60 seconds.",
  keywords: [
    "chauffeur service Adelaide",
    "airport transfer Adelaide",
    "luxury car hire Adelaide",
    "corporate chauffeur Adelaide",
    "wedding car hire Adelaide",
    "Adelaide Airport chauffeur",
    "private driver Adelaide SA",
    "executive car service Adelaide",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Elite Chauffeurs Adelaide | Luxury Airport Transfers & Corporate Car Hire",
    description: "Book Adelaide's finest chauffeur service. Airport transfers, corporate hire, weddings & wine tours. 24/7 availability.",
    url: SITE_URL,
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "Elite Chauffeurs Adelaide" }],
  },
};

export default function HomePage() {
  return (
    <main className="bg-cream">
      <Navbar />
      <LandingPage />
      <Footer />
    </main>
  );
}
