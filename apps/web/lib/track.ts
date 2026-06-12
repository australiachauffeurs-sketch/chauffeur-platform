"use client";

/** Fire a GA4 event if gtag is loaded (no-op otherwise). */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", event, params);
  }
}
