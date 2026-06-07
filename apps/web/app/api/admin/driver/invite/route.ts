import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, phone, city, vehicle_type } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "name and email are required" }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ success: true, demo: true });

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  // Check duplicate
  const { data: existing } = await supabase.from("drivers").select("id").eq("email", email).single();
  if (existing) return NextResponse.json({ error: "A driver with this email already exists" }, { status: 409 });

  const { data, error } = await supabase.from("drivers").insert([{
    name, email,
    phone:        phone        || null,
    city:         city         || null,
    vehicle_type: vehicle_type || null,
    is_approved:  false,
    status:       "offline",
    rating:       0,
    trips:        0,
  }]).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send invite email
  try {
    const brevoKey = process.env.BREVO_API_KEY;
    if (brevoKey && !brevoKey.includes("your-")) {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": brevoKey, "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          sender: { name: "Elite Chauffeurs", email: "australiachauffeurs@gmail.com" },
          to: [{ email, name }],
          subject: "You've Been Invited — Elite Chauffeurs Driver",
          htmlContent: `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#0a0a0f;color:#fff;padding:40px;">
  <div style="max-width:560px;margin:0 auto;background:#111827;border-radius:16px;padding:32px;border:1px solid #C9A84C33;">
    <h1 style="color:#C9A84C;margin:0 0 8px;">Welcome, ${name}!</h1>
    <p style="color:#9ca3af;margin:0 0 20px;">You've been invited to join the Elite Chauffeurs driver network. Download the driver app and sign up using this email address to get started.</p>
    <p style="color:#9ca3af;margin:0 0 20px;">Once you complete your profile and upload your documents, an admin will review and approve your account within 24 hours.</p>
    <p style="color:#6b7280;font-size:12px;margin-top:24px;">Questions? Contact support@elitechauffeurs.com.au</p>
  </div>
</body>
</html>`,
        }),
      });
    }
  } catch { /* non-critical */ }

  return NextResponse.json({ success: true, driver: data });
}
