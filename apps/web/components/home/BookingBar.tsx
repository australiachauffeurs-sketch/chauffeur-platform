export default function BookingBar() {
  return (
    <div className="bg-[#0A0A0A] py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          {["Airport Transfers","Corporate Rides","Wedding Cars","Special Events","Hourly Hire","Long Distance"].map((label) => (
            <a key={label} href="/book" className="flex items-center gap-2 hover:text-[#C9A84C] transition-colors duration-200 group">
              <span className="font-medium group-hover:text-[#C9A84C]">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
