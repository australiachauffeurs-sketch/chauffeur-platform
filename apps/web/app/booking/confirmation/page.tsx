import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const bookingId = searchParams.id || "—";

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center animate-fade-in">
          {/* Success icon */}
          <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✓</span>
          </div>

          <h1
            className="text-3xl font-bold text-dark mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Booking Confirmed!
          </h1>
          <p className="text-gray-500 mb-6">
            Your luxury chauffeur has been booked. A confirmation has been sent to your email.
          </p>

          <div className="bg-gray-50 rounded-xl p-5 mb-8">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Booking Reference</p>
            <p className="text-2xl font-bold text-gold font-mono">{bookingId.slice(0, 8).toUpperCase()}</p>
          </div>

          <div className="space-y-3 text-sm text-gray-600 mb-8 text-left bg-gold/5 border border-gold/20 rounded-xl p-5">
            <p>You will receive SMS updates about your driver</p>
            <p>We track your flight in real-time (if applicable)</p>
            <p>Need help? Call us 24/7 on <strong>1800 ELITE</strong></p>
            <p>Free cancellation up to 2 hours before pickup</p>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/dashboard" className="btn-gold w-full py-3">
              View My Bookings
            </Link>
            <Link href="/" className="btn-outline-gold w-full py-3">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
