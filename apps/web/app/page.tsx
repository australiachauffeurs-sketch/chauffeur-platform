import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingPage from "@/components/home/LandingPage";

export default function HomePage() {
  return (
    <main className="bg-cream">
      <Navbar />
      <LandingPage />
      <Footer />
    </main>
  );
}
