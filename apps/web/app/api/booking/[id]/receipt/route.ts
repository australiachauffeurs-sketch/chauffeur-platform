import { NextRequest, NextResponse } from "next/server";

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") ||
  (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"));

// Demo receipt data
const DEMO_BOOKING = {
  id: "BK8821",
  status: "completed",
  booking_type: "Airport Transfer",
  pickup_address: "Sydney Airport T1, Mascot NSW 2020",
  dropoff_address: "1 Martin Place, Sydney CBD NSW 2000",
  scheduled_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  vehicle_category: "Executive Sedan",
  driver_name: "Marcus Thompson",
  passengers: 2,
  luggage: 3,
  flight_number: "QF401",
  distance_km: 24.3,
  duration_minutes: 32,
  base_charge: 115.00,
  booking_fee: 5.00,
  airport_surcharge: 15.00,
  after_hours_surcharge: 0,
  gst: 13.50,
  total_amount: 148.50,
  payment_method: "Visa ending 4242",
  stripe_payment_id: "pi_demo_BK8821",
  customer_name: "James Whitfield",
  customer_email: "james.whitfield@example.com",
};

function formatAUD(n: number) {
  return `$${Number(n).toFixed(2)}`;
}

function buildHTML(b: any): string {
  const date = b.scheduled_at
    ? new Date(b.scheduled_at).toLocaleString("en-AU", { dateStyle: "long", timeStyle: "short" })
    : "—";

  const rows = [
    ["Base fare", b.base_charge],
    b.booking_fee > 0           && ["Booking fee", b.booking_fee],
    b.airport_surcharge > 0     && ["Airport surcharge", b.airport_surcharge],
    b.after_hours_surcharge > 0 && ["After-hours surcharge", b.after_hours_surcharge],
    ["GST (10%)", b.gst],
  ]
    .filter(Boolean)
    .map(([k, v]: any) => `<tr><td>${k}</td><td style="text-align:right">${formatAUD(v)}</td></tr>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tax Invoice — ${b.id}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Georgia', serif; background: #fff; color: #1C1611; padding: 40px; max-width: 700px; margin: 0 auto; }
  @media print { body { padding: 20px; } .no-print { display:none; } }
  .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:32px; padding-bottom:24px; border-bottom:2px solid #C9A84C; }
  .logo { font-size:22px; font-weight:bold; color:#1C1611; letter-spacing:-0.5px; }
  .logo span { color:#C9A84C; }
  .invoice-label { text-align:right; }
  .invoice-label h1 { font-size:28px; color:#C9A84C; font-weight:bold; }
  .invoice-label p { color:#7A6F62; font-size:13px; margin-top:4px; }
  .section { margin-bottom:24px; }
  .section h2 { font-size:11px; text-transform:uppercase; letter-spacing:2px; color:#B0A898; margin-bottom:10px; font-family:sans-serif; }
  .grid { display:grid; grid-template-columns:1fr 1fr; gap:8px 24px; }
  .field { }
  .field .label { font-size:11px; color:#B0A898; font-family:sans-serif; }
  .field .value { font-size:14px; color:#1C1611; font-weight:600; margin-top:2px; }
  table { width:100%; border-collapse:collapse; }
  table th { text-align:left; font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:#B0A898; font-family:sans-serif; padding:8px 0; border-bottom:1px solid #E8E0D0; }
  table td { padding:10px 0; border-bottom:1px solid #F5F1EB; font-size:14px; }
  table tr.total td { border-bottom:none; border-top:2px solid #C9A84C; font-weight:bold; font-size:17px; padding-top:14px; color:#1C1611; }
  table tr.total td:last-child { color:#C9A84C; font-size:20px; }
  .footer { margin-top:40px; padding-top:20px; border-top:1px solid #E8E0D0; font-size:12px; color:#B0A898; text-align:center; font-family:sans-serif; }
  .badge { display:inline-block; background:#F0F9EB; color:#166534; border:1px solid #BBF7D0; border-radius:20px; padding:3px 12px; font-size:12px; font-weight:600; font-family:sans-serif; }
  .print-btn { background:linear-gradient(135deg,#C9A84C,#A07830); color:#1C1611; border:none; padding:12px 28px; border-radius:8px; font-size:14px; font-weight:bold; cursor:pointer; margin-bottom:32px; font-family:sans-serif; }
</style>
</head>
<body>
<button class="no-print print-btn" onclick="window.print()">🖨 Print / Save as PDF</button>

<div class="header">
  <div>
    <div class="logo">Elite<span>Chauffeurs</span></div>
    <p style="color:#7A6F62;font-size:13px;margin-top:6px;font-family:sans-serif;">ABN 12 345 678 901</p>
    <p style="color:#7A6F62;font-size:13px;font-family:sans-serif;">Sydney NSW 2000, Australia</p>
    <p style="color:#7A6F62;font-size:13px;font-family:sans-serif;">admin@elitechauffeurs.com.au</p>
  </div>
  <div class="invoice-label">
    <h1>TAX INVOICE</h1>
    <p>Invoice #${b.id}</p>
    <p style="margin-top:6px">${date}</p>
    <div style="margin-top:10px"><span class="badge">✓ PAID</span></div>
  </div>
</div>

<div class="section">
  <h2>Bill To</h2>
  <div class="grid">
    <div class="field"><div class="label">Customer</div><div class="value">${b.customer_name ?? "Valued Customer"}</div></div>
    ${b.customer_email ? `<div class="field"><div class="label">Email</div><div class="value">${b.customer_email}</div></div>` : ""}
  </div>
</div>

<div class="section">
  <h2>Journey Details</h2>
  <div class="grid">
    <div class="field"><div class="label">Pickup</div><div class="value">${b.pickup_address ?? "—"}</div></div>
    <div class="field"><div class="label">Drop-off</div><div class="value">${b.dropoff_address ?? "—"}</div></div>
    <div class="field"><div class="label">Date & Time</div><div class="value">${date}</div></div>
    <div class="field"><div class="label">Vehicle</div><div class="value">${b.vehicle_category ?? "—"}</div></div>
    <div class="field"><div class="label">Chauffeur</div><div class="value">${b.driver_name ?? "—"}</div></div>
    <div class="field"><div class="label">Distance</div><div class="value">${b.distance_km} km</div></div>
    ${b.flight_number ? `<div class="field"><div class="label">Flight</div><div class="value">✈ ${b.flight_number}</div></div>` : ""}
    <div class="field"><div class="label">Passengers</div><div class="value">${b.passengers}</div></div>
  </div>
</div>

<div class="section">
  <h2>Charges</h2>
  <table>
    <thead><tr><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
    <tbody>
      ${rows}
      <tr class="total">
        <td>Total (AUD incl. GST)</td>
        <td style="text-align:right">${formatAUD(b.total_amount)}</td>
      </tr>
    </tbody>
  </table>
  ${b.payment_method ? `<p style="font-size:12px;color:#B0A898;margin-top:12px;font-family:sans-serif;">💳 Paid via ${b.payment_method}${b.stripe_payment_id ? ` · Ref: ${b.stripe_payment_id}` : ""}</p>` : ""}
</div>

<div class="footer">
  <p>This is a valid tax invoice for GST purposes. GST of ${formatAUD(b.gst)} is included in the total amount.</p>
  <p style="margin-top:6px">Thank you for travelling with Elite Chauffeurs · www.elitechauffeurs.com.au</p>
</div>
</body>
</html>`;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: bookingId } = await params;

  try {
    let booking = DEMO_BOOKING;

    if (!isDemo) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id, status, booking_type, pickup_address, dropoff_address,
          scheduled_at, vehicle_category, passengers, luggage, flight_number,
          distance_km, duration_minutes, base_charge, booking_fee,
          airport_surcharge, after_hours_surcharge, gst, total_amount,
          stripe_payment_id, payment_method,
          drivers(full_name),
          profiles(full_name, email)
        `)
        .eq("id", bookingId)
        .single();

      if (error || !data) {
        return NextResponse.json({ error: "Booking not found." }, { status: 404 });
      }

      booking = {
        ...data,
        driver_name:    (data as any).drivers?.full_name ?? null,
        customer_name:  (data as any).profiles?.full_name ?? null,
        customer_email: (data as any).profiles?.email ?? null,
      };
    }

    const html = buildHTML(booking);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[Receipt API]", err);
    return NextResponse.json({ error: "Could not generate receipt." }, { status: 500 });
  }
}
