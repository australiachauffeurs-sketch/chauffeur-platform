"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const STATUS_BADGE: Record<string, string> = {
  pending:        "bg-yellow-50 text-yellow-700 border border-yellow-200",
  confirmed:      "bg-blue-50 text-blue-700 border border-blue-200",
  in_progress:    "bg-orange-50 text-orange-700 border border-orange-200",
  driver_assigned:"bg-purple-50 text-purple-700 border border-purple-200",
  completed:      "bg-green-50 text-green-700 border border-green-200",
  cancelled:      "bg-red-50 text-red-700 border border-red-200",
};

function Skel({ w = "full", h = 4 }: { w?: string; h?: number }) {
  return <div className={`w-${w} h-${h} bg-[#E8E0D0] rounded animate-pulse`} />;
}

export default function DashboardPage() {
  const [data,      setData]      = useState<any>(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");
  const [liveConn,  setLiveConn]  = useState(false);
  const channelRef = useRef<any>(null);

  const load = async () => {
    setLoading(true); setError("");
    try {
      const res  = await fetch("/api/admin/stats");
      const json = await res.json();
      setData(json.stats);
    } catch { setError("Failed to load stats."); }
    finally  { setLoading(false); }
  };

  useEffect(() => {
    load();

    // Supabase Realtime subscription
    try {
      const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) return;

      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(url, key);

      const channel = supabase
        .channel("dashboard-realtime")
        .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, () => load())
        .on("postgres_changes", { event: "UPDATE", schema: "public", table: "drivers" }, () => load())
        .subscribe((status: string) => {
          setLiveConn(status === "SUBSCRIBED");
        });

      channelRef.current = channel;
    } catch {
      // Realtime unavailable — page still works via manual refresh
    }

    return () => {
      if (channelRef.current) {
        try { channelRef.current.unsubscribe(); } catch {}
      }
    };
  }, []);

  const stats = data ? [
    { label:"Total Bookings",  value: data.totalBookings?.toLocaleString() || "0", change:"+12%",  positive:true },
    { label:"Active Trips",    value: String(data.activeTrips || 0),               change:"Live",  positive:true },
    { label:"Revenue (Month)", value:`$${(data.revenue||0).toLocaleString()}`,     change:"+8.4%", positive:true },
    { label:"Total Drivers",   value: String(data.totalDrivers || 0),              change:"Active",positive:true },
    { label:"Completion Rate", value:`${data.completionRate||0}%`,                 change:"+0.3%", positive:true },
    { label:"Avg Rating",      value:`${data.avgRating||4.9}★`,                    change:"Excellent",positive:true },
  ] : [];

  return (
    <div className="animate-in space-y-6">
      {/* Header with Live indicator */}
      <div className="flex items-center gap-3">
        <h1 className="text-[#1C1611] text-xl font-bold">Dashboard</h1>
        {liveConn && (
          <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </span>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex items-center justify-between text-sm">
          {error} <button onClick={load} className="underline">Retry</button>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? Array(6).fill(0).map((_, i) => (
          <div key={i} className="stat-card space-y-3">
            <Skel w="10" h={8} /><Skel h={6} /><Skel w="24" h={3} />
          </div>
        )) : stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.positive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {s.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#1C1611] mb-1">{s.value}</p>
            <p className="text-[#B0A898] text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[#1C1611] font-semibold">Revenue Overview</h2>
            <p className="text-[#B0A898] text-xs mt-0.5">Last 30 days</p>
          </div>
          <span className="text-[#C9A84C] text-sm font-semibold">
            ${(data?.revenue || 0).toLocaleString()} AUD
          </span>
        </div>
        {loading ? (
          <div className="flex items-end gap-1.5 h-32">
            {Array(30).fill(0).map((_, i) => (
              <div key={i} className="flex-1 rounded-t bg-[#E8E0D0] animate-pulse" style={{ height: `${30 + Math.random() * 50}%` }} />
            ))}
          </div>
        ) : (() => {
          const daily: { date: string; amount: number }[] = data?.dailyRevenue || [];
          const maxVal = Math.max(...daily.map(d => d.amount), 1);
          const labels = daily.length === 30
            ? [daily[0].date, daily[14].date, daily[29].date].map(d =>
                new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "short" }))
            : ["—", "—", "—"];
          return (
            <>
              <div className="flex items-end gap-1.5 h-32">
                {daily.map((d, i) => {
                  const pct = Math.max((d.amount / maxVal) * 100, 2);
                  return (
                    <div key={i} className="flex-1 rounded-t transition-all duration-300 hover:opacity-80 group relative"
                      style={{ height: `${pct}%`, background: d.amount > 0 ? "linear-gradient(180deg,#C9A84C,#A07830)" : "#E8E0D0" }}>
                      {d.amount > 0 && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-[#1C1611] text-white text-xs rounded px-1.5 py-0.5 whitespace-nowrap z-10">
                          ${d.amount.toLocaleString()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[#B0A898] text-xs mt-2">
                <span>{labels[0]}</span><span>{labels[1]}</span><span>{labels[2]}</span>
              </div>
            </>
          );
        })()}
      </div>

      {/* Recent bookings */}
      <div className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[#F0EBE2]">
          <h2 className="text-[#1C1611] font-semibold">Recent Bookings</h2>
          <Link href="/bookings" className="text-[#C9A84C] text-xs font-medium hover:underline">View all →</Link>
        </div>
        {loading ? (
          <div className="divide-y divide-[#F0EBE2]">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="px-5 py-4 flex items-center gap-4">
                <Skel w="16" h={3} /><div className="flex-1 space-y-2"><Skel h={3} /><Skel w="32" h={2} /></div>
                <Skel w="16" h={5} />
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-[#F0EBE2]">
            {(data?.recentBookings || []).map((b: any) => (
              <div key={b.id} className="table-row px-5 py-3.5 flex items-center gap-4 transition-colors duration-150">
                <span className="font-mono text-xs text-[#B0A898] w-16 flex-shrink-0">{b.id}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1C1611] text-sm font-medium truncate">{b.customer}</p>
                  <p className="text-[#B0A898] text-xs truncate">{b.route}</p>
                </div>
                <span className="text-[#7A6F62] text-xs hidden sm:block w-16 flex-shrink-0">{b.vehicle}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${STATUS_BADGE[b.status]||""}`}>
                  {b.status.replace("_"," ")}
                </span>
                <span className="text-[#1C1611] font-bold text-sm w-16 text-right flex-shrink-0">${b.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue by city */}
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-5">
          <h2 className="text-[#1C1611] font-semibold mb-4">Revenue by City</h2>
          {loading ? (
            <div className="space-y-3">{Array(5).fill(0).map((_,i) => <Skel key={i} h={3} />)}</div>
          ) : (data?.revenueByCity||[]).map((c: any) => (
            <div key={c.city} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#1C1611]">{c.city}</span>
                <span className="text-[#7A6F62]">${c.revenue.toLocaleString()}</span>
              </div>
              <div className="h-1.5 bg-[#E8E0D0] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width:`${c.pct}%`, background:"linear-gradient(90deg,#C9A84C,#E8C97A)" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Active drivers */}
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-5">
          <h2 className="text-[#1C1611] font-semibold mb-4">Active Drivers</h2>
          {loading ? (
            <div className="space-y-3">{Array(4).fill(0).map((_,i) => <div key={i} className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-[#E8E0D0] animate-pulse" /><div className="flex-1 space-y-1"><Skel h={3}/><Skel w="24" h={2}/></div></div>)}</div>
          ) : (data?.activeDrivers||[]).map((d: any) => (
            <div key={d.name} className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] font-bold text-xs flex-shrink-0">{d.name[0]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[#1C1611] text-sm font-medium truncate">{d.name}</p>
                <p className="text-[#B0A898] text-xs truncate">{d.vehicle}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-xs font-medium ${d.status==="on_trip"?"text-orange-600":"text-green-600"}`}>{d.status.replace("_"," ")}</p>
                <p className="text-[#B0A898] text-xs">{d.rating}★</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
