import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url      = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key      = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const brevoKey = process.env.BREVO_API_KEY;

  if (!url || !key?.startsWith("eyJ")) {
    return NextResponse.json({ ok: true, demo: true, message: "Demo mode — no Supabase configured." });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const { data: drivers, error } = await supabase
    .from("drivers")
    .select("id, name, email, license_expiry, insurance_expiry, registration_expiry")
    .eq("is_approved", true);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  const thirtyDays = new Date();
  thirtyDays.setDate(thirtyDays.getDate() + 30);

  const alerts: string[] = [];

  for (const driver of (drivers || [])) {
    const expiring: string[] = [];

    if (driver.license_expiry && new Date(driver.license_expiry) <= thirtyDays) {
      expiring.push(`Driver's Licence (expires ${driver.license_expiry})`);
    }
    if (driver.insurance_expiry && new Date(driver.insurance_expiry) <= thirtyDays) {
      expiring.push(`Vehicle Insurance (expires ${driver.insurance_expiry})`);
    }
    if (driver.registration_expiry && new Date(driver.registration_expiry) <= thirtyDays) {
      expiring.push(`Vehicle Registration (expires ${driver.registration_expiry})`);
    }

    if (expiring.length === 0) continue;

    alerts.push(`${driver.name}: ${expiring.join(", ")}`);

    if (driver.email && brevoKey && !brevoKey.includes("your-")) {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": brevoKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: "Elite Chauffeurs", email: "australiachauffeurs@gmail.com" },
          to: [{ email: driver.email, name: driver.name }],
          subject: "Action Required: Documents Expiring Soon",
          htmlContent: `
            <div style="font-family:Arial;padding:32px;background:#111;color:#fff;border-radius:16px;max-width:500px;margin:auto">
              <h2 style="color:#C9A84C">Documents Expiring Soon</h2>
              <p>Hi ${driver.name}, the following documents need renewal:</p>
              <ul>
                ${expiring.map(e => `<li style="color:#fff;margin:8px 0">${e}</li>`).join("")}
              </ul>
              <p style="color:#9ca3af;font-size:13px">
                Please update your documents to maintain your approved status.
                Contact <a href="mailto:support@elitechauffeurs.com.au" style="color:#C9A84C">support@elitechauffeurs.com.au</a> for assistance.
              </p>
            </div>
          `,
        }),
      }).catch(() => { /* log silently */ });
    }
  }

  return NextResponse.json({ ok: true, alerts, checked: drivers?.length ?? 0 });
}
