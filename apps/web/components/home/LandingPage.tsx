"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AppDownload from "./AppDownload";

/* ═════════════════════════════════════════════════════════════════════════
   HOOKS & HELPERS
   ═════════════════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      e => { if (e[0]?.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Counter({ to, suffix = "", prefix = "", decimals = 0 }: {
  to: number; suffix?: string; prefix?: string; decimals?: number;
}) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView(0.4);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now(), dur = 1800;
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(to * e);
      if (t < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals).toLocaleString()}{suffix}</span>;
}

/* ═════════════════════════════════════════════════════════════════════════
   DATA
   ═════════════════════════════════════════════════════════════════════════ */
const FLEET = [
  {
    id: "sedan",  name: "Executive Sedan",   tagline: "Mercedes E-Class · BMW 5 Series",
    pax: 3, bags: 3, price: 89, img: "/images/sedan.jpg",
    features: ["Leather interior", "Bottled water", "WiFi"],
  },
  {
    id: "suv",    name: "Luxury SUV",        tagline: "Audi Q7 · Mercedes GLE",
    pax: 6, bags: 6, price: 119, img: "/images/suv.jpg",
    features: ["Spacious cabin", "Premium audio", "Child seats avail."],
  },
  {
    id: "luxury", name: "Premium Limousine", tagline: "Mercedes S-Class · BMW 7 Series",
    pax: 3, bags: 3, price: 159, img: "/images/luxury.jpg",
    features: ["Hand-stitched leather", "Champagne service", "Privacy glass"],
  },
  {
    id: "van",    name: "Executive Van",     tagline: "Mercedes V-Class · 8 seater",
    pax: 7, bags: 8, price: 139, img: "/images/van.jpg",
    features: ["Conference seating", "Tinted windows", "Group travel"],
  },
];

const SERVICES = [
  { icon: null, title: "Airport Transfers",  desc: "Flight tracking included. Driver waits up to 60 min free.",  href: "/book?type=airport_transfer" },
  { icon: null, title: "Corporate Travel",   desc: "Account billing, priority booking, dedicated chauffeurs.",   href: "/book?type=corporate" },
  { icon: null, title: "Weddings & Events",  desc: "Hand-decorated cars, white-glove service, photo-ready.",     href: "/book?type=wedding" },
  { icon: null, title: "Hourly & Day Hire",  desc: "Multiple stops, waiting time included. From $95/hour.",      href: "/book?type=hourly" },
  { icon: null, title: "Special Occasions",  desc: "Anniversaries, dates, milestone moments — done right.",       href: "/book?type=special_event" },
  { icon: null, title: "Night Out",          desc: "Dinner, theatre, club crawl. Stay safe, arrive in style.",   href: "/book?type=hourly" },
];

const STEPS = [
  { n: 1, title: "Book in 60 seconds", desc: "Choose your pickup, dropoff, and vehicle. Instant fixed quote — no surprises." },
  { n: 2, title: "Get matched",        desc: "We assign your chauffeur and confirm by SMS within minutes. Track their arrival live." },
  { n: 3, title: "Sit back & relax",   desc: "Your chauffeur arrives 10 min early, every time. Enjoy the journey." },
  { n: 4, title: "Rate & repeat",      desc: "Save your favourite trips, build loyalty points, unlock Black-tier perks." },
];

const REVIEWS = [
  { name: "Sarah Mitchell",  role: "CEO, TechCorp Australia",          rating: 5, text: "We've used Elite Chauffeurs for every executive transfer for two years. Punctual, professional, immaculate. The booking system is effortless." },
  { name: "James Chen",      role: "Corporate Events Director",        rating: 5, text: "Booked 12 cars for our gala — flawlessly coordinated. The drivers were impeccably presented and our guests felt like royalty." },
  { name: "Olivia Whitford", role: "Bride, Married Sept 2025",         rating: 5, text: "On our wedding day they thought of everything — chilled water, parasol for me, photos with the car. Worth every dollar." },
  { name: "Marcus Reed",     role: "Frequent Business Traveler",       rating: 5, text: "I fly into Sydney 3x a month. My chauffeur is always there before my luggage. The fixed pricing is a game-changer vs Ubers." },
];

