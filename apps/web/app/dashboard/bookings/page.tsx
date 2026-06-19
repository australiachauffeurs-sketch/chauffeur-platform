"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const STATUS_STYLE: Record<string, string> = {
  pending:     "bg-yellow-50 text-yellow-700 border border-yellow-200",
  confirmed:   "bg-blue-50 text-blue-700 border border-blue-200",
  in_progress: "bg-orange-50 text-orange-700 border border-orange-200",
  completed:   "bg-green-50 text-green-700 border border-green-200",
  cancelled:   "bg-red-50 text-red-700 border border-red-200",
};

const FILTERS = ["All", "Upcoming", "Completed", "Cancelled"];

// Demo fallback bookings shown when not logged in / no Supabase
const DEMO_BOOKINGS = [
  { id:"BK8821", pickup:"Sydney Airport T1", dropoff:"1 Martin Place, CBD", date:"28 Jun 2026", time:"06:30", vehicle:"Executive Sedan", driver:"Marcus Thompson", status:"confirmed",   amount:142.35, km:24.3, pax:2 },
  { id:"BK8820", pickup:"Crown Casino MEL",  dropoff:"Melbourne Airport T3",date:"26 Jun 2026", time:"14:00", vehicle:"Premium SUV",    driver:"Grace Nguyen",    status:"completed",   amount:188.00, km:31.2, pax:4 },
  { id:"BK8819", pickup:"Brisbane CBD",      dropoff:"BNE Airport T1",      date:"22 Jun 2026", time:"09:00", vehicle:"Luxury Sedan",   driver:"Ahmed Al-Rashid", status:"completed",   amount:214.00, km:22.7, pax:1 },
  { id:"BK8818", pickup:"Surfers Paradise",  dropoff:"GC Convention Centre", date:"18 Jun 2026", time:"18:00", vehicle:"Stretch Limo",   driver:"Robert Wilson",   status:"completed",   amount:450.00, km:12.1, pax:8 },
  { id:"BK8815", pickup:"Adelaide CBD",      dropoff:"ADL Airport",          date:"10 Jun 2026", time:"07:45", vehicle:"Executive Sedan",driver:"Marcus Thompson", status:"completed",   amount:98.50,  km:18.3, pax:1 },
  { id:"BK8810", pickup:"Perth Airport",     dropoff:"Burswood Resort",      date:"02 Jun 2026", time:"16:30", vehicle:"Premium SUV",    driver:"Lily Chen",       status:"cancelled",   amount:165.00, km:22.0, pax:3 },
];

function mapBooking(b: any) {
  const d = b.scheduled_at ? new Date(b.scheduled_at) : null;
  return {
    id:          b.id,
    pickup:      b.pickup_address  ?? b.pickup  ?? "—",
    dropoff:     b.dropoff_address ?? b.dropoff ?? "—",
    date:        d ? d.toLocaleDateString("en-AU", { day:"numeric", month:"short", year:"numeric" }) : "—",
    time:        d ? d.toLocaleTimeString("en-AU", { hour:"2-digit", minute:"2-digit" }) : "—",
    vehicle:     b.vehicle_category ?? "sedan",
    driver:      b.driver_name ?? null,
    status:      b.status ?? "pending",
    amount:      b.total_amount ?? 0,
    km:          b.distance_km ?? 0,
    pax:         b.passengers ?? 1,
    isRecurring: b.is_recurring ?? false,
  };
}

