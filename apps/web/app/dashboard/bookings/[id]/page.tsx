"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const STATUS_COLOR: Record<string, string> = {
  pending:         "#FBBF24",
  confirmed:       "#60A5FA",
  driver_assigned: "#A78BFA",
  en_route:        "#F97316",
  arrived:         "#22C55E",
  in_progress:     "#C9A84C",
  completed:       "#22C55E",
  cancelled:       "#EF4444",
};

const STATUS_LABEL: Record<string, string> = {
  pending:         "Pending — Awaiting confirmation",
  confirmed:       "Confirmed — Your booking is confirmed",
  driver_assigned: "Driver Assigned — A driver is on the way",
  en_route:        "En Route — Driver heading to pickup",
  arrived:         "Driver Arrived — Driver is at pickup location",
  in_progress:     "In Progress — Trip underway",
  completed:       "Completed",
  cancelled:       "Cancelled",
};

const TIMELINE = [
  { key: "pending",         label: "Booking Received" },
  { key: "confirmed",       label: "Confirmed" },
  { key: "driver_assigned", label: "Driver Assigned" },
  { key: "en_route",        label: "En Route" },
  { key: "arrived",         label: "Driver Arrived" },
  { key: "in_progress",     label: "Trip Started" },
  { key: "completed",       label: "Completed" },
];

const ORDER = ["pending","confirmed","driver_assigned","en_route","arrived","in_progress","completed"];

