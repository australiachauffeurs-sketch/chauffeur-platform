"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface CorporateAccount {
  id: string;
  company_name: string;
  abn: string | null;
  billing_email: string;
  billing_address: string | null;
  credit_limit: number;
  current_balance: number;
  payment_terms: number;
  is_active: boolean;
  created_at: string;
}

function formatAUD(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(n);
}

export default function CorporatePage() {
  const [accounts, setAccounts] = useState<CorporateAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    abn: "",
    billing_email: "",
    billing_address: "",
    credit_limit: "5000",
    payment_terms: "30",
  });

  const load = () => {
    setLoading(true);
    fetch("/api/admin/corporate")
      .then(r => r.json())
      .then(d => setAccounts(d.accounts || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/corporate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, credit_limit: parseFloat(form.credit_limit), payment_terms: parseInt(form.payment_terms) }),
    });
    setSaving(false);
    setShowForm(false);
    setForm({ company_name: "", abn: "", billing_email: "", billing_address: "", credit_limit: "5000", payment_terms: "30" });
    load();
  };

  const toggleActive = async (id: string, is_active: boolean) => {
    await fetch("/api/admin/corporate", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_active }),
    });
    load();
  };

  return (
    <div className="p-8 min-h-screen bg-[#0a0a0f] text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#C9A84C]">Corporate Accounts</h1>
          <p className="text-gray-400 text-sm mt-1">Manage corporate clients with invoice billing and credit limits</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2.5 bg-[#C9A84C] text-black rounded-xl font-bold text-sm hover:bg-[#E8C97A] transition-colors"
        >
          + New Account
        </button>
      </div>

      {/* Create Account Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl p-8 w-full max-w-lg border border-white/10">
            <h2 className="text-white font-bold text-lg mb-6">New Corporate Account</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1">Company Name *</label>
                <input required value={form.company_name} onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A84C]/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1">ABN</label>
                  <input value={form.abn} onChange={e => setForm(f => ({ ...f, abn: e.target.value }))}
                    placeholder="12 345 678 901"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A84C]/50" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1">Billing Email *</label>
                  <input required type="email" value={form.billing_email} onChange={e => setForm(f => ({ ...f, billing_email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A84C]/50" />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1">Billing Address</label>
                <input value={form.billing_address} onChange={e => setForm(f => ({ ...f, billing_address: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A84C]/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1">Credit Limit (AUD)</label>
                  <input type="number" min="0" step="500" value={form.credit_limit} onChange={e => setForm(f => ({ ...f, credit_limit: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A84C]/50" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1">Payment Terms (days)</label>
                  <input type="number" min="7" max="90" value={form.payment_terms} onChange={e => setForm(f => ({ ...f, payment_terms: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A84C]/50" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 bg-white/5 text-gray-400 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-2.5 bg-[#C9A84C] text-black rounded-xl font-bold text-sm hover:bg-[#E8C97A] transition-colors disabled:opacity-60">
                  {saving ? "Creating…" : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Accounts list */}
      {loading ? (
        <div className="text-gray-400 text-sm">Loading accounts…</div>
      ) : accounts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg mb-2">No corporate accounts yet</p>
          <p className="text-sm">Click "New Account" to add your first corporate client.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {accounts.map(acc => {
            const usedPct = acc.credit_limit > 0 ? Math.min((acc.current_balance / acc.credit_limit) * 100, 100) : 0;
            const nearLimit = usedPct >= 80;
            return (
              <div key={acc.id} className={`bg-[#111827] rounded-2xl p-6 border transition-all ${acc.is_active ? "border-white/5" : "border-white/[0.02] opacity-60"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-bold text-lg">{acc.company_name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${acc.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                        {acc.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    {acc.abn && <p className="text-gray-500 text-xs mt-0.5">ABN: {acc.abn}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/bookings?corporate=${acc.id}`}
                      className="px-3 py-1.5 bg-white/5 text-gray-400 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors"
                    >
                      View Bookings
                    </Link>
                    <button
                      onClick={() => toggleActive(acc.id, !acc.is_active)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${acc.is_active ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-green-500/10 text-green-400 hover:bg-green-500/20"}`}
                    >
                      {acc.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Billing Email</p>
                    <p className="text-white">{acc.billing_email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Payment Terms</p>
                    <p className="text-white">Net {acc.payment_terms} days</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Current Balance</p>
                    <p className={`font-bold ${nearLimit ? "text-red-400" : "text-white"}`}>{formatAUD(acc.current_balance)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Credit Limit</p>
                    <p className="text-white font-bold">{formatAUD(acc.credit_limit)}</p>
                  </div>
                </div>

                {/* Credit usage bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Credit Used</span>
                    <span className={nearLimit ? "text-red-400 font-semibold" : ""}>{usedPct.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${usedPct}%`, backgroundColor: nearLimit ? "#ef4444" : "#C9A84C" }}
                    />
                  </div>
                  {nearLimit && (
                    <p className="text-red-400 text-xs mt-1">Near credit limit — review account</p>
                  )}
                </div>

                {acc.billing_address && (
                  <p className="text-gray-600 text-xs mt-3">{acc.billing_address}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
