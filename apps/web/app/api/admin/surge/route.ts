import { NextRequest, NextResponse } from "next/server";

async function getSupa() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key?.startsWith("eyJ")) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key);
}

export async function GET() {
  const supabase = await getSupa();
  if (!supabase) return NextResponse.json({ rules: [] });
  const { data } = await supabase.from("surge_rules").select("*").order("created_at");
  return NextResponse.json({ rules: data || [] });
}

export async function PATCH(req: NextRequest) {
  const { id, is_active } = await req.json();
  const supabase = await getSupa();
  if (!supabase) return NextResponse.json({ ok: true });
  // Deactivate all first, then activate the chosen one (only one active at a time)
  if (is_active) await supabase.from("surge_rules").update({ is_active: false }).neq("id", id);
  await supabase.from("surge_rules").update({ is_active }).eq("id", id);
  return NextResponse.json({ ok: true });
}
