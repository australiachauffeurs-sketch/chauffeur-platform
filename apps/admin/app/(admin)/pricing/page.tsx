"use client";
import { useState, useEffect } from "react";

const DEFAULT_ROWS = [
  { vehicle_category:"sedan",        label:"Executive Sedan",   base_rate_per_km:2.80, minimum_fare:65,  airport_surcharge:15, after_hours_mult:1.25, booking_fee:5  },
  { vehicle_category:"suv",          label:"Premium SUV",       base_rate_per_km:3.50, minimum_fare:85,  airport_surcharge:20, after_hours_mult:1.25, booking_fee:5  },
  { vehicle_category:"luxury",       label:"Luxury Sedan",      base_rate_per_km:5.50, minimum_fare:130, airport_surcharge:30, after_hours_mult:1.30, booking_fee:10 },
  { vehicle_category:"van",          label:"Executive Van",     base_rate_per_km:4.00, minimum_fare:100, airport_surcharge:25, after_hours_mult:1.20, booking_fee:5  },
  { vehicle_category:"stretch_limo", label:"Stretch Limousine", base_rate_per_km:8.00, minimum_fare:200, airport_surcharge:50, after_hours_mult:1.35, booking_fee:15 },
  { vehicle_category:"minibus",      label:"Minibus",           base_rate_per_km:5.00, minimum_fare:150, airport_surcharge:35, after_hours_mult:1.25, booking_fee:10 },
];

const CAT_LABEL: Record<string,string> = {
  sedan:"Executive Sedan", suv:"Premium SUV", luxury:"Luxury Sedan",
  van:"Executive Van", stretch_limo:"Stretch Limousine", minibus:"Minibus",
};

type Row = typeof DEFAULT_ROWS[0];

export default function PricingPage() {
  const [rows,    setRows]    = useState<Row[]>(DEFAULT_ROWS);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [status,  setStatus]  = useState<"idle"|"saved"|"error">("idle");

  useEffect(() => {
    fetch("/api/pricing")
      .then(r => r.json())
      .then(data => {
        if (data.pricing?.length) {
          setRows(DEFAULT_ROWS.map(def => {
            const saved = data.pricing.find((p:any) => p.vehicle_category === def.vehicle_category);
            return saved ? { ...def, ...saved } : def;
          }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const update = (i: number, field: keyof Row, val: string) => {
    setRows(prev => prev.map((r, idx) => idx===i ? { ...r, [field]: parseFloat(val)||0 } : r));
    setStatus("idle");
  };

  const handleSave = async () => {
    setSaving(true); setStatus("idle");
    try {
      const res = await fetch("/api/pricing", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ pricing: rows }),
      });
      if (res.ok) { setStatus("saved"); setTimeout(() => setStatus("idle"), 3000); }
      else        { setStatus("error"); }
    } catch { setStatus("error"); }
    finally { setSaving(false); }
  };

  const NumField = ({ label, value, onChange, prefix="$" }: { label:string; value:number; onChange:(v:string)=>void; prefix?:string }) => (
    <div>
      <label className="block text-[#B0A898] text-[10px] uppercase tracking-wider mb-1 font-medium">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0A898] text-xs pointer-events-none">{prefix}</span>
        <input type="number" value={value} onChange={e => onChange(e.target.value)} step="0.01" min={0}
          className="w-full bg-[#FAF8F4] border border-[#E8E0D0] text-[#1C1611] rounded-xl pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20 transition-colors" />
      </div>
    </div>
  );

  return (
    <div className="animate-in space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#1C1611] text-xl font-bold">Pricing Configuration</h1>
          <p className="text-[#B0A898] text-sm mt-0.5">Changes apply immediately to all new bookings. All prices in AUD excl. GST.</p>
        </div>
        <button onClick={handleSave} disabled={saving || loading}
          className={`btn-gold text-sm disabled:opacity-60 min-w-[120px] ${status==="saved"?"opacity-80":""}`}>
          {saving ? "Saving…" : status==="saved" ? "✓ Saved" : status==="error" ? "Error — Retry" : "Save All Changes"}
        </button>
      </div>

      {status==="error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">Failed to save. Check your Supabase connection.</div>
      )}

      {loading ? (
        <div className="space-y-4">{Array(5).fill(0).map((_,i)=><div key={i} className="h-36 bg-white border border-[#E8E0D0] rounded-2xl animate-pulse"/>)}</div>
      ) : (
        rows.map((row, i) => {
          const example20km = Math.max(row.base_rate_per_km * 20, row.minimum_fare);
          const exampleTotal = (example20km + row.booking_fee) * 1.1;
          return (
            <div key={row.vehicle_category} className="bg-white border border-[#E8E0D0] hover:border-[#C9A84C]/30 rounded-2xl p-6 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-[#1C1611] font-semibold">{row.label || CAT_LABEL[row.vehicle_category] || row.vehicle_category}</h2>
                <span className="text-xs text-[#B0A898] bg-[#F5F1EB] border border-[#E8E0D0] px-2 py-0.5 rounded-full font-mono">{row.vehicle_category}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <NumField label="Base Rate / km"   value={row.base_rate_per_km}  onChange={v => update(i,"base_rate_per_km",v)} />
                <NumField label="Minimum Fare"     value={row.minimum_fare}      onChange={v => update(i,"minimum_fare",v)} />
                <NumField label="Airport Surcharge" value={row.airport_surcharge} onChange={v => update(i,"airport_surcharge",v)} />
                <NumField label="After-Hours Mult." value={row.after_hours_mult}  onChange={v => update(i,"after_hours_mult",v)} prefix="×" />
                <NumField label="Booking Fee"      value={row.booking_fee}       onChange={v => update(i,"booking_fee",v)} />
              </div>
              <div className="mt-4 p-3 bg-[#FAF8F4] border border-[#F0EBE2] rounded-xl text-xs text-[#7A6F62]">
                Example 20km trip: base ${example20km.toFixed(2)} + fee ${row.booking_fee.toFixed(2)} + 10% GST =&nbsp;
                <strong className="text-[#1C1611]">${exampleTotal.toFixed(2)} AUD</strong>
              </div>
            </div>
          );
        })
      )}

      {/* Note */}
      <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-xl p-4">
        <p className="text-[#A07830] text-sm font-medium mb-1">GST &amp; Pricing Notes</p>
        <p className="text-[#7A6F62] text-xs">All displayed prices exclude GST. 10% GST is automatically added at checkout. After-hours multiplier applies before 6:00am and after 10:00pm. Airport surcharge is added for pickups and drop-offs at airports.</p>
      </div>
    </div>
  );
}
