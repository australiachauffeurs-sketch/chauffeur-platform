const REVIEWS = [
  { name: "James Whitfield", role: "CEO, Whitfield Capital · Sydney", rating: 5, text: "I use Elite Chauffeurs every week for airport runs. The drivers are always early, the cars are pristine, and I can work uninterrupted the whole way. Absolutely worth every cent.", avatar: "J" },
  { name: "Priya Sharma", role: "Wedding Client · Melbourne", rating: 5, text: "Our stretch limo for the wedding was absolutely stunning. The driver was impeccable — perfectly on time, beautifully dressed, and made our day even more special.", avatar: "P" },
  { name: "David Chen", role: "Finance Director · Brisbane", rating: 5, text: "Our entire executive team uses Elite Chauffeurs. The corporate account billing is seamless and every driver is professional. No complaints in 18 months.", avatar: "D" },
  { name: "Sarah O'Brien", role: "Event Manager · Gold Coast", rating: 5, text: "Organised 12 vehicles for a corporate gala dinner. Every single one arrived on time, drivers knew the plan, and the whole evening ran flawlessly.", avatar: "S" },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#C9A84C] text-xs font-bold tracking-[0.3em] uppercase">Client Stories</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex gap-0.5">{Array(5).fill(0).map((_,i) => <span key={i} className="text-[#C9A84C] text-lg">★</span>)}</div>
            <span className="text-gray-500 text-sm">4.9 out of 5 from 2,400+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map(r => (
            <div key={r.name} className="bg-gray-50 border border-gray-100 hover:border-[#C9A84C]/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A84C]/5 group">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array(r.rating).fill(0).map((_,i) => <span key={i} className="text-[#C9A84C] text-sm">★</span>)}
              </div>
              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{r.text}"</p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A07830] flex items-center justify-center text-black font-bold flex-shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{r.name}</p>
                  <p className="text-gray-400 text-xs">{r.role}</p>
                </div>
                <div className="ml-auto text-2xl text-[#C9A84C]/20 group-hover:text-[#C9A84C]/40 transition-colors" style={{ fontFamily: "Georgia, serif" }}>"</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
