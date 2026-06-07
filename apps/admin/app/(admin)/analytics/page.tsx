"use client";
import { useState, useEffect } from "react";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/analytics").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <div className="p-8 text-white">Loading analytics…</div>;

  const maxRevenue = Math.max(...(data.revenueByDay?.map((d: any) => d.revenue) || [1]));
  const maxHour = Math.max(...(data.peakHours?.map((h: any) => h.count) || [1]));

  return (
    <div className="p-8 min-h-screen bg-[#0a0a0f] text-white">
      <h1 className="text-2xl font-bold text-[#C9A84C] mb-8">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue chart */}
        <div className="bg-[#111827] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-semibold mb-4">Revenue — Last 7 Days</h2>
          <div className="flex items-end gap-3 h-40">
            {data.revenueByDay?.map((d: any) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[#C9A84C] text-xs font-bold">${d.revenue > 0 ? (d.revenue/1000).toFixed(1)+"k" : "0"}</span>
                <div className="w-full rounded-t-lg bg-[#C9A84C]/80 transition-all" style={{ height: `${(d.revenue / maxRevenue) * 100}%`, minHeight: d.revenue > 0 ? "4px" : "2px" }} />
                <span className="text-gray-500 text-xs">{d.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings by status */}
        <div className="bg-[#111827] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-semibold mb-4">Bookings by Status</h2>
          <div className="space-y-3">
            {data.bookingsByStatus?.map((s: any) => {
              const colors: Record<string, string> = { completed:"#22c55e", confirmed:"#60a5fa", pending:"#fbbf24", cancelled:"#ef4444", driver_assigned:"#a78bfa" };
              const total = data.bookingsByStatus.reduce((a: number, x: any) => a + x.count, 0);
              return (
                <div key={s.status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 capitalize">{s.status.replace("_"," ")}</span>
                    <span className="text-white font-bold">{s.count}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${(s.count/total)*100}%`, backgroundColor: colors[s.status] || "#999" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Peak hours */}
        <div className="bg-[#111827] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-semibold mb-4">Peak Booking Hours</h2>
          <div className="grid grid-cols-12 gap-1">
            {data.peakHours?.map((h: any) => (
              <div key={h.hour} className="flex flex-col items-center gap-1">
                <div className="w-full h-8 rounded transition-all" style={{ backgroundColor: `rgba(201,168,76,${h.count > 0 ? (h.count/maxHour)*0.9+0.1 : 0.05})` }} title={`${h.hour}:00 — ${h.count} bookings`} />
                {h.hour % 6 === 0 && <span className="text-gray-600 text-xs">{h.hour}h</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Top pickups */}
        <div className="bg-[#111827] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-semibold mb-4">Top Pickup Locations</h2>
          <div className="space-y-3">
            {data.topPickups?.map((p: any, i: number) => (
              <div key={p.address} className="flex items-center gap-3">
                <span className="text-[#C9A84C] font-black text-lg w-6">{i+1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{p.address}</p>
                  <p className="text-gray-500 text-xs">{p.count} bookings</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top drivers */}
      <div className="bg-[#111827] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5"><h2 className="text-white font-semibold">Top Drivers</h2></div>
        <table className="w-full text-sm">
          <thead><tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
            <th className="px-6 py-3 text-left">Driver</th>
            <th className="px-6 py-3 text-right">Trips</th>
            <th className="px-6 py-3 text-right">Rating</th>
            <th className="px-6 py-3 text-right">Revenue</th>
          </tr></thead>
          <tbody>
            {data.topDrivers?.map((d: any) => (
              <tr key={d.name} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-6 py-4 text-white font-semibold">{d.name}</td>
                <td className="px-6 py-4 text-right text-gray-400">{d.trips}</td>
                <td className="px-6 py-4 text-right text-[#C9A84C]">{d.rating} ★</td>
                <td className="px-6 py-4 text-right text-white font-bold">${d.revenue?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
