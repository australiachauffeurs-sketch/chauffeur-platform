"use client";
import { useState, useEffect, useCallback } from "react";

const EMPTY = { code:"", description:"", discount_type:"percent", discount_value:"10", max_uses:"", expires_at:"" };

function Modal({ title, onClose, children }: { title:string; onClose:()=>void; children:React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,0,0,0.45)" }}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-[#E8E0D0]">
        <div className="flex items-center justify-between p-6 border-b border-[#F0EBE2]">
          <h2 className="text-[#1C1611] font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="text-[#B0A898] hover:text-[#1C1611] text-xl leading-none">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

const inp = "w-full border border-[#E8E0D0] rounded-xl px-3 py-2.5 text-sm text-[#1C1611] focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20 bg-white";

export default function PromosPage() {
  const [promos,  setPromos]  = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [form,    setForm]    = useState({ ...EMPTY });
  const [saving,  setSaving]  = useState(false);
  const [err,     setErr]     = useState("");
  const [ok,      setOk]      = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/promos");
      const data = await res.json();
      setPromos(data.promos || []);
    } catch {}
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = async () => {
    if (!form.code) { setErr("Promo code is required."); return; }
    setSaving(true); setErr("");
    try {
      const res = await fetch("/api/admin/promos", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          ...form,
          code:           form.code.toUpperCase(),
          discount_value: Number(form.discount_value),
          max_uses:       form.max_uses ? Number(form.max_uses) : null,
          expires_at:     form.expires_at || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.error || "Failed"); return; }
      setOk("Promo code created!"); setShowNew(false); setForm({ ...EMPTY }); load();
      setTimeout(() => setOk(""), 3000);
    } catch { setErr("Network error"); }
    finally { setSaving(false); }
  };

  const toggle = async (id: string, is_active: boolean) => {
    await fetch("/api/admin/promos", {
      method:"PATCH", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ id, is_active: !is_active }),
    });
    load();
  };

  const deletePromo = async (id: string) => {
    if (!confirm("Delete this promo code?")) return;
    await fetch("/api/admin/promos", {
      method:"DELETE", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ id }),
    });
    load();
  };

  const active   = promos.filter(p => p.is_active).length;
  const totalUses = promos.reduce((s,p) => s + (p.uses_count||0), 0);

  return (
    <div className="animate-in space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#1C1611] text-xl font-bold">Promo Codes</h1>
          <p className="text-[#B0A898] text-sm mt-0.5">{promos.length} codes · {active} active · {totalUses} total uses</p>
        </div>
        <button onClick={() => { setShowNew(true); setErr(""); setForm({ ...EMPTY }); }} className="btn-gold text-sm">+ New Promo Code</button>
      </div>

      {ok && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">{ok}</div>}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:"Total Codes",  value: promos.length },
          { label:"Active",       value: active },
          { label:"Total Uses",   value: totalUses },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#E8E0D0] rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#1C1611]">{s.value}</p>
            <p className="text-[#B0A898] text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F0EBE2] text-[#B0A898] text-xs uppercase tracking-wider bg-[#FAF8F4]">
              {["Code","Discount","Description","Uses","Expires","Status",""].map(h => (
                <th key={h} className="text-left px-5 py-3 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0EBE2]">
            {loading ? Array(3).fill(0).map((_,i) => (
              <tr key={i}><td colSpan={7} className="px-5 py-4"><div className="h-4 bg-[#E8E0D0] rounded animate-pulse" /></td></tr>
            )) : promos.length===0 ? (
              <tr><td colSpan={7} className="px-5 py-16 text-center">
                <p className="text-4xl mb-2">🎟</p>
                <p className="text-[#7A6F62] font-medium">No promo codes yet</p>
                <p className="text-[#B0A898] text-xs mt-1">Click "+ New Promo Code" to create your first one</p>
              </td></tr>
            ) : promos.map(p => {
              const expired = p.expires_at && new Date(p.expires_at) < new Date();
              const maxed   = p.max_uses && p.uses_count >= p.max_uses;
              return (
                <tr key={p.id} className="hover:bg-[#FAF8F4] transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-mono text-[#C9A84C] font-bold text-sm tracking-wider">{p.code}</span>
                  </td>
                  <td className="px-5 py-4 text-[#1C1611] font-bold">
                    {p.discount_type==="percent" ? `${p.discount_value}%` : `$${p.discount_value}`}
                    <span className="text-[#B0A898] text-xs font-normal ml-1">{p.discount_type==="percent"?"off":"fixed"}</span>
                  </td>
                  <td className="px-5 py-4 text-[#7A6F62] text-xs max-w-[160px] truncate">{p.description || "—"}</td>
                  <td className="px-5 py-4 text-[#7A6F62] text-xs">
                    {p.uses_count||0}{p.max_uses ? <span className="text-[#B0A898]"> / {p.max_uses}</span> : ""}
                    {maxed && <span className="ml-1 text-red-500 font-semibold">Maxed</span>}
                  </td>
                  <td className="px-5 py-4 text-xs">
                    {p.expires_at
                      ? <span className={expired ? "text-red-500 font-semibold" : "text-[#7A6F62]"}>{new Date(p.expires_at).toLocaleDateString("en-AU")}{expired && " (exp)"}</span>
                      : <span className="text-[#B0A898]">Never</span>
                    }
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                      p.is_active && !expired && !maxed
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-[#F5F1EB] text-[#B0A898] border-[#E8E0D0]"
                    }`}>
                      {p.is_active && !expired && !maxed ? "Active" : expired ? "Expired" : maxed ? "Maxed" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggle(p.id, p.is_active)} className="text-xs text-[#C9A84C] hover:underline font-semibold">
                        {p.is_active ? "Deactivate" : "Activate"}
                      </button>
                      <button onClick={() => deletePromo(p.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create modal */}
      {showNew && (
        <Modal title="New Promo Code" onClose={() => setShowNew(false)}>
          <div className="space-y-4">
            {err && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</p>}
            <div>
              <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Promo Code *</label>
              <input className={inp} placeholder="SUMMER20" value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value.toUpperCase()}))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Description</label>
              <input className={inp} placeholder="Summer sale — 20% off" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Discount Type</label>
                <select className={inp} value={form.discount_type} onChange={e=>setForm(f=>({...f,discount_type:e.target.value}))}>
                  <option value="percent">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Value</label>
                <input className={inp} type="number" min={1} placeholder={form.discount_type==="percent"?"10":"50"} value={form.discount_value} onChange={e=>setForm(f=>({...f,discount_value:e.target.value}))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Max Uses</label>
                <input className={inp} type="number" min={1} placeholder="Unlimited" value={form.max_uses} onChange={e=>setForm(f=>({...f,max_uses:e.target.value}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Expires On</label>
                <input className={inp} type="date" value={form.expires_at} onChange={e=>setForm(f=>({...f,expires_at:e.target.value}))} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowNew(false)} className="flex-1 border border-[#E8E0D0] text-[#7A6F62] rounded-xl py-2.5 text-sm hover:text-[#1C1611] transition-colors">Cancel</button>
              <button onClick={create} disabled={saving} className="flex-1 btn-gold text-sm disabled:opacity-60">{saving ? "Creating…" : "Create Code"}</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
