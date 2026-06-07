/**
 * Brevo (Sendinblue) Email Service — Direct HTTP API
 *
 * Sends transactional emails via Brevo's REST API.
 * This bypasses Supabase's SMTP integration entirely.
 */

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

interface SendOTPOptions {
  to: string;
  code: string;
  type: "signup" | "recovery";
  firstName?: string;
}

export async function sendOTPEmail({ to, code, type, firstName }: SendOTPOptions): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("[Brevo] BREVO_API_KEY not set in environment variables");
    return { success: false, error: "Email service not configured" };
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL || "australiachauffeurs@gmail.com";
  const senderName  = process.env.BREVO_SENDER_NAME  || "Elite Chauffeurs";

  const subject = type === "signup"
    ? "Verify Your Email — Elite Chauffeurs"
    : "Password Reset Code — Elite Chauffeurs";

  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";

  const purposeText = type === "signup"
    ? "to verify your email and activate your Elite Chauffeurs account"
    : "to reset your password";

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#0A0A0A; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A; padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background-color:#111111; border-radius:16px; border:1px solid #2A2A2A; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 0; text-align:center;">
              <div style="display:inline-block; background:linear-gradient(135deg,#C9A84C,#E8C97A); width:56px; height:56px; border-radius:14px; line-height:56px; font-size:24px; font-weight:bold; color:#0A0A0A;">EC</div>
              <h1 style="color:#FFFFFF; font-size:22px; font-weight:700; margin:16px 0 4px;">
                ${type === "signup" ? "Verify Your Email" : "Reset Your Password"}
              </h1>
              <p style="color:#6B7280; font-size:13px; margin:0;">Elite Chauffeurs Australia</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <p style="color:#D1D5DB; font-size:14px; line-height:22px; margin:0 0 20px;">
                ${greeting}<br/><br/>
                Use the verification code below ${purposeText}. This code expires in <strong style="color:#C9A84C;">10 minutes</strong>.
              </p>

              <!-- OTP Code -->
              <div style="background-color:#1A1A1A; border:2px solid #C9A84C; border-radius:12px; padding:20px; text-align:center; margin:20px 0;">
                <p style="color:#6B7280; font-size:10px; letter-spacing:2px; margin:0 0 8px; text-transform:uppercase;">Your Verification Code</p>
                <p style="color:#E8C97A; font-size:36px; font-weight:800; letter-spacing:8px; margin:0; font-family:'Courier New',monospace;">${code}</p>
              </div>

              <p style="color:#9CA3AF; font-size:12px; line-height:18px; margin:20px 0 0;">
                If you didn't request this code, you can safely ignore this email. Never share this code with anyone — our team will never ask for it.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px; border-top:1px solid #2A2A2A;">
              <p style="color:#4B5563; font-size:11px; text-align:center; margin:0;">
                © ${new Date().getFullYear()} Elite Chauffeurs Australia · Premium Transport Services<br/>
                This is an automated message, please do not reply.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "accept":       "application/json",
        "content-type": "application/json",
        "api-key":      apiKey,
      },
      body: JSON.stringify({
        sender:  { name: senderName, email: senderEmail },
        to:      [{ email: to }],
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("[Brevo] Send failed:", response.status, errData);
      return { success: false, error: `Email send failed: ${errData?.message || response.statusText}` };
    }

    console.log(`[Brevo] OTP email sent to ${to} (type: ${type})`);
    return { success: true };

  } catch (err: any) {
    console.error("[Brevo] Network error:", err.message);
    return { success: false, error: "Failed to send email. Please try again." };
  }
}

/**
 * Generate a cryptographically random 6-digit OTP
 */
export function generateOTP(): string {
  // crypto.randomInt is available in Node.js 14.10+
  const crypto = require("crypto");
  const num = crypto.randomInt(0, 1000000);
  return String(num).padStart(6, "0");
}
