export default function AppDownload() {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      {/* Background circles */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#C9A84C]/5 translate-x-1/2" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-[#C9A84C]/8 translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="text-[#C9A84C] text-xs font-bold tracking-[0.3em] uppercase">Mobile App</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Book on the Go with<br />
              <span className="text-[#C9A84C]">Our Free App</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Download the Elite Chauffeurs app and book your ride in under 60 seconds. Track your driver live, manage bookings, and get instant confirmations — all from your phone.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[["Live Tracking","Watch your driver on the map in real-time"],["Instant Alerts","SMS & push notifications at every step"],["Booking History","All your receipts in one place"],["Rate & Review","Share feedback after every trip"]].map(([title,desc]) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold">{title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="flex flex-wrap gap-4">
              <a href="#" className="flex items-center gap-3 bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm">
                <div className="text-left">
                  <div className="text-[10px] text-gray-500">Download on the</div>
                  <div className="font-bold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm">
                <div className="text-left">
                  <div className="text-[10px] text-gray-500">Get it on</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone frame */}
              <div className="w-64 h-[520px] bg-[#111] rounded-[40px] border-4 border-[#2A2A2A] shadow-2xl overflow-hidden relative">
                {/* Status bar */}
                <div className="h-8 bg-[#0A0A0A] flex items-center justify-between px-5 pt-1">
                  <span className="text-white text-[10px] font-bold">9:41</span>
                  <div className="w-20 h-4 bg-[#0A0A0A] rounded-full border border-[#2A2A2A]" />
                  <span className="text-white text-[10px]">●●●</span>
                </div>
                {/* App content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-[10px]">Good morning</p>
                      <p className="text-white font-bold text-sm">James</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C] flex items-center justify-center text-[#C9A84C] font-bold text-sm">J</div>
                  </div>
                  {/* Booking card */}
                  <div className="bg-[#C9A84C] rounded-2xl p-4">
                    <p className="text-black text-[10px] font-bold mb-1">NEXT RIDE</p>
                    <p className="text-black font-bold text-sm">Sydney Airport → CBD</p>
                    <p className="text-black/70 text-[10px] mt-0.5">Today · 06:30 AM · Marcus T.</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center text-[10px] text-black/60">→</div>
                      <div className="flex-1 h-1 bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-black/40 rounded-full" />
                      </div>
                      <span className="text-[10px] text-black/70">En Route</span>
                    </div>
                  </div>
                  {/* Quick book */}
                  <div className="bg-[#1A1A1A] rounded-2xl p-4 space-y-2">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Quick Book</p>
                    <div className="bg-[#222] rounded-xl p-2.5 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <p className="text-gray-400 text-[10px]">Pickup location...</p>
                    </div>
                    <div className="bg-[#222] rounded-xl p-2.5 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                      <p className="text-gray-400 text-[10px]">Drop-off location...</p>
                    </div>
                    <div className="bg-[#C9A84C] rounded-xl p-2.5 text-center">
                      <p className="text-black text-[10px] font-bold">Get Quote →</p>
                    </div>
                  </div>
                  {/* Vehicle options */}
                  <div className="grid grid-cols-3 gap-2">
                    {[["Sedan","$65"],["SUV","$85"],["Luxury","$130"]].map(([name,price]) => (
                      <div key={name} className="bg-[#1A1A1A] rounded-xl p-2 text-center">
                        <p className="text-white text-[9px] font-bold">{name}</p>
                        <p className="text-[#C9A84C] text-[9px]">{price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gold glow */}
              <div className="absolute -inset-4 rounded-[48px] bg-[#C9A84C]/5 -z-10 blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
