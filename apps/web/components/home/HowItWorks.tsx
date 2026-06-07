const STEPS = [
  { num: "01", title: "Enter Your Route", desc: "Type your pickup and drop-off locations. Get an instant price based on real distance — no surprises." },
  { num: "02", title: "Choose Your Vehicle", desc: "Select from Executive Sedan, SUV, Luxury S-Class, Van or Stretch Limo. All vehicles include Wi-Fi & water." },
  { num: "03", title: "Confirm & Pay", desc: "Secure payment via card. Receive driver details 30 minutes before pickup with live tracking." },
  { num: "04", title: "Enjoy Your Ride", desc: "Your professional chauffeur arrives in a pristine vehicle. Sit back, relax, and arrive in style." },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] text-xs font-bold tracking-[0.3em] uppercase">Simple Process</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            How It Works
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

          {STEPS.map((step, i) => (
            <div key={step.num} className="relative text-center group">
              {/* Circle */}
              <div className="w-20 h-20 rounded-full bg-white border-2 border-[#C9A84C]/20 group-hover:border-[#C9A84C] flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:shadow-md group-hover:shadow-[#C9A84C]/20 transition-all duration-300">
                <span className="text-[#C9A84C] font-bold text-xl">{step.num}</span>
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 translate-x-7 w-6 h-6 rounded-full bg-[#C9A84C] flex items-center justify-center">
                <span className="text-black text-[10px] font-bold">{i + 1}</span>
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
