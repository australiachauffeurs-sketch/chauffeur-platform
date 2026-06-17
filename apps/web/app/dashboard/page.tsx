"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────
   STATUS STYLES
   ───────────────────────────────────────────────────────────────────────── */
const STATUS_STYLE: Record<string, string> = {
  pending:         "bg-amber-50 text-amber-700 border border-amber-200",
  confirmed:       "bg-blue-50 text-blue-700 border border-blue-200",
  driver_assigned: "bg-violet-50 text-violet-700 border border-violet-200",
  en_route:        "bg-cyan-50 text-cyan-700 border border-cyan-200",
  arrived:         "bg-teal-50 text-teal-700 border border-teal-200",
  in_progress:     "bg-orange-50 text-orange-700 border border-orange-200",
  completed:       "bg-emerald-50 text-emerald-700 border border-emerald-200",
  cancelled:       "bg-red-50 text-red-700 border border-red-200",
};

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATED COUNTER
   ───────────────────────────────────────────────────────────────────────── */
function Counter({ to, prefix = "", suffix = "", decimals = 0 }: {
  to: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!to) { setVal(0); return; }
    const start    = Date.now();
    const duration = 1400;
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [to]);
  return <>{prefix}{val.toFixed(decimals)}{suffix}</>;
}

/* ─────────────────────────────────────────────────────────────────────────
   COUNTDOWN TIMER
   ───────────────────────────────────────────────────────────────────────── */
