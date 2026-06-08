"use client";
import { useState } from "react";

// Latest APK build — update this URL after each new EAS build
const ANDROID_APK_URL =
  "https://expo.dev/accounts/australia-chauffeurs/projects/elite-chauffeurs/builds/0279b6b3-1382-445d-9225-bcc2673eece7";

const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ANDROID_APK_URL)}&color=C9A84C&bgcolor=09090B&qzone=2&format=png`;

export default function AppDownload() {
  const [qrVisible, setQrVisible] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#09090B 0%,#111113 50%,#09090B 100%)" }}>

      {/* Decorative lines */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,#C9A84C40,transparent)" }} />

      {/* Background circles */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#C9A84C]/5 pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-[#C9A84C]/8 pointer-events-none" />
      <div className="absolute -left-40 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(201,168,76,0.04),transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Content ─────────────────────────────────── */}
          <div>
            <span className="text-[#C9A84C] text-[11px] font-bold tracking-[0.3em] uppercase">Mobile App</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Book your ride in{" "}
              <span style={{
                background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                60 seconds
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-lg">
              Download the Elite Chauffeurs app for Android and get instant quotes,
              live driver tracking, and one-tap rebooking — right from your pocket.
            </p>

            {/* Feature list */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: "📍", title: "Live Tracking",    desc: "Watch your driver on the map" },
                { icon: "🔔", title: "Instant Alerts",   desc: "SMS & push at every step"     },
                { icon: "📋", title: "Booking History",  desc: "All receipts in one place"    },
                { icon: "⭐", title: "Rate & Reward",    desc: "Loyalty points on every trip" },
              ].map(f => (
                <div key={f.title} className="flex items-start gap-3">
                  <span className="text-xl">{f.icon}</span>
                  <div>
                    <p className="text-white text-sm font-semibold">{f.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Download buttons ── */}
            <div className="flex flex-wrap gap-4">

              {/* Android — real link */}
              <a
                href={ANDROID_APK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)",
                  boxShadow: "0 8px 32px rgba(201,168,76,0.35)",
                }}
              >
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <div className="text-[9px] text-black/60 font-bold uppercase tracking-wider">Download APK</div>
                  <div className="text-black font-bold text-base leading-tight">Android App</div>
                </div>
              </a>

              {/* iOS — coming soon */}
              <div
                className="flex items-center gap-3 px-6 py-4 rounded-2xl cursor-not-allowed opacity-60"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1.5px solid rgba(255,255,255,0.12)",
                }}
              >
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Coming Soon</div>
                  <div className="text-white font-bold text-base leading-tight">App Store</div>
                </div>
              </div>
            </div>

            {/* QR code toggle */}
            <button
              onClick={() => setQrVisible(v => !v)}
              className="mt-6 flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:underline transition-all"
            >
              <span>📱</span>
              {qrVisible ? "Hide QR code" : "Scan QR code to download on Android"}
            </button>

            {qrVisible && (
              <div className="mt-4 inline-flex flex-col items-center gap-3 p-4 rounded-2xl border border-[#C9A84C]/20"
                style={{ background: "rgba(201,168,76,0.06)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={QR_URL}
                  alt="QR code to download Elite Chauffeurs app"
                  width={160}
                  height={160}
                  className="rounded-xl"
                />
                <p className="text-gray-500 text-xs text-center">
                  Point your phone camera at this code
                </p>
              </div>
            )}

            {/* Small disclaimer */}
            <p className="mt-6 text-gray-600 text-xs">
              Android APK · Direct install · No Play Store account required<br />
              <span className="text-[#C9A84C]">✓</span> Safe to install · Enable "Unknown sources" when prompted
            </p>
          </div>

          {/* ── RIGHT: Phone mockup ────────────────────────────── */}
          <div className="flex justify-center">
            <div className="relative">

              {/* Floating badge — top */}
              <div className="absolute -top-5 -left-6 z-20 flex items-center gap-2 bg-[#111113] border border-[#C9A84C]/30 rounded-2xl px-4 py-2.5 shadow-xl"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-xs font-semibold">Driver en route · 4 min</span>
              </div>

              {/* Floating badge — bottom */}
              <div className="absolute -bottom-4 -right-6 z-20 bg-[#C9A84C] rounded-2xl px-4 py-2.5 shadow-xl">
                <p className="text-black text-xs font-black">⭐ 4.9 · 2,400+ reviews</p>
              </div>

              {/* Phone frame */}
              <div className="w-[240px] h-[490px] rounded-[44px] shadow-2xl overflow-hidden relative"
                style={{
                  background: "#09090B",
                  border: "2.5px solid #2A2A30",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(201,168,76,0.1)",
                }}>

                {/* Status bar */}
                <div className="h-8 flex items-center justify-between px-5 pt-1"
                  style={{ background: "#09090B" }}>
                  <span className="text-white text-[10px] font-bold">9:41</span>
                  <div className="w-20 h-4 rounded-full" style={{ background: "#09090B", border: "1px solid #2A2A30" }} />
                  <div className="flex items-center gap-1">
                    <span className="text-white text-[9px]">●●●</span>
                  </div>
                </div>

                {/* Gold top stripe */}
                <div className="h-0.5" style={{ background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />

                {/* App content */}
                <div className="px-4 pt-3 space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold" style={{ color: "rgba(201,168,76,0.7)" }}>Good morning</p>
                      <p className="text-white font-bold text-sm">Elite Chauffeurs</p>
                    </div>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ background: "rgba(201,168,76,0.12)", border: "1.5px solid #C9A84C", color: "#C9A84C" }}>J</div>
                  </div>

                  {/* Active trip card */}
                  <div className="rounded-2xl p-3.5" style={{ background: "linear-gradient(135deg,#1A160F,#2A2010)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wide">Confirmed</span>
                      </div>
                      <span className="text-[#C9A84C] font-bold text-sm">$142</span>
                    </div>
                    <p className="text-white font-bold text-[11px] mb-1">Sydney Airport → CBD</p>
                    <p className="text-gray-500 text-[9px]">Today · 06:30 AM · Marcus T.</p>
                    <div className="mt-2.5 h-1 rounded-full" style={{ background: "#2A2A30" }}>
                      <div className="h-full w-2/5 rounded-full" style={{ background: "#C9A84C" }} />
                    </div>
                  </div>

                  {/* Location inputs */}
                  <div className="rounded-2xl p-3" style={{ background: "#17171A", border: "1px solid #2A2A30" }}>
                    <div className="flex items-center gap-2 py-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <p className="text-[10px]" style={{ color: "#4A4A55" }}>Pickup location</p>
                    </div>
                    <div className="h-px" style={{ background: "#2A2A30" }} />
                    <div className="flex items-center gap-2 py-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: "#C9A84C" }} />
                      <p className="text-[10px]" style={{ color: "#4A4A55" }}>Drop-off location</p>
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className="rounded-xl py-2.5 text-center"
                    style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)" }}>
                    <p className="text-black font-bold text-[11px]">Search & Get Instant Quote →</p>
                  </div>

                  {/* Quick book grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: "✈", label: "Airport"  },
                      { icon: "💼", label: "Corporate"},
                      { icon: "💍", label: "Wedding"  },
                      { icon: "⏱", label: "Hourly"   },
                    ].map(s => (
                      <div key={s.label} className="rounded-xl p-2.5"
                        style={{ background: "#17171A", border: "1px solid #2A2A30" }}>
                        <span className="text-sm">{s.icon}</span>
                        <p className="text-white text-[10px] font-bold mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom tab bar */}
                <div className="absolute bottom-0 inset-x-0 flex justify-around items-center py-2.5 px-2"
                  style={{ background: "#0D0D0D", borderTop: "1px solid #C9A84C30" }}>
                  {[["🏠","Home",true],["📋","Bookings",false],["👤","Profile",false]].map(([icon,lbl,active]) => (
                    <div key={String(lbl)} className="flex flex-col items-center gap-0.5">
                      <span className="text-base">{icon}</span>
                      <span className="text-[8px] font-bold" style={{ color: active ? "#C9A84C" : "#4A4A55" }}>{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gold glow behind phone */}
              <div className="absolute -inset-8 rounded-[52px] -z-10 blur-2xl opacity-30"
                style={{ background: "radial-gradient(ellipse,#C9A84C,transparent 70%)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
