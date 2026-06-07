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
    const body = await req.json();
    const { overall, aspects, compliments, comment } = body;

    if (!overall || overall < 1 || overall > 5) {
      return NextResponse.json({ error: "Overall rating (1-5) is required." }, { status: 400 });
    }

    if (isDemo) {
      console.log("[Demo] Rating submitted for booking", bookingId, { overall, aspects, compliments, comment });
      return NextResponse.json({ success: true, demo: true, message: "Rating saved (demo mode)." });
    }

    // Real Supabase implementation
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch booking to get driver_id and customer_id
    const { data: booking, error: bookingErr } = await supabase
      .from("bookings")
      .select("id, status, customer_id, driver_id")
      .eq("id", bookingId)
      .single();

    if (bookingErr || !booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    if (booking.status !== "completed") {
      return NextResponse.json({ error: "Can only rate completed bookings." }, { status: 400 });
    }

    // Upsert rating (one per booking per customer)
    const { error: ratingErr } = await supabase
      .from("ratings")
      .upsert({
        booking_id:  bookingId,
        customer_id: booking.customer_id,
        driver_id:   booking.driver_id,
        overall_rating: overall,
        punctuality_rating:      aspects?.punctuality      ?? null,
        professionalism_rating:  aspects?.professionalism  ?? null,
        vehicle_rating:          aspects?.vehicle          ?? null,
        navigation_rating:       aspects?.navigation       ?? null,
        compliments: compliments ?? [],
        comment:     comment     ?? null,
        created_at:  new Date().toISOString(),
      }, { onConflict: "booking_id,customer_id" });

    if (ratingErr) {
      console.error("[Rate API]", ratingErr);
      return NextResponse.json({ error: "Could not save rating." }, { status: 500 });
    }

    // Update driver's average rating
    if (booking.driver_id) {
      const { data: allRatings } = await supabase
        .from("ratings")
        .select("overall_rating")
        .eq("driver_id", booking.driver_id);

      if (allRatings && allRatings.length > 0) {
        const avg = allRatings.reduce((s: number, r: any) => s + (r.overall_rating ?? 0), 0) / allRatings.length;
        await supabase
          .from("drivers")
          .update({ rating: Math.round(avg * 100) / 100 })
          .eq("id", booking.driver_id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Rate API] unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
