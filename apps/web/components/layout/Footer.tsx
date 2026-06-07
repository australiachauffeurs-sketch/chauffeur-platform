import Link from "next/link";

const services = [
  "Airport Transfers",
  "Corporate Travel",
  "Wedding Chauffeur",
  "Special Events",
  "Hourly Hire",
  "Long Distance",
];

const cities = [
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Gold Coast",
];

const company = [
  { label: "About Us", href: "/about"    },
  { label: "Our Fleet", href: "/#fleet"  },
  { label: "Careers",  href: "/careers"  },
  { label: "Blog",     href: "/blog"     },
  { label: "Contact",  href: "/contact"  },
];

export default function Footer() {
  return (
    <footer className="bg-[#F5F1EB] border-t border-[#E8E0D0]">
      {/* Top gold rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)", color: "#1C1611" }}>
                E
              </div>
              <div>
                <div className="text-[#1C1611] font-bold text-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Elite Chauffeurs
                </div>
                <div className="text-[#C9A84C] text-xs tracking-widest uppercase">Australia</div>
              </div>
            </div>
            <p className="text-[#7A6F62] text-sm leading-relaxed mb-6">
              Premium luxury chauffeur service across Australia. Punctual,
              professional, and perfectly appointed for every journey.
            </p>
            <div className="flex gap-3">
              {["F", "I", "L", "X"].map((s, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-full border border-[#E8E0D0] bg-white flex items-center justify-center text-[#7A6F62] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors duration-200 text-xs font-semibold">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#1C1611] font-semibold mb-5 text-sm tracking-widest uppercase">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s}>
                  <a href="#" className="text-[#7A6F62] hover:text-[#C9A84C] text-sm transition-colors duration-200">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-[#1C1611] font-semibold mb-5 text-sm tracking-widest uppercase">
              Coverage
            </h4>
            <ul className="space-y-3">
              {cities.map(c => (
                <li key={c}>
                  <a href="#" className="text-[#7A6F62] hover:text-[#C9A84C] text-sm transition-colors duration-200">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Contact */}
          <div>
            <h4 className="text-[#1C1611] font-semibold mb-5 text-sm tracking-widest uppercase">
              Company
            </h4>
            <ul className="space-y-3 mb-8">
              {company.map(item => (
                <li key={item.label}>
                  <Link href={item.href}
                    className="text-[#7A6F62] hover:text-[#C9A84C] text-sm transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <p className="text-[#7A6F62] text-sm">1800 ELITE AU</p>
              <p className="text-[#7A6F62] text-sm">bookings@elitechauffeurs.com.au</p>
              <p className="text-[#7A6F62] text-sm">24/7 Service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E8E0D0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#B0A898] text-sm">
            © {new Date().getFullYear()} Elite Chauffeurs Australia Pty Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[#B0A898] hover:text-[#C9A84C] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[#B0A898] hover:text-[#C9A84C] text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
