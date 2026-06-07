interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const brevoKey = process.env.BREVO_API_KEY;

  // Use Brevo (formerly Sendinblue) if key is configured
  if (brevoKey && !brevoKey.includes("your-")) {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoKey,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Elite Chauffeurs", email: "australiachauffeurs@gmail.com" },
        to: [{ email: payload.to }],
        subject: payload.subject,
        htmlContent: payload.html,
      }),
    });
    if (!res.ok) {
      const err = await res.text().catch(() => "unknown");
      console.error("[EMAIL] Brevo error:", res.status, err);
    }
    return;
  }

  // Fallback: log to console in dev
  console.log(`[EMAIL] To: ${payload.to} | Subject: ${payload.subject}`);
}

export function bookingConfirmationHtml(booking: {
  id: string;
  pickup_address: string;
  dropoff_address?: string;
  scheduled_at: string;
  total_amount: number;
  vehicle_category?: string;
}) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background:#0a0a0f; color:#fff; padding:40px;">
  <div style="max-width:560px; margin:0 auto; background:#111827; border-radius:16px; padding:32px; border:1px solid #C9A84C33;">
    <h1 style="color:#C9A84C; margin:0 0 8px;">Booking Confirmed</h1>
    <p style="color:#9ca3af; margin:0 0 24px;">Your booking reference: <strong style="color:#fff; font-family:monospace;">${booking.id}</strong></p>

    <table style="width:100%; border-collapse:collapse;">
      <tr><td style="padding:8px 0; color:#9ca3af; width:40%;">Pickup</td><td style="padding:8px 0; color:#fff;">${booking.pickup_address}</td></tr>
      ${booking.dropoff_address ? `<tr><td style="padding:8px 0; color:#9ca3af;">Drop-off</td><td style="padding:8px 0; color:#fff;">${booking.dropoff_address}</td></tr>` : ""}
      <tr><td style="padding:8px 0; color:#9ca3af;">Date &amp; Time</td><td style="padding:8px 0; color:#fff;">${new Date(booking.scheduled_at).toLocaleString("en-AU", { dateStyle: "full", timeStyle: "short" })}</td></tr>
      <tr><td style="padding:8px 0; color:#9ca3af;">Vehicle</td><td style="padding:8px 0; color:#fff;">${booking.vehicle_category || "Premium Sedan"}</td></tr>
    </table>

    <div style="border-top:1px solid #333; margin-top:24px; padding-top:20px;">
      <span style="color:#9ca3af;">Total (AUD incl. GST)</span>
      <span style="color:#C9A84C; font-size:24px; font-weight:700; display:block; margin-top:4px;">$${booking.total_amount.toFixed(2)}</span>
    </div>

    <p style="color:#6b7280; font-size:12px; margin-top:24px;">Elite Chauffeurs · 24/7 Support: support@elitechauffeurs.com.au</p>
  </div>
</body>
</html>`;
}

export function cancellationEmailHtml(booking: {
  id: string;
  pickup_address: string;
  scheduled_at: string;
  total_amount: number;
}) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background:#0a0a0f; color:#fff; padding:40px;">
  <div style="max-width:560px; margin:0 auto; background:#111827; border-radius:16px; padding:32px; border:1px solid #ef444433;">
    <h1 style="color:#ef4444; margin:0 0 8px;">Booking Cancelled</h1>
    <p style="color:#9ca3af; margin:0 0 24px;">Booking reference: <strong style="color:#fff; font-family:monospace;">${booking.id}</strong> has been cancelled.</p>
    <p style="color:#9ca3af;">Pickup: ${booking.pickup_address}</p>
    <p style="color:#9ca3af;">Scheduled: ${new Date(booking.scheduled_at).toLocaleString("en-AU", { dateStyle: "full", timeStyle: "short" })}</p>
    <p style="color:#6b7280; font-size:12px; margin-top:24px;">If you need assistance, contact support@elitechauffeurs.com.au</p>
  </div>
</body>
</html>`;
}