const CITIES = ["Sydney", "Melbourne", "Brisbane", "Perth", "Gold Coast", "Adelaide", "Canberra", "Hobart"];

const PARTNERS = ["Qantas", "Marriott", "Hilton", "Westpac", "Macquarie", "Crown Resorts"];

/* ═════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═════════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const [scrollY,     setScrollY]     = useState(0);
  const [heroLoaded,  setHeroLoaded]  = useState(false);
  const [activeFleet, setActiveFleet] = useState(0);
  const [activeReview,setActiveReview]= useState(0);

  /* booking widget state */
  const [pickup,   setPickup]   = useState("");
  const [dropoff,  setDropoff]  = useState("");
  const [date,     setDate]     = useState("");
  const [time,     setTime]     = useState("");

  /* ── refs for animations ───────────────────────────────────────────── */
  const services = useInView();
  const fleetRef = useInView();
  const howRef   = useInView();
  const statsRef = useInView();
  const reviewsRef = useInView();
  const citiesRef = useInView();
  const ctaRef   = useInView();

  /* ── effects ───────────────────────────────────────────────────────── */
  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveReview(r => (r + 1) % REVIEWS.length), 6000);
    return () => clearInterval(t);
  }, []);

  /* ── handlers ──────────────────────────────────────────────────────── */
  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickup)  params.set("pickup",  pickup);
    if (dropoff) params.set("dropoff", dropoff);
    if (date)    params.set("date",    date);
    if (time)    params.set("time",    time);
    window.location.href = `/book?${params.toString()}`;
  };

  const fleet = FLEET[activeFleet]!;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body    { font-family: 'Inter', sans-serif; }
        .gold-grad    { background: linear-gradient(135deg,#C9A84C 0%,#E8C97A 50%,#A07830 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        /* Reveal animation */
        .rv  { opacity: 0; transform: translateY(40px); transition: opacity .8s ease, transform .8s cubic-bezier(.22,1,.36,1); }
        .rv.on { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: .1s; } .d2 { transition-delay: .2s; }
        .d3 { transition-delay: .3s; } .d4 { transition-delay: .4s; }

        /* Marquee */
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 30s linear infinite; }

        /* Shimmer */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .btn-shimmer {
          background: linear-gradient(90deg,#A07830,#C9A84C,#F0D878,#C9A84C,#A07830);
          background-size: 300% auto;
          animation: shimmer 4s linear infinite;
        }

        /* Float */
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-12px); }
        }
        .anim-float { animation: float 6s ease-in-out infinite; }

        /* Pulse dot */
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(52,211,153,0.7); }
          70%  { box-shadow: 0 0 0 12px rgba(52,211,153,0); }
          100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
        }
        .live-dot { animation: pulse-ring 2s infinite; }

        /* Hero parallax */
        .hero-img { will-change: transform; }

        /* Glassmorphism input */
        .glass-input {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
          transition: all 0.2s;
        }
        .glass-input::placeholder { color: rgba(255,255,255,0.4); }
        .glass-input:focus {
          outline: none;
          border-color: rgba(201,168,76,0.6);
          background: rgba(255,255,255,0.12);
        }

        /* Card hover */
        .card-hover { transition: transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(28,22,17,0.15); }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════
          HERO with embedded booking widget
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[760px] md:min-h-[820px] flex items-end overflow-hidden">
        {/* Background image with parallax */}
        <div className="absolute inset-0 hero-img"
          style={{ transform: `translateY(${scrollY * 0.4}px) scale(1.08)` }}>
          <img src="/images/hero.jpg" alt="" className="w-full h-full object-cover object-center" />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Top glow line */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16 md:pb-20 pt-32">
          <div className="grid lg:grid-cols-[1fr_460px] gap-10 lg:gap-16 items-end">

            {/* Left — Headline */}
            <div className="text-white">
              {/* Eyebrow */}
              <div className={`rv ${heroLoaded ? "on" : ""} flex items-center gap-3 mb-6`}>
                <span className="w-10 h-px bg-[#C9A84C]" />
                <span className="font-body text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase font-semibold">
                  Australia's Premier Chauffeur Service
                </span>
              </div>

              {/* Title */}
              <h1 className={`rv d1 ${heroLoaded ? "on" : ""} font-display font-bold leading-[0.95] mb-6`}
                style={{ fontSize: "clamp(48px,7vw,96px)" }}>
                Effortless<br />
                <span className="gold-grad italic font-normal">luxury,</span> on demand.
              </h1>

              {/* Subtitle */}
              <p className={`rv d2 ${heroLoaded ? "on" : ""} font-body text-white/70 text-lg md:text-xl mb-8 max-w-xl leading-relaxed`}>
                Chauffeur-driven travel across Australia. Fixed pricing, vetted drivers,
                and the kind of service that makes every journey feel special.
              </p>

              {/* Trust badges */}
              <div className={`rv d3 ${heroLoaded ? "on" : ""} grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl`}>
                {[
                  { num: "10K+",  lbl: "Trips Year"    },
                  { num: "4.9★",  lbl: "Avg Rating"    },
                  { num: "8",     lbl: "Cities"        },
                  { num: "24/7",  lbl: "Availability"  },
                ].map(s => (
                  <div key={s.lbl}>
                    <p className="font-display text-3xl md:text-4xl font-semibold gold-grad mb-1">
                      {s.num}
                    </p>
                    <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">
                      {s.lbl}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Quick Book Widget */}
            <div className={`rv d2 ${heroLoaded ? "on" : ""} rounded-3xl p-7 shadow-2xl`}
              style={{ background: "linear-gradient(135deg, rgba(20,17,13,0.85), rgba(10,10,10,0.85))", backdropFilter: "blur(20px)", border: "1px solid rgba(201,168,76,0.2)" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 live-dot" />
                <p className="text-emerald-300 text-[10px] uppercase tracking-widest font-bold">Live booking</p>
              </div>
              <h3 className="font-display text-white text-2xl font-semibold mb-5">
                Quote in 60 seconds
              </h3>

              <form onSubmit={handleQuickBook} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-[#C9A84C] uppercase tracking-widest mb-1.5 font-semibold">Pickup</label>
                  <input value={pickup} onChange={e => setPickup(e.target.value)}
                    placeholder="Sydney Airport T1"
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] text-[#C9A84C] uppercase tracking-widest mb-1.5 font-semibold">Dropoff</label>
                  <input value={dropoff} onChange={e => setDropoff(e.target.value)}
                    placeholder="Martin Place, Sydney CBD"
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#C9A84C] uppercase tracking-widest mb-1.5 font-semibold">Date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="glass-input w-full px-3 py-3 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#C9A84C] uppercase tracking-widest mb-1.5 font-semibold">Time</label>
                    <input type="time" value={time} onChange={e => setTime(e.target.value)}
                      className="glass-input w-full px-3 py-3 rounded-xl text-sm" />
                  </div>
                </div>

                <button type="submit"
                  className="btn-shimmer w-full text-black font-bold uppercase tracking-widest text-sm py-4 rounded-xl mt-4 hover:scale-[1.02] transition-transform">
                  Get Instant Quote →
                </button>

                <p className="text-white/40 text-[11px] text-center pt-2">
                  No credit card · Free cancellation up to 2hrs
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          BRAND BAR — partners marquee
          ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF8F4] border-y border-[#EFE7D2] py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-3 text-center">
          <p className="text-[10px] text-[#8B7A5C] uppercase tracking-[0.3em] font-semibold">
            Trusted by Australia's leading brands
          </p>
        </div>
        <div className="relative">
          <div className="marquee-track flex gap-16 whitespace-nowrap" style={{ width: "200%" }}>
            {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
              <span key={i} className="font-display text-2xl text-[#1C1611]/30 font-semibold tracking-wide">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SERVICES GRID
          ════════════════════════════════════════════════════════════════ */}
      <section ref={services.ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`rv ${services.inView ? "on" : ""} text-center mb-16`}>
            <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase font-semibold mb-3">What we offer</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-[#1C1611] mb-4">
              Made for every<br /><span className="italic gold-grad">moment that matters</span>
            </h2>
            <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
              From a 6am airport run to your wedding day — premium chauffeur service tailored to the occasion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <Link key={s.title} href={s.href}
                className={`rv d${(i % 4) + 1} ${services.inView ? "on" : ""} card-hover group block bg-gradient-to-br from-[#FAF8F4] to-white rounded-2xl p-7 border border-[#EFE7D2]`}>
                <div className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: "linear-gradient(135deg,#FFF9E6,#FFEFBE)" }}>
                  <span className="text-[#C9A84C] font-bold text-xl">—</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#1C1611] mb-2">{s.title}</h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="text-[#C9A84C] text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Book now <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          INTERACTIVE FLEET SELECTOR
          ════════════════════════════════════════════════════════════════ */}
      <section ref={fleetRef.ref} id="fleet" className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0A0A0A 0%,#1C1611 100%)" }}>
        {/* BG glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle,#C9A84C,transparent 60%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`rv ${fleetRef.inView ? "on" : ""} text-center mb-12`}>
            <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase font-semibold mb-3">Our fleet</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-3">
              Hand-picked, <span className="italic gold-grad">impeccable</span>
            </h2>
            <p className="font-body text-white/50 max-w-2xl mx-auto text-lg">
              Every vehicle in our fleet is under 3 years old, professionally detailed daily, and fitted with premium amenities.
            </p>
          </div>

          {/* Fleet selector tabs */}
          <div className={`rv d1 ${fleetRef.inView ? "on" : ""} flex justify-center flex-wrap gap-2 mb-10`}>
            {FLEET.map((f, i) => (
              <button key={f.id} onClick={() => setActiveFleet(i)}
                className={`px-5 py-3 rounded-full font-semibold text-sm transition-all ${
                  activeFleet === i
                    ? "text-black shadow-lg"
                    : "text-white/60 hover:text-white border border-white/10"
                }`}
                style={activeFleet === i ? { background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)" } : undefined}>
                {f.name}
              </button>
            ))}
          </div>

          {/* Active fleet display */}
          <div className={`rv d2 ${fleetRef.inView ? "on" : ""} grid lg:grid-cols-2 gap-10 items-center`}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <img src={fleet.img} alt={fleet.name} className="w-full h-full object-cover"
                key={fleet.id}
                style={{ animation: "fade-in 0.6s ease-out" }} />
              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-bold mb-1">From</p>
                  <p className="text-white text-4xl font-bold">${fleet.price}<span className="text-lg font-normal text-white/60">/trip</span></p>
                </div>
                <div className="text-right text-white/70 text-xs">
                  <p>{fleet.pax} passengers</p>
                  <p>{fleet.bags} bags</p>
                </div>
              </div>
            </div>

            <div className="text-white">
              <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-bold mb-3">{fleet.tagline}</p>
              <h3 className="font-display text-4xl md:text-5xl font-bold mb-5">{fleet.name}</h3>
              <p className="font-body text-white/60 text-lg leading-relaxed mb-7">
                Designed for those who appreciate the finer details. Every detail considered, every journey elevated.
              </p>

              <ul className="space-y-3 mb-8">
                {fleet.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-white/80">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                      style={{ background: "rgba(201,168,76,0.15)", color: "#E8C97A" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={`/book?vehicle=${fleet.id}`}
                className="btn-shimmer inline-flex items-center gap-2 text-black font-bold uppercase tracking-widest text-sm px-7 py-4 rounded-xl hover:scale-[1.02] transition-transform">
                Book This Vehicle →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          HOW IT WORKS — 4 step
          ════════════════════════════════════════════════════════════════ */}
      <section ref={howRef.ref} className="py-24 bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`rv ${howRef.inView ? "on" : ""} text-center mb-16`}>
            <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase font-semibold mb-3">Simple booking</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-[#1C1611] mb-4">
              From booking to<br /><span className="italic gold-grad">arrival</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line — desktop only */}
            <div className="hidden lg:block absolute top-12 left-12 right-12 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #C9A84C, #C9A84C, transparent)" }} />

            {STEPS.map((s, i) => (
              <div key={s.n} className={`rv d${i+1} ${howRef.inView ? "on" : ""} text-center relative bg-white rounded-3xl p-7 border border-[#EFE7D2] card-hover`}>
                <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center font-display text-3xl font-bold relative z-10"
                  style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#0A0A0A" }}>
                  {s.n}
                </div>
                <h3 className="font-display text-xl font-bold text-[#1C1611] mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          LIVE STATS (animated counters)
          ════════════════════════════════════════════════════════════════ */}
      <section ref={statsRef.ref} className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#1C1611,#0A0A0A,#1C1611)" }}>

        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`rv ${statsRef.inView ? "on" : ""} text-center mb-14`}>
            <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase font-semibold mb-3">By the numbers</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              A legacy of <span className="italic gold-grad">trust</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: 10_240, suffix: "+", lbl: "Rides Completed",   sub: "in 2025" },
              { num: 4.9,    decimals: 1, lbl: "Average Rating",     sub: "across 2,400 reviews" },
              { num: 98,     suffix: "%", lbl: "On-time Arrival",    sub: "industry-leading" },
              { num: 312,    suffix: "+", lbl: "Vetted Chauffeurs",  sub: "background-checked" },
            ].map((s, i) => (
              <div key={i} className={`rv d${i+1} ${statsRef.inView ? "on" : ""} text-center`}>
                <p className="font-display font-bold gold-grad mb-3"
                  style={{ fontSize: "clamp(48px,6vw,84px)", lineHeight: 1 }}>
                  <Counter to={s.num} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="text-white font-semibold mb-1">{s.lbl}</p>
                <p className="text-white/40 text-xs">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          REVIEWS — auto-rotating
          ════════════════════════════════════════════════════════════════ */}
      <section ref={reviewsRef.ref} className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className={`rv ${reviewsRef.inView ? "on" : ""} text-center mb-12`}>
            <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase font-semibold mb-3">Testimonials</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-[#1C1611]">
              Loved by<br /><span className="italic gold-grad">our clients</span>
            </h2>
          </div>

          {/* Active review */}
          <div className={`rv d1 ${reviewsRef.inView ? "on" : ""} bg-gradient-to-br from-[#FAF8F4] to-white rounded-3xl p-10 md:p-14 border border-[#EFE7D2] relative`}>
            <div className="absolute top-6 right-8 text-[120px] font-display text-[#C9A84C]/10 select-none leading-none">"</div>

            <div className="flex gap-1 mb-6">
              {[1,2,3,4,5].map(i => (
                <span key={i} style={{ color: i <= REVIEWS[activeReview]!.rating ? "#C9A84C" : "#E5E5E5" }} className="text-2xl">★</span>
              ))}
            </div>

            <p className="font-display text-2xl md:text-3xl text-[#1C1611] leading-relaxed mb-8 italic font-light">
              &ldquo;{REVIEWS[activeReview]!.text}&rdquo;
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#1C1611] text-lg">{REVIEWS[activeReview]!.name}</p>
                <p className="text-gray-500 text-sm">{REVIEWS[activeReview]!.role}</p>
              </div>

              {/* dots */}
              <div className="flex gap-2">
                {REVIEWS.map((_, i) => (
                  <button key={i} onClick={() => setActiveReview(i)}
                    className="transition-all"
                    style={{
                      width:  activeReview === i ? "32px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background: activeReview === i ? "#C9A84C" : "#E5E5E5",
                    }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CITIES COVERAGE
          ════════════════════════════════════════════════════════════════ */}
      <section ref={citiesRef.ref} className="py-24"
        style={{ background: "linear-gradient(180deg,#FAF8F4 0%,#FFFCEF 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`rv ${citiesRef.inView ? "on" : ""} grid lg:grid-cols-2 gap-12 items-center`}>
            <div>
              <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase font-semibold mb-3">Australia-wide</p>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-[#1C1611] mb-6">
                Where you go,<br /><span className="italic gold-grad">we go.</span>
              </h2>
              <p className="font-body text-gray-600 text-lg leading-relaxed mb-8">
                From bustling city centres to coastal escapes — we operate in every major metro across Australia,
                with local chauffeurs who know the roads inside out.
              </p>
              <Link href="/book"
                className="inline-flex items-center gap-2 text-[#1C1611] font-bold uppercase tracking-widest text-sm border-b-2 border-[#C9A84C] pb-1 hover:gap-3 transition-all">
                Plan your journey <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {CITIES.map((c, i) => (
                <div key={c} className={`rv d${(i % 4) + 1} ${citiesRef.inView ? "on" : ""} bg-white rounded-2xl p-5 border border-[#EFE7D2] flex items-center gap-3 hover:border-[#C9A84C] hover:shadow-md transition-all cursor-default`}>
                  <span className="text-[#C9A84C] font-bold text-lg">·</span>
                  <div>
                    <p className="font-display font-bold text-[#1C1611] text-lg">{c}</p>
                    <p className="text-emerald-600 text-[10px] uppercase tracking-wider font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          APP DOWNLOAD
          ════════════════════════════════════════════════════════════════ */}
      <AppDownload />

      {/* ════════════════════════════════════════════════════════════════
          FINAL CTA
          ════════════════════════════════════════════════════════════════ */}
      <section ref={ctaRef.ref} className="relative py-32 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0A0A0A 0%,#1C1611 50%,#3A2F1C 100%)" }}>

        <div className="absolute inset-0">
          <img src="/images/night.jpg" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
        </div>

        <div className={`rv ${ctaRef.inView ? "on" : ""} relative max-w-4xl mx-auto px-6 lg:px-12 text-center text-white`}>
          <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase font-semibold mb-4">Ready when you are</p>
          <h2 className="font-display font-bold mb-8 leading-tight"
            style={{ fontSize: "clamp(48px,7vw,84px)" }}>
            Your journey,<br /><span className="italic gold-grad">elevated.</span>
          </h2>
          <p className="font-body text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Book your first ride and experience the difference. Fixed pricing, premium fleet, exceptional service.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book"
              className="btn-shimmer text-black font-bold uppercase tracking-widest text-sm px-9 py-5 rounded-xl hover:scale-105 transition-transform w-full sm:w-auto">
              Reserve Now →
            </Link>
            <Link href="/auth/signup"
              className="w-full sm:w-auto px-9 py-5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all hover:bg-white/10"
              style={{ border: "1.5px solid rgba(201,168,76,0.5)", color: "#E8C97A" }}>
              Create Account
            </Link>
          </div>

          <p className="mt-8 text-white/40 text-sm">
            Or call <a href="tel:1800-ELITE" className="text-[#C9A84C] hover:underline">1800 ELITE</a> · Available 24/7
          </p>
        </div>
      </section>
    </>
  );
}
