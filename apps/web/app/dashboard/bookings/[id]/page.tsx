import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import LiveDriverMap from "@/components/booking/LiveDriverMap";

const STATUS_COLOR: Record<string, string> = {
  pending:         "#FBBF24",
  confirmed:       "#60A5FA",
  driver_assigned: "#A78BFA",
  en_route:        "#F97316",
  arrived:         "#22C55E",
  in_progress:     "#C9A84C",
  completed:       "#22C55E",
  cancelled:       "#EF4444",
};

const STATUS_LABEL: Record<string, string> = {
  pending:         "Pending",
  confirmed:       "Confirmed",
  driver_assigned: "Driver Assigned",
  en_route:        "En Route",
  arrived:         "Driver Arrived",
  in_progress:     "In Progress",
  completed:       "Completed",
  cancelled:       "Cancelled",
};

const ACTIVE_STATUSES = ["driver_assigned", "en_route", "arrived", "in_progress"];

// Demo booking for when Supabase is not configured or booking not found
const DEMO_BOOKING = {
  id:              "BK8821",
  status:          "en_route",
  total_amount:    142.35,
  pickup_address:  "Sydney Airport T1, Mascot NSW 2020",
  dropoff_address: "1 Martin Place, Sydney CBD NSW 2000",
  scheduled_at:    new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  driver_id:       "demo-driver",
  driver_name:     "Marcus Thompson",
  vehicle_category:"Executive Sedan",
  passengers:      2,
  distance_km:     24.3,
  notes:           null,
};

async function getBooking(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("your-project")) return null;

  try {
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

export default async function BookingDetailPage({ params }: { params: { id: string } }) {
  const real = await getBooking(params.id);
  const b = real ?? (params.id === DEMO_BOOKING.id ? DEMO_BOOKING : null);

  if (!b) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#7A6F62] text-lg mb-4">Booking not found.</p>
          <Link href="/dashboard/bookings"
            className="text-[#C9A84C] font-semibold hover:underline">
            ← Back to Bookings
          </Link>
        </div>
      </div>
    );
  }

  const color  = STATUS_COLOR[b.status]  ?? "#7A6F62";
  const label  = STATUS_LABEL[b.status]  ?? b.status?.replace(/_/g, " ");
  const isActive = ACTIVE_STATUSES.includes(b.status);
  const scheduledDate = b.scheduled_at
    ? new Date(b.scheduled_at).toLocaleString("en-AU", { dateStyle: "full", timeStyle: "short" })
    : null;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Back link */}
      <Link href="/dashboard/bookings"
        className="inline-flex items-center gap-1.5 text-sm text-[#7A6F62] hover:text-[#C9A84C] transition-colors font-medium">
        ← All Bookings
      </Link>

      {/* Header card */}
      <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-[#B0A898] text-xs font-mono mb-1">{b.id}</p>
            <p className="text-[#1C1611] font-black text-3xl">${(b.total_amount ?? 0).toFixed(2)}</p>
            {scheduledDate && (
              <p className="text-[#7A6F62] text-sm mt-1">{scheduledDate}</p>
            )}
          </div>
          <span
            className="self-start px-3 py-1.5 rounded-full text-xs font-bold border"
            style={{
              color:           color,
              borderColor:     color,
              backgroundColor: `${color}20`,
            }}>
            {label}
          </span>
        </div>

        {/* Trip meta */}
        <div className="flex flex-wrap gap-4 text-sm text-[#7A6F62] border-t border-[#F5F1EB] pt-4">
          {b.vehicle_category && <span>{b.vehicle_category}</span>}
          {b.passengers       && <span>{b.passengers} passenger{b.passengers !== 1 ? "s" : ""}</span>}
          {b.distance_km      && <span>{b.distance_km} km</span>}
          {b.driver_name      && <span>Driver: {b.driver_name}</span>}
        </div>
      </div>

      {/* Live tracking */}
      {isActive && (
        <div>
          <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-3">Live Tracking</p>
          <LiveDriverMap
            bookingId={b.id}
            driverId={b.driver_id}
            pickupAddress={b.pickup_address}
            dropoffAddress={b.dropoff_address}
            status={b.status}
          />
        </div>
      )}

      {/* Route */}
      <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
        <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-4">Route</p>
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
            <div className="w-0.5 h-full bg-[#E8E0D0] flex-shrink-0 min-h-[2rem]" />
          </div>
          <div className="pb-4">
            <p className="text-[#B0A898] text-xs font-semibold uppercase tracking-wide mb-1">Pickup</p>
            <p className="text-[#1C1611] font-medium">{b.pickup_address ?? "—"}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-3 h-3 rounded-full bg-[#C9A84C] flex-shrink-0 mt-5" />
          <div>
            <p className="text-[#B0A898] text-xs font-semibold uppercase tracking-wide mb-1">Drop-off</p>
            <p className="text-[#1C1611] font-medium">{b.dropoff_address ?? "—"}</p>
          </div>
        </div>
      </div>

      {/* Notes */}
      {b.notes && (
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
          <p className="text-xs text-[#B0A898] uppercase tracking-widest font-bold mb-3">Notes</p>
          <p className="text-[#7A6F62] text-sm leading-relaxed">{b.notes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pb-8">
        {b.status === "completed" && (
          <>
            <Link href={`/book?rebook=${b.id}`}
              className="text-sm font-semibold bg-[#F5F1EB] text-[#7A6F62] px-5 py-2.5 rounded-xl hover:bg-[#E8E0D0] transition-all">
              Rebook
            </Link>
            <a href={`/api/booking/${b.id}/receipt`} target="_blank" rel="noreferrer"
              className="text-sm font-semibold bg-[#FFF8EC] text-[#C9A84C] px-5 py-2.5 rounded-xl hover:bg-[#C9A84C] hover:text-[#1C1611] transition-all border border-[#C9A84C]/30">
              Download Receipt ↗
            </a>
          </>
        )}
        <Link href="/book"
          className="text-sm font-bold text-[#1C1611] px-5 py-2.5 rounded-xl"
          style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
          + New Booking
        </Link>
      </div>
    </div>
  );
}
