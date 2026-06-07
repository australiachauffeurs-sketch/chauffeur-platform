"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const RANGE_OPTIONS = [
  { label: "7 days",  value: "7"  },
  { label: "14 days", value: "14" },
  { label: "30 days", value: "30" },
];

const STATUS_COLORS: Record<string,string> = {
  completed:      "#22c55e",
  confirmed:      "#60a5fa",
  pending:        "#fbbf24",
  in_progress:    "#f97316",
  driver_assigned:"#a78bfa",
  cancelled:      "#ef4444",
};

function Skel({ h = 4, w = "full" }: { h?: number; w?: string }) {
  return <div className={`w-${w} h-${h} bg-[#E8E0D0] rounded animate-pulse`} />;
}

function KpiCard({ label, value, sub, highlight = false, live = false }: {
  label: string; value: string | number; sub?: string; highlight?: boolean; live?: boolean;
}) {
  return (
    <div className={`bg-white border rounded-2xl p-5 transition-all duration-200 ${highlight ? "border-[#C9A84C]/50 shadow-[0_4px_20px_rgba(201,168,76,0.12)]" : "border-[#E8E0D0]"}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-[#B0A898] text-xs uppercase tracking-wider font-medium">{label}</p>
        {live && <span className="flex items-center gap-1 text-xs text-green-600 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Live</span>}
      </div>
      <p className={`text-2xl font-bold mb-1 ${highlight ? "text-[#C9A84C]" : "text-[#1C1611]"}`}>{value}</p>
      {sub && <p className="text-[#B0A898] text-xs">{sub}</p>}
    </div>
  );
}

export default function AnalyticsPage() {
  const [data,     setData]     = useState<any>(null);
  const [loading,  setLoading]  = useState(true);
  const [range,    setRange]    = useState("7");
  const [liveConn, setLiveConn] = useState(false);
  const [lastTick, setLastTick] = useState<Date | null>(null);
  const channelRef = useRef<any>(null);

  const load = useCallback(async () => {
    try {
      const res  = await fetch(`/api/admin/analytics?range=${range}`);
      const json = await res.json();
      setData(json);
      setLastTick(new Date());
    } catch {}
    finally { setLoading(false); }
  }, [range]);

  // Initial load + reload when range changes
  useEffect(() => {
    setLoading(true);
    load();
  }, [load]);

  // Supabase Realtime — re-fetch analytics on any bookings or driver change
  useEffect(() => {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) return;

      const { createClient } = require("@supabase/supabase-js");
      const supabase = createClient(url, key);

      // Clean up previous channel
      if (channelRef.current) {
        try { channelRef.current.unsubscribe(); } catch {}
      }

      const channel = supabase
        .channel("analytics-realtime")
        .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, () => load())
        .on("postgres_changes", { event: "*", schema: "public", table: "drivers"  }, () => load())
        .subscribe((status: string) => setLiveConn(status === "SUBSCRIBED"));

      channelRef.current = channel;
    } catch {}

    return () => {
      try { channelRef.current?.unsubscribe(); } catch {}
    };
  }, [load]);

  const kpis  = data?.kpis  || {};
  const maxRev = Math.max(...(data?.revenueByDay?.map((d:any)=>d.revenue)||[1]), 1);
  const maxHr  = Math.max(...(data?.peakHours?.map((h:any)=>h.count)||[1]), 1);
  const totalBks = data?.bookingsByStatus?.reduce((s:number,b:any)=>s+b.count, 0) || 1;

  return (
    <div className="animate-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[#1C1611] text-xl font-bold">Analytics</h1>
            {liveConn && (
              <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
              </span>
            )}
          </div>
          {lastTick && (
            <p className="text-[#B0A898] text-xs mt-0.5">Last updated {lastTick.toLocaleTimeString("en-AU", { hour:"2-digit", minute:"2-digit", second:"2-digit" })}</p>
          )}
        </div>
        {/* Range selector */}
        <div className="flex gap-2">
          {RANGE_OPTIONS.map(o => (
            <button key={o.value} onClick={() => setRange(o.value)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                range===o.value ? "bg-[#C9A84C] text-[#1C1611]" : "bg-white border border-[#E8E0D0] text-[#7A6F62] hover:border-[#C9A84C]/40"
              }`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_,i)=>(
            <div key={i} className="bg-white border border-[#E8E0D0] rounded-2xl p-5 space-y-3">
              <Skel h={3} w="24" /><Skel h={7} /><Skel h={3} w="32" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Active Trips"      value={kpis.activeTrips ?? 0}                              sub="Right now"                      highlight live />
          <KpiCard label="Revenue Today"     value={`$${(kpis.revenueToday||0).toLocaleString()}`}      sub={`${kpis.bookingsToday||0} bookings`} />
          <KpiCard label="Revenue This Week" value={`$${(kpis.revenueWeek||0).toLocaleString()}`}       sub="Last 7 days" />
          <KpiCard label="Revenue This Month" value={`$${(kpis.revenueMonth||0).toLocaleString()}`}     sub={`${kpis.bookingsMonth||0} bookings`} highlight />
          <KpiCard label="Avg Order Value"   value={`$${(kpis.avgOrderValue||0).toLocaleString()}`}     sub="Completed trips" />
          <KpiCard label="Cancellation Rate" value={`${kpis.cancellationRate||0}%`}                     sub="This month" />
          <KpiCard label="Total Bookings"    value={(kpis.bookingsMonth||0).toLocaleString()}            sub="This month" />
          <KpiCard label="Approved Drivers"  value={data?.topDrivers?.length ? `${data.topDrivers.length}+` : "—"} sub="Active fleet" />
        </div>
      )}

      {/* Revenue chart + Status breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue by day */}
        <div className="lg:col-span-2 bg-white border border-[#E8E0D0] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[#1C1611] font-semibold">Revenue — Last {range} Days</h2>
              <p className="text-[#B0A898] text-xs mt-0.5">Completed bookings only</p>
            </div>
            <span className="text-[#C9A84C] font-bold text-sm">
              ${(data?.revenueByDay||[]).reduce((s:number,d:any)=>s+d.revenue,0).toLocaleString()} AUD
            </span>
          </div>
          {loading ? <div className="h-40 bg-[#E8E0D0] rounded-xl animate-pulse" /> : (
            <div className="flex items-end gap-1.5 h-40">
              {(data?.revenueByDay||[]).map((d:any, i:number) => {
                const pct = maxRev > 0 ? (d.revenue / maxRev) * 100 : 2;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div className="relative flex-1 w-full flex items-end">
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1C1611] text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        ${d.revenue.toLocaleString()} · {d.count} trips
                      </div>
                      <div className="w-full rounded-t-lg transition-all duration-500"
                        style={{
                          height: `${Math.max(pct, 3)}%`,
                          background: d.revenue > 0
                            ? "linear-gradient(180deg, #C9A84C, #A07830)"
                            : "#E8E0D0",
                        }} />
                    </div>
                    <span className="text-[#B0A898] text-xs truncate max-w-full px-0.5">{d.date}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Status breakdown */}
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
          <h2 className="text-[#1C1611] font-semibold mb-5">Booking Status</h2>
          {loading ? <div className="space-y-3">{Array(5).fill(0).map((_,i)=><Skel key={i} h={3}/>)}</div> : (
            <div className="space-y-3">
              {(data?.bookingsByStatus||[]).map((s:any) => (
                <div key={s.status}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#7A6F62] capitalize font-medium">{s.status.replace("_"," ")}</span>
                    <span className="text-[#1C1611] font-bold">{s.count} <span className="text-[#B0A898] font-normal">({Math.round((s.count/totalBks)*100)}%)</span></span>
                  </div>
                  <div className="h-2 bg-[#F0EBE2] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width:`${(s.count/totalBks)*100}%`, backgroundColor: STATUS_COLORS[s.status]||"#999" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Live counter */}
          {!loading && (
            <div className="mt-6 pt-4 border-t border-[#F0EBE2]">
              <div className="flex items-center justify-between">
                <span className="text-[#B0A898] text-xs">Active right now</span>
                <span className="text-2xl font-bold text-orange-500">{kpis.activeTrips || 0}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[#B0A898] text-xs">Total analysed</span>
                <span className="text-[#1C1611] font-bold text-sm">{totalBks}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Peak hours + Top pickups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Peak hours heatmap */}
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
          <h2 className="text-[#1C1611] font-semibold mb-2">Peak Booking Hours</h2>
          <p className="text-[#B0A898] text-xs mb-5">All-time booking distribution by hour</p>
          {loading ? <div className="h-16 bg-[#E8E0D0] rounded-xl animate-pulse" /> : (
            <>
              <div className="grid grid-cols-12 gap-1.5 mb-2">
                {(data?.peakHours||[]).slice(0,12).map((h:any) => (
                  <div key={h.hour} className="group relative">
                    <div className="h-8 rounded-lg transition-all duration-500 cursor-default"
                      style={{ backgroundColor: h.count>0 ? `rgba(201,168,76,${Math.min(0.15+(h.count/maxHr)*0.85, 1)})` : "#F0EBE2" }}
                      title={`${String(h.hour).padStart(2,"0")}:00 — ${h.count} bookings`} />
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1C1611] text-white text-xs rounded px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {String(h.hour).padStart(2,"0")}:00 · {h.count}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-12 gap-1.5">
                {(data?.peakHours||[]).slice(12).map((h:any) => (
                  <div key={h.hour} className="group relative">
                    <div className="h-8 rounded-lg transition-all duration-500 cursor-default"
                      style={{ backgroundColor: h.count>0 ? `rgba(201,168,76,${Math.min(0.15+(h.count/maxHr)*0.85,1)})` : "#F0EBE2" }}
                      title={`${String(h.hour).padStart(2,"0")}:00 — ${h.count} bookings`} />
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1C1611] text-white text-xs rounded px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {String(h.hour).padStart(2,"0")}:00 · {h.count}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[#B0A898] text-xs mt-2">
                <span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>11pm</span>
              </div>
              {/* Legend */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-0.5">
                  {[0.1,0.3,0.5,0.7,0.9].map(o => (
                    <div key={o} className="w-4 h-3 rounded-sm" style={{ backgroundColor:`rgba(201,168,76,${o})` }} />
                  ))}
                </div>
                <span className="text-[#B0A898] text-xs">Low → High demand</span>
              </div>
            </>
          )}
        </div>

        {/* Top pickup locations */}
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
          <h2 className="text-[#1C1611] font-semibold mb-2">Top Pickup Locations</h2>
          <p className="text-[#B0A898] text-xs mb-5">Most requested pickup spots (all time)</p>
          {loading ? <div className="space-y-3">{Array(5).fill(0).map((_,i)=><Skel key={i} h={4}/>)}</div> : (
            <div className="space-y-3">
              {(data?.topPickups||[]).map((p:any, i:number) => {
                const maxCount = data.topPickups[0]?.count || 1;
                return (
                  <div key={p.address} className="flex items-center gap-3">
                    <span className="text-[#C9A84C] font-black text-lg w-6 flex-shrink-0">{i+1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1C1611] text-xs font-medium truncate mb-1">{p.address}</p>
                      <div className="h-1.5 bg-[#F0EBE2] rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-[#C9A84C] transition-all duration-700"
                          style={{ width:`${(p.count/maxCount)*100}%` }} />
                      </div>
                    </div>
                    <span className="text-[#7A6F62] text-xs font-semibold flex-shrink-0 w-10 text-right">{p.count}</span>
                  </div>
                );
              })}
              {(!data?.topPickups || data.topPickups.length===0) && (
                <p className="text-[#B0A898] text-sm text-center py-8">No booking data yet</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Top Drivers table */}
      <div className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[#F0EBE2]">
          <div>
            <h2 className="text-[#1C1611] font-semibold">Top Drivers</h2>
            <p className="text-[#B0A898] text-xs mt-0.5">Ranked by total trips completed</p>
          </div>
        </div>
        {loading ? (
          <div className="divide-y divide-[#F0EBE2]">
            {Array(4).fill(0).map((_,i)=>(
              <div key={i} className="px-5 py-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E8E0D0] animate-pulse" />
                <div className="flex-1 space-y-1.5"><Skel h={3} w="32"/><Skel h={2} w="20"/></div>
                <Skel h={4} w="16"/>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#B0A898] text-xs uppercase tracking-wider bg-[#FAF8F4] border-b border-[#F0EBE2]">
                  <th className="text-left px-5 py-3 font-medium">Driver</th>
                  <th className="text-right px-5 py-3 font-medium">Trips</th>
                  <th className="text-right px-5 py-3 font-medium">Rating</th>
                  <th className="text-right px-5 py-3 font-medium">Revenue Generated</th>
                  <th className="px-5 py-3 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE2]">
                {(data?.topDrivers||[]).length===0 ? (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-[#B0A898]">No driver data yet</td></tr>
                ) : (data?.topDrivers||[]).map((d:any, i:number) => {
                  const maxTrips = data.topDrivers[0]?.trips || 1;
                  return (
                    <tr key={d.name} className="hover:bg-[#FAF8F4] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] font-bold text-xs flex-shrink-0">
                            {i===0 ? "🥇" : i===1 ? "🥈" : i===2 ? "🥉" : d.name[0]}
                          </div>
                          <span className="text-[#1C1611] font-semibold">{d.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right text-[#1C1611] font-bold">{d.trips||0}</td>
                      <td className="px-5 py-4 text-right">
                        <span className="text-[#C9A84C] font-bold">{d.rating>0 ? `${Number(d.rating).toFixed(1)} ★` : "—"}</span>
                      </td>
                      <td className="px-5 py-4 text-right text-[#1C1611] font-bold">${(d.revenue||0).toLocaleString()}</td>
                      <td className="px-5 py-4 w-32">
                        <div className="h-2 bg-[#F0EBE2] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] transition-all duration-700"
                            style={{ width:`${((d.trips||0)/maxTrips)*100}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer note */}
      <p className="text-center text-[#B0A898] text-xs pb-2">
        Data updates automatically via Supabase Realtime whenever a booking or driver record changes.
      </p>
    </div>
  );
}
