"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { BookingData } from "./BookingWizard";

interface Props {
  data: BookingData;
  bookingId: string;
  onBack: () => void;
}

function formatAUD(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(n);
}

// ── Demo card form (used when Stripe not configured) ──────────────────────────
function DemoPaymentForm({ amount, onPay, loading }: { amount: number; onPay: () => void; loading: boolean }) {
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [exp,  setExp]  = useState("12/28");
  const [cvc,  setCvc]  = useState("123");
  const [name, setName] = useState("James Whitfield");

  return (
    <div className="space-y-4">
      <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-xl p-3 text-xs text-[#A07830] flex items-center gap-2">
        <span><strong>Demo mode</strong> — no real charge will occur. Use card 4242 4242 4242 4242.</span>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#7A6F62] uppercase tracking-wider mb-1.5">Cardholder Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-luxury" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#7A6F62] uppercase tracking-wider mb-1.5">Card Number</label>
        <div className="relative">
          <input type="text" value={card} onChange={e => setCard(e.target.value)} maxLength={19} className="input-luxury pr-16" />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/></svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[#7A6F62] uppercase tracking-wider mb-1.5">Expiry</label>
          <input type="text" value={exp} onChange={e => setExp(e.target.value)} placeholder="MM/YY" maxLength={5} className="input-luxury" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#7A6F62] uppercase tracking-wider mb-1.5">CVC</label>
          <input type="text" value={cvc} onChange={e => setCvc(e.target.value)} maxLength={4} className="input-luxury" />
        </div>
      </div>

      <button
        onClick={onPay}
        disabled={loading}
        className="btn-gold w-full py-4 text-base disabled:opacity-60"
      >
        {loading ? "Processing…" : `Pay ${formatAUD(amount)} →`}
      </button>
    </div>
  );
}

// ── Stripe Elements form ──────────────────────────────────────────────────────
function StripePaymentForm({
  clientSecret, amount, bookingId, onSuccess, onBack,
}: { clientSecret: string; amount: number; bookingId: string; onSuccess: () => void; onBack: () => void }) {
  const [loading, setLoading]  = useState(false);
  const [error,   setError]    = useState("");
  const [stripe,  setStripe]   = useState<any>(null);
  const [elements, setElements] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { loadStripe } = await import("@stripe/stripe-js");
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!publishableKey) return;
      const stripeInstance = await loadStripe(publishableKey);
      if (!mounted || !stripeInstance) return;
      setStripe(stripeInstance);
      const els = stripeInstance.elements({ clientSecret, appearance: { theme: "flat", variables: { colorPrimary: "#C9A84C", borderRadius: "8px", fontFamily: "Inter, sans-serif" } } });
      const paymentEl = els.create("payment");
      paymentEl.mount("#stripe-payment-element");
      setElements(els);
    })();
    return () => { mounted = false; };
  }, [clientSecret]);

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");
    const { error: payError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/booking/confirmation?id=${bookingId}` },
    });
    if (payError) { setError(payError.message ?? "Payment failed."); setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <div id="stripe-payment-element" className="min-h-[120px]" />
      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm">{error}</div>}
      <div className="flex gap-3">
        <button onClick={onBack} className="btn-outline-gold flex-1 py-3.5 text-sm">← Back</button>
        <button onClick={handlePay} disabled={loading || !stripe} className="btn-gold flex-1 py-3.5 text-base disabled:opacity-60">
          {loading ? "Processing…" : `Pay ${formatAUD(amount)} →`}
        </button>
      </div>
    </div>
  );
}

// ── Main Step5Payment ─────────────────────────────────────────────────────────
export default function Step5Payment({ data, bookingId, onBack }: Props) {
  const router  = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isDemo,       setIsDemo]       = useState(false);
  const [initLoading,  setInitLoading]  = useState(true);
  const [payLoading,   setPayLoading]   = useState(false);
  const [paid,         setPaid]         = useState(false);
  const [error,        setError]        = useState("");

  const amount = data.pricing?.total ?? 0;

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch("/api/payment/intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId, amount }),
        });
        const json = await res.json();
        if (json.demo) {
          setIsDemo(true);
          setClientSecret(json.clientSecret);
        } else if (json.clientSecret) {
          setClientSecret(json.clientSecret);
        } else {
          setError("Could not initialise payment. Please try again.");
        }
      } catch {
        setError("Could not initialise payment.");
      } finally {
        setInitLoading(false);
      }
    })();
  }, [bookingId, amount]);

  // Demo pay handler
  const handleDemoPay = async () => {
    setPayLoading(true);
    await new Promise(r => setTimeout(r, 1500)); // simulate processing
    setPaid(true);
    setPayLoading(false);
    setTimeout(() => router.push(`/booking/confirmation?id=${bookingId}`), 800);
  };

  if (paid) {
    return (
      <div className="animate-fade-in text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-400 flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>
        <h2 className="text-2xl font-bold text-[#1C1611] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Payment Successful!
        </h2>
        <p className="text-[#7A6F62] text-sm">Redirecting you to your booking confirmation…</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[#1C1611] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Secure Payment
      </h2>
      <p className="text-[#7A6F62] text-sm mb-6">
        Your booking is reserved. Complete payment to confirm.
      </p>

      {/* Amount summary */}
      <div className="bg-[#FAF8F4] border border-[#E8E0D0] rounded-2xl p-5 mb-6 flex items-center justify-between">
        <div>
          <p className="text-[#B0A898] text-xs uppercase tracking-wider mb-1">Amount Due</p>
          <p className="text-[#1C1611] font-bold text-3xl">{formatAUD(amount)}</p>
          <p className="text-[#B0A898] text-xs mt-1">AUD incl. GST · {data.vehicleCategory} · {data.distanceKm.toFixed(1)} km</p>
        </div>
        <div className="w-10 h-10 flex items-center justify-center"><svg className="w-6 h-6 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg></div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-5 text-sm">{error}</div>
      )}

      {initLoading ? (
        <div className="flex items-center justify-center py-8 text-[#C9A84C]">
          <span className="w-6 h-6 border-2 rounded-full animate-spin mr-3" style={{ borderColor: "rgba(201,168,76,0.2)", borderTopColor: "#C9A84C" }} />
          <span className="text-sm text-[#7A6F62]">Initialising secure payment…</span>
        </div>
      ) : isDemo && clientSecret ? (
        <>
          <DemoPaymentForm amount={amount} onPay={handleDemoPay} loading={payLoading} />
          <div className="flex gap-3 mt-4">
            <button onClick={onBack} className="btn-outline-gold flex-1 py-3 text-sm">← Back</button>
          </div>
        </>
      ) : clientSecret ? (
        <StripePaymentForm
          clientSecret={clientSecret}
          amount={amount}
          bookingId={bookingId}
          onSuccess={() => router.push(`/booking/confirmation?id=${bookingId}`)}
          onBack={onBack}
        />
      ) : null}

      <div className="mt-5 flex items-center justify-center gap-4 text-[#B0A898] text-xs">
        <span>SSL Encrypted</span>
        <span>·</span>
        <span>Powered by Stripe</span>
        <span>·</span>
        <span>Free cancellation 2hrs before</span>
      </div>
    </div>
  );
}
