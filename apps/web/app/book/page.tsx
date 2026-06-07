import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingWizard from "@/components/booking/BookingWizard";

export const metadata = {
  title: "Book a Chauffeur | Elite Chauffeurs Australia",
  description: "Book your luxury chauffeur online. Instant pricing based on distance.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Instant Booking
            </span>
            <h1
              className="text-3xl sm:text-4xl font-bold text-dark mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Book Your Chauffeur
            </h1>
            <hr className="divider-gold w-24 mx-auto mt-4" />
          </div>

          <BookingWizard />
        </div>
      </div>
      <Footer />
    </main>
  );
}
