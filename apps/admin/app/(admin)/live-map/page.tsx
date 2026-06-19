"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const STATUS_COLOR: Record<string, string> = {
  available: "#22C55E",
  on_trip:   "#F97316",
  offline:   "#94A3B8",
};
const STATUS_LABEL: Record<string, string> = {
  available: "Available",
  on_trip:   "On Trip",
  offline:   "Offline",
};

declare global {
  interface Window { google: any; initMap: () => void; }
}

export default function LiveMapPage() {
  const mapRef       = useRef<HTMLDivElement>(null);
  const gMapRef      = useRef<any>(null);
  const markersRef   = useRef<Record<string, any>>({});
  const infoWindowRef = useRef<any>(null);

  const [drivers,    setDrivers]    = useState<any[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [filter,     setFilter]     = useState<"all"|"available"|"on_trip"|"offline">("all");
  const [selected,   setSelected]   = useState<any | null>(null);
  const [mapReady,   setMapReady]   = useState(false);

  // ── Fetch drivers with location ─────────────────────────────────────────
  const fetchDrivers = useCallback(async () => {
    try {
      const res  = await fetch("/api/admin/drivers/locations");
      const data = await res.json();
      setDrivers(data.drivers || []);
      setLastUpdate(new Date());
    } catch {}
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchDrivers();
    const interval = setInterval(fetchDrivers, 10000);
    return () => clearInterval(interval);
  }, [fetchDrivers]);

  // ── Load Google Maps ────────────────────────────────────────────────────
  useEffect(() => {
    if (window.google?.maps) { setMapReady(true); return; }
    window.initMap = () => setMapReady(true);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // ── Initialise map once ready ────────────────────────────────────────────
  useEffect(() => {
    if (!mapReady || !mapRef.current || gMapRef.current) return;
    gMapRef.current = new window.google.maps.Map(mapRef.current, {
      center:    { lat: -34.9285, lng: 138.6007 }, // Adelaide
      zoom:      11,
      mapTypeId: "roadmap",
      styles: [
        { featureType:"poi", elementType:"labels", stylers:[{ visibility:"off" }] },
        { featureType:"transit", stylers:[{ visibility:"off" }] },
      ],
      mapTypeControl:    false,
      streetViewControl: false,
      fullscreenControl: true,
    });
    infoWindowRef.current = new window.google.maps.InfoWindow();
  }, [mapReady]);

  // ── Update markers whenever drivers or filter changes ──────────────────
  useEffect(() => {
    if (!gMapRef.current || !window.google) return;

    const visible = drivers.filter(d =>
      d.current_lat && d.current_lng && (filter === "all" || d.status === filter)
    );
    const visibleIds = new Set(visible.map((d: any) => d.id));

    // Remove stale markers
    Object.keys(markersRef.current).forEach(id => {
      if (!visibleIds.has(id)) {
        markersRef.current[id].setMap(null);
        delete markersRef.current[id];
      }
    });

    visible.forEach((d: any) => {
      const pos   = { lat: parseFloat(d.current_lat), lng: parseFloat(d.current_lng) };
      const color = STATUS_COLOR[d.status] ?? STATUS_COLOR.offline;
      const label = `${d.first_name?.[0] ?? "?"}${d.last_name?.[0] ?? ""}`;

      const svgIcon = {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54">
            <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#00000044"/>
            </filter>
            <ellipse cx="22" cy="49" rx="8" ry="4" fill="#00000022"/>
            <circle cx="22" cy="22" r="20" fill="${color}" filter="url(#s)" stroke="white" stroke-width="3"/>
            <text x="22" y="27" font-family="Arial" font-weight="bold" font-size="13" fill="white" text-anchor="middle">${label}</text>
          </svg>
        `)}`,
        scaledSize: new window.google.maps.Size(44, 54),
        anchor:     new window.google.maps.Point(22, 54),
      };

      if (markersRef.current[d.id]) {
        markersRef.current[d.id].setPosition(pos);
        markersRef.current[d.id].setIcon(svgIcon);
      } else {
        const marker = new window.google.maps.Marker({
          position:  pos,
          map:       gMapRef.current,
          icon:      svgIcon,
          title:     `${d.first_name} ${d.last_name}`,
          animation: window.google.maps.Animation.DROP,
        });

        marker.addListener("click", () => {
          setSelected(d);
          const age = d.location_updated_at
            ? Math.round((Date.now() - new Date(d.location_updated_at).getTime()) / 60000)
            : null;
          infoWindowRef.current.setContent(`
            <div style="font-family:sans-serif;padding:4px 8px;min-width:160px;">
              <p style="font-weight:700;font-size:14px;margin:0 0 4px">${d.first_name} ${d.last_name}</p>
              <p style="color:${color};font-weight:600;font-size:12px;margin:0 0 2px">● ${STATUS_LABEL[d.status] ?? d.status}</p>
              ${d.vehicle_category ? `<p style="font-size:11px;color:#666;margin:0 0 2px;text-transform:capitalize">${d.vehicle_category}</p>` : ""}
              ${d.vehicle_plate ? `<p style="font-size:11px;color:#666;margin:0 0 2px">Plate: ${d.vehicle_plate}</p>` : ""}
              ${age !== null ? `<p style="font-size:10px;color:#999;margin:0">Updated ${age < 1 ? "<1" : age} min ago</p>` : ""}
            </div>
          `);
          infoWindowRef.current.open(gMapRef.current, marker);
        });

        markersRef.current[d.id] = marker;
      }
    });
  }, [drivers, filter, mapReady]);

  const filtered = drivers.filter(d => filter === "all" || d.status === filter);
  const counts   = {
    available: drivers.filter(d => d.status === "available").length,
    on_trip:   drivers.filter(d => d.status === "on_trip").length,
    offline:   drivers.filter(d => d.status === "offline").length,
    located:   drivers.filter(d => d.current_lat && d.current_lng).length,
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] gap-0">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-[#1C1611] font-black text-2xl">Live Driver Map</h1>
          <p className="text-[#B0A898] text-sm mt-0.5">
            {counts.located} driver{counts.located !== 1 ? "s" : ""} broadcasting location · auto-refreshes every 10s
          </p>
        </div>

        {lastUpdate && (
          <div className="flex items-center gap-2 text-xs text-[#B0A898] bg-[#F5F1EB] border border-[#E8E0D0] rounded-xl px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Last updated {lastUpdate.toLocaleTimeString("en-AU", { hour:"2-digit", minute:"2-digit", second:"2-digit" })}
            <button onClick={fetchDrivers} className="ml-2 text-[#C9A84C] hover:text-[#A07830] font-semibold transition-colors">↻ Refresh</button>
          </div>
        )}
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { key:"all",       label:"Total Drivers", count:drivers.length,    color:"#C9A84C", bg:"#FFF8EC" },
          { key:"available", label:"Available",      count:counts.available,  color:"#22C55E", bg:"#F0FDF4" },
          { key:"on_trip",   label:"On Trip",        count:counts.on_trip,    color:"#F97316", bg:"#FFF7ED" },
          { key:"offline",   label:"Offline",        count:counts.offline,    color:"#94A3B8", bg:"#F8FAFC" },
        ].map(s => (
          <button key={s.key} onClick={() => setFilter(s.key as any)}
            className={`rounded-xl p-3 text-left border transition-all ${filter === s.key ? "ring-2" : "hover:shadow-sm"}`}
            style={{
              backgroundColor: filter === s.key ? s.bg : "white",
              borderColor:     filter === s.key ? s.color : "#E8E0D0",
              ringColor:       s.color,
            }}>
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.count}</p>
            <p className="text-xs text-[#7A6F62] font-semibold mt-0.5">{s.label}</p>
          </button>
        ))}
      </div>

      {/* ── MAP + SIDEBAR ── */}
      <div className="flex gap-4 flex-1 min-h-0">

        {/* Map */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-[#E8E0D0] shadow-sm relative">
          <div ref={mapRef} className="w-full h-full" />

          {!mapReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F1EB]">
              <div className="text-4xl mb-3">🗺️</div>
              {GOOGLE_MAPS_KEY && GOOGLE_MAPS_KEY !== "your-google-maps-api-key-here"
                ? <p className="text-[#7A6F62] text-sm">Loading map…</p>
                : (
                  <div className="text-center px-6">
                    <p className="text-[#1C1611] font-bold mb-1">Google Maps API Key Required</p>
                    <p className="text-[#7A6F62] text-sm">Add <code className="bg-white px-1.5 py-0.5 rounded text-xs border">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your Vercel environment variables.</p>
                    <p className="text-[#B0A898] text-xs mt-2">Driver locations are still tracked in the table below.</p>
                  </div>
                )
              }
            </div>
          )}

          {/* Map legend */}
          {mapReady && (
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-[#E8E0D0] rounded-xl px-4 py-2.5 text-xs shadow-sm">
              {Object.entries(STATUS_COLOR).map(([k, c]) => (
                <div key={k} className="flex items-center gap-2 mb-1 last:mb-0">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: c }} />
                  <span className="text-[#7A6F62] font-medium capitalize">{STATUS_LABEL[k]}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Driver list sidebar */}
        <div className="w-72 flex flex-col gap-3 overflow-y-auto">
          {loading && drivers.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-[#B0A898] text-sm">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 p-4">
              <span className="text-3xl">🚗</span>
              <p className="text-[#7A6F62] text-sm font-medium">No drivers match this filter</p>
            </div>
          ) : filtered.map(d => {
            const color    = STATUS_COLOR[d.status] ?? STATUS_COLOR.offline;
            const hasLoc   = d.current_lat && d.current_lng;
            const ageMin   = d.location_updated_at
              ? Math.round((Date.now() - new Date(d.location_updated_at).getTime()) / 60000)
              : null;

            return (
              <button key={d.id}
                onClick={() => {
                  setSelected(d);
                  if (hasLoc && gMapRef.current) {
                    gMapRef.current.panTo({ lat: parseFloat(d.current_lat), lng: parseFloat(d.current_lng) });
                    gMapRef.current.setZoom(14);
                    markersRef.current[d.id]?.dispatchEvent
                      ? null
                      : window.google?.maps.event.trigger(markersRef.current[d.id], "click");
                  }
                }}
                className={`w-full text-left bg-white border rounded-xl p-3 transition-all hover:shadow-sm ${selected?.id === d.id ? "ring-2 ring-[#C9A84C] border-[#C9A84C]" : "border-[#E8E0D0]"}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                    {d.first_name?.[0]}{d.last_name?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1C1611] font-semibold text-sm truncate">{d.first_name} {d.last_name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-xs font-medium" style={{ color }}>{STATUS_LABEL[d.status] ?? d.status}</span>
                    </div>
                    {d.vehicle_category && (
                      <p className="text-[#B0A898] text-xs mt-0.5 capitalize truncate">{d.vehicle_category} {d.vehicle_plate ? `· ${d.vehicle_plate}` : ""}</p>
                    )}
                    {hasLoc ? (
                      <p className="text-[#B0A898] text-[10px] mt-1">
                        📍 {ageMin !== null ? `${ageMin < 1 ? "<1" : ageMin}m ago` : "location known"}
                      </p>
                    ) : (
                      <p className="text-[#E8E0D0] text-[10px] mt-1">📍 No location yet</p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
