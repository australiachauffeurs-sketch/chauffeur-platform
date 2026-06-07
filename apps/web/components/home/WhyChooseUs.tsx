const FEATURES = [
  { title: "Always On Time", desc: "We track your flight in real-time. If you're delayed, we wait — at no extra charge." },
  { title: "Fixed Transparent Pricing", desc: "The price you see is exactly what you pay. No surge pricing, no hidden fees, ever." },
  { title: "Professional Chauffeurs", desc: "Police-checked, immaculately presented drivers with years of professional experience." },
  { title: "Live Driver Tracking", desc: "Track your driver in real-time on the map. Get SMS alerts at every step of your journey." },
  { title: "Fully Insured & Licensed", desc: "All vehicles carry full commercial insurance. Licensed operators across every state." },
  { title: "Carbon Offset Rides", desc: "Every ride is carbon offset through our partnership with GreenFleet Australia." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-[#C9A84C]/5" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full border border-[#C9A84C]/5" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-[#C9A84C] text-xs font-bold tracking-[0.3em] uppercase">Why Elite</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Elite Chauffeurs<br />
              <span className="text-[#C9A84C]">Difference</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              We don't just provide a ride — we deliver an experience. Every journey with Elite Chauffeurs is crafted to be punctual, comfortable, and effortlessly luxurious.
            </p>
            <div className="flex gap-8">
              {[["98%","Completion Rate"],["4.9★","Average Rating"],["24/7","Available"]].map(([v,l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold text-[#C9A84C]">{v}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-[#111] border border-[#2A2A2A] hover:border-[#C9A84C]/30 rounded-2xl p-5 group transition-all duration-300 hover:bg-[#C9A84C]/5">
                <h3 className="text-white font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
