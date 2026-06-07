const CITIES = [
  { name: "Sydney",    img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80", rides: "4,200+ rides" },
  { name: "Melbourne", img: "https://images.unsplash.com/photo-1514395462185-48ea5c4e9d1c?w=400&q=80", rides: "3,800+ rides" },
  { name: "Brisbane",  img: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=400&q=80", rides: "2,100+ rides" },
  { name: "Perth",     img: "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?w=400&q=80", rides: "1,400+ rides" },
  { name: "Adelaide",  img: "https://images.unsplash.com/photo-1566734904496-9309bb1798ae?w=400&q=80", rides: "980+ rides"  },
  { name: "Gold Coast",img: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=400&q=80", rides: "1,200+ rides" },
];

export default function CoverageSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#C9A84C] text-xs font-bold tracking-[0.3em] uppercase">Where We Operate</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Serving All Major Cities
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            From airport pickups to corporate events, we operate across 6 major Australian cities with the same premium standard everywhere.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CITIES.map(city => (
            <div key={city.name} className="group relative rounded-2xl overflow-hidden cursor-pointer h-44">
              <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/10 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-bold text-xl">{city.name}</h3>
                <p className="text-[#C9A84C] text-xs font-medium mt-0.5">{city.rides}</p>
              </div>
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-black text-xs font-bold">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
