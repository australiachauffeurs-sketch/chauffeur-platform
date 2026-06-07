import Link from "next/link";

const FLEET = [
  {
    name: "Executive Sedan",
    model: "Mercedes-Benz E-Class",
    pax: 3, bags: 3,
    price: "From $65",
    tag: "Most Popular",
    tagColor: "bg-[#C9A84C] text-black",
    features: ["Wi-Fi", "Water & Mints", "Phone Charger", "Climate Control"],
    img: "https://images.unsplash.com/photo-1617814076668-8dfc6fe159ed?w=600&q=80",
    type: "sedan",
  },
  {
    name: "Premium SUV",
    model: "Mercedes-Benz GLE",
    pax: 6, bags: 6,
    price: "From $85",
    tag: "Best for Groups",
    tagColor: "bg-black text-white",
    features: ["Wi-Fi", "Panoramic Roof", "Extra Legroom", "Refreshments"],
    img: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&q=80",
    type: "suv",
  },
  {
    name: "Luxury Sedan",
    model: "Mercedes-Benz S-Class",
    pax: 3, bags: 3,
    price: "From $130",
    tag: "Top Tier",
    tagColor: "bg-[#111] text-[#C9A84C] border border-[#C9A84C]",
    features: ["Massage Seats", "Champagne", "Privacy Screen", "Premium Audio"],
    img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80",
    type: "luxury",
  },
  {
    name: "Executive Van",
    model: "Mercedes-Benz Viano",
    pax: 10, bags: 10,
    price: "From $100",
    tag: "Group Travel",
    tagColor: "bg-gray-800 text-white",
    features: ["Conference Setup", "Wi-Fi", "Large Luggage", "USB Ports"],
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    type: "van",
  },
];

export default function FleetShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-[#C9A84C] text-xs font-bold tracking-[0.3em] uppercase">Our Fleet</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Vehicles for Every Occasion
            </h2>
          </div>
          <Link href="/book" className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold text-sm hover:gap-3 transition-all">
            View All Vehicles →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {FLEET.map((car) => (
            <div key={car.name} className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-xl hover:shadow-[#C9A84C]/10 transition-all duration-300 bg-white flex flex-col">
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-gray-50">
                <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${car.tagColor}`}>{car.tag}</span>
                <span className="absolute bottom-3 right-3 text-white font-bold text-lg">{car.price}</span>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-3">
                  <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest mb-1">{car.name}</p>
                  <h3 className="text-gray-900 font-bold text-base">{car.model}</h3>
                  <div className="flex gap-4 mt-1.5 text-xs text-gray-500">
                    <span>{car.pax} passengers</span>
                    <span>{car.bags} bags</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
                  {car.features.map(f => (
                    <span key={f} className="text-[10px] bg-gray-50 text-gray-600 border border-gray-100 px-2 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>

                <Link
                  href={`/book?vehicle=${car.type}`}
                  className="block text-center bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-black font-bold text-sm py-2.5 rounded-xl hover:shadow-md hover:shadow-[#C9A84C]/30 transition-all"
                >
                  Book This Vehicle
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
