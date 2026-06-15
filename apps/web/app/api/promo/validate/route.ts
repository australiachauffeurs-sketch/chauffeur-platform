import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code, bookingAmount } = await req.json();
  if (!code) return NextResponse.json({ error: "Code required" }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || (!key?.startsWith("eyJ") && !key?.startsWith("sb_secret_"))) {
    // Demo mode — accept DEMO10 as a test code
    if (code.toUpperCase() === "DEMO10") {
      return NextResponse.json({ valid: true, discount: { type: "percent", value: 10, amount: (bookingAmount || 100) * 0.1, code: "DEMO10", description: "Demo 10% discount" } });
    }
    return NextResponse.json({ valid: false, error: "Invalid promo code" });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const now = new Date().toISOString();
  const { data: promo, error } = await supabase
    .from("promo_codes")
    .select("*")
    .eq("code", code.toUpperCase().trim())
    .eq("is_active", true)
    .single();

  if (error || !promo) return NextResponse.json({ valid: false, error: "Invalid promo code" });

  // Check expiry
  if (promo.valid_until && promo.valid_until < now) {
    return NextResponse.json({ valid: false, error: "Promo code has expired" });
  }
  // Check start date
  if (promo.valid_from && promo.valid_from > now) {
    return NextResponse.json({ valid: false, error: "Promo code is not yet active" });
  }
  // Check usage limit
  if (promo.max_uses !== null && promo.uses_count >= promo.max_uses) {
    return NextResponse.json({ valid: false, error: "Promo code has reached its usage limit" });
  }
  // Check minimum booking amount
  if (bookingAmount && promo.min_booking_amount && bookingAmount < promo.min_booking_amount) {
    return NextResponse.json({ valid: false, error: `Minimum booking amount of $${promo.min_booking_amount} required` });
  }

  // Calculate discount amount
  const discountAmount = promo.discount_type === "percent"
    ? (bookingAmount || 0) * (promo.discount_value / 100)
    : Math.min(promo.discount_value, bookingAmount || promo.discount_value);

  return NextResponse.json({
    valid: true,
    discount: {
      type: promo.discount_type,
      value: promo.discount_value,
      amount: Math.round(discountAmount * 100) / 100,
      code: promo.code,
      description: promo.description,
    },
  });
}
