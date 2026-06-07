"use client";

import { useEffect, useState, useRef } from "react";

interface DriverLocation {
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
  updated_at?: string;
}

interface Props {
  bookingId: string;
  driverId?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  status?: string;
}

const ACTIVE_STATUSES = ["driver_assigned", "en_route", "arrived", "in_progress"];

const DEMO_LOCATIONS = [
  { lat: -33.8695, lng: 151.2072 },  // Sydney CBD
  { lat: -33.8680, lng: 151.2065 },
  { lat: -33.8660, lng: 151.2055 },
  { lat: -33.8640, lng: 151.2040 },
  { lat: -33.8620, lng: 151.2025 },
];

export default function LiveDriverMap({ bookingId, driverId, pickupAddress, dropoffAddress, status }: Props) {
  if (status && !ACTIVE_STATUSES.includes(status)) return null;
  const [driverLoc,   setDriverLoc]   = useState<DriverLocation | null>(null);
  const [eta,         setEta]         = useState<string | null>(null);
  const [connected,   setConnected]   = useState(false);
  const [demoIndex,   setDemoIndex]   = useState(0);
  const demoRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const channelRef = useRef<any>(null);

  const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

  useEffect(() => {
    if (isDemo) {
      // Animate demo driver moving toward pickup
      setDriverLoc(DEMO_LOCATIONS[0] ?? null);
      setEta("~4 min");
      setConnected(true);
      let idx = 0;
      demoRef.current = setInterval(() => {
        idx = (idx + 1) % DEMO_LOCATIONS.length;
        setDemoIndex(idx);
        setDriverLoc(DEMO_LOCATIONS[idx] ?? null);
        const remaining = DEMO_LOCATIONS.length - idx;
        setEta(`~${remaining} min`);
      }, 3000);
      return () => { if (demoRef.current) clearInterval(demoRef.current); };
    }

    // Real Supabase Realtime
    (async () => {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Fetch initial location
        const { data: initial } = await supabase
          .from("driver_locations")
          .select("lat, lng, heading, speed, updated_at")
          .eq("driver_id", driverId)
          .single();

        if (initial) setDriverLoc(initial);

        // Subscribe to changes
        const channel = supabase
          .channel(`driver-location-${driverId}`)
          .on(
            "postgres_changes",
            {
              event:  "UPDATE",
              schema: "public",
              table:  "driver_locations",
              filter: `driver_id=eq.${driverId}`,
            },
            (payload: any) => {
              setDriverLoc(payload.new);
              setConnected(true);
            }
          )
          .subscribe((status: string) => {
            setConnected(status === "SUBSCRIBED");
          });

        channelRef.current = channel;
      } catch (err) {
        console.error("[LiveMap] Supabase realtime error:", err);
      }
    })();

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe?.();
      }
    };
  }, [bookingId, driverId, isDemo]);

  // Build Google Maps static/embed URL (only if Google Maps key configured)
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  const mapUrl = driverLoc && googleKey
    ? `https://www.google.com/maps/embed/v1/view?key=${googleKey}&center=${driverLoc.lat},${driverLoc.lng}&zoom=15&maptype=roadmap`
    : null;

  // OpenStreetMap fallback (free, no key)
  const osmUrl = driverLoc
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${driverLoc.lng - 0.008},${driverLoc.lat - 0.006},${driverLoc.lng + 0.008},${driverLoc.lat + 0.006}&layer=mapnik&marker=${driverLoc.lat},${driverLoc.lng}`
    : null;

  const embedUrl = mapUrl ?? osmUrl;

  return (
    <div className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#F5F1EB]">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-[#E8E0D0]"}`} />
          <span className="text-xs font-semibold text-[#7A6F62]">
            {connected ? "Live Tracking" : "Connecting…"}
          </span>
          {isDemo && <span className="text-[10px] text-[#B0A898] bg-[#F5F1EB] px-2 py-0.5 rounded-full">demo</span>}
        </div>
        {eta && (
          <div className="text-right">
            <span className="text-[#C9A84C] font-bold text-sm">ETA {eta}</span>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="relative">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="280"
            className="block"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Driver location"
          />
        ) : (
          <div className="h-[280px] bg-[#F5F1EB] flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full border-2 border-[#C9A84C]/30 flex items-center justify-center mb-3"><svg className="w-5 h-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg></div>
              <p className="text-[#B0A898] text-sm">Waiting for driver location…</p>
            </div>
          </div>
        )}

        {/* Driver pin overlay */}
        {driverLoc && (
          <div className="absolute top-2 right-2 bg-white border border-[#E8E0D0] rounded-xl px-3 py-2 shadow-sm text-xs text-[#7A6F62] space-y-0.5">
            <div className="font-mono">{driverLoc.lat.toFixed(5)}, {driverLoc.lng.toFixed(5)}</div>
            {driverLoc.speed && <div>{Math.round(driverLoc.speed)} km/h</div>}
            {driverLoc.updated_at && (
              <div className="text-[#B0A898]">
                {new Date(driverLoc.updated_at).toLocaleTimeString("en-AU", { timeStyle: "short" })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Route labels */}
      {(pickupAddress || dropoffAddress) && (
        <div className="px-5 py-3 space-y-1.5 border-t border-[#F5F1EB]">
          {pickupAddress && (
            <div className="flex items-center gap-2 text-xs text-[#7A6F62]">
              <span className="text-green-500 font-bold">●</span>
              <span className="truncate">{pickupAddress}</span>
            </div>
          )}
          {dropoffAddress && (
            <div className="flex items-center gap-2 text-xs text-[#7A6F62]">
              <span className="text-[#C9A84C] font-bold">●</span>
              <span className="truncate">{dropoffAddress}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
