import { NextRequest, NextResponse } from "next/server";
import { IS_DEMO_STRIPE } from "@/lib/demo";

// Stripe sends raw body for signature verification â€” disable Next.js body parsing
export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const stripeKey      = process.env.STRIPE_SECRET_KEY;
  const webhookSecret  = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl    = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey     = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Demo mode guard
  if (IS_DEMO_STRIPE || !stripeKey) {
    return NextResponse.json({ received: true, demo: true });
  }

  const sig  = req.headers.get("stripe-signature") ?? "";
  const body = await req.text();

  let event: any;
  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey, { apiVersion: "2026-05-27.dahlia" });
    event = webhookSecret
      ? stripe.webhooks.constructEvent(body, sig, webhookSecret)
      : JSON.parse(body);
  } catch (err: any) {
    console.error("Webhook signature error:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // â”€â”€ Handle successful payment â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const bookingId     = paymentIntent.metadata?.bookingId;

    if (bookingId && supabaseUrl && (supabaseUrl?.includes("your-project") === false && serviceKey?.startsWith("eyJ")) && serviceKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, serviceKey);

      await supabase
        .from("bookings")
        .update({
          payment_status:     "paid",
          stripe_payment_id:  paymentIntent.id,
          status:             "confirmed",
          paid_at:            new Date().toISOString(),
        })
        .eq("id", bookingId);
    }
  }

  // â”€â”€ Handle failed payment â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    const bookingId     = paymentIntent.metadata?.bookingId;

    if (bookingId && supabaseUrl && (supabaseUrl?.includes("your-project") === false && serviceKey?.startsWith("eyJ")) && serviceKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, serviceKey);

      await supabase
        .from("bookings")
        .update({ payment_status: "failed" })
        .eq("id", bookingId);
    }
  }

  return NextResponse.json({ received: true });
}
