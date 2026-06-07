"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const LABELS = ["Home", "Work", "Gym", "Airport", "Other"];

export default function SavedAddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState("Home");
  const [newAddress, setNewAddress] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id);
        fetch(`/api/addresses?userId=${data.user.id}`)
          .then(r => r.json()).then(d => setAddresses(d.addresses || []));
      }
    });
  }, []);

  const add = async () => {
    if (!newAddress.trim() || !userId) return;
    setAdding(true);
    const res = await fetch("/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, label: newLabel, address: newAddress.trim() }),
    });
    const data = await res.json();
    if (data.ok && data.address) setAddresses(prev => [...prev, data.address]);
    setNewAddress("");
    setAdding(false);
  };

  const remove = async (id: string) => {
    await fetch("/api/addresses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-gray-900 font-bold text-xl">Saved Addresses</h1>
        <p className="text-gray-400 text-sm mt-1">Save frequent locations to speed up booking</p>
      </div>

      {/* Saved list */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h3 className="text-gray-900 font-bold mb-5">Your Addresses</h3>
        <div className="space-y-3">
          {addresses.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-6">No saved addresses yet. Add one below.</p>
          )}
          {addresses.map(a => (
            <div key={a.id} className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#C9A84C] text-xs font-black">{a.label.slice(0, 2).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold text-sm">{a.label}</p>
                <p className="text-gray-400 text-xs truncate">{a.address}</p>
              </div>
              <button
                onClick={() => remove(a.id)}
                className="text-red-400 text-xs font-medium hover:text-red-600 transition-colors px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add new */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h3 className="text-gray-900 font-bold mb-5">Add New Address</h3>
        <div className="flex gap-2 mb-4 flex-wrap">
          {LABELS.map(l => (
            <button
              key={l}
              onClick={() => setNewLabel(l)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                newLabel === l
                  ? "bg-[#C9A84C] text-black border-[#C9A84C]"
                  : "border-gray-200 text-gray-500 hover:border-[#C9A84C]/50 hover:text-[#C9A84C]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <input
          value={newAddress}
          onChange={e => setNewAddress(e.target.value)}
          placeholder="Enter full address..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/10 mb-4"
          onKeyDown={e => e.key === "Enter" && add()}
        />
        <button
          onClick={add}
          disabled={adding || !newAddress.trim()}
          className="font-bold py-3 px-6 rounded-xl text-sm text-black disabled:opacity-50 transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}
        >
          {adding ? "Saving…" : "Save Address"}
        </button>
      </div>
    </div>
  );
}
