"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const STATUSES = ["all","pending","confirmed","in_progress","completed","cancelled"];
const STATUS_BADGE: Record<string, string> = {
  pending:        "bg-yellow-50 text-yellow-700 border border-yellow-200",
  confirmed:      "bg-blue-50 text-blue-700 border border-blue-200",
  in_progress:    "bg-orange-50 text-orange-700 border border-orange-200",
  driver_assigned:"bg-purple-50 text-purple-700 border border-purple-200",
  completed:      "bg-green-50 text-green-700 border border-green-200",
  cancelled:      "bg-red-50 text-red-700 border border-red-200",
};

export default function BookingsPage() {
  const [bookings,  setBookings]  = useState<any[]>([]);
  const [total,     setTotal]     = useState(0);
  const [filter,    setFilter]    = useState("all");
  const [search,    setSearch]    = useState("");
  const [loading,   setLoading]   = useState(true);
  const [sortBy,    setSortBy]    = useState<"date"|"amount">("date");
  const [sortDir,   setSortDir]   = useState<"asc"|"desc">("desc");
  const [liveConn,  setLiveConn]  = useState(false);
  const channelRef = useRef<any>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: filter, search, limit: "50" });
      const res    = await fetch(`/api/admin/bookings?${params}`);
      const data   = await res.json();
      setBookings(data.bookings || []);
      setTotal(data.total || 0);
    } catch { /* keep existing */ }
    finally { setLoading(false); }
  }, [filter, search]);

  useEffect(() => { load(); }, [load]);

  // Supabase Realtime — subscribe once on mount, re-fetch on any bookings change
  useEffect(() => {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) return;

      const { createClient } = require("@supabase/supabase-js");
      const supabase = createClient(url, key);

      const channel = supabase
        .channel("bookings-realtime")
        .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, () => load())
        .subscribe((status: string) => {
          setLiveConn(status === "SUBSCRIBED");
        });

      channelRef.current = channel;
    } catch {
      // Realtime unavailable — list still refreshes on filter/search changes
    }

    return () => {
      if (channelRef.current) {
        try { channelRef.current.unsubscribe(); } catch {}
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sorted = [...bookings].sort((a, b) => {
    if (sortBy === "amount") {
      return sortDir === "desc" ? (b.amount||0) - (a.amount||0) : (a.amount||0) - (b.amount||0);
    }
    return sortDir === "desc"
      ? new Date(b.date||0).getTime() - new Date(a.date||0).getTime()
      : new Date(a.date||0).getTime() - new Date(b.date||0).getTime();
  });

  const toggleSort = (col: "date"|"amount") => {
    if (sortBy === col) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortBy(col); setSortDir("desc"); }
  };

  const totalRevenue = bookings.filter(b => b.status !== "cancelled").reduce((s,b) => s + (b.amount||0), 0);

  const markPaid = async (bookingId: string) => {
    await fetch("/api/admin/booking/mark-paid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, paymentMethod: "cash" }),
    });
    load();
  };

  return (
    <div className="animate-in space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[#1C1611] text-xl font-bold">All Bookings</h1>
            {liveConn && (
              <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
              </span>
            )}
          </div>
          <p className="text-[#B0A898] text-sm mt-0.5">{total} results · ${totalRevenue.toLocaleString()} revenue</p>
        </div>
        <button className="btn-gold text-sm">+ New Booking</button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search customer or booking ID…" value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-white border border-[#E8E0D0] text-[#1C1611] placeholder:text-[#B0A898] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20" />
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                filter===s
                  ? "bg-[#C9A84C] text-[#1C1611]"
                  : "bg-white border border-[#E8E0D0] text-[#7A6F62] hover:text-[#1C1611] hover:border-[#C9A84C]/40"
              }`}>
              {s.replace("_"," ")}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F0EBE2] text-[#B0A898] text-xs uppercase tracking-wider bg-[#FAF8F4]">
                {["ID","Customer","Route","Vehicle","Driver","Status","Payment"].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                ))}
                {(["Date","Amount"] as const).map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium cursor-pointer hover:text-[#C9A84C]"
                    onClick={() => toggleSort(h.toLowerCase() as "date"|"amount")}>
                    {h} {sortBy===h.toLowerCase() ? (sortDir==="desc"?"↓":"↑") : "⇅"}
                  </th>
                ))}
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE2]">
              {loading ? Array(5).fill(0).map((_,i) => (
                <tr key={i}><td colSpan={10} className="px-5 py-4"><div className="h-4 bg-[#E8E0D0] rounded animate-pulse" /></td></tr>
              )) : sorted.length === 0 ? (
                <tr><td colSpan={10} className="px-5 py-12 text-center text-[#B0A898]">No bookings found</td></tr>
              ) : sorted.map(b => (
                <tr key={b.id} className="table-row transition-colors duration-150">
                  <td className="px-5 py-3.5 font-mono text-[#B0A898] text-xs">{b.id}</td>
                  <td className="px-5 py-3.5 text-[#1C1611] font-medium">{b.customer}</td>
                  <td className="px-5 py-3.5">
                    <p className="text-[#7A6F62] text-xs truncate max-w-[140px]">{b.pickup}</p>
                    <p className="text-[#B0A898] text-xs truncate max-w-[140px]">→ {b.dropoff}</p>
                  </td>
                  <td className="px-5 py-3.5 text-[#7A6F62] text-xs">{b.vehicle}</td>
                  <td className="px-5 py-3.5 text-[#7A6F62] text-xs">{b.driver}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_BADGE[b.status]||""}`}>
                      {b.status.replace("_"," ")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[#B0A898] text-xs whitespace-nowrap">{b.date}</td>
                  <td className="px-5 py-3.5 text-[#1C1611] font-bold">${b.amount}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-1.5">
                      {b.payment_method && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF8F4] border border-[#E8E0D0] text-[#7A6F62] w-fit capitalize">
                          {b.payment_method.replace("_", " ")}
                        </span>
                      )}
                      {b.payment_status !== "paid" ? (
                        <button
                          onClick={() => markPaid(b.id)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-700 hover:bg-green-500/20 transition-colors font-semibold w-fit"
                        >
                          Mark Paid
                        </button>
                      ) : (
                        <span className="text-xs text-green-600 font-semibold">✓ Paid</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-[#C9A84C] text-xs hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