function Countdown({ to }: { to: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, new Date(to).getTime() - now);
  const d  = Math.floor(diff / 86400000);
  const h  = Math.floor((diff % 86400000) / 3600000);
  const m  = Math.floor((diff % 3600000) / 60000);
  const s  = Math.floor((diff % 60000) / 1000);

  const box = (n: number, lbl: string) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3.5 py-2.5 min-w-[56px] border border-white/5">
        <span className="text-white text-2xl font-bold tabular-nums tracking-tight block text-center">
          {String(n).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[9px] text-white/40 uppercase tracking-[0.15em] mt-1.5 font-semibold">{lbl}</span>
    </div>
  );

  return (
    <div className="flex gap-2.5">
      {d > 0 && box(d, "days")}
      {box(h, "hrs")}
      {box(m, "min")}
      {box(s, "sec")}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   GREETING
   ───────────────────────────────────────────────────────────────────────── */
function greeting(name: string) {
  const h = new Date().getHours();
  const time = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  return `${time}, ${name}`;
}

/* greetingEmoji removed — no emojis in UI */

/* ─────────────────────────────────────────────────────────────────────────
   LOYALTY TIER
   ───────────────────────────────────────────────────────────────────────── */
const TIERS = [
  { name: "Silver",   min:  0,  color: "#A0A0A0", next: 5 },
  { name: "Gold",     min:  5,  color: "#C9A84C", next: 15 },
  { name: "Platinum", min: 15,  color: "#B5C5D9", next: 30 },
  { name: "Black",    min: 30,  color: "#1C1611", next: Infinity },
];

/* ═════════════════════════════════════════════════════════════════════════
   DASHBOARD
   ═════════════════════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [user,     setUser]     = useState<any>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  /* ── Load data ─────────────────────────────────────────────────────────── */
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [bRes, uRes] = await Promise.all([
        fetch("/api/booking/list?limit=20"),
        fetch("/api/user/me"),
      ]);
      const bData = await bRes.json();
      const uData = await uRes.json();
      setBookings(bData.bookings || []);
      setUser(uData.user);
    } catch {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  /* ── Derived stats ─────────────────────────────────────────────────────── */
  const stats = useMemo(() => {
    const upcoming  = bookings.filter(b => ["pending","confirmed","driver_assigned","en_route","arrived","in_progress"].includes(b.status));
    const completed = bookings.filter(b => b.status === "completed");
    const spent     = bookings.reduce((s, b) => s + (b.total_amount || b.amount || 0), 0);
    const now = Date.now();
    const nextRide  = upcoming
      .filter(b => new Date(b.scheduled_at || b.date).getTime() > now)
      .sort((a, b) =>
        new Date(a.scheduled_at || a.date).getTime() - new Date(b.scheduled_at || b.date).getTime()
      )[0];

    return { total: bookings.length, upcoming: upcoming.length, completed: completed.length, spent, rating: 4.9, nextRide };
  }, [bookings]);

  /* ── Loyalty tier progress ─────────────────────────────────────────────── */
  const tier = useMemo(() => {
    const trips = stats.completed;
    const current = [...TIERS].reverse().find(t => trips >= t.min) ?? TIERS[0]!;
    const idx     = TIERS.indexOf(current);
    const next    = TIERS[idx + 1] ?? null;
    const progress = next ? Math.min(100, ((trips - current.min) / (next.min - current.min)) * 100) : 100;
    return { current, next, progress, trips };
  }, [stats.completed]);

  /* ── Name ──────────────────────────────────────────────────────────────── */
  const firstName = user?.user_metadata?.firstName
    ?? user?.firstName
    ?? user?.email?.split("@")[0]
    ?? "there";

  /* ── Loading skeleton ──────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="space-y-6">
        {[1,2,3].map(i => (
          <div key={i} className="animate-pulse">
            <div className={`bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl ${i === 1 ? "h-48" : i === 2 ? "h-32" : "h-64"}`} />
          </div>
        ))}
      </div>
    );
  }

  /* ── Render ────────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-5 sm:space-y-7 pb-10">

      {/* ── ERROR BANNER ─────────────────────────────────────────────── */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 flex items-center justify-between text-sm animate-slideDown">
          {error}
          <button onClick={load} className="font-semibold underline ml-4">Try Again</button>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
         HERO SECTION — GREETING + AMBIENT DESIGN
         ═════════════════════════════════════════════════════════════════ */}
      <div className="relative rounded-2xl sm:rounded-[28px] overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0F0F0F 0%,#1A1612 40%,#0A0A0A 100%)" }}>

        {/* Animated ambient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-64 sm:w-96 h-64 sm:h-96 rounded-full animate-float-slow"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 60%)" }} />
          <div className="absolute -bottom-32 -left-32 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full animate-float-slow-reverse"
            style={{ background: "radial-gradient(circle, rgba(232,201,122,0.12) 0%, transparent 60%)" }} />

          {/* Subtle car silhouette — removed decorative emoji */}
        </div>

        <div className="relative z-10 p-5 sm:p-7 lg:p-10 grid lg:grid-cols-[1fr_auto] gap-5 sm:gap-8 items-center">
          {/* Greeting */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <p className="text-[#C9A84C]/80 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                {new Date().toLocaleDateString("en-AU", { weekday:"long", day:"numeric", month:"long" })}
              </p>
            </div>
            <h1 className="text-white text-2xl sm:text-3xl lg:text-[42px] font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Playfair Display',serif" }}>
              {greeting(firstName)}
            </h1>
            <p className="text-gray-400 text-[13px] sm:text-[15px] leading-relaxed max-w-lg">
              {stats.upcoming > 0
                ? <>You have <span className="text-[#E8C97A] font-semibold">{stats.upcoming} upcoming ride{stats.upcoming > 1 ? "s" : ""}</span> scheduled.</>
                : "Your personal chauffeur is just one tap away."}
            </p>

            {/* Mini stats row inside hero */}
            <div className="flex items-center gap-3 sm:gap-5 pt-2 sm:pt-3 flex-wrap">
              {[
                { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>, val: String(stats.total), lbl: "Rides" },
                { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>, val: "4.9", lbl: "Rating" },
                { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"/></svg>, val: tier.current.name, lbl: "Tier", color: tier.current.color },
              ].map((s, i) => (
                <div key={s.lbl} className="flex items-center gap-2">
                  {i > 0 && <div className="w-px h-6 sm:h-8 bg-white/10 mr-1 hidden sm:block" />}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C]">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-white text-xs sm:text-sm font-bold tabular-nums" style={s.color ? { color: s.color } : {}}>{s.val}</p>
                    <p className="text-gray-500 text-[9px] sm:text-[10px]">{s.lbl}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick book CTA */}
          <div className="flex flex-col items-start lg:items-center gap-3 sm:gap-4">
            <Link href="/book"
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap overflow-hidden w-full lg:w-auto text-center"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-lg">+</span>
              <span className="relative">Book a Ride</span>
            </Link>
            <p className="text-gray-600 text-[11px] hidden lg:block">Premium vehicles available 24/7</p>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
         NEXT RIDE CARD (only if upcoming)
         ═════════════════════════════════════════════════════════════════ */}
      {stats.nextRide && (
        <div className="relative rounded-[28px] overflow-hidden group hover:shadow-2xl hover:shadow-[#C9A84C]/5 transition-shadow duration-500"
          style={{ background: "linear-gradient(160deg,#0A0A0A 0%,#17140F 40%,#1E1812 70%,#0A0A0A 100%)", border: "1px solid rgba(201,168,76,0.15)" }}>

          {/* Glow line top */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }} />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-15 animate-pulse-slow"
              style={{ background: "radial-gradient(circle,#C9A84C,transparent 70%)" }} />
          </div>

          <div className="relative z-10 p-5 sm:p-7 lg:p-8 grid md:grid-cols-[1fr_auto] gap-5 sm:gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <p className="text-[#C9A84C] text-[11px] font-bold tracking-[0.25em] uppercase">
                  Your Next Ride
                </p>
              </div>

              {/* Route visualization */}
              <div className="flex items-start gap-4 mb-5">
                <div className="flex flex-col items-center pt-1">
                  <div className="w-3 h-3 rounded-full bg-[#C9A84C] border-2 border-[#E8C97A] shadow-lg shadow-[#C9A84C]/30" />
                  <div className="w-px h-10 bg-gradient-to-b from-[#C9A84C] to-[#C9A84C]/20 my-1" />
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-400" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Pickup</p>
                    <p className="text-white text-sm sm:text-lg font-bold leading-tight">{stats.nextRide.pickup_address || stats.nextRide.pickup}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Drop-off</p>
                    <p className="text-white text-sm sm:text-lg font-bold leading-tight">{stats.nextRide.dropoff_address || stats.nextRide.dropoff}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm mb-4 sm:mb-5">
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-300">
                  {stats.nextRide.scheduled_at
                    ? new Date(stats.nextRide.scheduled_at).toLocaleString("en-AU", { dateStyle:"medium", timeStyle:"short" })
                    : stats.nextRide.date}
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 capitalize">
                  {(stats.nextRide.vehicle_category || stats.nextRide.vehicle || "sedan").replace("_"," ")}
                </span>
                <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${STATUS_STYLE[stats.nextRide.status] || "bg-gray-100 text-gray-600"}`}>
                  {stats.nextRide.status.replace("_"," ").toUpperCase()}
                </span>
              </div>

              <Link href={`/dashboard/bookings/${stats.nextRide.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:gap-3.5 group/btn"
                style={{ background: "linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))", border: "1px solid rgba(201,168,76,0.3)", color: "#E8C97A" }}>
                View Details & Track <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Countdown */}
            {stats.nextRide.scheduled_at && (
              <div className="flex flex-col items-center md:items-end gap-4">
                <p className="text-[10px] text-[#C9A84C]/70 uppercase tracking-[0.2em] font-bold">
                  Departing in
                </p>
                <Countdown to={stats.nextRide.scheduled_at} />
                <div className="w-20 h-20 rounded-full bg-[#C9A84C]/5 border border-[#C9A84C]/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
         STATS GRID — Glass Cards with Hover Effects
         ═════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[
          {
            label: "Total Trips",
            value: <Counter to={stats.total} />,
            icon:  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>,
            sub:   "All time",
            gradient: "from-[#FFFBF0] via-[#FFF8E6] to-[#FFF3D6]",
            ring: "ring-[#C9A84C]/20",
            accentFrom: "#C9A84C",
            accentTo: "#E8C97A",
            textColor: "text-[#8B6914]",
          },
          {
            label: "Upcoming",
            value: <Counter to={stats.upcoming} />,
            icon:  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>,
            sub:   "Scheduled",
            gradient: "from-blue-50 via-indigo-50 to-violet-50",
            ring: "ring-blue-200/50",
            accentFrom: "#3B82F6",
            accentTo: "#818CF8",
            textColor: "text-blue-700",
          },
          {
            label: "Total Spent",
            value: <Counter to={stats.spent} prefix="$" decimals={0} />,
            icon:  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
            sub:   "AUD inc. GST",
            gradient: "from-emerald-50 via-green-50 to-teal-50",
            ring: "ring-emerald-200/50",
            accentFrom: "#10B981",
            accentTo: "#34D399",
            textColor: "text-emerald-700",
          },
          {
            label: "Your Rating",
            value: <><Counter to={stats.rating} decimals={1} /><span className="text-xl ml-0.5">★</span></>,
            icon:  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>,
            sub:   "Driver feedback",
            gradient: "from-amber-50 via-yellow-50 to-orange-50",
            ring: "ring-amber-200/50",
            accentFrom: "#F59E0B",
            accentTo: "#FBBF24",
            textColor: "text-amber-700",
          },
        ].map((s, i) => (
          <div key={s.label}
            onMouseEnter={() => setHoveredStat(i)}
            onMouseLeave={() => setHoveredStat(null)}
            className={`relative overflow-hidden rounded-[22px] p-5 bg-gradient-to-br ${s.gradient} ring-1 ${s.ring} transition-all duration-300 cursor-default ${hoveredStat === i ? "scale-[1.04] shadow-xl -translate-y-1" : "shadow-sm hover:shadow-md"}`}
            style={{ animationDelay: `${i * 100}ms` }}>

            {/* Accent stripe top */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[22px]"
              style={{ background: `linear-gradient(90deg, ${s.accentFrom}, ${s.accentTo})` }} />

            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300"
                style={{ background: `linear-gradient(135deg, ${s.accentFrom}15, ${s.accentTo}10)`, transform: hoveredStat === i ? "rotate(12deg) scale(1.1)" : "" }}>
                {s.icon}
              </div>
              <span className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold bg-white/60 px-2 py-0.5 rounded-full">{s.sub}</span>
            </div>
            <p className={`text-2xl sm:text-[32px] font-extrabold ${s.textColor} tabular-nums leading-tight tracking-tight`}>{s.value}</p>
            <p className="text-gray-500 text-[11px] sm:text-xs mt-1 sm:mt-1.5 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ═════════════════════════════════════════════════════════════════
         QUICK BOOK ACTIONS — Sleek Cards
         ═════════════════════════════════════════════════════════════════ */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#1C1611] text-lg sm:text-xl" style={{ fontFamily: "'Playfair Display',serif" }}>
            Quick Book
          </h2>
          <Link href="/book" className="text-[#C9A84C] text-xs sm:text-sm font-semibold hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon:<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>, label:"Airport Transfer", sub:"From $89",  href:"/book?type=airport_transfer", bg:"linear-gradient(145deg,#F0F7FF,#E0EFFF)", border:"#BFDBFE" },
            { icon:<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>, label:"Corporate",        sub:"From $75",  href:"/book?type=corporate",        bg:"linear-gradient(145deg,#F5F3FF,#EDE9FE)", border:"#DDD6FE" },
            { icon:<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>, label:"Wedding",          sub:"From $250", href:"/book?type=wedding",          bg:"linear-gradient(145deg,#FFF1F2,#FFE4E6)", border:"#FECDD3" },
            { icon:<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, label:"Hourly Hire",      sub:"$95/hr",    href:"/book?type=hourly",           bg:"linear-gradient(145deg,#FFFBEB,#FEF3C7)", border:"#FDE68A" },
          ].map(a => (
            <Link key={a.label} href={a.href}
              className="group relative rounded-[20px] p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl overflow-hidden"
              style={{ background: a.bg, border: `1px solid ${a.border}` }}>
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 45%, transparent 50%)" }} />
              <span className="block mb-3 group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-300 text-[#1C1611]">{a.icon}</span>
              <span className="block text-[#1C1611] text-sm font-bold mb-1">{a.label}</span>
              <span className="block text-[#C9A84C] text-xs font-bold">{a.sub}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
         LOYALTY TIER PROGRESS — Premium Card
         ═════════════════════════════════════════════════════════════════ */}
      <div className="rounded-2xl sm:rounded-[28px] p-5 sm:p-7 lg:p-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#FFFDF7 0%,#FFF8EC 50%,#FFFBF5 100%)", border: "1px solid #EFE7D2" }}>

        {/* Decorative elements */}
        {/* Decorative element removed */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: `linear-gradient(135deg,${tier.current.color},#E8C97A)` }}>
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"/></svg>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1" style={{ color: tier.current.color }}>
                {tier.current.name} Member
              </p>
              <h3 className="text-[#1C1611] font-bold text-xl" style={{ fontFamily: "'Playfair Display',serif" }}>
                Elite Rewards Program
              </h3>
            </div>
          </div>

          {tier.next ? (
            <div className="text-right bg-white/70 backdrop-blur rounded-xl px-4 py-3 border border-[#EFE7D2]">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Next tier</p>
              <p className="font-bold text-[#1C1611] text-lg">
                <span style={{ color: tier.next.color }}>{tier.next.name}</span>
              </p>
              <p className="text-gray-400 text-xs">
                {tier.next.min - tier.trips} more {tier.next.min - tier.trips === 1 ? "trip" : "trips"}
              </p>
            </div>
          ) : (
            <span className="text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-sm"
              style={{ background: "#1C1611", color: "#E8C97A" }}>
              Max Tier Unlocked
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="relative h-4 bg-white rounded-full overflow-hidden mb-4 shadow-inner border border-gray-100">
          <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-[2000ms] ease-out"
            style={{
              width: `${tier.progress}%`,
              background: `linear-gradient(90deg,${tier.current.color} 0%,#E8C97A 60%,${tier.next?.color || "#E8C97A"} 100%)`,
              boxShadow: `0 0 12px ${tier.current.color}60`,
            }} />
          {/* Progress dot */}
          <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 shadow-md transition-all duration-[2000ms]"
            style={{ left: `calc(${tier.progress}% - 10px)`, borderColor: tier.current.color }} />
        </div>

        {/* Tier dots */}
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
          {TIERS.map(t => (
            <div key={t.name} className={`flex flex-col items-center transition-opacity ${tier.trips >= t.min ? "opacity-100" : "opacity-35"}`}>
              <div className="w-3 h-3 rounded-full mb-1.5 border-2" style={{ background: tier.trips >= t.min ? t.color : "transparent", borderColor: t.color }} />
              <span style={{ color: t.color }}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
         RECENT BOOKINGS + SIDEBAR
         ═════════════════════════════════════════════════════════════════ */}
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">

        {/* Recent Bookings — 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-[28px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between px-4 sm:px-7 py-4 sm:py-6 border-b border-gray-50">
            <div>
              <h2 className="font-bold text-[#1C1611] text-xl" style={{ fontFamily: "'Playfair Display',serif" }}>
                Recent Bookings
              </h2>
              <p className="text-gray-400 text-xs mt-1">Your latest premium rides</p>
            </div>
            <Link href="/dashboard/bookings" className="text-[#C9A84C] text-sm font-bold hover:underline whitespace-nowrap flex items-center gap-1.5">
              View all <span>→</span>
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-20 px-6">
              <div className="relative w-24 h-24 mx-auto mb-5">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFF9E6] to-[#FFEFBE] animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center"><svg className="w-12 h-12 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg></div>
              </div>
              <h3 className="text-[#1C1611] font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>
                No bookings yet
              </h3>
              <p className="text-gray-400 text-sm mb-7 max-w-sm mx-auto leading-relaxed">
                Your ride history will appear here once you book your first premium chauffeur experience.
              </p>
              <Link href="/book"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0A0A0A] px-7 py-3.5 rounded-xl hover:scale-105 transition-transform shadow-md shadow-[#C9A84C]/20"
                style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}>
                Book Your First Ride →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {bookings.slice(0, 5).map((b: any, idx: number) => (
                <Link key={b.id} href={`/dashboard/bookings/${b.id}`}
                  className="flex items-center gap-3 sm:gap-4 px-4 sm:px-7 py-4 sm:py-5 hover:bg-gradient-to-r hover:from-[#FFFDF7] hover:to-transparent transition-all group"
                  style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFF9E6] to-[#FFEFBE] flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
                    <svg className="w-6 h-6 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1C1611] text-sm font-bold truncate">
                      {b.pickup_address || b.pickup}
                      <span className="text-[#C9A84C] mx-2 font-normal">→</span>
                      {b.dropoff_address || b.dropoff}
                    </p>
                    <p className="text-gray-400 text-xs mt-1 flex items-center gap-2">
                      <span>{b.scheduled_at ? new Date(b.scheduled_at).toLocaleDateString("en-AU", { day:"numeric", month:"short", hour:"2-digit", minute:"2-digit" }) : b.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="capitalize">{(b.vehicle_category || b.vehicle || "sedan").replace("_"," ")}</span>
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-[#1C1611] text-base tabular-nums">
                      ${(b.total_amount || b.amount || 0).toFixed(0)}
                    </p>
                    <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full mt-1.5 inline-block ${STATUS_STYLE[b.status] || "bg-gray-100 text-gray-600"}`}>
                      {b.status.replace("_"," ").toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[#C9A84C] text-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">

          {/* Monthly insight */}
          <div className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center text-violet-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg></div>
              <h3 className="font-bold text-[#1C1611]" style={{ fontFamily: "'Playfair Display',serif" }}>
                This Month
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Trips taken</span>
                <span className="text-2xl font-extrabold text-[#1C1611] tabular-nums">
                  <Counter to={Math.min(stats.total, 4)} />
                </span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Amount spent</span>
                <span className="text-2xl font-extrabold text-[#C9A84C] tabular-nums">
                  <Counter to={stats.spent * 0.35} prefix="$" decimals={0} />
                </span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Avg per ride</span>
                <span className="font-bold text-[#1C1611] text-lg tabular-nums">
                  ${stats.total > 0 ? (stats.spent / stats.total).toFixed(0) : "0"}
                </span>
              </div>
            </div>
          </div>

          {/* Refer & Earn */}
          <div className="rounded-[24px] p-6 relative overflow-hidden"
            style={{ background: "linear-gradient(145deg,#0F0F0F,#1E1812,#0F0F0F)", border: "1px solid rgba(201,168,76,0.2)" }}>
            {/* Decorative element removed */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />

            <p className="text-[#C9A84C] text-[10px] font-bold tracking-[0.25em] uppercase mb-3 relative">
              Refer & Earn
            </p>
            <h3 className="text-white text-xl font-bold mb-2 relative" style={{ fontFamily: "'Playfair Display',serif" }}>
              Give $50, Get $50
            </h3>
            <p className="text-gray-500 text-xs mb-5 relative leading-relaxed">
              Share your referral link — both you and your friend get $50 credit.
            </p>
            <button className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl relative transition-all hover:scale-105 shadow-md shadow-[#C9A84C]/20"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)", color: "#0A0A0A" }}>
              Share Link →
            </button>
          </div>

          {/* Support */}
          <Link href="/dashboard/support"
            className="block bg-white border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-lg rounded-[24px] p-5 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/></svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#1C1611] text-sm">24/7 Concierge</p>
                <p className="text-gray-400 text-xs">Premium support anytime</p>
              </div>
              <span className="text-[#C9A84C] text-lg group-hover:translate-x-1.5 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </div>

      {/* ═══ GLOBAL ANIMATIONS ═══ */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(10px) scale(0.95); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-slow-reverse { animation: float-slow-reverse 10s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-slideDown { animation: slideDown 0.4s ease-out; }
      `}</style>
    </div>
  );
}
