"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard",  label: "Dashboard"  },
  { href: "/bookings",   label: "Bookings"   },
  { href: "/drivers",    label: "Drivers"    },
  { href: "/fleet",      label: "Fleet"      },
  { href: "/customers",  label: "Customers"  },
  { href: "/pricing",    label: "Pricing"    },
  { href: "/promos",     label: "Promos"     },
  { href: "/analytics",  label: "Analytics"  },
  { href: "/surge",      label: "Surge"      },
  { href: "/corporate",  label: "Corporate"  },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="w-60 min-h-screen bg-white border-r border-[#E8E0D0] flex flex-col fixed left-0 top-0 bottom-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-[#E8E0D0]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-[#1C1611]"
            style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)" }}>E</div>
          <div>
            <p className="text-[#1C1611] font-bold text-sm">Elite Chauffeurs</p>
            <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {nav.map(({ href, label }) => {
          const active = path.startsWith(href);
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/25"
                  : "text-[#7A6F62] hover:text-[#1C1611] hover:bg-[#F5F1EB]"
              }`}>
              {label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#E8E0D0]">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] text-sm font-bold">A</div>
          <div>
            <p className="text-[#1C1611] text-xs font-medium">Admin User</p>
            <p className="text-[#B0A898] text-[10px]">admin@elitechauffeurs.com.au</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
