"use client";

import type { BookingData } from "./BookingWizard";

interface Props {
  data: BookingData;
  update: (fields: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Details({ data, update, onNext, onBack }: Props) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-dark mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Trip Details
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        Tell us a bit more so we can prepare perfectly for your journey.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        {/* Passengers */}
        <div>
          <label className="block text-sm font-semibold text-dark mb-2">
            Passengers
          </label>
          <select
            value={data.passengers}
            onChange={(e) => update({ passengers: Number(e.target.value) })}
            className="input-luxury"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <option key={n} value={n}>{n} passenger{n > 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>

        {/* Luggage */}
        <div>
          <label className="block text-sm font-semibold text-dark mb-2">
            Luggage Bags
          </label>
          <select
            value={data.luggage}
            onChange={(e) => update({ luggage: Number(e.target.value) })}
            className="input-luxury"
          >
            {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
              <option key={n} value={n}>{n} bag{n !== 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-sm font-semibold text-dark mb-2">First Name</label>
          <input type="text" placeholder="John" className="input-luxury" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark mb-2">Last Name</label>
          <input type="text" placeholder="Smith" className="input-luxury" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-sm font-semibold text-dark mb-2">Email</label>
          <input type="email" placeholder="john@example.com" className="input-luxury" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark mb-2">Phone</label>
          <input type="tel" placeholder="+61 4XX XXX XXX" className="input-luxury" />
        </div>
      </div>

      {/* Special Requests */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-dark mb-2">
          Special Requests <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Child seat required, meet & greet sign, specific preferences…"
          value={data.specialRequests}
          onChange={(e) => update({ specialRequests: e.target.value })}
          className="input-luxury resize-none"
        />
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-outline-gold flex-1 py-3.5">
          ← Back
        </button>
        <button onClick={onNext} className="btn-gold flex-1 py-3.5">
          Review Booking →
        </button>
      </div>
    </div>
  );
}
