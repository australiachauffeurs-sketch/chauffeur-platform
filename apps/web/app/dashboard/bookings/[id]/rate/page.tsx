"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ASPECTS = [
  { key: "punctuality",   label: "Punctuality",    emoji: "" },
  { key: "professionalism", label: "Professionalism", emoji: "" },
  { key: "vehicle",       label: "Vehicle Condition", emoji: "" },
  { key: "navigation",    label: "Route & Navigation", emoji: "" },
];

const QUICK_COMPLIMENTS = [
  "Arrived early", "Very professional", "Excellent driver",
  "Spotless vehicle", "Smooth ride", "Great conversation",
  "Safe driving", "Very courteous",
];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="text-3xl transition-transform hover:scale-110 active:scale-95"
        >
          <span className={(hover || value) >= n ? "text-[#C9A84C]" : "text-[#E8E0D0]"}>★</span>
        </button>
      ))}
    </div>
  );
}

export default function RateBookingPage() {
  const { id } = useParams() as { id: string };
  const router  = useRouter();

  const [overall,    setOverall]    = useState(0);
  const [aspects,    setAspects]    = useState<Record<string, number>>({});
  const [compliments,setCompliments]= useState<string[]>([]);
  const [comment,    setComment]    = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);
  const [error,      setError]      = useState("");

  const toggleCompliment = (c: string) =>
    setCompliments(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (overall === 0) { setError("Please select an overall rating."); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/booking/${id}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ overall, aspects, compliments, comment }),
      });
      const data = await res.json();
      if (res.ok && (data.success || data.demo)) {
        setDone(true);
      } else {
        setError(data.error ?? "Could not submit rating. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const ratingLabel = ["", "Poor", "Fair", "Good", "Great", "Excellent"][overall] ?? "";

  if (done) {
    return (
      <main className="min-h-screen bg-[#FAF8F4]">
        <Navbar />
        <div className="pt-32 pb-16 px-4 flex justify-center">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-6"><svg className="w-10 h-10 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg></div>
            <h1 className="text-3xl font-bold text-[#1C1611] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Thank You!
            </h1>
            <p className="text-[#7A6F62] mb-8">Your feedback helps us maintain our premium standard of service.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard/bookings"
                className="px-6 py-3 rounded-xl text-sm font-bold text-[#1C1611]"
                style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
                Back to Bookings
              </Link>
              <Link href="/book"
                className="px-6 py-3 rounded-xl text-sm font-semibold border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-colors">
                Book Again
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto">
          <Link href={`/booking/${id}`} className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold mb-6 hover:gap-3 transition-all">
            ← Back to Booking
          </Link>

          <h1 className="text-3xl font-bold text-[#1C1611] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Rate Your Experience
          </h1>
          <p className="text-[#7A6F62] text-sm mb-8">Your feedback helps us maintain 5-star service.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Overall rating */}
            <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6 text-center">
              <p className="text-[#B0A898] text-xs uppercase tracking-wider font-semibold mb-4">Overall Experience</p>
              <div className="flex justify-center mb-3">
                <StarRating value={overall} onChange={setOverall} />
              </div>
              {ratingLabel && (
                <p className="text-[#C9A84C] font-bold text-lg transition-all">{ratingLabel}</p>
              )}
            </div>

            {/* Aspect ratings */}
            <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
              <p className="text-[#B0A898] text-xs uppercase tracking-wider font-semibold mb-4">Rate Each Aspect</p>
              <div className="space-y-4">
                {ASPECTS.map(({ key, label, emoji }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#1C1611]">
                      <span>{label}</span>
                    </div>
                    <StarRating
                      value={aspects[key] ?? 0}
                      onChange={(v) => setAspects(prev => ({ ...prev, [key]: v }))}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick compliments */}
            <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
              <p className="text-[#B0A898] text-xs uppercase tracking-wider font-semibold mb-4">Highlights (optional)</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_COMPLIMENTS.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCompliment(c)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                      compliments.includes(c)
                        ? "bg-[#C9A84C]/10 border-[#C9A84C] text-[#A07830]"
                        : "bg-white border-[#E8E0D0] text-[#7A6F62] hover:border-[#C9A84C]/50"
                    }`}>
                    {compliments.includes(c) ? "✓ " : ""}{c}
                  </button>
                ))}
              </div>
            </div>

            {/* Written comment */}
            <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
              <label htmlFor="comment" className="block text-[#B0A898] text-xs uppercase tracking-wider font-semibold mb-3">
                Additional Comments (optional)
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={4}
                maxLength={500}
                placeholder="Tell us about your experience…"
                className="w-full border border-[#E8E0D0] rounded-xl p-3 text-sm text-[#1C1611] placeholder:text-[#B0A898] focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/10 resize-none"
              />
              <p className="text-[#B0A898] text-xs mt-1 text-right">{comment.length}/500</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={submitting || overall === 0}
              className="w-full py-4 rounded-xl font-bold text-[#1C1611] text-base disabled:opacity-50 transition-all"
              style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
              {submitting ? "Submitting…" : "Submit Rating"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
