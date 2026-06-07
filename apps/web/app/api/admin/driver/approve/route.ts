import { NextRequest, NextResponse } from "next/server";

function isAdminRequest(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET;
  if (adminSecret) return req.headers.get("x-admin-secret") === adminSecret;
  const origin = req.headers.get("origin") || "";
  const referer = req.headers.get("referer") || "";
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";
  return origin.startsWith(adminUrl) || referer.startsWith(adminUrl);
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { driverId, approved } = await req.json();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project") || (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
    return NextResponse.json({ success: true, demo: true });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);

  const isApproved = approved !== false;

  // Fetch driver details before updating (needed for email)
  const { data: driver, error: fetchError } = await supabase
    .from("drivers")
    .select("id, name, email, is_approved")
    .eq("id", driverId)
    .single();

  if (fetchError || !driver) return NextResponse.json({ error: "Driver not found" }, { status: 404 });

  const { error } = await supabase.from("drivers").update({ is_approved: isApproved }).eq("id", driverId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send approval email if approving (not revoking) and driver wasn't already approved
  if (isApproved && !driver.is_approved && driver.email) {
    await sendApprovalEmail(driver.name, driver.email).catch(() => {});
  }

  return NextResponse.json({ success: true });
}

async function sendApprovalEmail(name: string, email: string) {
  const brevoKey = process.env.BREVO_API_KEY;
  if (!brevoKey || brevoKey.includes("your-")) return;

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": brevoKey, "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      sender: { name: "Elite Chauffeurs", email: "australiachauffeurs@gmail.com" },
      to: [{ email, name }],
      subject: "You're Approved — Elite Chauffeurs",
      htmlContent: `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#0a0a0f;color:#fff;padding:40px;">
  <div style="max-width:560px;margin:0 auto;background:#111827;border-radius:16px;padding:32px;border:1px solid #C9A84C33;">
    <h1 style="color:#C9A84C;margin:0 0 8px;">Welcome to the Team, ${name}!</h1>
    <p style="color:#9ca3af;margin:0 0 20px;">Your driver account has been approved. You can now log in to the Elite Chauffeurs driver app and start accepting jobs.</p>
    <div style="background:#1f2937;border-radius:12px;padding:20px;margin-bottom:20px;">
      <p style="color:#fff;margin:0 0 8px;font-weight:700;">Next steps:</p>
      <p style="color:#9ca3af;margin:0 0 6px;">1. Download the Elite Chauffeurs Driver app</p>
      <p style="color:#9ca3af;margin:0 0 6px;">2. Log in with your registered email</p>
      <p style="color:#9ca3af;margin:0;">3. Go online and start receiving job requests</p>
    </div>
    <p style="color:#6b7280;font-size:12px;">Questions? Contact us at support@elitechauffeurs.com.au</p>
  </div>
</body>
</html>`,
    }),
  });
}
