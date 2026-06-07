/**
 * OTP Store — Manages OTP codes in Supabase
 *
 * Stores generated OTPs in an `otp_codes` table and verifies them.
 * Table schema:
 *   id         uuid primary key default gen_random_uuid()
 *   email      text not null
 *   code       text not null
 *   type       text not null (signup | recovery)
 *   expires_at timestamptz not null
 *   used       boolean default false
 *   created_at timestamptz default now()
 */

import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

const OTP_EXPIRY_MINUTES = 10;

/**
 * Store an OTP code in the database
 */
export async function storeOTP(email: string, code: string, type: "signup" | "recovery"): Promise<boolean> {
  const supabase = getAdminClient();

  // Invalidate any existing unused codes for this email+type
  await supabase
    .from("otp_codes")
    .update({ used: true })
    .eq("email", email.toLowerCase().trim())
    .eq("type", type)
    .eq("used", false);

  // Insert new code
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000).toISOString();

  const { error } = await supabase.from("otp_codes").insert({
    email:      email.toLowerCase().trim(),
    code,
    type,
    expires_at: expiresAt,
    used:       false,
  });

  if (error) {
    console.error("[OTP Store] Insert error:", error.message);
    return false;
  }

  return true;
}

/**
 * Verify an OTP code — returns true if valid, false otherwise
 */
export async function verifyOTP(email: string, code: string, type: "signup" | "recovery"): Promise<boolean> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from("otp_codes")
    .select("id, expires_at")
    .eq("email", email.toLowerCase().trim())
    .eq("code", code)
    .eq("type", type)
    .eq("used", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return false;
  }

  // Check expiry
  if (new Date(data.expires_at) < new Date()) {
    // Mark as used (expired)
    await supabase.from("otp_codes").update({ used: true }).eq("id", data.id);
    return false;
  }

  // Mark as used (consumed)
  await supabase.from("otp_codes").update({ used: true }).eq("id", data.id);

  return true;
}
