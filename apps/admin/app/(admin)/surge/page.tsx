"use client";
import { useState, useEffect, useCallback } from "react";

export default function SurgePage() {
  const [rules,   setRules]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [form,    setForm]    = useState({ name:"", reason:"", multiplier:"1.5" });
  const [saving,  setSaving]  = useState(false);
  const [err,     setErr]     = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/surge");
      const data = await res.json();
      setRules(data.rules || []);
    } catch {}
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggle = async (id: string, active: boolean) => {
    await fetch("/api/admin/surge", {
      method:"PATCH", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ id, is_active: !active }),
    });
    load();
  };

  const create = async () => {
    if (!form.name || !form.multiplier) { setErr("Name and multiplier are required."); return; }
    setSaving(true); setErr("");
    try {
      const res = await fetch("/api/admin/surge", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...form, multiplier: parseFloat(form.multiplier) }),
      });
      if (!res.ok) { const d = await res.json(); setErr(d.error||"Failed"); return; }
      setShowNew(false); setForm({ name:"", reason:"", multiplier:"1.5" }); load();
    } catch { setErr("Network error"); }
    finally { setSaving(false); }
  };

  const activeRule = rules.find(r => r.is_active);

  const inp = "w-full border border-[#E8E0D0] rounded-xl px-3 py-2.5 text-sm text-[#1C1611] focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20 bg-white";

  return (
    <div className="animate-in space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#1C1611] text-xl font-bold">Surge Pricing</h1>
          <p className="text-[#B0A898] text-sm mt-0.5">Activate a surge rule to apply a price multiplier to all new quotes</p>
        </div>
        <button onClick={() => { setShowNew(s=>!s); setErr(""); }} className="btn-gold text-sm">
          {showNew ? "Cancel" : "+ New Surge Rule"}
        </button>
      </div>

      {/* Active banner */}
      {activeRule && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-orange-800 font-semibold text-sm">Surge Active — {activeRule.multiplier}× multiplier</p>
              <p className="text-orange-600 text-xs">{activeRule.name} · {activeRule.reason}</p>
            </div>
          </div>
          <button onClick={() => toggle(activeRule.id, true)} className="text-xs text-orange-700 border border-orange-300 hover:bg-orange-100 rounded-lg px-3 py-1.5 transition-colors font-semibold">
            Deactivate
          </button>
        </div>
      )}

      {/* New rule form (inline) */}
      {showNew && (
        <div className="bg-white border border-[#C9A84C]/30 rounded-2xl p-6 space-y-4">
          <h2 className="text-[#1C1611] font-semibold">New Surge Rule</h2>
          {err && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Rule Name *</label>
              <input className={inp} placeholder="Peak Hour Surge" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Multiplier *</label>
              <input className={inp} type="number" min={1} max={5} step={0.1} placeholder="1.5" value={form.multiplier} onChange={e=>setForm(f=>({...f,multiplier:e.target.value}))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Reason</label>
              <input className={inp} placeholder="High demand period" value={form.reason} onChange={e=>setForm(f=>({...f,reason:e.target.value}))} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowNew(false)} className="flex-1 border border-[#E8E0D0] text-[#7A6F62] rounded-xl py-2.5 text-sm hover:text-[#1C1611] transition-colors">Cancel</button>
            <button onClick={create} disabled={saving} className="flex-1 btn-gold text-sm disabled:opacity-60">{saving ? "Saving…" : "Create Rule"}</button>
          </div>
        </div>
      )}

      {/* Rules grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(4).fill(0).map((_,i) => <div key={i} className="h-32 bg-white border border-[#E8E0D0] rounded-2xl animate-pulse" />)}
        </div>
      ) : rules.length===0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">⚡</p>
          <p className="text-[#7A6F62] font-medium mb-1">No surge rules yet</p>
          <p className="text-[#B0A898] text-sm">Create a surge rule to dynamically increase pricing during high-demand periods.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map(r => (
            <div key={r.id} className={`bg-white rounded-2xl p-6 border-2 transition-all duration-200 ${
              r.is_active ? "border-[#C9A84C] shadow-[0_4px_20px_rgba(201,168,76,0.15)]" : "border-[#E8E0D0]"
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className={`font-bold text-lg ${r.is_active ? "text-[#C9A84C]" : "text-[#1C1611]"}`}>{r.name}</h3>
                  {r.reason && <p className="text-[#7A6F62] text-xs mt-0.5">{r.reason}</p>}
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className={`text-3xl font-black ${r.is_active ? "text-[#C9A84C]" : "text-[#B0A898]"}`}>{r.multiplier}×</p>
                  <p className="text-[#B0A898] text-xs">multiplier</p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#F0EBE2]">
                <div className="flex items-center justify-between">
                  {r.is_active
                    ? <span className="flex items-center gap-1.5 text-xs text-orange-600 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />Active Now</span>
                    : <span className="text-xs text-[#B0A898]">Inactive</span>
                  }
                  <button onClick={() => toggle(r.id, r.is_active)}
                    className={`text-xs px-4 py-1.5 rounded-lg font-semibold transition-colors ${
                      r.is_active
                        ? "bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100"
                        : "bg-[#C9A84C] text-[#1C1611] hover:bg-[#d4a93a]"
                    }`}>
                    {r.is_active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info note */}
      <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-xl p-4">
        <p className="text-[#A07830] text-sm font-medium mb-1">How Surge Pricing Works</p>
        <p className="text-[#7A6F62] text-xs">Only one surge rule can be active at a time. When active, the multiplier is applied to all new booking quotes. Existing confirmed bookings are not affected. Deactivate to return to standard pricing.</p>
      </div>
    </div>
  );
}
