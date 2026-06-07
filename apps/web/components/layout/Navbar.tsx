"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/* ── Premium SVG Logo ───────────────────────────────────────────── */
function EliteLogo({ scrolled }: { scrolled: boolean }) {
  return (
    <svg width="160" height="52" viewBox="0 0 160 52" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300" style={{ filter: scrolled ? "none" : "drop-shadow(0 1px 4px rgba(0,0,0,0.4))" }}>
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#C9A84C" />
          <stop offset="45%"  stopColor="#F0D878" />
          <stop offset="100%" stopColor="#A07830" />
        </linearGradient>
        <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#A07830" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
      </defs>

      {/* ── Crest emblem ── */}
      {/* outer diamond frame */}
      <path d="M26 4 L42 19 L26 48 L10 19 Z" fill="none" stroke="url(#lg1)" strokeWidth="1.2" />
      {/* inner thin diamond */}
      <path d="M26 10 L37 21 L26 42 L15 21 Z" fill="none" stroke="url(#lg2)" strokeWidth="0.6" strokeOpacity="0.6" />
      {/* top ornament */}
      <path d="M26 4 L23 8 L26 7 L29 8 Z" fill="url(#lg1)" />
      {/* bottom ornament */}
      <path d="M26 48 L23 44 L26 45 L29 44 Z" fill="url(#lg1)" />
      {/* side dots */}
      <circle cx="10" cy="19" r="1.5" fill="url(#lg1)" />
      <circle cx="42" cy="19" r="1.5" fill="url(#lg1)" />
      {/* decorative horizontal rule inside crest */}
      <line x1="16" y1="19" x2="36" y2="19" stroke="url(#lg1)" strokeWidth="0.5" strokeOpacity="0.4" />

      {/* ── Large E monogram ── */}
      <text x="26" y="27" textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
        fontSize="22" fontWeight="600" fill="url(#lg1)" letterSpacing="0">
        E
      </text>

      {/* ── Wordmark ── */}
      {/* ELITE */}
      <text x="54" y="22" fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
        fontSize="18" fontWeight="600" letterSpacing="2"
        fill={scrolled ? "#1C1611" : "white"} className="transition-all duration-300">
        ELITE
      </text>

      {/* thin gold rule between words */}
      <line x1="54" y1="27" x2="154" y2="27" stroke="url(#lg1)" strokeWidth="0.6" strokeOpacity="0.5" />

      {/* CHAUFFEURS */}
      <text x="54" y="38" fontFamily="'Inter', sans-serif"
        fontSize="8.5" fontWeight="400" letterSpacing="3.5"
        fill="url(#lg1)">
        CHAUFFEURS
      </text>
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Services", href: "/#services"  },
  { label: "Fleet",    href: "/#fleet"     },
  { label: "About",    href: "/#about"     },
  { label: "Contact",  href: "/#contact"   },
];

export default function Navbar() {
  const [scrolled,     setScrolled]    = useState(false);
  const [mobileOpen,   setMobileOpen]  = useState(false);
  const [user,         setUser]        = useState<{ name: string; email: string } | null>(null);
  const [dropdownOpen, setDropdown]    = useState(false);
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("ec_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("ec_user");
    setUser(null);
    setDropdown(false);
    router.push("/");
  };

  const initials = user
    ? `${user.name?.split(" ")[0]?.[0] ?? ""}${user.name?.split(" ")[1]?.[0] ?? ""}`.toUpperCase()
    : "";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8E0D0]"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="group flex items-center">
            <EliteLogo scrolled={scrolled} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link key={link.label} href={link.href}
                className={`transition-colors duration-200 text-sm font-medium tracking-wide hover:text-[#C9A84C] ${
                  scrolled ? "text-[#7A6F62]" : "text-white/80"
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdownOpen)}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2 transition-all duration-200 border ${
                    scrolled
                      ? "bg-white border-[#E8E0D0] hover:border-[#C9A84C]/60"
                      : "bg-white/10 border-white/20 hover:border-[#C9A84C]/60"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)", color: "#1C1611" }}>
                    {initials}
                  </div>
                  <div className="text-left">
                    <p className={`text-xs font-semibold leading-tight ${scrolled ? "text-[#1C1611]" : "text-white"}`}>{user.name?.split(" ")[0]}</p>
                    <p className="text-[#B0A898] text-[10px]">My Account</p>
                  </div>
                  <span className={`text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""} ${scrolled ? "text-[#7A6F62]" : "text-white/60"}`}>▾</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#E8E0D0] rounded-2xl shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[#F0EBE2]">
                      <p className="text-[#1C1611] text-sm font-semibold">{user.name}</p>
                      <p className="text-[#B0A898] text-xs truncate">{user.email}</p>
                    </div>
                    {[
                      { label: "Dashboard",   href: "/dashboard"          },
                      { label: "My Bookings", href: "/dashboard/bookings" },
                      { label: "New Booking", href: "/book"               },
                      { label: "My Profile",  href: "/dashboard/profile"  },
                    ].map(item => (
                      <Link key={item.label} href={item.href}
                        onClick={() => setDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-[#7A6F62] hover:text-[#1C1611] hover:bg-[#FAF8F4] transition-colors text-sm">
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-[#F0EBE2]">
                      <button onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors text-sm w-full text-left">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login"
                  className="btn-outline-gold text-sm py-2 px-5">
                  Sign In
                </Link>
                <Link href="/book"
                  className="btn-gold text-sm py-2 px-5">
                  Book Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-[#C9A84C] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-[#C9A84C] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-[#C9A84C] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E8E0D0] shadow-lg">
          <div className="px-4 py-6 flex flex-col gap-3">
            {NAV_LINKS.map(link => (
              <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                className="text-[#7A6F62] hover:text-[#C9A84C] py-2 border-b border-[#F0EBE2] text-sm font-medium">
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 mt-2">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                    className="btn-gold text-sm w-full text-center py-3">
                    Go to Dashboard
                  </Link>
                  <button onClick={handleSignOut}
                    className="text-sm text-red-500 border border-red-200 rounded-xl py-2.5 text-center w-full">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="btn-outline-gold text-sm w-full text-center">Sign In</Link>
                  <Link href="/book" onClick={() => setMobileOpen(false)} className="btn-gold text-sm w-full text-center">Book Now</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