function Skel({ w = "full", h = 4 }: { w?: string; h?: number }) {
  return <div className={`w-${w} h-${h} bg-[#E8E0D0] rounded animate-pulse`} />;
}

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<any>(null);
  const [driver,  setDriver]  = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res  = await fetch(`/api/booking/${id}`);
        const data = await res.json();
        if (!res.ok || data.error) {
          setError(data.error || "Booking not found.");
        } else {
          setBooking(data.booking);
          if (data.driver) setDriver(data.driver);
        }
      } catch {
        setError("Failed to load booking.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Poll for live status updates when trip is active
  useEffect(() => {
    if (!booking) return;
    const active = ["driver_assigned","en_route","arrived","in_progress"];
    if (!active.includes(booking.status)) return;
    const timer = setInterval(async () => {
      const res  = await fetch(`/api/booking/${id}`);
      const data = await res.json();
      if (res.ok && data.booking) setBooking(data.booking);
    }, 15000);
    return () => clearInterval(timer);
  }, [booking?.status, id]);

  if (loading) {
    return (
      <div className="space-y-5 animate-fade-in">
        <Skel w="24" h={4} />
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6 space-y-4">
          <Skel w="32" h={8} /><Skel h={4} /><Skel w="48" h={3} />
        </div>
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6 space-y-3">
          {[1,2,3].map(i => <Skel key={i} h={3} />)}
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-[#1C1611] font-semibold mb-1">{error || "Booking not found"}</p>
        <p className="text-[#B0A898] text-sm mb-6">This booking may not exist or belong to your account.</p>
        <Link href="/dashboard/bookings"
          className="text-[#C9A84C] font-semibold hover:underline text-sm">
          ← Back to My Bookings
        </Link>
      </div>
    );
  }

  const b            = booking;
  const statusColor  = STATUS_COLOR[b.status] ?? "#7A6F62";
  const statusLabel  = STATUS_LABEL[b.status]  ?? b.status?.replace(/_/g," ");
  const isActive     = ["driver_assigned","en_route","arrived","in_progress"].includes(b.status);
  const isCancelled  = b.status === "cancelled";
  const currentIdx   = ORDER.indexOf(b.status);

  const scheduledDate = b.scheduled_at
    ? new Date(b.scheduled_at).toLocaleString("en-AU", { dateStyle: "full", timeStyle: "short" })
    : null;

  const pricing = [
    { label: "Base Charge",         value: b.base_charge },
    { label: "Booking Fee",         value: b.booking_fee },
    { label: "Airport Surcharge",   value: b.airport_surcharge },
    { label: "After-Hours Surcharge", value: b.after_hours_surcharge },
    { label: "GST",                 value: b.gst },
  ].filter(p => p.value > 0);

  return (
    <div className="space-y-5 animate-fade-in max-w-2xl">

      {/* Back */}
      <Link href="/dashboard/bookings"
        className="inline-flex items-center gap-1.5 text-sm text-[#7A6F62] hover:text-[#C9A84C] font-medium transition-colors">
        ← All Bookings
      </Link>

      {/* Header */}
      <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-[#B0A898] text-xs font-mono mb-1 truncate">{b.id}</p>
            <p className="text-[#1C1611] font-black text-3xl">${(b.total_amount ?? 0).toFixed(2)} <span className="text-sm font-normal text-[#B0A898]">AUD</span></p>
            {scheduledDate && <p className="text-[#7A6F62] text-sm mt-1">{scheduledDate}</p>}
          </div>
          <span className="self-start px-3 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap"
            style={{ color: statusColor, borderColor: statusColor, backgroundColor: `${statusColor}20` }}>
            {b.status?.replace(/_/g," ")}
          </span>
        </div>

        {/* Status message */}
        <div className="rounded-xl p-3 mb-2 text-sm font-medium"
          style={{ backgroundColor: `${statusColor}15`, color: statusColor }}>
          {statusLabel}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-sm text-[#7A6F62] border-t border-[#F5F1EB] pt-4 mt-4">
          {b.vehicle_category && <span className="capitalize">{b.vehicle_category.replace(/_/g," ")}</span>}
          {b.booking_type     && <span className="capitalize">· {b.booking_type.replace(/_/g," ")}</span>}
          {b.passengers       && <span>· {b.passengers} pax</span>}
          {b.luggage          && <span>· {b.luggage} bags</span>}
          {b.distance_km > 0  && <span>· {b.distance_km} km</span>}
          {b.flight_number    && <span>· Flight {b.flight_number}</span>}
        </div>
      </div>

      {/* Trip Status Timeline */}
      {!isCancelled && (
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
          <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-5">Trip Status</p>
          <div className="relative">
            {TIMELINE.map((step, i) => {
              const done    = currentIdx >= i;
              const current = currentIdx === i;
              return (
                <div key={step.key} className="flex items-start gap-3 mb-4 last:mb-0">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                      done
                        ? "border-[#C9A84C] bg-[#C9A84C]"
                        : "border-[#E8E0D0] bg-white"
                    }`}>
                      {done && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div className={`w-0.5 h-6 mt-1 ${done ? "bg-[#C9A84C]" : "bg-[#E8E0D0]"}`} />
                    )}
                  </div>
                  <div className="pt-0.5">
                    <p className={`text-sm font-semibold ${done ? "text-[#1C1611]" : "text-[#B0A898]"}`}>
                      {step.label}
                      {current && isActive && (
                        <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold text-green-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          NOW
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Driver Info */}
      {(driver || b.driver_name || b.driver_id) && (
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
          <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-4">Your Driver</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] font-bold text-xl flex-shrink-0">
              {(driver?.first_name || b.driver_name || "D")[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-[#1C1611] font-bold text-lg">
                {driver ? `${driver.first_name} ${driver.last_name}`.trim() : b.driver_name ?? "Assigned Driver"}
              </p>
              {driver?.vehicle_category && (
                <p className="text-[#7A6F62] text-sm capitalize">{driver.vehicle_category.replace(/_/g," ")}</p>
              )}
              {driver?.vehicle_plate && (
                <p className="text-[#B0A898] text-xs mt-0.5">Plate: {driver.vehicle_plate}</p>
              )}
              {driver?.phone && (
                <a href={`tel:${driver.phone}`}
                  className="inline-flex items-center gap-1.5 text-sm text-[#C9A84C] font-semibold mt-2 hover:underline">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                  </svg>
                  Call Driver
                </a>
              )}
              {driver?.rating && (
                <p className="text-[#B0A898] text-xs mt-1">Rating: {driver.rating} ★</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Route */}
      <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
        <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-4">Route</p>
        <div className="flex gap-4 mb-5">
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="w-0.5 flex-1 bg-[#E8E0D0] min-h-[2rem]" />
          </div>
          <div className="pb-4 flex-1">
            <p className="text-[#B0A898] text-xs font-semibold uppercase tracking-wide mb-1">Pickup</p>
            <p className="text-[#1C1611] font-medium">{b.pickup_address ?? "—"}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-3 h-3 rounded-full bg-[#C9A84C] flex-shrink-0 mt-5" />
          <div className="flex-1">
            <p className="text-[#B0A898] text-xs font-semibold uppercase tracking-wide mb-1">Drop-off</p>
            <p className="text-[#1C1611] font-medium">{b.dropoff_address ?? "—"}</p>
          </div>
        </div>
        {b.waypoints?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#F5F1EB]">
            <p className="text-[#B0A898] text-xs font-semibold uppercase tracking-wide mb-2">Stops</p>
            {b.waypoints.map((w: string, i: number) => (
              <p key={i} className="text-[#7A6F62] text-sm mb-1">· {w}</p>
            ))}
          </div>
        )}
      </div>

      {/* Pricing Breakdown */}
      {pricing.length > 0 && (
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
          <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-4">Pricing Breakdown</p>
          <div className="space-y-2">
            {pricing.map(p => (
              <div key={p.label} className="flex justify-between text-sm">
                <span className="text-[#7A6F62]">{p.label}</span>
                <span className="text-[#1C1611] font-medium">${p.value.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-[#F5F1EB] pt-3 mt-3 flex justify-between">
              <span className="text-[#1C1611] font-bold">Total</span>
              <span className="text-[#1C1611] font-bold text-lg">${(b.total_amount ?? 0).toFixed(2)} AUD</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className={`px-2 py-0.5 rounded-full font-semibold ${
              b.payment_status === "paid"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-yellow-50 text-yellow-700 border border-yellow-200"
            }`}>
              {b.payment_status === "paid" ? "Paid" : "Payment Pending"}
            </span>
            {b.payment_method && (
              <span className="text-[#B0A898] capitalize">{b.payment_method.replace(/_/g," ")}</span>
            )}
            {b.promo_code && (
              <span className="text-green-600 font-semibold">Promo: {b.promo_code}</span>
            )}
          </div>
        </div>
      )}

      {/* Special Requests */}
      {b.special_requests && (
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
          <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-3">Special Requests</p>
          <p className="text-[#7A6F62] text-sm leading-relaxed">{b.special_requests}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pb-8">
        {b.status === "completed" && (
          <>
            <Link href={`/book?rebook=${b.id}`}
              className="text-sm font-semibold bg-[#F5F1EB] text-[#7A6F62] px-5 py-2.5 rounded-xl hover:bg-[#E8E0D0] transition-all">
              Rebook
            </Link>
            <a href={`/api/booking/${b.id}/receipt`} target="_blank" rel="noreferrer"
              className="text-sm font-semibold bg-[#FFF8EC] text-[#C9A84C] px-5 py-2.5 rounded-xl hover:bg-[#C9A84C] hover:text-[#1C1611] transition-all border border-[#C9A84C]/30">
              Download Receipt ↗
            </a>
          </>
        )}
        {["confirmed","pending"].includes(b.status) && (
          <Link href="/support"
            className="text-sm font-semibold bg-white border border-[#E8E0D0] text-[#7A6F62] px-5 py-2.5 rounded-xl hover:bg-[#F5F1EB] transition-all">
            Cancel / Modify
          </Link>
        )}
        <Link href="/book"
          className="text-sm font-bold text-[#1C1611] px-5 py-2.5 rounded-xl"
          style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
          + New Booking
        </Link>
      </div>
    </div>
  );
}
