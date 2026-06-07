import { NextRequest, NextResponse } from "next/server";
import { IS_DEMO_STRIPE } from "@/lib/demo";

export async function POST(req: NextRequest) {
  try {
    const { bookingId, amount, currency = "aud" } = await req.json();

    if (!bookingId || !amount) {
      return NextResponse.json({ error: "bookingId and amount are required." }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;

    // ── Demo mode (no Stripe key configured) ────────────────────
    if (IS_DEMO_STRIPE || !stripeKey) {
      return NextResponse.json({
        demo: true,
        clientSecret: `pi_demo_${bookingId}_secret_demo`,
        paymentIntentId: `pi_demo_${bookingId}`,
        message: "Demo mode — no real charge will occur",
      });
    }

    // ── Real Stripe PaymentIntent ────────────────────────────────
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey, { apiVersion: "2026-05-27.dahlia" });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // cents
      currency,
      metadata: { bookingId },
      automatic_payment_methods: { enabled: true },
      description: `Elite Chauffeurs — Booking ${bookingId}`,
    });

    return NextResponse.json({
      clientSecret:    paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err: any) {
    console.error("Payment intent error:", err);
    return NextResponse.json({ error: err.message || "Failed to create payment intent." }, { status: 500 });
  }
}
