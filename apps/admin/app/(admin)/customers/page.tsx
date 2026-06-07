"use client";
import { useState, useEffect, useCallback } from "react";

const STATUS_BADGE: Record<string,string> = {
  pending:     "bg-yellow-50 text-yellow-700",
  confirmed:   "bg-blue-50 text-blue-700",
  in_progress: "bg-orange-50 text-orange-700",
  completed:   "bg-green-50 text-green-700",
  cancelled:   "bg-red-50 text-red-700",
};

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

export default function CustomersPage() {
  const [customers,  setCustomers]  = useState<any[]>([]);
  const [search,     setSearch]     = useState("");
  const [loading,    setLoading]    = useState(true);
  const [total,      setTotal]      = useState(0);
  const [filterType, setFilterType] = useState("all");

  // Detail modal
  const [viewing,    setViewing]    = useState<any|null>(null);
  const [custBooks,  setCustBooks]  = useState<any[]>([]);
  const [loadingBks, setLoadingBks] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/admin/customers?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setCustomers(data.customers || []);
      setTotal(data.total || 0);
    } catch {}
    finally { setLoading(false); }
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const openCustomer = async (c: any) => {
    setViewing(c);
    setCustBooks([]);
    setLoadingBks(true);
    try {
      // Fetch this customer's bookings
      const res  = await fetch(`/api/admin/bookings?customer_id=${encodeURIComponent(c.id)}&limit=20`);
      const data = await res.json();
      setCustBooks(data.bookings || []);
    } catch {}
    finally { setLoadingBks(false); }
  };

  const exportCSV = () => {
    const headers = ["Name","Email","Phone","City","Type","Trips","Total Spent","Joined"];
    const rows    = customers.map(c => [c.name,c.email,c.phone,c.city,c.type,c.trips,`$${c.spent}`,c.joined]);
    const csv     = [headers,...rows].map(r=>r.join(",")).join("\n");
    const blob    = new Blob([csv], { type:"text/csv" });
    const url     = URL.createObjectURL(blob);
    const a       = document.createElement("a");
    a.href=url; a.download="elite-customers.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = filterType==="all" ? customers
    : customers.filter(c => c.type?.toLowerCase() === filterType);

  const corporate = customers.filter(c => c.type==="Corporate").length;

  return (
    <div className="animate-in space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1C1611] text-xl font-bold">Customers</h1>
          <p className="text-[#B0A898] text-sm mt-0.5">{total} total · {corporate} corporate accounts</p>
        </div>
        <button onClick={exportCSV} className="btn-gold text-sm">Export CSV</button>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search by name or email…" value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-white border border-[#E8E0D0] text-[#1C1611] placeholder:text-[#B0A898] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
        <div className="flex gap-2">
          {["all","individual","corporate"].map(t => (
            <button key={t} onClick={() => setFilterType(t)}
              className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                filterType===t ? "bg-[#C9A84C] text-[#1C1611]" : "bg-white border border-[#E8E0D0] text-[#7A6F62] hover:border-[#C9A84C]/40"
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F0EBE2] text-[#B0A898] text-xs uppercase tracking-wider bg-[#FAF8F4]">
                {["Customer","Contact","City","Type","Trips","Total Spent","Joined",""].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE2]">
              {loading ? Array(5).fill(0).map((_,i) => (
                <tr key={i}><td colSpan={8} className="px-5 py-4"><div className="h-4 bg-[#E8E0D0] rounded animate-pulse" /></td></tr>
              )) : filtered.length===0 ? (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-[#B0A898]">No customers found</td></tr>
              ) : filtered.map(c => (
                <tr key={c.id} className="hover:bg-[#FAF8F4] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] font-bold text-xs flex-shrink-0">
                        {c.name?.[0]?.toUpperCase()}
                      </div>
                      <span className="text-[#1C1611] font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[#7A6F62] text-xs">{c.email}</p>
                    <p className="text-[#B0A898] text-xs">{c.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-[#7A6F62] text-xs">{c.city || "—"}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.type==="Corporate"?"bg-[#C9A84C]/10 text-[#A07830] border border-[#C9A84C]/20":"bg-[#F5F1EB] text-[#B0A898]"}`}>
                      {c.type || "Individual"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#1C1611] font-bold">{c.trips || 0}</td>
                  <td className="px-5 py-4 text-[#C9A84C] font-bold">${c.spent?.toLocaleString() || "0"}</td>
                  <td className="px-5 py-4 text-[#B0A898] text-xs">{c.joined || "—"}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => openCustomer(c)} className="text-[#C9A84C] text-xs font-semibold hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer detail modal */}
      {viewing && (
        <Modal title={viewing.name} onClose={() => setViewing(null)} wide>
          <div className="space-y-5">
            {/* Type badge */}
            <div className="flex items-center gap-2">
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${viewing.type==="Corporate"?"bg-[#C9A84C]/10 text-[#A07830] border border-[#C9A84C]/20":"bg-[#F5F1EB] text-[#B0A898]"}`}>
                {viewing.type || "Individual"}
              </span>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Email",        viewing.email    || "—"],
                ["Phone",        viewing.phone    || "—"],
                ["City",         viewing.city     || "—"],
                ["Member Since", viewing.joined   || "—"],
                ["Total Trips",  viewing.trips    || 0],
                ["Total Spent",  `$${(viewing.spent||0).toLocaleString()} AUD`],
              ].map(([k,v]) => (
                <div key={k} className="bg-[#FAF8F4] rounded-xl p-3">
                  <p className="text-[#B0A898] text-xs mb-0.5">{k}</p>
                  <p className="text-[#1C1611] font-medium text-xs">{v}</p>
                </div>
              ))}
            </div>

            {/* Booking history */}
            <div>
              <p className="text-xs font-semibold text-[#7A6F62] uppercase tracking-wider mb-3">Booking History</p>
              {loadingBks ? (
                <div className="space-y-2">{Array(3).fill(0).map((_,i)=><div key={i} className="h-10 bg-[#E8E0D0] rounded-xl animate-pulse" />)}</div>
              ) : custBooks.length===0 ? (
                <p className="text-[#B0A898] text-sm text-center py-6">No bookings yet</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {custBooks.map(b => (
                    <div key={b.id} className="flex items-center justify-between bg-[#FAF8F4] rounded-xl px-4 py-3 border border-[#F0EBE2]">
                      <div className="min-w-0 flex-1">
                        <p className="text-[#1C1611] text-xs font-medium truncate">{b.pickup}</p>
                        <p className="text-[#B0A898] text-xs">{b.date} · ${b.amount}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-3 flex-shrink-0 ${STATUS_BADGE[b.status]||""}`}>
                        {b.status?.replace("_"," ")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
