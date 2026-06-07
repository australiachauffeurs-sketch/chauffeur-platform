"use client";
import { useState, useEffect } from "react";

interface LoyaltyData {
  points: number;
  tier: string;
  nextTier: { next: string; needed: number } | null;
  transactions: Array<{ id: string; points: number; type: string; description: string; created_at: string }>;
}

const TIER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Silver:   { bg: "bg-gray-100",          text: "text-gray-600",   border: "border-gray-300" },
  Gold:     { bg: "bg-[#C9A84C]/10",      text: "text-[#C9A84C]", border: "border-[#C9A84C]/30" },
  Platinum: { bg: "bg-purple-50",         text: "text-purple-700", border: "border-purple-200" },
};

export default function ProfilePage() {
  const [loyalty, setLoyalty] = useState<LoyaltyData | null>(null);
  const [redeeming, setRedeeming] = useState(false);

  useEffect(() => {
    async function loadLoyalty() {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id || "demo-user";
        const res = await fetch(`/api/loyalty?userId=${userId}`);
        const json = await res.json();
        setLoyalty(json);
      } catch {
        setLoyalty({ points: 350, tier: "Silver", nextTier: { next: "Gold", needed: 150 }, transactions: [] });
      }
    }
    loadLoyalty();
  }, []);

  const handleRedeem = async () => {
    if (!loyalty || loyalty.points < 100) return;
    setRedeeming(true);
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || "demo-user";
      const res = await fetch("/api/loyalty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "redeem", userId, points: 100 }),
      });
      const json = await res.json();
      if (json.ok) {
        setLoyalty(prev => prev ? {
          ...prev,
          points: json.newPoints,
          transactions: [
            { id: Date.now().toString(), points: -100, type: "redeem", description: "Redeemed 100 pts for $5.00 credit", created_at: new Date().toISOString() },
            ...prev.transactions,
          ]
        } : prev);
        alert(`$${json.creditEarned?.toFixed(2)} credit added to your account!`);
      }
    } catch { /* swallow */ }
    finally { setRedeeming(false); }
  };

  const [form, setForm] = useState({
    firstName: "James", lastName: "Smith",
    email: "james@example.com", phone: "+61 400 111 222",
  });
  const [saved, setSaved]   = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      {/* Avatar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-black flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#A07830)" }}>
            {form.firstName[0]}{form.lastName[0]}
          </div>
          <div>
            <h2 className="text-gray-900 font-bold text-xl">{form.firstName} {form.lastName}</h2>
            <p className="text-gray-400 text-sm">{form.email}</p>
            <div className="flex gap-3 mt-2">
              <span className="text-xs bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20 px-3 py-1 rounded-full font-semibold">Elite Member</span>
              <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">✓ Verified</span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-gray-50">
          {[["12","Total Trips"],["$2,840","Total Spent"],["4.9★","Avg Rating"]].map(([v,l]) => (
            <div key={l} className="text-center">
              <p className="text-xl font-bold text-[#C9A84C]">{v}</p>
              <p className="text-gray-400 text-xs mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Loyalty card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-gray-900 font-bold">Loyalty Rewards</h3>
          {loyalty && (
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${TIER_COLORS[loyalty.tier]?.bg} ${TIER_COLORS[loyalty.tier]?.text} ${TIER_COLORS[loyalty.tier]?.border}`}>
              {loyalty.tier} Member
            </span>
          )}
        </div>

        {loyalty ? (
          <>
            {/* Points + progress */}
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-[#C9A84C] text-4xl font-black">{loyalty.points.toLocaleString()}</p>
                <p className="text-gray-400 text-xs mt-0.5">points balance</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs">100 pts = $5.00 credit</p>
                <button
                  onClick={handleRedeem}
                  disabled={loyalty.points < 100 || redeeming}
                  className="mt-1.5 text-xs font-bold px-4 py-2 rounded-xl border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {redeeming ? "Redeeming…" : "Redeem 100 pts → $5"}
                </button>
              </div>
            </div>

            {/* Tier progress bar */}
            {loyalty.nextTier && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>{loyalty.tier}</span>
                  <span>{loyalty.nextTier.next} — {loyalty.nextTier.needed} pts away</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      background: "linear-gradient(90deg,#C9A84C,#E8C97A)",
                      width: `${Math.min(100, loyalty.tier === "Silver" ? (loyalty.points / 500) * 100 : ((loyalty.points - 500) / 1500) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
            {!loyalty.nextTier && (
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2 bg-purple-100 rounded-full flex-1 overflow-hidden">
                  <div className="h-full rounded-full bg-purple-400 w-full" />
                </div>
                <span className="text-xs text-purple-600 font-semibold">Max Tier</span>
              </div>
            )}

            {/* Recent transactions */}
            {loyalty.transactions.length > 0 && (
              <div className="border-t border-gray-50 pt-4 space-y-2">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Recent Activity</p>
                {loyalty.transactions.slice(0, 5).map(t => (
                  <div key={t.id} className="flex items-center justify-between">
                    <p className="text-gray-600 text-xs">{t.description}</p>
                    <span className={`text-xs font-bold ${t.type === "earn" ? "text-green-600" : "text-red-500"}`}>
                      {t.type === "earn" ? "+" : ""}{t.points} pts
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="h-24 bg-gray-50 rounded-xl animate-pulse" />
        )}
      </div>

      {/* Personal info form */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h3 className="text-gray-900 font-bold mb-5">Personal Information</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label:"First Name", key:"firstName", placeholder:"John" },
              { label:"Last Name",  key:"lastName",  placeholder:"Smith" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-gray-500 text-xs font-medium mb-1.5">{f.label}</label>
                <input
                  type="text"
                  value={form[f.key as keyof typeof form]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/10"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1.5">Email Address</label>
            <input type="email" value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/10"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1.5">Phone Number</label>
            <input type="tel" value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/10"
            />
          </div>
          <button type="submit"
            className="font-bold py-3 px-6 rounded-xl text-sm text-black transition-all"
            style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Change password */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h3 className="text-gray-900 font-bold mb-5">Change Password</h3>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert("Password updated!"); }}>
          {[
            { label:"Current Password",  key:"current", placeholder:"Enter current password" },
            { label:"New Password",       key:"newPw",   placeholder:"Min 8 characters"      },
            { label:"Confirm New Password",key:"confirm",placeholder:"Repeat new password"    },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-gray-500 text-xs font-medium mb-1.5">{f.label}</label>
              <input type="password" placeholder={f.placeholder}
                value={pwForm[f.key as keyof typeof pwForm]}
                onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/10"
              />
            </div>
          ))}
          <button type="submit" className="font-bold py-3 px-6 rounded-xl text-sm border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all">
            Update Password
          </button>
        </form>
      </div>

      {/* Preferences */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h3 className="text-gray-900 font-bold mb-5">Preferences</h3>
        <div className="space-y-4">
          {[
            { label:"Email booking confirmations",  sub:"Receive confirmation emails for new bookings"    },
            { label:"SMS driver updates",           sub:"Get SMS when your driver is on the way"          },
            { label:"Promotional offers",           sub:"Receive special offers and discount codes"       },
            { label:"Monthly summary",              sub:"Monthly email summary of your rides and spending" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-gray-800 text-sm font-medium">{item.label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A84C]" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
        <h3 className="text-red-700 font-bold mb-2">Danger Zone</h3>
        <p className="text-red-500 text-sm mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
        <button className="border border-red-300 text-red-600 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-red-100 transition-colors">
          Delete My Account
        </button>
      </div>
    </div>
  );
}
