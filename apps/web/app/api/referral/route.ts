import { NextRequest, NextResponse } from "next/server";

function generateCode(userId: string) {
  return "EC" + userId.replace(/-/g, "").slice(0, 8).toUpperCase();
}

async function getSupa() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key?.startsWith("eyJ")) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  const supabase = await getSupa();
  if (!supabase) {
    return NextResponse.json({ code: "ECDEMOACC", credit: 20, referrals: [], totalReferrals: 0 });
  }

  // Get or create profile
  let { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!profile) {
    const code = generateCode(userId);
    const { data } = await supabase
      .from("user_profiles")
      .insert({ user_id: userId, referral_code: code })
      .select()
      .single();
    profile = data;
  }

  const { data: referrals } = await supabase
    .from("referrals")
    .select("*")
    .eq("referrer_id", userId)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    code: profile?.referral_code,
    credit: profile?.referral_credit || 0,
    totalReferrals: profile?.total_referrals || 0,
    referrals: referrals || [],
  });
}

export async function POST(req: NextRequest) {
  // Apply referral code when a new user signs up
  const { newUserId, referralCode, newUserEmail } = await req.json();

  const supabase = await getSupa();
  if (!supabase) return NextResponse.json({ ok: true, demo: true });

  const { data: referrerProfile } = await supabase
    .from("user_profiles")
    .select("user_id")
    .eq("referral_code", referralCode.toUpperCase())
    .single();

  if (!referrerProfile) {
    return NextResponse.json({ error: "Invalid referral code" }, { status: 400 });
  }

  // Create referral record
  await supabase.from("referrals").insert({
    referrer_id: referrerProfile.user_id,
    referred_email: newUserEmail,
    referred_id: newUserId,
    status: "completed",
    referrer_credit: 20,
    referred_credit: 20,
    completed_at: new Date().toISOString(),
  });

  // Credit new user
  await supabase.from("user_profiles").upsert({
    user_id: newUserId,
    referral_code: generateCode(newUserId),
    referral_credit: 20,
  });

  // Credit referrer — try RPC first, fall back to manual update
  const rpcResult = await supabase
    .rpc("increment_referral_credit", { uid: referrerProfile.user_id, amount: 20 })
    .catch(() => ({ error: true }));

  if ((rpcResult as any).error) {
    // Fetch current values then increment manually
    const { data: cur } = await supabase
      .from("user_profiles")
      .select("referral_credit, total_referrals")
      .eq("user_id", referrerProfile.user_id)
      .single();
    await supabase.from("user_profiles").update({
      referral_credit: (cur?.referral_credit || 0) + 20,
      total_referrals: (cur?.total_referrals || 0) + 1,
    }).eq("user_id", referrerProfile.user_id);
  }

  return NextResponse.json({ ok: true });
}
