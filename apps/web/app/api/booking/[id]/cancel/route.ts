import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: bookingId } = await params;
  const body = await req.json().catch(() => ({}));
  const reason: string | undefined = body.reason;

  if (!bookingId) {
    return NextResponse.json({ error: "Booking ID is required." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // ── Demo mode ────────────────────────────────────────────────
  if (!supabaseUrl || supabaseUrl.includes("your-project") || (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    return NextResponse.json({ success: true, demo: true, bookingId, status: "cancelled" });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);

  // Check current status — can only cancel pending or confirmed bookings
  const { data: booking } = await supabase
    .from("bookings")
    .select("id, status, scheduled_at, stripe_payment_id, customer_email, pickup_address, total_amount")
    .eq("id", bookingId)
    .single();

  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  const cancellableStatuses = ["pending", "confirmed"];
  if (!cancellableStatuses.includes(booking.status)) {
    return NextResponse.json({
      error: `Cannot cancel a booking with status "${booking.status}".`
    }, { status: 400 });
  }

  // Check cancellation window (2 hours before pickup)
  if (booking.scheduled_at) {
    const pickup  = new Date(booking.scheduled_at).getTime();
    const now     = Date.now();
    const twoHrs  = 2 * 60 * 60 * 1000;
    if (pickup - now < twoHrs) {
      return NextResponse.json({
        error: "Cancellations must be made at least 2 hours before pickup."
      }, { status: 400 });
    }
  }

  // Update status
  const { error: updateError } = await supabase
    .from("bookings")
    .update({
      status: "cancelled",
      cancelled_at: new Date().toISOString(),
      ...(reason ? { cancellation_reason: reason } : {}),
    })
    .eq("id", bookingId);

  if (updateError) {
    return NextResponse.json({ error: "Failed to cancel booking." }, { status: 500 });
  }

  // Initiate Stripe refund if paid
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (booking.stripe_payment_id && stripeKey && !stripeKey.includes("your_stripe")) {
    try {
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(stripeKey, { apiVersion: "2026-05-27.dahlia" });
      await stripe.refunds.create({ payment_intent: booking.stripe_payment_id });
    } catch (err) {
      console.error("Refund failed:", err);
      // Don't fail the cancellation if refund errors — handle manually
    }
  }

  // Send cancellation email (best effort)
  if (booking.customer_email && booking.pickup_address && booking.scheduled_at) {
    const { sendEmail, cancellationEmailHtml } = await import("@repo/utils/email");
    sendEmail({
      to: booking.customer_email,
      subject: "Booking Cancelled — Elite Chauffeurs",
      html: cancellationEmailHtml({
        id: bookingId,
        pickup_address: booking.pickup_address,
        scheduled_at: booking.scheduled_at,
        total_amount: booking.total_amount ?? 0,
      }),
    }).catch((err: unknown) => console.error("[Email] Cancellation email failed:", err));
  }

  return NextResponse.json({ success: true, bookingId, status: "cancelled" });
}
