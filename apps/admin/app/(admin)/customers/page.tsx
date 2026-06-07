"use client";
import { useState, useEffect, useCallback } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search,    setSearch]    = useState("");
  const [loading,   setLoading]   = useState(true);
  const [total,     setTotal]     = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/admin/customers?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setCustomers(data.customers || []);
      setTotal(data.total || 0);
    } catch { /* keep existing */ }
    finally { setLoading(false); }
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const exportCSV = () => {
    const headers = ["Name","Email","Phone","City","Type","Trips","Total Spent","Joined"];
    const rows    = customers.map(c => [c.name,c.email,c.phone,c.city,c.type,c.trips,`$${c.spent}`,c.joined]);
    const csv     = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob    = new Blob([csv], { type:"text/csv" });
    const url     = URL.createObjectURL(blob);
    const a       = document.createElement("a");
    a.href = url; a.download = "elite-customers.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const corporate = customers.filter(c => c.type === "Corporate").length;

  return (
    <div className="animate-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1C1611] text-xl font-bold">Customers</h1>
          <p className="text-[#B0A898] text-sm mt-0.5">{total} total · {corporate} corporate accounts</p>
        </div>
        <button onClick={exportCSV} className="btn-gold text-sm">Export CSV</button>
      </div>

      <input type="text" placeholder="Search by name or email…" value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full bg-white border border-[#E8E0D0] text-[#1C1611] placeholder:text-[#B0A898] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20" />

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
              )) : customers.length === 0 ? (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-[#B0A898]">No customers found</td></tr>
              ) : customers.map(c => (
                <tr key={c.id} className="table-row transition-colors duration-150">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] font-bold text-xs flex-shrink-0">{c.name[0]}</div>
                      <span className="text-[#1C1611] font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[#7A6F62] text-xs">{c.email}</p>
                    <p className="text-[#B0A898] text-xs">{c.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-[#7A6F62] text-xs">{c.city}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.type==="Corporate"?"bg-[#C9A84C]/10 text-[#A07830] border border-[#C9A84C]/20":"bg-[#F5F1EB] text-[#B0A898]"}`}>{c.type}</span>
                  </td>
                  <td className="px-5 py-4 text-[#1C1611] font-bold">{c.trips}</td>
                  <td className="px-5 py-4 text-[#C9A84C] font-bold">${c.spent?.toLocaleString()}</td>
                  <td className="px-5 py-4 text-[#B0A898] text-xs">{c.joined}</td>
                  <td className="px-5 py-4"><button className="text-[#C9A84C] text-xs hover:underline">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
