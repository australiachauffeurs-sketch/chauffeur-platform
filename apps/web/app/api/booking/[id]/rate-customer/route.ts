import { NextRequest, NextResponse } from "next/server";

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") ||
  (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"));

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: bookingId } = await params;

  try {
    const { driverRating, customerId } = await req.json();

    if (!driverRating || driverRating < 1 || driverRating > 5) {
      return NextResponse.json({ error: "Rating must be 1–5." }, { status: 400 });
    }

    if (isDemo) {
      console.log("[Demo] Driver rated customer", customerId, driverRating, "for booking", bookingId);
      return NextResponse.json({ success: true, demo: true });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabase
      .from("ratings")
      .upsert({
        booking_id:     bookingId,
        customer_id:    customerId,
        driver_rating:  driverRating,
        updated_at:     new Date().toISOString(),
      }, { onConflict: "booking_id" });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Rate-customer API]", err);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}
