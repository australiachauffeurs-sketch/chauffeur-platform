import { NextRequest, NextResponse } from "next/server";

async function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key);
}

export async function GET() {
  const supabase = await getSupabase();
  if (!supabase) return NextResponse.json({ promos: [] });
  const { data } = await supabase.from("promo_codes").select("*").order("created_at", { ascending: false });
  return NextResponse.json({ promos: data || [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = await getSupabase();
  if (!supabase) return NextResponse.json({ ok: true, demo: true });
  const { error } = await supabase.from("promo_codes").insert({
    code:           body.code.toUpperCase().trim(),
    description:    body.description    || null,
    discount_type:  body.discount_type,
    discount_value: body.discount_value,
    max_uses:       body.max_uses       || null,
    expires_at:     body.expires_at     || null,
    is_active:      true,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const supabase = await getSupabase();
  if (!supabase) return NextResponse.json({ ok: true, demo: true });
  await supabase.from("promo_codes").delete().eq("id", id);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  const { id, is_active } = await req.json();
  const supabase = await getSupabase();
  if (!supabase) return NextResponse.json({ ok: true, demo: true });
  await supabase.from("promo_codes").update({ is_active }).eq("id", id);
  return NextResponse.json({ ok: true });
}
