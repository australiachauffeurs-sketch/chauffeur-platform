"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { track } from "@/lib/track";

const GOLD = "#C9A84C";

/**
 * Instant quote lead form. Captures the lead via /api/lead, fires GA4
 * generate_lead, then sends the visitor into /book prefilled.
 */
export default function QuoteForm({
  defaultPickup = "",
  defaultDropoff = "",
  service,
  compact = false,
}: {
  defaultPickup?: string;
  defaultDropoff?: string;
  service?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [pickup, setPickup] = useState(defaultPickup);
  const [dropoff, setDropoff] = useState(defaultDropoff);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!pickup || !dropoff) { setError("Please enter pickup and drop-off."); return; }
    if (!phone) { setError("Please enter a phone number for your quote."); return; }
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, pickup, dropoff, service, sourcePage: pathname }),
      });
      track("generate_lead", { pickup, dropoff, service: service || "general", page: pathname });
    } catch { /* lead capture is best-effort; still continue to booking */ }
    router.push(`/book?from=${encodeURIComponent(pickup)}&to=${encodeURIComponent(dropoff)}`);
  };

  const input: React.CSSProperties = {
    background: "#111113",
    border: "1px solid #2A2A30",
    color: "#fff",
    padding: "13px 14px",
    borderRadius: 12,
    fontSize: 14,
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <form
      onSubmit={submit}
      style={{
        background: "#17171A",
        border: `1px solid rgba(201,168,76,0.25)`,
        borderRadius: 18,
        padding: compact ? 16 : 22,
        maxWidth: 520,
      }}
    >
      <p style={{ color: GOLD, fontWeight: 800, fontSize: compact ? 14 : 16, margin: "0 0 4px" }}>
        Get an Instant Fixed Quote
      </p>
      <p style={{ color: "#6B7280", fontSize: 12, margin: "0 0 14px" }}>
        Fixed price · No surge · Reply within minutes
      </p>
      <div style={{ display: "grid", gap: 10 }}>
        <input style={input} placeholder="Pickup address" value={pickup}
          onChange={(e) => setPickup(e.target.value)} aria-label="Pickup address" />
        <input style={input} placeholder="Drop-off address" value={dropoff}
          onChange={(e) => setDropoff(e.target.value)} aria-label="Drop-off address" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input style={input} placeholder="Your name" value={name}
            onChange={(e) => setName(e.target.value)} aria-label="Your name" />
          <input style={input} placeholder="Phone number" value={phone} inputMode="tel"
            onChange={(e) => setPhone(e.target.value)} aria-label="Phone number" />
        </div>
        {error && <p style={{ color: "#F87171", fontSize: 12, margin: 0 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            background: GOLD, color: "#09090B", border: "none", borderRadius: 12,
            padding: "14px 18px", fontWeight: 900, fontSize: 15, cursor: "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Sending…" : "Get My Quote →"}
        </button>
      </div>
    </form>
  );
}
