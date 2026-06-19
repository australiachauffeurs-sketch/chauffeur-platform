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
  pending:         "Awaiting confirmation",
  confirmed:       "Your booking is confirmed",
  driver_assigned: "A driver is on the way",
  en_route:        "Driver is heading to your pickup",
  arrived:         "Driver has arrived at pickup",
  in_progress:     "Trip is underway",
  completed:       "Trip completed",
  cancelled:       "This booking was cancelled",
};

const STATUS_ICON: Record<string, string> = {
  pending:         "⏳",
  confirmed:       "✅",
  driver_assigned: "🚗",
  en_route:        "📍",
  arrived:         "🟢",
  in_progress:     "🛣️",
  completed:       "🏁",
  cancelled:       "❌",
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
      <div className="space-y-4 animate-pulse">
        <div className="h-5 w-32 bg-[#E8E0D0] rounded" />
        <div className="h-40 bg-[#E8E0D0] rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-48 bg-[#E8E0D0] rounded-2xl" />
            <div className="h-36 bg-[#E8E0D0] rounded-2xl" />
          </div>
          <div className="space-y-4">
            <div className="h-48 bg-[#E8E0D0] rounded-2xl" />
            <div className="h-32 bg-[#E8E0D0] rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-[#1C1611] font-semibold mb-1">{error || "Booking not found"}</p>
        <p className="text-[#B0A898] text-sm mb-6">This booking may not exist or belong to your account.</p>
        <Link href="/dashboard/bookings" className="text-[#C9A84C] font-semibold hover:underline text-sm">← Back to My Bookings</Link>
      </div>
    );
  }

  const b           = booking;
  const statusColor = STATUS_COLOR[b.status] ?? "#7A6F62";
  const statusLabel = STATUS_LABEL[b.status]  ?? b.status?.replace(/_/g," ");
  const statusIcon  = STATUS_ICON[b.status]   ?? "📋";
  const isActive    = ["driver_assigned","en_route","arrived","in_progress"].includes(b.status);
  const isCancelled = b.status === "cancelled";
  const currentIdx  = ORDER.indexOf(b.status);

  const scheduledDate = b.scheduled_at
    ? new Date(b.scheduled_at).toLocaleString("en-AU", { weekday:"short", day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" })
    : null;

  const pricing = [
    { label: "Base Charge",             value: b.base_charge },
    { label: "Booking Fee",             value: b.booking_fee },
    { label: "Airport Surcharge",       value: b.airport_surcharge },
    { label: "After-Hours Surcharge",   value: b.after_hours_surcharge },
    { label: "GST",                     value: b.gst },
  ].filter(p => p.value > 0);

  const driverName = driver
    ? `${driver.first_name ?? ""} ${driver.last_name ?? ""}`.trim()
    : (b.driver_name ?? "Assigned Driver");

  return (
    <div className="space-y-5">

      {/* Back nav */}
      <Link href="/dashboard/bookings"
        className="inline-flex items-center gap-1.5 text-sm text-[#7A6F62] hover:text-[#C9A84C] font-medium transition-colors">
        ← All Bookings
      </Link>

      {/* ── HERO STATUS BAR ── */}
      <div className="rounded-2xl overflow-hidden border border-[#E8E0D0]"
        style={{ background: `linear-gradient(135deg, ${statusColor}18 0%, #FFFFFF 60%)` }}>
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          {/* Left: icon + amount + status */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ backgroundColor: `${statusColor}20`, border: `2px solid ${statusColor}40` }}>
              {statusIcon}
            </div>
            <div>
              <p className="text-[#1C1611] font-black text-4xl leading-none">
                ${(b.total_amount ?? 0).toFixed(2)}
                <span className="text-base font-normal text-[#B0A898] ml-1">AUD</span>
              </p>
              <p className="text-[#7A6F62] text-sm mt-1">{scheduledDate ?? "Schedule TBC"}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: statusColor }} />
                <span className="text-sm font-semibold" style={{ color: statusColor }}>{statusLabel}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-500" />}
              </div>
            </div>
          </div>

          {/* Right: booking id + badge */}
          <div className="text-right flex-shrink-0">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap"
              style={{ color: statusColor, borderColor: statusColor, backgroundColor: `${statusColor}20` }}>
              {b.status?.replace(/_/g," ")}
            </span>
            <p className="text-[#B0A898] text-[10px] font-mono mt-3 truncate max-w-[180px]">{b.id}</p>
          </div>
        </div>

        {/* Chips row */}
        <div className="border-t border-[#E8E0D0] px-6 py-3 flex flex-wrap gap-3">
          {b.vehicle_category && (
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#E8E0D0] rounded-full px-3 py-1 text-xs font-semibold text-[#7A6F62] capitalize">
              🚗 {b.vehicle_category.replace(/_/g," ")}
            </span>
          )}
          {b.booking_type && (
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#E8E0D0] rounded-full px-3 py-1 text-xs font-semibold text-[#7A6F62] capitalize">
              📋 {b.booking_type.replace(/_/g," ")}
            </span>
          )}
          {b.passengers && (
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#E8E0D0] rounded-full px-3 py-1 text-xs font-semibold text-[#7A6F62]">
              👤 {b.passengers} passenger{b.passengers > 1 ? "s" : ""}
            </span>
          )}
          {b.luggage && (
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#E8E0D0] rounded-full px-3 py-1 text-xs font-semibold text-[#7A6F62]">
              🧳 {b.luggage} bag{b.luggage > 1 ? "s" : ""}
            </span>
          )}
          {b.distance_km > 0 && (
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#E8E0D0] rounded-full px-3 py-1 text-xs font-semibold text-[#7A6F62]">
              📏 {b.distance_km} km
            </span>
          )}
          {b.flight_number && (
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#E8E0D0] rounded-full px-3 py-1 text-xs font-semibold text-[#7A6F62]">
              ✈️ {b.flight_number}
            </span>
          )}
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* LEFT COLUMN: Timeline + Route + Special requests */}
        <div className="lg:col-span-2 space-y-5">

          {/* Timeline */}
          {!isCancelled && (
            <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
              <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-6">Trip Progress</p>
              <div className="relative">
                {/* progress line */}
                <div className="absolute left-[13px] top-3.5 w-0.5 bg-[#E8E0D0]"
                  style={{ height: `calc(100% - 28px)` }} />
                <div className="absolute left-[13px] top-3.5 w-0.5 bg-[#C9A84C] transition-all duration-700"
                  style={{ height: currentIdx < 0 ? 0 : `${Math.min((currentIdx / (TIMELINE.length - 1)) * 100, 100)}%` }} />

                {TIMELINE.map((step, i) => {
                  const done    = currentIdx >= i;
                  const current = currentIdx === i;
                  return (
                    <div key={step.key} className="relative flex items-center gap-4 mb-5 last:mb-0">
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 transition-all duration-300 ${
                        done ? "border-[#C9A84C] bg-[#C9A84C]" : "border-[#E8E0D0] bg-white"
                      }`}>
                        {done ? (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#E8E0D0]" />
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <p className={`text-sm font-semibold ${done ? "text-[#1C1611]" : "text-[#B0A898]"}`}>
                          {step.label}
                        </p>
                        {current && isActive && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            LIVE NOW
                          </span>
                        )}
                        {current && b.status === "completed" && (
                          <span className="text-[10px] font-bold text-[#C9A84C] bg-[#C9A84C]/10 rounded-full px-2 py-0.5">DONE</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Route */}
          <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
            <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-5">Route</p>
            <div className="flex gap-4">
              <div className="flex flex-col items-center pt-1.5 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="w-0.5 flex-1 bg-[#E8E0D0] my-1 min-h-[40px]" />
                <div className="w-3 h-3 rounded-full bg-[#C9A84C]" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-[#B0A898] text-[10px] font-bold uppercase tracking-widest mb-1">Pickup</p>
                  <p className="text-[#1C1611] font-semibold text-sm leading-snug">{b.pickup_address ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[#B0A898] text-[10px] font-bold uppercase tracking-widest mb-1">Drop-off</p>
                  <p className="text-[#1C1611] font-semibold text-sm leading-snug">{b.dropoff_address ?? "—"}</p>
                </div>
              </div>
            </div>
            {b.waypoints?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#F5F1EB]">
                <p className="text-[#B0A898] text-[10px] font-bold uppercase tracking-widest mb-2">Via</p>
                {b.waypoints.map((w: string, i: number) => (
                  <p key={i} className="text-[#7A6F62] text-sm mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />{w}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Special Requests */}
          {b.special_requests && (
            <div className="bg-[#FFFBF2] border border-[#C9A84C]/30 rounded-2xl p-6">
              <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-3">Special Requests</p>
              <p className="text-[#7A6F62] text-sm leading-relaxed">{b.special_requests}</p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Driver + Pricing + Actions */}
        <div className="space-y-5">

          {/* Driver Card */}
          {(driver || b.driver_name || b.driver_id) && (
            <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
              <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-4">Your Driver</p>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A07830] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  {driverName[0]?.toUpperCase() ?? "D"}
                </div>
                <div>
                  <p className="text-[#1C1611] font-bold text-lg">{driverName}</p>
                  {driver?.vehicle_category && (
                    <p className="text-[#7A6F62] text-sm capitalize mt-0.5">{driver.vehicle_category.replace(/_/g," ")}</p>
                  )}
                  {driver?.vehicle_make && driver?.vehicle_model && (
                    <p className="text-[#B0A898] text-xs mt-0.5">{driver.vehicle_make} {driver.vehicle_model}</p>
                  )}
                  {driver?.vehicle_plate && (
                    <span className="inline-block mt-2 bg-[#F5F1EB] border border-[#E8E0D0] rounded-lg px-3 py-1 text-xs font-bold text-[#7A6F62] tracking-widest">
                      {driver.vehicle_plate}
                    </span>
                  )}
                  {driver?.rating && (
                    <p className="text-[#C9A84C] text-sm font-semibold mt-2">★ {Number(driver.rating).toFixed(1)}</p>
                  )}
                </div>
                {driver?.phone && (
                  <a href={`tel:${driver.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 text-sm text-white font-bold py-3 rounded-xl transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                    </svg>
                    Call Driver
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Pricing Card */}
          {pricing.length > 0 && (
            <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
              <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-4">Pricing</p>
              <div className="space-y-2.5">
                {pricing.map(p => (
                  <div key={p.label} className="flex justify-between text-sm">
                    <span className="text-[#7A6F62]">{p.label}</span>
                    <span className="text-[#1C1611] font-semibold">${p.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#F5F1EB] mt-4 pt-4 flex justify-between items-center">
                <span className="text-[#1C1611] font-bold">Total</span>
                <span className="text-[#1C1611] font-black text-xl">${(b.total_amount ?? 0).toFixed(2)}</span>
              </div>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  b.payment_status === "paid"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                }`}>
                  {b.payment_status === "paid" ? "✓ Paid" : "⏳ Payment Pending"}
                </span>
                {b.payment_method && (
                  <span className="text-[#B0A898] text-xs capitalize">{b.payment_method.replace(/_/g," ")}</span>
                )}
              </div>
              {b.promo_code && (
                <div className="mt-2 text-xs text-green-600 font-semibold">🎟 Promo applied: {b.promo_code}</div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6 space-y-3">
            <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-1">Actions</p>
            <Link href="/book"
              className="w-full flex items-center justify-center gap-2 text-sm font-bold text-[#1C1611] py-3 rounded-xl transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
              + New Booking
            </Link>
            {b.status === "completed" && (
              <>
                <Link href={`/book?rebook=${b.id}`}
                  className="w-full flex items-center justify-center text-sm font-semibold bg-[#F5F1EB] text-[#7A6F62] py-3 rounded-xl hover:bg-[#E8E0D0] transition-all">
                  🔁 Rebook This Trip
                </Link>
                <a href={`/api/booking/${b.id}/receipt`} target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center text-sm font-semibold bg-white border border-[#C9A84C]/40 text-[#C9A84C] py-3 rounded-xl hover:bg-[#FFF8EC] transition-all">
                  📄 Download Receipt
                </a>
              </>
            )}
            {["confirmed","pending"].includes(b.status) && (
              <Link href="/support"
                className="w-full flex items-center justify-center text-sm font-semibold bg-white border border-[#E8E0D0] text-[#7A6F62] py-3 rounded-xl hover:bg-[#F5F1EB] transition-all">
                ✏️ Cancel / Modify
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
