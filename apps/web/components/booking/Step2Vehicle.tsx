"use client";

import { useEffect, useState } from "react";
import type { BookingData } from "./BookingWizard";

interface Props {
  data: BookingData;
  update: (fields: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const VEHICLES = [
  {
    category: "sedan",
    name: "Executive Sedan",
    description: "Mercedes E-Class or equivalent",
    features: ["3 passengers", "3 bags", "Wi-Fi", "Bottled water"],
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=200&fit=crop",
  },
  {
    category: "suv",
    name: "Premium SUV",
    description: "Mercedes GLE or equivalent",
    features: ["6 passengers", "6 bags", "Wi-Fi", "Leather seating"],
    imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=200&fit=crop",
  },
  {
    category: "luxury",
    name: "Luxury Sedan",
    description: "Mercedes S-Class or BMW 7 Series",
    features: ["3 passengers", "3 bags", "Wi-Fi", "Premium audio"],
    imageUrl: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=400&h=200&fit=crop",
  },
  {
    category: "van",
    name: "Executive Van",
    description: "Mercedes Viano or Sprinter Executive",
    features: ["8 passengers", "8 bags", "Conference seating", "Wi-Fi"],
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
  },
  {
    category: "stretch_limo",
    name: "Stretch Limousine",
    description: "Lincoln Town Car Stretch",
    features: ["8 passengers", "5 bags", "Bar service", "Mood lighting"],
    imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=200&fit=crop",
  },
];

function formatAUD(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(n);
}

export default function Step2Vehicle({ data, update, onNext, onBack }: Props) {
  const [quotes, setQuotes] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPricing() {
      setLoading(true);
      try {
        const res = await fetch("/api/pricing/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            distanceKm: data.distanceKm,
            durationMinutes: data.durationMinutes,
            bookingType: data.bookingType,
            scheduledAt: data.scheduledAt,
            isAirport: data.bookingType === "airport_transfer",
          }),
        });
        if (res.ok) {
          const result = await res.json();
          setQuotes(result.quotes);
          if (result.pricingBreakdowns?.[data.vehicleCategory]) {
            update({ pricing: result.pricingBreakdowns[data.vehicleCategory] });
          }
        }
      } catch {
        console.error("Failed to fetch pricing");
      } finally {
        setLoading(false);
      }
    }
    fetchPricing();
  }, [data.distanceKm, data.bookingType, data.scheduledAt]);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-dark mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Choose Your Vehicle
      </h2>
      <p className="text-gray-500 text-sm mb-2">
        Route: <span className="text-gold font-medium">{data.pickup}</span> →{" "}
        <span className="text-gold font-medium">{data.dropoff}</span>
      </p>
      <p className="text-gray-400 text-xs mb-8">
        {data.distanceKm.toFixed(1)} km · ~{data.durationMinutes} min
      </p>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-gray-400 text-sm">Calculating prices…</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {VEHICLES.map((v) => {
            const price = quotes[v.category];
            const isSelected = data.vehicleCategory === v.category;
            return (
              <button
                key={v.category}
                onClick={() => update({ vehicleCategory: v.category })}
                className={`text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 relative ${
                  isSelected
                    ? "border-gold shadow-gold"
                    : "border-gray-200 hover:border-gold/40"
                }`}
              >
                {/* Vehicle image */}
                <div className="relative h-36 overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.imageUrl}
                    alt={v.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a styled gradient if image fails
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Price badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm rounded-xl px-3 py-1.5">
                    <p className="text-white font-bold text-sm">{price ? formatAUD(price) : "—"}</p>
                    <p className="text-gray-300 text-[10px]">inc. GST</p>
                  </div>

                  {/* Selected checkmark overlay */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gold flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className={`p-4 ${isSelected ? "bg-gold/5" : "bg-white"}`}>
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <p className="font-bold text-dark text-sm">{v.name}</p>
                      <p className="text-gray-500 text-xs">{v.description}</p>
                    </div>
                  </div>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {v.features.map((f) => (
                      <span
                        key={f}
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-gold/20 text-[#8a6b1e]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-outline-gold flex-1 py-3.5">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!data.vehicleCategory}
          className="btn-gold flex-1 py-3.5 disabled:opacity-50"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
