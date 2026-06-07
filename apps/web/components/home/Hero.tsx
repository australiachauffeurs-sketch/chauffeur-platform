"use client";
import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const [pickup, setPickup]   = useState("");
  const [dropoff, setDropoff] = useState("");
  const [tripType, setTripType] = useState<"oneway"|"roundtrip"|"hourly">("oneway");

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=85')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/60" />
      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — headline */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">Premium Chauffeur Service</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ride in <span className="text-[#C9A84C]">Luxury,</span><br />
              Arrive in <span className="text-[#C9A84C]">Style</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
              Australia's most trusted chauffeur service. Professional drivers, premium vehicles, and seamless journeys — available 24/7 across all major cities.
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
              {["✓ Fixed Prices, No Surge","✓ 15 Min Cancellation Free","✓ Flight Tracking Included","✓ 24/7 Support"].map(f => (
                <span key={f} className="flex items-center gap-1">{f}</span>
              ))}
            </div>
          </div>

          {/* Right — booking card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Trip type tabs */}
            <div className="flex border-b border-gray-100">
              {([["oneway","One Way"],["roundtrip","Round Trip"],["hourly","Hourly"]] as const).map(([type, label]) => (
                <button
                  key={type}
                  onClick={() => setTripType(type)}
                  className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 ${
                    tripType === type
                      ? "bg-[#C9A84C] text-black border-b-2 border-[#C9A84C]"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-4">
              {/* Pickup */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow" />
                <input
                  type="text"
                  placeholder="Pickup location"
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/10 transition-all"
                />
              </div>

              {/* Swap icon */}
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-lg cursor-pointer hover:bg-[#C9A84C]/20 transition-colors">⇅</div>
              </div>

              {/* Dropoff */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#C9A84C] border-2 border-white shadow" />
                <input
                  type="text"
                  placeholder="Drop-off location"
                  value={dropoff}
                  onChange={e => setDropoff(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/10 transition-all"
                />
              </div>

              {/* Date/Time row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input type="date" className="w-full px-3 py-3.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:border-[#C9A84C] transition-all" />
                </div>
                <div className="relative">
                  <input type="time" className="w-full px-3 py-3.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:border-[#C9A84C] transition-all" />
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/book?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&type=${tripType}`}
                className="block w-full text-center bg-gradient-to-r from-[#C9A84C] via-[#E8C97A] to-[#A07830] text-black font-bold py-4 rounded-xl text-base hover:shadow-lg hover:shadow-[#C9A84C]/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Search Chauffeur →
              </Link>

              <p className="text-center text-gray-400 text-xs">Free cancellation · No hidden charges · GST inclusive</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[["15,000+","Rides Completed"],["4.9 / 5","Customer Rating"],["200+","Professional Drivers"],["6","Cities Covered"]].map(([v,l]) => (
            <div key={l} className="text-center border-r border-white/10 last:border-0">
              <div className="text-3xl font-bold text-[#C9A84C] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{v}</div>
              <div className="text-gray-400 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-[#C9A84C] to-transparent" />
      </div>
    </section>
  );
}
