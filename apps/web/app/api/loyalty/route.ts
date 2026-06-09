import { NextRequest, NextResponse } from "next/server";

async function getSupa() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || (!key?.startsWith("eyJ") && !key?.startsWith("sb_secret_"))) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key);
}

function getTier(points: number): string {
  if (points >= 2000) return "Platinum";
  if (points >= 500) return "Gold";
  return "Silver";
}

function pointsToNextTier(points: number): { next: string; needed: number } | null {
  if (points < 500) return { next: "Gold", needed: 500 - points };
  if (points < 2000) return { next: "Platinum", needed: 2000 - points };
  return null;
}

// GET /api/loyalty?userId=xxx
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  const supabase = await getSupa();
  if (!supabase) {
    return NextResponse.json({
      points: 350,
      tier: "Silver",
      nextTier: { next: "Gold", needed: 150 },
      transactions: [
        { id: "demo-1", points: 200, type: "earn", description: "Airport Transfer — 13 Jun", created_at: new Date().toISOString() },
        { id: "demo-2", points: 150, type: "earn", description: "City Transfer — 2 Jun", created_at: new Date(Date.now() - 864e5 * 10).toISOString() },
      ],
    });
  }

  let { data: profile } = await supabase
    .from("user_profiles")
    .select("loyalty_points, loyalty_tier")
    .eq("user_id", userId)
    .single();

  const points = profile?.loyalty_points || 0;
  const tier = getTier(points);

  // Keep tier in sync
  if (profile && profile.loyalty_tier !== tier) {
    await supabase.from("user_profiles").update({ loyalty_tier: tier }).eq("user_id", userId);
  }

  const { data: transactions } = await supabase
    .from("loyalty_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);

  return NextResponse.json({
    points,
    tier,
    nextTier: pointsToNextTier(points),
    transactions: transactions || [],
  });
}

// POST /api/loyalty/earn — award points after trip completes
// POST /api/loyalty/redeem — convert points to credit
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, userId, bookingId, amount, points: redeemPoints } = body;

  const supabase = await getSupa();
  if (!supabase) return NextResponse.json({ ok: true, demo: true });

  if (action === "earn") {
    // 1 point per $1 spent
    const earned = Math.floor(amount || 0);
    if (earned <= 0) return NextResponse.json({ error: "Invalid amount" }, { status: 400 });

    await supabase.from("loyalty_transactions").insert({
      user_id: userId,
      booking_id: bookingId || null,
      points: earned,
      type: "earn",
      description: `Ride completed — ${earned} pts earned`,
    });

    const { data: cur } = await supabase
      .from("user_profiles")
      .select("loyalty_points")
      .eq("user_id", userId)
      .single();

    const newPoints = (cur?.loyalty_points || 0) + earned;
    const newTier = getTier(newPoints);

    await supabase.from("user_profiles").upsert({
      user_id: userId,
      loyalty_points: newPoints,
      loyalty_tier: newTier,
    });

    return NextResponse.json({ ok: true, newPoints, newTier });
  }

  if (action === "redeem") {
    // 100 points = $5
    const pts = Math.floor(redeemPoints || 0);
    if (pts < 100) return NextResponse.json({ error: "Minimum 100 points to redeem" }, { status: 400 });

    const { data: cur } = await supabase
      .from("user_profiles")
      .select("loyalty_points, referral_credit")
      .eq("user_id", userId)
      .single();

    if (!cur || cur.loyalty_points < pts) {
      return NextResponse.json({ error: "Insufficient points" }, { status: 400 });
    }

    const creditEarned = (pts / 100) * 5;
    const newPoints = cur.loyalty_points - pts;

    await supabase.from("loyalty_transactions").insert({
      user_id: userId,
      points: -pts,
      type: "redeem",
      description: `Redeemed ${pts} pts for $${creditEarned.toFixed(2)} credit`,
    });

    await supabase.from("user_profiles").update({
      loyalty_points: newPoints,
      loyalty_tier: getTier(newPoints),
      referral_credit: (cur.referral_credit || 0) + creditEarned,
    }).eq("user_id", userId);

    return NextResponse.json({ ok: true, creditEarned, newPoints });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
