"use client";
import { useState, useEffect } from "react";

export default function PromosPage() {
  const [promos, setPromos] = useState<any[]>([]);
  const [form, setForm] = useState({ code: "", description: "", discount_type: "percent", discount_value: 10, max_uses: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/promos");
    const data = await res.json();
    setPromos(data.promos || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    setSaving(true);
    await fetch("/api/admin/promos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, discount_value: Number(form.discount_value), max_uses: form.max_uses ? Number(form.max_uses) : null }),
    });
    setMsg("Promo created!");
    setForm({ code: "", description: "", discount_type: "percent", discount_value: 10, max_uses: "" });
    await load();
    setSaving(false);
    setTimeout(() => setMsg(""), 3000);
  };

  const toggle = async (id: string, is_active: boolean) => {
    await fetch("/api/admin/promos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_active: !is_active }),
    });
    load();
  };

  return (
    <div className="p-8 min-h-screen bg-[#FAF8F4] text-[#1C1611]">
      <h1 className="text-2xl font-bold text-[#C9A84C] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Promo Codes</h1>

      {/* Create form */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8E0D0] mb-8 shadow-sm">
        <h2 className="text-[#1C1611] font-semibold mb-4">Create New Promo</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input placeholder="CODE (e.g. SUMMER20)" value={form.code} onChange={e => setForm(f => ({...f, code: e.target.value.toUpperCase()}))}
            className="bg-[#FAF8F4] border border-[#E8E0D0] rounded-xl px-4 py-3 text-[#1C1611] text-sm focus:outline-none focus:border-[#C9A84C]/50" />
          <input placeholder="Description" value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))}
            className="bg-[#FAF8F4] border border-[#E8E0D0] rounded-xl px-4 py-3 text-[#1C1611] text-sm focus:outline-none focus:border-[#C9A84C]/50" />
          <select value={form.discount_type} onChange={e => setForm(f => ({...f, discount_type: e.target.value}))}
            className="bg-[#FAF8F4] border border-[#E8E0D0] rounded-xl px-4 py-3 text-[#1C1611] text-sm focus:outline-none">
            <option value="percent">Percentage (%)</option>
            <option value="fixed">Fixed Amount ($)</option>
          </select>
          <input type="number" placeholder="Value (e.g. 10 for 10%)" value={form.discount_value} onChange={e => setForm(f => ({...f, discount_value: Number(e.target.value)}))}
            className="bg-[#FAF8F4] border border-[#E8E0D0] rounded-xl px-4 py-3 text-[#1C1611] text-sm focus:outline-none focus:border-[#C9A84C]/50" />
          <input type="number" placeholder="Max uses (blank = unlimited)" value={form.max_uses} onChange={e => setForm(f => ({...f, max_uses: e.target.value}))}
            className="bg-[#FAF8F4] border border-[#E8E0D0] rounded-xl px-4 py-3 text-[#1C1611] text-sm focus:outline-none focus:border-[#C9A84C]/50" />
        </div>
        <button onClick={create} disabled={saving || !form.code}
          className="bg-[#C9A84C] text-[#1C1611] font-bold px-6 py-3 rounded-xl text-sm disabled:opacity-50 hover:bg-[#d4a93a] transition-colors">
          {saving ? "Creating…" : "Create Promo"}
        </button>
        {msg && <p className="text-green-600 text-sm mt-2">{msg}</p>}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E8E0D0] overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#E8E0D0] text-[#B0A898] text-xs uppercase tracking-wider">
            <th className="px-6 py-4 text-left">Code</th>
            <th className="px-6 py-4 text-left">Discount</th>
            <th className="px-6 py-4 text-left">Uses</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Action</th>
          </tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-[#B0A898]">Loading…</td></tr>
            ) : promos.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-[#B0A898]">No promo codes yet. Create one above.</td></tr>
            ) : promos.map(p => (
              <tr key={p.id} className="border-b border-[#E8E0D0] hover:bg-[#FAF8F4] transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-[#C9A84C] font-bold">{p.code}</span>
                  {p.description && <><br/><span className="text-[#7A6F62] text-xs">{p.description}</span></>}
                </td>
                <td className="px-6 py-4 text-[#1C1611] font-medium">
                  {p.discount_type === "percent" ? `${p.discount_value}%` : `$${p.discount_value}`}
                </td>
                <td className="px-6 py-4 text-[#7A6F62]">
                  {p.uses_count}{p.max_uses ? ` / ${p.max_uses}` : ""}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {p.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => toggle(p.id, p.is_active)}
                    className="text-xs text-[#7A6F62] hover:text-[#1C1611] transition-colors underline underline-offset-2">
                    {p.is_active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
