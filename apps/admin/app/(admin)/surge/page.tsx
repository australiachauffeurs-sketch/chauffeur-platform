"use client";
import { useState, useEffect } from "react";

export default function SurgePage() {
  const [rules, setRules] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/surge").then(r => r.json()).then(d => setRules(d.rules || []));
  }, []);

  const toggle = async (id: string, active: boolean) => {
    await fetch("/api/admin/surge", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_active: active }),
    });
    fetch("/api/admin/surge").then(r => r.json()).then(d => setRules(d.rules || []));
  };

  return (
    <div className="p-8 min-h-screen bg-[#0a0a0f] text-white">
      <h1 className="text-2xl font-bold text-[#C9A84C] mb-2">Surge Pricing</h1>
      <p className="text-gray-400 text-sm mb-8">Activate one surge rule at a time to apply a price multiplier to all quotes</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map(r => (
          <div key={r.id} className={`bg-[#111827] rounded-2xl p-6 border transition-all ${r.is_active ? "border-[#C9A84C]" : "border-white/5"}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className={`font-bold text-lg ${r.is_active ? "text-[#C9A84C]" : "text-white"}`}>{r.name}</h3>
              <span className={`text-2xl font-black ${r.is_active ? "text-[#C9A84C]" : "text-gray-500"}`}>{r.multiplier}×</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">{r.reason}</p>
            <button
              onClick={() => toggle(r.id, !r.is_active)}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-colors ${r.is_active ? "bg-[#C9A84C] text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
            >
              {r.is_active ? "✓ Active — Click to Deactivate" : "Activate"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
