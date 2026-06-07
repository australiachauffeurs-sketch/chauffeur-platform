"use client";
import { useState, useEffect } from "react";

interface ReferralData {
  code: string;
  credit: number;
  totalReferrals: number;
  referrals: Array<{
    id: string;
    referred_email: string;
    status: string;
    created_at: string;
    referrer_credit: number;
  }>;
}

export default function ReferralsPage() {
  const [data, setData] = useState<ReferralData | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Try to get user from supabase client
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id || "demo-user";
        const res = await fetch(`/api/referral?userId=${userId}`);
        const json = await res.json();
        setData(json);
      } catch {
        // Demo fallback
        setData({ code: "ECDEMOACC", credit: 20, totalReferrals: 0, referrals: [] });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const copy = () => {
    if (!data?.code) return;
    const link = `${window.location.origin}?ref=${data.code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = data?.code
    ? (typeof window !== "undefined" ? `${window.location.origin}?ref=${data.code}` : `https://elitechauffeurs.com.au?ref=${data.code}`)
    : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Refer a Friend</h1>
          <p className="text-gray-500 text-sm">Give $20, get $20 credit when your friend completes their first ride</p>
        </div>

        {/* Credit balance card */}
        <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#C9A84C]/30 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-1">Your Referral Credit</p>
            {loading ? (
              <div className="h-10 w-24 bg-white/10 rounded animate-pulse" />
            ) : (
              <p className="text-[#C9A84C] text-4xl font-black">${data?.credit?.toFixed(2) || "0.00"}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">{data?.totalReferrals || 0} friends referred</p>
          </div>
          <div className="w-20 h-20 rounded-full bg-[#C9A84C]/10 border-2 border-[#C9A84C]/30 flex items-center justify-center">
            <span className="text-[#C9A84C] text-2xl font-black">$</span>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h3 className="text-gray-900 font-bold mb-4">How it works</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { step: "1", title: "Share your code", desc: "Send your unique referral link to friends" },
              { step: "2", title: "Friend signs up", desc: "They create an account using your link" },
              { step: "3", title: "Both get $20", desc: "Credits applied after their first completed ride" },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#C9A84C] font-black text-sm">{s.step}</span>
                </div>
                <p className="text-gray-900 text-xs font-semibold mb-1">{s.title}</p>
                <p className="text-gray-400 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Referral code */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-3">Your Referral Code</p>
          {loading ? (
            <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ) : (
            <>
              <div className="flex gap-3">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 font-mono text-[#C9A84C] text-xl font-black tracking-widest">
                  {data?.code || "Loading…"}
                </div>
                <button
                  onClick={copy}
                  className="px-5 text-black font-bold rounded-xl transition-colors text-sm"
                  style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <p className="text-gray-400 text-xs mt-2 truncate">
                Share link: <span className="text-gray-600">{shareLink}</span>
              </p>
            </>
          )}
        </div>

        {/* Referral history */}
        {(data?.referrals?.length ?? 0) > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-gray-900 font-bold">Referral History</h2>
            </div>
            {data!.referrals.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-gray-900 text-sm font-medium">{r.referred_email}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{new Date(r.created_at).toLocaleDateString("en-AU")}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#C9A84C] text-sm font-bold">+${r.referrer_credit?.toFixed(2)}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    r.status === "rewarded"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                  }`}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {data?.referrals?.length === 0 && !loading && (
          <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
              </svg>
            </div>
            <p className="text-gray-900 font-semibold mb-1">No referrals yet</p>
            <p className="text-gray-400 text-sm">Share your code to start earning credits</p>
          </div>
        )}
      </div>
    </div>
  );
}
