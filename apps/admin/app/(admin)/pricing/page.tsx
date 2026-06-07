"use client";
import { useState } from "react";

const INITIAL = [
  { category:"sedan",       label:"Executive Sedan",   baseRate:2.80, minFare:65,  airportSurcharge:15, afterHours:1.25, bookingFee:5  },
  { category:"suv",         label:"Premium SUV",       baseRate:3.50, minFare:85,  airportSurcharge:20, afterHours:1.25, bookingFee:5  },
  { category:"luxury",      label:"Luxury Sedan",      baseRate:5.50, minFare:130, airportSurcharge:30, afterHours:1.30, bookingFee:10 },
  { category:"van",         label:"Executive Van",     baseRate:4.00, minFare:100, airportSurcharge:25, afterHours:1.20, bookingFee:5  },
  { category:"stretch_limo",label:"Stretch Limousine", baseRate:8.00, minFare:200, airportSurcharge:50, afterHours:1.35, bookingFee:15 },
];

type Row = typeof INITIAL[0];

export default function PricingPage() {
  const [rows, setRows] = useState<Row[]>(INITIAL);
  const [saved, setSaved] = useState(false);

  const update = (i: number, field: keyof Row, val: string) => {
    setRows((prev) => prev.map((r, idx) => idx === i ? { ...r, [field]: parseFloat(val) || 0 } : r));
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pricing: rows.map(r => ({
            vehicle_category:  r.category,
            base_rate_per_km:  r.baseRate,
            minimum_fare:      r.minFare,
            airport_surcharge: r.airportSurcharge,
            after_hours_mult:  r.afterHours,
            booking_fee:       r.bookingFee,
          }))
        }),
      });
    } catch { /* demo mode */ }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const field = (label: string, val: number, onChange: (v: string) => void, prefix = "$") => (
    <div>
      <label className="block text-[#B0A898] text-[10px] uppercase tracking-wider mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0A898] text-xs">{prefix}</span>
        <input type="number" value={val} onChange={(e) => onChange(e.target.value)} step="0.01"
          className="w-full bg-[#FAF8F4] border border-[#E8E0D0] text-[#1C1611] rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20 transition-colors" />
      </div>
    </div>
  );

  return (
    <div className="animate-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1C1611] text-xl font-bold">Pricing Configuration</h1>
          <p className="text-[#B0A898] text-sm mt-0.5">Changes apply immediately to all new bookings. All prices in AUD incl. GST.</p>
        </div>
        <button onClick={handleSave} className={`btn-gold text-sm ${saved ? "opacity-75" : ""}`}>
          {saved ? "Saved" : "Save Changes"}
        </button>
      </div>

      {rows.map((row, i) => (
        <div key={row.category} className="bg-white border border-[#E8E0D0] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-[#1C1611] font-semibold">{row.label}</h2>
            <span className="text-xs text-[#B0A898] bg-[#F5F1EB] border border-[#E8E0D0] px-2 py-0.5 rounded-full font-mono">{row.category}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {field("Base Rate/km",      row.baseRate,         (v) => update(i, "baseRate",         v))}
            {field("Minimum Fare",      row.minFare,          (v) => update(i, "minFare",          v))}
            {field("Airport Surcharge", row.airportSurcharge, (v) => update(i, "airportSurcharge", v))}
            {field("After-Hours Mult.", row.afterHours,       (v) => update(i, "afterHours",       v), "×")}
            {field("Booking Fee",       row.bookingFee,       (v) => update(i, "bookingFee",       v))}
          </div>
          <div className="mt-4 p-3 bg-[#FAF8F4] border border-[#E8E0D0] rounded-xl text-xs text-[#7A6F62]">
            Example 20km trip: <span className="text-[#C9A84C] font-medium">
              ${Math.max(row.baseRate * 20, row.minFare).toFixed(2)} base + ${row.bookingFee} fee + 10% GST =&nbsp;
              <strong className="text-[#1C1611]">${(Math.max(row.baseRate * 20, row.minFare) * 1.1 + row.bookingFee).toFixed(2)} AUD</strong>
            </span>
          </div>
        </div>
      ))}

      {/* GST notice */}
      <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-xl p-4">
        <p className="text-[#A07830] text-sm font-medium mb-1">GST Note</p>
        <p className="text-[#7A6F62] text-xs">All displayed prices exclude GST. 10% GST is automatically added at checkout as required by Australian tax law. After-hours applies before 6:00am and after 10:00pm.</p>
      </div>
    </div>
  );
}
