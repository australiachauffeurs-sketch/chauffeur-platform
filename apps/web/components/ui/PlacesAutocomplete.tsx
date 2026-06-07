"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface Prediction {
  place_id: string;
  description: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  id?: string;
}

export default function PlacesAutocomplete({
  value, onChange, placeholder = "Enter address", icon, className = "", id,
}: Props) {
  const [query,        setQuery]        = useState(value);
  const [predictions,  setPredictions]  = useState<Prediction[]>([]);
  const [open,         setOpen]         = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [highlighted,  setHighlighted]  = useState(-1);
  const sessionRef  = useRef(`sess_${Math.random().toString(36).slice(2)}`);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync external value changes
  useEffect(() => { setQuery(value); }, [value]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchPredictions = useCallback(async (input: string) => {
    if (input.length < 2) { setPredictions([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res  = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(input)}&session=${sessionRef.current}`);
      const data = await res.json();
      setPredictions(data.predictions || []);
      setOpen((data.predictions || []).length > 0);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val);       // propagate raw text immediately
    setHighlighted(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchPredictions(val), 280);
  };

  const selectPrediction = (pred: Prediction) => {
    setQuery(pred.description);
    onChange(pred.description);
    setPredictions([]);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted(h => Math.min(h + 1, predictions.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    if (e.key === "Enter" && highlighted >= 0) { e.preventDefault(); selectPrediction(predictions[highlighted]!); }
    if (e.key === "Escape") { setOpen(false); }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C9A84C] pointer-events-none">{icon}</span>}
        <input
          id={id}
          type="text"
          autoComplete="off"
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => predictions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className="input-luxury pl-10 pr-8 w-full"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(201,168,76,0.2)", borderTopColor: "#C9A84C" }} />
        )}
      </div>

      {open && predictions.length > 0 && (
        <ul className="absolute z-50 top-full mt-1 left-0 right-0 bg-white border border-[#E8E0D0] rounded-xl shadow-lg overflow-hidden max-h-64 overflow-y-auto">
          {predictions.map((pred, i) => (
            <li
              key={pred.place_id}
              onMouseDown={() => selectPrediction(pred)}
              onMouseEnter={() => setHighlighted(i)}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors text-sm ${
                i === highlighted ? "bg-[#FAF8F4] text-[#1C1611]" : "text-[#7A6F62] hover:bg-[#FAF8F4]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-1 flex-shrink-0" />
              <span className="leading-snug">{pred.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