// Supabase client — only created when env vars are present
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default function BookingsPage() {
  const [bookings,   setBookings]   = useState<any[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [filter,     setFilter]     = useState("All");
  const [search,     setSearch]     = useState("");
  const [isLive,     setIsLive]     = useState(false);
  const channelRef = useRef<ReturnType<ReturnType<typeof getSupabase>["channel"]> | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/booking/list");
      const data = await res.json();
      if (data.demo) {
        setBookings(DEMO_BOOKINGS);
      } else {
        setBookings((data.bookings || []).map(mapBooking));
      }
    } catch {
      setBookings(DEMO_BOOKINGS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Supabase Realtime subscription
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return; // no env vars — skip realtime

    const channel = supabase
      .channel("bookings-realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bookings" },
        (payload) => {
          setBookings(prev =>
            prev.map(b =>
              b.id === payload.new.id ? { ...b, ...mapBooking(payload.new) } : b
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookings" },
        (payload) => {
          setBookings(prev => [mapBooking(payload.new), ...prev]);
        }
      )
      .subscribe((status) => {
        setIsLive(status === "SUBSCRIBED");
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
      setIsLive(false);
    };
  }, []);

  const filtered = bookings.filter(b => {
    const matchFilter =
      filter === "All" ||
      (filter === "Upcoming"  && ["pending","confirmed","driver_assigned","en_route","arrived","in_progress"].includes(b.status)) ||
      (filter === "Completed" && b.status === "completed") ||
      (filter === "Cancelled" && b.status === "cancelled");
    const q = search.toLowerCase();
    const matchSearch = !search ||
      b.pickup.toLowerCase().includes(q) ||
      b.dropoff.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-[#1C1611] font-bold text-xl">All Bookings</h2>
            {isLive && (
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-green-600">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Live
              </span>
            )}
          </div>
          <p className="text-[#B0A898] text-sm mt-0.5">
            {loading ? "Loading…" : `${filtered.length} booking${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
        <Link href="/book"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#1C1611] px-5 py-2.5 rounded-xl"
          style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
          + New Booking
        </Link>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by location or booking ID…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-[#E8E0D0] bg-white rounded-xl px-4 py-2.5 text-sm text-[#1C1611] placeholder:text-[#B0A898] focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/10"
        />
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === f
                  ? "text-[#1C1611] shadow-sm"
                  : "bg-white border border-[#E8E0D0] text-[#7A6F62] hover:text-[#1C1611]"
              }`}
              style={filter === f ? { background: "linear-gradient(135deg,#C9A84C,#A07830)" } : {}}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Cards */}
      <div className="space-y-3">
        {loading ? (
          Array(3).fill(0).map((_,i) => (
            <div key={i} className="bg-white border border-[#E8E0D0] rounded-2xl p-5 animate-pulse">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E8E0D0]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-[#E8E0D0] rounded w-1/3" />
                  <div className="h-3 bg-[#E8E0D0] rounded w-2/3" />
                  <div className="h-3 bg-[#E8E0D0] rounded w-1/2" />
                </div>
              </div>
            </div>
          ))
        ) : filtered.map(b => (
          <div key={b.id} className="bg-white border border-[#E8E0D0] hover:border-[#C9A84C]/40 rounded-2xl p-5 transition-all duration-200 hover:shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] flex-shrink-0"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg></div>

              {/* Route info */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="font-mono text-xs text-[#B0A898] truncate max-w-[180px]">{b.id}</span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex-shrink-0 ${STATUS_STYLE[b.status] ?? "bg-gray-50 text-gray-600 border border-gray-200"}`}>
                    {b.status.replace(/_/g," ")}
                  </span>
                  {b.isRecurring && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200 flex-shrink-0">
                      🔁 Recurring
                    </span>
                  )}
                </div>

                {/* Route — stacked so long addresses never overflow */}
                <div className="space-y-1 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#1C1611] truncate">{b.pickup}</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0 pl-0.5">
                    <span className="w-0.5 h-3 bg-[#E8E0D0] ml-[3px] flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-[#C9A84C] flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#1C1611] truncate">{b.dropoff}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#B0A898]">
                  <span>{b.date} · {b.time}</span>
                  <span className="capitalize">{b.vehicle}</span>
                  <span>{b.pax} pax</span>
                  {b.km > 0 && <span>{b.km} km</span>}
                  {b.driver && <span>· {b.driver}</span>}
                </div>
              </div>

              {/* Amount + actions */}
              <div className="flex sm:flex-col items-center sm:items-end gap-3 flex-shrink-0 pt-1">
                <span className="font-bold text-[#1C1611] text-lg whitespace-nowrap">${b.amount.toFixed(2)}</span>
                <div className="flex flex-wrap gap-2 justify-end">
                  {["driver_assigned","en_route","arrived","in_progress"].includes(b.status) && (
                    <Link href={`/dashboard/bookings/${b.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 border border-green-300 bg-green-50 px-3 py-1.5 rounded-lg hover:bg-green-500 hover:text-white hover:border-green-500 transition-all whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                      Track Live
                    </Link>
                  )}
                  <Link href={`/dashboard/bookings/${b.id}`}
                    className="text-xs font-semibold border border-[#C9A84C] text-[#C9A84C] px-3 py-1.5 rounded-lg hover:bg-[#C9A84C] hover:text-[#1C1611] transition-all whitespace-nowrap">
                    View
                  </Link>
                  {b.status === "completed" && (
                    <Link href={`/book?rebook=${b.id}`}
                      className="text-xs font-semibold bg-[#F5F1EB] text-[#7A6F62] px-3 py-1.5 rounded-lg hover:bg-[#E8E0D0] transition-all whitespace-nowrap">
                      Rebook
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E0D0]">
            <span className="block mb-4 text-[#C9A84C]"><svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg></span>
            <h3 className="text-[#1C1611] font-bold text-lg mb-2">No bookings found</h3>
            <p className="text-[#B0A898] text-sm mb-6">
              {filter !== "All" ? `No ${filter.toLowerCase()} bookings yet.` : "You haven't made any bookings yet."}
            </p>
            <Link href="/book"
              className="inline-block text-sm font-bold text-[#1C1611] px-6 py-3 rounded-xl"
              style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
              Book Your First Ride
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
