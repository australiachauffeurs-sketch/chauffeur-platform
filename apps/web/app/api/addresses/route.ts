import { NextRequest, NextResponse } from "next/server";

async function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key?.startsWith("eyJ")) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ addresses: [] });
  const supabase = await getSupabase();
  if (!supabase) return NextResponse.json({ addresses: [] });
  const { data } = await supabase.from("saved_addresses").select("*").eq("user_id", userId).order("created_at");
  return NextResponse.json({ addresses: data || [] });
}

export async function POST(req: NextRequest) {
  const { userId, label, address } = await req.json();
  if (!userId || !label || !address) return NextResponse.json({ error: "missing fields" }, { status: 400 });
  const supabase = await getSupabase();
  if (!supabase) return NextResponse.json({ ok: true, demo: true });
  const { data, error } = await supabase.from("saved_addresses").insert({ user_id: userId, label, address }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, address: data });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const supabase = await getSupabase();
  if (!supabase) return NextResponse.json({ ok: true, demo: true });
  await supabase.from("saved_addresses").delete().eq("id", id);
  return NextResponse.json({ ok: true });
}
