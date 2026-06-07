/**
 * Central demo-mode detection for all API routes.
 *
 * Returns true when Supabase / Stripe / Google credentials are missing
 * or are placeholder values — routes should return realistic mock data
 * instead of hitting real external services.
 */

/**
 * Returns true only if the key is missing or an obvious placeholder.
 * Accepts both old JWT format (eyJ…) and new Supabase key format
 * (sb_publishable_… / sb_secret_…).
 */
function isPlaceholderSupabaseKey(key: string | undefined): boolean {
  if (!key) return true;
  if (key.startsWith("eyJ")) return false;            // legacy JWT format
  if (key.startsWith("sb_publishable_")) return false; // new anon key format
  if (key.startsWith("sb_secret_")) return false;      // new service role format
  return true;  // anything else (e.g. "your-key-here") is a placeholder
}

export const IS_DEMO_SUPABASE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") ||
  isPlaceholderSupabaseKey(process.env.SUPABASE_SERVICE_ROLE_KEY) ||
  isPlaceholderSupabaseKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const IS_DEMO_STRIPE =
  !process.env.STRIPE_SECRET_KEY ||
  process.env.STRIPE_SECRET_KEY.includes("your") ||   // covers your_stripe and your-stripe
  process.env.STRIPE_SECRET_KEY === "sk_test_";

export const IS_DEMO_PLACES =
  !process.env.GOOGLE_MAPS_API_KEY ||
  process.env.GOOGLE_MAPS_API_KEY.includes("your");

/** Quick helper for routes that only need a Supabase check */
export function isDemo(): boolean {
  return IS_DEMO_SUPABASE;
}
