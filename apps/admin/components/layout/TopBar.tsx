"use client";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/bookings": "Bookings",
  "/drivers": "Drivers",
  "/fleet": "Fleet",
  "/customers": "Customers",
  "/pricing": "Pricing Config",
};

export default function TopBar() {
  const path = usePathname();
  const title = Object.entries(PAGE_TITLES).find(([k]) => path.startsWith(k))?.[1] ?? "Admin";

  return (
    <header className="h-16 bg-white border-b border-[#E8E0D0] flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="text-[#1C1611] font-semibold text-lg">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="text-[#7A6F62] text-sm cursor-pointer hover:text-[#C9A84C] transition-colors">Alerts</span>
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C9A84C]" />
        </div>
        <div className="w-px h-5 bg-[#E8E0D0]" />
        <div className="flex items-center gap-2 text-sm text-[#7A6F62]">
          <div className="w-7 h-7 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] font-bold text-xs">A</div>
          <span className="hidden sm:block">Admin</span>
        </div>
      </div>
    </header>
  );
}
