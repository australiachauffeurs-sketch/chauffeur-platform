"use client";

import { useState } from "react";
import type { BookingData } from "./BookingWizard";

interface Props {
  data:              BookingData;
  onBack:            () => void;
  onBookingCreated:  (bookingId: string) => void;  // advance to payment step
}

function formatAUD(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(n);
}

const VEHICLE_LABELS: Record<string, string> = {
  sedan:        "Executive Sedan",
  suv:          "Premium SUV",
  luxury:       "Luxury Sedan",
  van:          "Executive Van",
  stretch_limo: "Stretch Limousine",
};

const SERVICE_LABELS: Record<string, string> = {
  airport_transfer: "Airport Transfer",
  corporate:        "Corporate Travel",
  wedding:          "Wedding Chauffeur",
  special_event:    "Special Event",
  hourly:           "Hourly Hire",
};

export default function Step4Confirm({ data, onBack, onBookingCreated }: Props) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [costCentre, setCostCentre] = useState("");
  const [poNumber,   setPoNumber]   = useState("");

  const [isRecurring,    setIsRecurring]    = useState(data.isRecurring ?? false);
  const [recurrenceRule, setRecurrenceRule] = useState(data.recurrenceRule ?? "weekly:monday");

  const [promoCode,     setPromoCode]     = useState("");
  const [promoDiscount, setPromoDiscount] = useState<null | { type: string; value: number; amount: number; code: string; description: string }>(null);
  const [promoError,    setPromoError]    = useState("");
  const [promoLoading,  setPromoLoading]  = useState(false);

  const applyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setPromoError("");
    setPromoDiscount(null);
    const res = await fetch("/api/promo/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: promoCode.trim(), bookingAmount: data.pricing?.total }),
    });
    const json = await res.json();
    if (json.valid) {
      setPromoDiscount(json.discount);
    } else {
      setPromoError(json.error || "Invalid promo code");
    }
    setPromoLoading(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          promoCode: promoDiscount?.code || null,
          promoDiscount,
          paymentMethod,
          isRecurring,
          recurrenceRule: isRecurring ? recurrenceRule : null,
          waypoints: data.waypoints?.filter(w => w.trim() !== "") ?? [],
          costCentre: paymentMethod === "invoice" ? costCentre || null : null,
          poNumber: paymentMethod === "invoice" ? poNumber || null : null,
        }),
      });

      if (!res.ok) throw new Error("Booking failed");
      const result = await res.json();

      // Advance to payment step with the new booking ID
      onBookingCreated(result.bookingId);
    } catch {
      setError("Failed to create booking. Please try again or call 1800 ELITE.");
    } finally {
      setLoading(false);
    }
  };

  const p = data.pricing;

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[#1C1611] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Review Your Booking
      </h2>
      <p className="text-[#7A6F62] text-sm mb-8">
        Please review your booking details and select your preferred payment method.
      </p>

      {/* Summary card */}
      <div className="bg-[#FAF8F4] rounded-2xl p-6 mb-6 space-y-5">
        {/* Route */}
        <div>
          <p className="text-xs text-[#B0A898] uppercase tracking-widest mb-2 font-medium">Route</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm text-[#1C1611]">
              <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
              <span className="font-medium">{data.pickup}</span>
            </div>
            {data.waypoints?.filter(w => w.trim()).map((wp, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="ml-4 w-px h-4 bg-[#C9A84C]/30" />
                <div className="flex items-center gap-2 text-sm text-[#1C1611]">
                  <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="text-[#7A6F62]">Stop {i + 1}: {wp}</span>
                </div>
              </div>
            ))}
            <div className="ml-4 w-px h-4 bg-[#C9A84C]/30" />
            <div className="flex items-center gap-2 text-sm text-[#1C1611]">
              <span className="w-2 h-2 rounded-full bg-[#C9A84C] flex-shrink-0" />
              <span className="font-medium">{data.dropoff}</span>
            </div>
          </div>
        </div>

        <hr className="border-[#E8E0D0]" />

        {/* Trip info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          {[
            { label: "Service",    value: SERVICE_LABELS[data.bookingType]    || data.bookingType    },
            { label: "Vehicle",    value: VEHICLE_LABELS[data.vehicleCategory] || data.vehicleCategory },
            { label: "Date & Time",value: data.scheduledAt
                ? new Date(data.scheduledAt).toLocaleString("en-AU", { dateStyle:"medium", timeStyle:"short" })
                : "—" },
            { label: "Passengers", value: `${data.passengers}` },
            { label: "Luggage",    value: `${data.luggage} bags` },
            { label: "Distance",   value: `${data.distanceKm.toFixed(1)} km` },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[#B0A898] text-xs mb-1">{label}</p>
              <p className="font-semibold text-[#1C1611]">{value}</p>
            </div>
          ))}
        </div>

        {data.flightNumber && (
          <>
            <hr className="border-[#E8E0D0]" />
            <div>
              <p className="text-[#B0A898] text-xs mb-1">Flight Number</p>
              <p className="font-semibold text-[#1C1611]">{data.flightNumber}</p>
            </div>
          </>
        )}

        {data.specialRequests && (
          <>
            <hr className="border-[#E8E0D0]" />
            <div>
              <p className="text-[#B0A898] text-xs mb-1">Special Requests</p>
              <p className="text-sm text-[#7A6F62]">{data.specialRequests}</p>
            </div>
          </>
        )}
      </div>

      {/* Pricing Breakdown */}
      {p && (
        <div className="border border-[#C9A84C]/20 bg-white rounded-2xl p-6 mb-6">
          <p className="text-xs text-[#B0A898] uppercase tracking-widest mb-4 font-medium">
            Price Breakdown
          </p>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-[#7A6F62]">Base fare</span>
              <span className="font-medium text-[#1C1611]">{formatAUD(p.baseCharge)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A6F62]">Booking fee</span>
              <span className="font-medium text-[#1C1611]">{formatAUD(p.bookingFee)}</span>
            </div>
            {p.airportSurcharge > 0 && (
              <div className="flex justify-between">
                <span className="text-[#7A6F62]">Airport surcharge</span>
                <span className="font-medium text-[#1C1611]">{formatAUD(p.airportSurcharge)}</span>
              </div>
            )}
            {p.afterHoursSurcharge > 0 && (
              <div className="flex justify-between">
                <span className="text-[#7A6F62]">After-hours surcharge</span>
                <span className="font-medium text-[#1C1611]">{formatAUD(p.afterHoursSurcharge)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#7A6F62]">GST (10%)</span>
              <span className="font-medium text-[#1C1611]">{formatAUD(p.gst)}</span>
            </div>
            <hr className="border-[#E8E0D0]" />
            {promoDiscount && (
              <div className="flex justify-between text-green-600 text-sm">
                <span>Promo ({promoDiscount.code})</span>
                <span>−{formatAUD(promoDiscount.amount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg">
              <span className="font-bold text-[#1C1611]">Total (AUD)</span>
              <span className="font-bold text-[#C9A84C] text-xl">
                {formatAUD(promoDiscount ? Math.max(0, p.total - promoDiscount.amount) : p.total)}
              </span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-4 pt-4 border-t border-[#E8E0D0]">
            <p className="text-xs text-[#B0A898] uppercase tracking-widest mb-2 font-medium">Promo Code</p>
            <div className="flex gap-2">
              <input
                value={promoCode}
                onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoDiscount(null); setPromoError(""); }}
                placeholder="Enter code..."
                disabled={!!promoDiscount}
                className="flex-1 border border-[#E8E0D0] rounded-xl px-4 py-2.5 text-[#1C1611] text-sm placeholder-[#B0A898] focus:outline-none focus:border-[#C9A84C]/50 uppercase bg-white disabled:bg-[#FAF8F4]"
              />
              {!promoDiscount ? (
                <button onClick={applyPromo} disabled={promoLoading || !promoCode.trim()}
                  className="px-4 py-2.5 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] rounded-xl text-sm font-bold hover:bg-[#C9A84C]/20 disabled:opacity-50 transition-colors whitespace-nowrap">
                  {promoLoading ? "…" : "Apply"}
                </button>
              ) : (
                <button onClick={() => { setPromoDiscount(null); setPromoCode(""); }}
                  className="px-4 py-2.5 bg-red-50 border border-red-200 text-red-500 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors whitespace-nowrap">
                  Remove
                </button>
              )}
            </div>
            {promoError && <p className="text-red-500 text-xs mt-2">{promoError}</p>}
            {promoDiscount && (
              <p className="text-green-600 text-xs mt-2 font-semibold">
                ✓ {promoDiscount.description} — saving {formatAUD(promoDiscount.amount)}
              </p>
            )}
          </div>

          <p className="text-xs text-[#B0A898] mt-3">
            Free cancellation up to 2 hours before pickup &nbsp;•&nbsp; No hidden fees
          </p>
        </div>
      )}

      {/* Recurring booking */}
      <div className="mt-4 mb-6">
        <label className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-2">Repeat Booking</label>
        <div className="flex items-center gap-3 mb-3">
          <button
            type="button"
            onClick={() => setIsRecurring(!isRecurring)}
            className={`relative w-11 h-6 rounded-full transition-colors ${isRecurring ? "bg-[#C9A84C]" : "bg-gray-200"}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isRecurring ? "translate-x-6" : "translate-x-1"}`} />
          </button>
          <span className="text-[#1C1611] text-sm">{isRecurring ? "Yes, repeat this booking" : "One-time booking"}</span>
        </div>

        {isRecurring && (
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "weekly:monday",                label: "Every Monday"    },
              { id: "weekly:friday",                label: "Every Friday"    },
              { id: "weekly:monday,friday",         label: "Mon & Fri"       },
              { id: "weekly:monday,wednesday,friday", label: "Mon/Wed/Fri"   },
              { id: "weekly:daily",                 label: "Daily (weekdays)"},
              { id: "monthly:1",                    label: "Monthly"         },
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRecurrenceRule(r.id)}
                className={`p-3 rounded-xl border text-xs font-bold text-center transition-colors ${
                  recurrenceRule === r.id
                    ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]"
                    : "border-[#E8E0D0] text-[#7A6F62] hover:border-[#C9A84C]/30"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="mt-6 mb-6">
        <label className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-3">Payment Method</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "cash",          label: "Cash",         sub: "Pay driver on the day" },
            { id: "bank_transfer", label: "Bank Transfer", sub: "Invoice sent via email" },
            { id: "invoice",       label: "Invoice",       sub: "Monthly corporate billing" },
          ].map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => setPaymentMethod(m.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                paymentMethod === m.id
                  ? "border-[#C9A84C] bg-[#C9A84C]/10"
                  : "border-[#E8E0D0] bg-[#FAF8F4] hover:border-[#C9A84C]/30"
              }`}
            >
              <p className={`font-bold text-sm mb-1 ${paymentMethod === m.id ? "text-[#C9A84C]" : "text-[#1C1611]"}`}>{m.label}</p>
              <p className="text-[#B0A898] text-xs">{m.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Corporate Invoice Fields — shown when payment method is "invoice" */}
      {paymentMethod === "invoice" && (
        <div className="mb-6 p-5 bg-[#FAF8F4] border border-[#C9A84C]/20 rounded-2xl space-y-4">
          <p className="text-xs text-[#B0A898] uppercase tracking-widest font-medium">Corporate Invoice Details</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#7A6F62] block mb-1.5">Cost Centre</label>
              <input
                value={costCentre}
                onChange={e => setCostCentre(e.target.value)}
                placeholder="e.g. SALES-AU"
                className="w-full border border-[#E8E0D0] rounded-xl px-4 py-2.5 text-[#1C1611] text-sm placeholder-[#B0A898] focus:outline-none focus:border-[#C9A84C]/50 bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-[#7A6F62] block mb-1.5">PO Number</label>
              <input
                value={poNumber}
                onChange={e => setPoNumber(e.target.value)}
                placeholder="e.g. PO-2024-1234"
                className="w-full border border-[#E8E0D0] rounded-xl px-4 py-2.5 text-[#1C1611] text-sm placeholder-[#B0A898] focus:outline-none focus:border-[#C9A84C]/50 bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-5 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-outline-gold flex-1 py-3.5">
          ← Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="btn-gold flex-1 py-3.5 text-base disabled:opacity-60"
        >
          {loading ? "Confirming…" : "Confirm Booking →"}
        </button>
      </div>

      <p className="text-[#B0A898] text-xs text-center mt-4">
        Booking confirmed instantly • Payment collected on the day or via invoice
      </p>
    </div>
  );
}
