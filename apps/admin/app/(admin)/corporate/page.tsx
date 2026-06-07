"use client";
import { useState, useEffect, useCallback } from "react";

function formatAUD(n: number) {
  return new Intl.NumberFormat("en-AU", { style:"currency", currency:"AUD" }).format(n);
}

const EMPTY = { company_name:"", abn:"", billing_email:"", billing_address:"", credit_limit:"5000", payment_terms:"30" };

function Modal({ title, onClose, children, wide=false }: { title:string; onClose:()=>void; children:React.ReactNode; wide?:boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,0,0,0.45)" }}>
      <div className={`bg-white rounded-2xl shadow-xl w-full border border-[#E8E0D0] max-h-[90vh] overflow-y-auto ${wide?"max-w-2xl":"max-w-lg"}`}>
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

export default function CorporatePage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [showNew,  setShowNew]  = useState(false);
  const [viewing,  setViewing]  = useState<any|null>(null);
  const [form,     setForm]     = useState({ ...EMPTY });
  const [saving,   setSaving]   = useState(false);
  const [err,      setErr]      = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/corporate");
      const data = await res.json();
      setAccounts(data.accounts || []);
    } catch {}
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = async () => {
    if (!form.company_name || !form.billing_email) { setErr("Company name and billing email are required."); return; }
    setSaving(true); setErr("");
    try {
      const res = await fetch("/api/admin/corporate", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...form, credit_limit: parseFloat(form.credit_limit)||5000, payment_terms: parseInt(form.payment_terms)||30 }),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.error||"Failed"); return; }
      setShowNew(false); setForm({ ...EMPTY }); load();
    } catch { setErr("Network error"); }
    finally { setSaving(false); }
  };

  const toggleActive = async (id: string, is_active: boolean) => {
    await fetch("/api/admin/corporate", {
      method:"PATCH", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ id, is_active: !is_active }),
    });
    load();
    if (viewing?.id===id) setViewing((v:any) => ({ ...v, is_active: !is_active }));
  };

  const active   = accounts.filter(a=>a.is_active).length;
  const totalCredit = accounts.reduce((s,a)=>s+(a.credit_limit||0),0);

  return (
    <div className="animate-in space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#1C1611] text-xl font-bold">Corporate Accounts</h1>
          <p className="text-[#B0A898] text-sm mt-0.5">{accounts.length} accounts · {active} active · {formatAUD(totalCredit)} total credit</p>
        </div>
        <button onClick={() => { setShowNew(true); setErr(""); setForm({ ...EMPTY }); }} className="btn-gold text-sm">+ New Account</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:"Total Accounts", value: accounts.length },
          { label:"Active",         value: active },
          { label:"Total Credit",   value: formatAUD(totalCredit) },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#E8E0D0] rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#1C1611]">{s.value}</p>
            <p className="text-[#B0A898] text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Accounts list */}
      {loading ? (
        <div className="space-y-4">{Array(3).fill(0).map((_,i)=><div key={i} className="h-32 bg-white border border-[#E8E0D0] rounded-2xl animate-pulse"/>)}</div>
      ) : accounts.length===0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">🏢</p>
          <p className="text-[#7A6F62] font-medium mb-1">No corporate accounts yet</p>
          <p className="text-[#B0A898] text-sm">Click "+ New Account" to onboard your first corporate client.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {accounts.map(acc => {
            const usedPct  = acc.credit_limit>0 ? Math.min((acc.current_balance/acc.credit_limit)*100, 100) : 0;
            const nearLimit = usedPct>=80;
            return (
              <div key={acc.id} className={`bg-white rounded-2xl p-6 border transition-all ${acc.is_active?"border-[#E8E0D0] hover:border-[#C9A84C]/40":"border-[#E8E0D0] opacity-60"}`}>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[#1C1611] font-bold text-lg">{acc.company_name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${acc.is_active?"bg-green-50 text-green-700 border-green-200":"bg-[#F5F1EB] text-[#B0A898] border-[#E8E0D0]"}`}>
                        {acc.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    {acc.abn && <p className="text-[#B0A898] text-xs">ABN: {acc.abn}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setViewing(acc)} className="text-xs border border-[#E8E0D0] text-[#7A6F62] hover:border-[#C9A84C]/40 hover:text-[#1C1611] rounded-lg px-3 py-1.5 transition-colors">
                      Details
                    </button>
                    <button onClick={() => toggleActive(acc.id, acc.is_active)}
                      className={`text-xs rounded-lg px-3 py-1.5 transition-colors font-semibold border ${acc.is_active?"border-red-200 text-red-600 hover:bg-red-50":"border-green-200 text-green-700 hover:bg-green-50"}`}>
                      {acc.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                  {[
                    { label:"Billing Email",    value: acc.billing_email },
                    { label:"Payment Terms",    value: `Net ${acc.payment_terms} days` },
                    { label:"Current Balance",  value: formatAUD(acc.current_balance||0), highlight: nearLimit },
                    { label:"Credit Limit",     value: formatAUD(acc.credit_limit||0) },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} className="bg-[#FAF8F4] rounded-xl p-3">
                      <p className="text-[#B0A898] text-xs mb-0.5">{label}</p>
                      <p className={`text-xs font-semibold ${highlight ? "text-red-600" : "text-[#1C1611]"}`}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Credit bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#B0A898]">Credit utilisation</span>
                    <span className={nearLimit?"text-red-600 font-semibold":"text-[#7A6F62]"}>{usedPct.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-[#F0EBE2] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width:`${usedPct}%`, backgroundColor: nearLimit?"#ef4444":"#C9A84C" }} />
                  </div>
                  {nearLimit && <p className="text-red-500 text-xs mt-1.5 font-medium">⚠ Near credit limit — review account</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Account modal */}
      {showNew && (
        <Modal title="New Corporate Account" onClose={() => setShowNew(false)}>
          <div className="space-y-4">
            {err && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</p>}
            <div>
              <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Company Name *</label>
              <input className={inp} placeholder="Acme Corporation Pty Ltd" value={form.company_name} onChange={e=>setForm(f=>({...f,company_name:e.target.value}))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">ABN</label>
                <input className={inp} placeholder="12 345 678 901" value={form.abn} onChange={e=>setForm(f=>({...f,abn:e.target.value}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Billing Email *</label>
                <input className={inp} type="email" placeholder="accounts@acme.com.au" value={form.billing_email} onChange={e=>setForm(f=>({...f,billing_email:e.target.value}))} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Billing Address</label>
              <input className={inp} placeholder="Level 5, 123 Queen St, Brisbane QLD 4000" value={form.billing_address} onChange={e=>setForm(f=>({...f,billing_address:e.target.value}))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Credit Limit (AUD)</label>
                <input className={inp} type="number" min={0} step={500} value={form.credit_limit} onChange={e=>setForm(f=>({...f,credit_limit:e.target.value}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#7A6F62] mb-1.5 uppercase tracking-wider">Payment Terms (days)</label>
                <select className={inp} value={form.payment_terms} onChange={e=>setForm(f=>({...f,payment_terms:e.target.value}))}>
                  <option value="7">Net 7 days</option>
                  <option value="14">Net 14 days</option>
                  <option value="30">Net 30 days</option>
                  <option value="60">Net 60 days</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowNew(false)} className="flex-1 border border-[#E8E0D0] text-[#7A6F62] rounded-xl py-2.5 text-sm hover:text-[#1C1611] transition-colors">Cancel</button>
              <button onClick={create} disabled={saving} className="flex-1 btn-gold text-sm disabled:opacity-60">{saving?"Creating…":"Create Account"}</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Detail modal */}
      {viewing && (
        <Modal title={viewing.company_name} onClose={() => setViewing(null)} wide>
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className={`text-sm px-3 py-1 rounded-full font-medium border ${viewing.is_active?"bg-green-50 text-green-700 border-green-200":"bg-[#F5F1EB] text-[#B0A898] border-[#E8E0D0]"}`}>
                {viewing.is_active?"Active":"Inactive"}
              </span>
              {viewing.abn && <span className="text-[#B0A898] text-xs">ABN: {viewing.abn}</span>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Billing Email",    viewing.billing_email],
                ["Billing Address",  viewing.billing_address||"Not set"],
                ["Payment Terms",    `Net ${viewing.payment_terms} days`],
                ["Credit Limit",     formatAUD(viewing.credit_limit||0)],
                ["Current Balance",  formatAUD(viewing.current_balance||0)],
                ["Available Credit", formatAUD(Math.max(0,(viewing.credit_limit||0)-(viewing.current_balance||0)))],
              ].map(([k,v]) => (
                <div key={k} className="bg-[#FAF8F4] rounded-xl p-3">
                  <p className="text-[#B0A898] text-xs mb-0.5">{k}</p>
                  <p className="text-[#1C1611] font-medium text-xs">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={() => toggleActive(viewing.id, viewing.is_active)}
                className={`text-sm px-5 py-2.5 rounded-xl font-semibold border transition-colors ${viewing.is_active?"border-red-200 text-red-600 hover:bg-red-50":"border-green-200 text-green-700 hover:bg-green-50"}`}>
                {viewing.is_active ? "Deactivate Account" : "Activate Account"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
