"use client";

import { useState } from "react";
import type { BookingData } from "./BookingWizard";
import PlacesAutocomplete from "@/components/ui/PlacesAutocomplete";

interface Props {
  data: BookingData;
  update: (fields: Partial<BookingData>) => void;
  onNext: () => void;
}

const SERVICE_TYPES = [
  { value: "airport_transfer", label: "Airport Transfer", desc: "To or from the airport" },
  { value: "corporate",        label: "Corporate",        desc: "Business travel"        },
  { value: "wedding",          label: "Wedding",          desc: "Bridal & wedding parties"},
  { value: "special_event",    label: "Special Event",    desc: "Races, galas, concerts" },
  { value: "hourly",           label: "Hourly Hire",      desc: "Book by the hour"       },
];

export default function Step1Location({ data, update, onNext }: Props) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const [waypoints, setWaypoints] = useState<string[]>(data.waypoints ?? []);
  const addWaypoint    = () => setWaypoints(prev => [...prev, ""]);
  const removeWaypoint = (i: number) => setWaypoints(prev => prev.filter((_, idx) => idx !== i));
  const updateWaypoint = (i: number, val: string) => setWaypoints(prev => prev.map((w, idx) => idx === i ? val : w));

  const handleCalculate = async () => {
    if (!data.pickup || !data.dropoff) {
      setError("Please enter both pickup and drop-off locations.");
      return;
    }
    if (!data.scheduledAt) {
      setError("Please select a pickup date and time.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/pricing/distance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickup: data.pickup, dropoff: data.dropoff }),
      });

      if (!res.ok) throw new Error("Failed to calculate distance");

      const result = await res.json();
      update({
        distanceKm:      result.distanceKm,
        durationMinutes: result.durationMinutes,
        waypoints:       waypoints.filter(w => w.trim() !== ""),
      });
      onNext();
    } catch {
      setError("Could not calculate route. Please check the addresses and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[#1C1611] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Where are you going?
      </h2>
      <p className="text-[#7A6F62] text-sm mb-8">
        Enter your pickup and drop-off locations to get an instant quote.
      </p>

      {/* Service Type */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-[#1C1611] mb-3">Service Type</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICE_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => update({ bookingType: type.value })}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                data.bookingType === type.value
                  ? "border-[#C9A84C] bg-[#C9A84C]/5"
                  : "border-[#E8E0D0] hover:border-[#C9A84C]/40"
              }`}
            >
              <div className="font-semibold text-[#1C1611] text-sm">{type.label}</div>
              <div className="text-[#B0A898] text-xs mt-0.5">{type.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Pickup */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#1C1611] mb-2">
          Pickup Location
        </label>
        <PlacesAutocomplete
          value={data.pickup}
          onChange={(val) => update({ pickup: val })}
          placeholder="e.g. Sydney Airport, T1"
        />
        {data.bookingType === "airport_transfer" && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Flight number (optional, e.g. QF401)"
              value={data.flightNumber}
              onChange={(e) => update({ flightNumber: e.target.value })}
              className="input-luxury text-sm"
            />
          </div>
        )}
      </div>

      {/* Dropoff */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#1C1611] mb-2">
          Drop-off Location
        </label>
        <PlacesAutocomplete
          value={data.dropoff}
          onChange={(val) => update({ dropoff: val })}
          placeholder="e.g. 1 Martin Place, Sydney CBD"
        />
      </div>

      {/* Waypoints — Multi-Stop */}
      <div className="mb-4">
        {waypoints.map((wp, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <input
              value={wp}
              onChange={e => updateWaypoint(i, e.target.value)}
              placeholder={`Stop ${i + 1}…`}
              className="flex-1 input-luxury text-sm"
            />
            <button
              type="button"
              onClick={() => removeWaypoint(i)}
              className="text-red-400 hover:text-red-600 px-3 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
        {waypoints.length < 3 && (
          <button
            type="button"
            onClick={addWaypoint}
            className="mt-3 text-[#C9A84C] text-sm font-semibold hover:text-[#d4a93a] transition-colors"
          >
            + Add Stop
          </button>
        )}
      </div>

      {/* Date & Time */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-[#1C1611] mb-2">
          Pick-up Date & Time
        </label>
        <input
          type="datetime-local"
          value={data.scheduledAt}
          onChange={(e) => update({ scheduledAt: e.target.value })}
          min={new Date().toISOString().slice(0, 16)}
          className="input-luxury"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleCalculate}
        disabled={loading || !data.pickup || !data.dropoff || !data.scheduledAt}
        className="btn-gold w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Calculating route…" : "Calculate Price & Continue →"}
      </button>

      <p className="text-[#B0A898] text-xs text-center mt-4">
        Prices calculated using Google Maps distance • All prices include GST
      </p>
    </div>
  );
}
