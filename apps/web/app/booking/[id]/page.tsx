"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LiveDriverMap from "@/components/booking/LiveDriverMap";

function formatAUD(n: number) {
  return `$${Number(n).toFixed(2)}`;
}

const STATUS_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  confirmed:   { bg:"bg-blue-50",   text:"text-blue-700",   border:"border-blue-200"   },
  completed:   { bg:"bg-green-50",  text:"text-green-700",  border:"border-green-200"  },
  cancelled:   { bg:"bg-red-50",    text:"text-red-700",    border:"border-red-200"    },
  in_progress: { bg:"bg-orange-50", text:"text-orange-700", border:"border-orange-200" },
  pending:     { bg:"bg-yellow-50", text:"text-yellow-700", border:"border-yellow-200" },
  en_route:    { bg:"bg-blue-50",   text:"text-blue-700",   border:"border-blue-200"   },
  arrived:     { bg:"bg-purple-50", text:"text-purple-700", border:"border-purple-200" },
};

const VEHICLE_LABELS: Record<string, string> = {
  sedan:"Executive Sedan", suv:"Premium SUV", luxury:"Luxury Sedan",
  van:"Executive Van", stretch_limo:"Stretch Limousine",
};

// Demo booking for when no Supabase / unknown ID
const DEMO = {
  id:"BK8821", status:"confirmed", booking_type:"Airport Transfer",
  pickup_address:"Sydney Airport T1, Mascot NSW 2020",
  dropoff_address:"1 Martin Place, Sydney CBD NSW 2000",
  scheduled_at: new Date(Date.now() + 48*60*60*1000).toISOString(),
  vehicle_category:"sedan", driver_name:"Marcus Thompson",
  driver_phone:"+61 412 345 678", driver_rating:4.98, driver_trips:312,
  passengers:2, luggage:3, flight_number:"QF401",
  distance_km:24.3, duration_minutes:32,
  special_requests:"Meet & greet with name board please.",
  base_charge:115.00, booking_fee:5.00, airport_surcharge:15.00,
  after_hours_surcharge:0, gst:13.50, total_amount:148.50,
  payment_method:"Visa ending 4242",
};

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [booking,    setBooking]    = useState<any>(null);
  const [loading,    setLoading]    = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError,setCancelError]= useState("");
  const [cancelled,  setCancelled]  = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res  = await fetch(`/api/booking/${id}`);
        const data = await res.json();
        setBooking(data.demo ? DEMO : (data.booking ?? DEMO));
      } catch {
        setBooking(DEMO);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking? Free cancellation applies if pickup is more than 2 hours away.")) return;
    setCancelling(true);
    setCancelError("");
    try {
      const res  = await fetch(`/api/booking/${id}/cancel`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setCancelled(true);
        setBooking((prev: any) => ({ ...prev, status: "cancelled" }));
      } else {
        setCancelError(data.error ?? "Could not cancel booking.");
      }
    } catch {
      setCancelError("Network error. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F4]">
        <Navbar />
        <div className="pt-32 pb-16 px-4 flex justify-center">
          <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(201,168,76,0.2)", borderTopColor: "#C9A84C" }} />
        </div>
      </main>
    );
  }

  if (!booking) return null;

  const scheduledDate = booking.scheduled_at ? new Date(booking.scheduled_at) : null;
  const s = STATUS_STYLE[cancelled ? "cancelled" : booking.status] ?? STATUS_STYLE["pending"]!;
  const currentStatus = cancelled ? "cancelled" : booking.status;
  const canCancel = ["pending","confirmed"].includes(currentStatus);

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <Link href="/dashboard/bookings" className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold mb-6 hover:gap-3 transition-all">
            ← Back to Bookings
          </Link>

          {cancelled && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-5 text-sm">
              Your booking has been successfully cancelled.
            </div>
          )}

          {cancelError && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-5 text-sm">
              {cancelError}
            </div>
          )}

          {/* Header */}
          <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[#B0A898] text-xs font-mono mb-1">{booking.id}</p>
              <h1 className="text-[#1C1611] font-bold text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {VEHICLE_LABELS[booking.vehicle_category] ?? booking.vehicle_category ?? "Booking"}
              </h1>
              {scheduledDate && (
                <p className="text-[#7A6F62] text-sm mt-1">
                  {scheduledDate.toLocaleString("en-AU", { dateStyle:"long", timeStyle:"short" })}
                </p>
              )}
            </div>
            <span className={`text-sm font-bold px-4 py-2 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
              {currentStatus.replace("_"," ").toUpperCase()}
            </span>
          </div>

          {/* Route card */}
          <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6 mb-4">
            <h2 className="font-bold text-[#B0A898] text-xs uppercase tracking-wider mb-4">Route</h2>
            <div className="flex gap-4">
              <div className="flex flex-col items-center pt-1">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="w-px flex-1 bg-[#E8E0D0] my-1" />
                <div className="w-3 h-3 rounded-full bg-[#C9A84C]" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-[10px] text-[#B0A898] uppercase tracking-wider mb-0.5">Pickup</p>
                  <p className="text-[#1C1611] font-semibold">{booking.pickup_address ?? booking.pickup}</p>
                  {booking.flight_number && <p className="text-xs text-[#C9A84C] mt-0.5">Flight {booking.flight_number}</p>}
                </div>
                <div>
                  <p className="text-[10px] text-[#B0A898] uppercase tracking-wider mb-0.5">Drop-off</p>
                  <p className="text-[#1C1611] font-semibold">{booking.dropoff_address ?? booking.dropoff}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-[#F5F1EB] text-sm text-[#7A6F62]">
              <span>{booking.distance_km} km</span>
              <span>~{booking.duration_minutes} min</span>
              <span>{booking.passengers} passengers</span>
              <span>{booking.luggage} bags</span>
            </div>
          </div>

          {/* Live driver tracking for active bookings */}
          {["confirmed","en_route","arrived","in_progress"].includes(currentStatus) && (
            <div className="mb-4">
              <h2 className="font-bold text-[#B0A898] text-xs uppercase tracking-wider mb-2 px-1">Live Tracking</h2>
              <LiveDriverMap
                bookingId={booking.id}
                driverId={booking.driver_id}
                pickupAddress={booking.pickup_address ?? booking.pickup}
                dropoffAddress={booking.dropoff_address ?? booking.dropoff}
              />
            </div>
          )}

          {/* Vehicle + Driver */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
              <h2 className="font-bold text-[#B0A898] text-xs uppercase tracking-wider mb-4">Vehicle</h2>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg></div>
                <div>
                  <p className="text-[#1C1611] font-bold">{VEHICLE_LABELS[booking.vehicle_category] ?? booking.vehicle_category}</p>
                  <p className="text-[#7A6F62] text-sm">Premium fleet</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
              <h2 className="font-bold text-[#B0A898] text-xs uppercase tracking-wider mb-4">Your Chauffeur</h2>
              {booking.driver_name ? (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#C9A84C]/15 border-2 border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] font-bold text-xl">
                    {booking.driver_name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1C1611] font-bold">{booking.driver_name}</p>
                    {booking.driver_rating && (
                      <p className="text-[#7A6F62] text-xs">{booking.driver_rating} ★ · {booking.driver_trips ?? "—"} trips</p>
                    )}
                  </div>
                  {booking.driver_phone && (
                    <a href={`tel:${booking.driver_phone}`}
                      className="w-9 h-9 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-[#B0A898] text-sm">Driver will be assigned closer to your pickup time.</p>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6 mb-4">
            <h2 className="font-bold text-[#B0A898] text-xs uppercase tracking-wider mb-4">Price Breakdown</h2>
            <div className="space-y-2.5 text-sm">
              {[
                ["Base fare",          booking.base_charge         ],
                ["Booking fee",        booking.booking_fee         ],
                booking.airport_surcharge   > 0 && ["Airport surcharge",  booking.airport_surcharge  ],
                booking.after_hours_surcharge > 0 && ["After-hours",       booking.after_hours_surcharge],
                ["GST (10%)",          booking.gst                 ],
              ].filter(Boolean).map(([k,v]: any) => (
                <div key={k} className="flex justify-between text-[#7A6F62]">
                  <span>{k}</span>
                  <span className="font-medium text-[#1C1611]">{formatAUD(v)}</span>
                </div>
              ))}
              <div className="border-t border-[#E8E0D0] pt-2.5 flex justify-between font-bold text-base">
                <span className="text-[#1C1611]">Total (AUD)</span>
                <span className="text-[#C9A84C] text-xl">{formatAUD(booking.total_amount)}</span>
              </div>
            </div>
            {booking.payment_method && (
              <p className="text-[#B0A898] text-xs mt-3">Paid via {booking.payment_method}</p>
            )}
          </div>

          {/* Special requests */}
          {booking.special_requests && (
            <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6 mb-4">
              <h2 className="font-bold text-[#B0A898] text-xs uppercase tracking-wider mb-2">Special Requests</h2>
              <p className="text-[#7A6F62] text-sm">{booking.special_requests}</p>
            </div>
          )}

          {/* Receipt */}
          {["completed","confirmed"].includes(currentStatus) && (
            <div className="bg-white border border-[#E8E0D0] rounded-2xl p-5 mb-4 flex items-center justify-between">
              <div>
                <p className="text-[#1C1611] font-semibold text-sm">Tax Invoice / Receipt</p>
                <p className="text-[#B0A898] text-xs mt-0.5">GST compliant · ABN 12 345 678 901</p>
              </div>
              <a
                href={`/api/booking/${booking.id}/receipt`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold border border-[#C9A84C] text-[#C9A84C] px-4 py-2 rounded-xl hover:bg-[#C9A84C]/5 transition-colors">
                View &amp; Print
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {canCancel && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex-1 border border-red-200 text-red-600 font-semibold py-3 rounded-xl text-sm hover:bg-red-50 transition-colors disabled:opacity-60">
                {cancelling ? "Cancelling…" : "Cancel Booking"}
              </button>
            )}
            {currentStatus === "completed" && (
              <>
                <Link href={`/dashboard/bookings/${booking.id}/rate`}
                  className="flex-1 text-center font-bold text-[#1C1611] py-3 rounded-xl text-sm transition-all"
                  style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
                  Rate This Trip
                </Link>
                <Link href={`/book?rebook=${booking.id}`}
                  className="flex-1 text-center border border-[#C9A84C] text-[#C9A84C] font-semibold py-3 rounded-xl text-sm hover:bg-[#C9A84C]/5 transition-colors">
                  Rebook Same Route
                </Link>
              </>
            )}
            <Link href="/dashboard/bookings"
              className="flex-1 text-center text-sm font-bold text-[#1C1611] py-3 rounded-xl transition-all"
              style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
              Back to All Bookings
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
