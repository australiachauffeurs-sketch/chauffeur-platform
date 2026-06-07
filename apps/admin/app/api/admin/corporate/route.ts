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
  if (!supabase) {
    // Return demo data when Supabase is not configured
    return NextResponse.json({
      accounts: [
        {
          id: "demo-1",
          company_name: "Acme Corporation",
          abn: "12 345 678 901",
          billing_email: "accounts@acme.com.au",
          billing_address: "Level 10, 1 Market St, Sydney NSW 2000",
          credit_limit: 10000,
          current_balance: 3250,
          payment_terms: 30,
          is_active: true,
          created_at: new Date(Date.now() - 60 * 24 * 3600 * 1000).toISOString(),
        },
        {
          id: "demo-2",
          company_name: "Global Finance Partners",
          abn: "98 765 432 109",
          billing_email: "finance@gfp.com.au",
          billing_address: "Suite 5, 200 George St, Sydney NSW 2000",
          credit_limit: 25000,
          current_balance: 8400,
          payment_terms: 14,
          is_active: true,
          created_at: new Date(Date.now() - 120 * 24 * 3600 * 1000).toISOString(),
        },
        {
          id: "demo-3",
          company_name: "Pacific Law Group",
          abn: "55 123 456 789",
          billing_email: "billing@pacificlaw.com.au",
          billing_address: "Level 22, 300 Queen St, Brisbane QLD 4000",
          credit_limit: 5000,
          current_balance: 5000,
          payment_terms: 30,
          is_active: false,
          created_at: new Date(Date.now() - 200 * 24 * 3600 * 1000).toISOString(),
        },
      ],
    });
  }

  const { data, error } = await supabase
    .from("corporate_accounts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ accounts: data || [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { company_name, abn, billing_email, billing_address, credit_limit, payment_terms } = body;

  if (!company_name || !billing_email) {
    return NextResponse.json({ error: "company_name and billing_email are required" }, { status: 400 });
  }

  const supabase = await getSupa();
  if (!supabase) return NextResponse.json({ ok: true, id: "demo-new" });

  const { data, error } = await supabase
    .from("corporate_accounts")
    .insert({ company_name, abn, billing_email, billing_address, credit_limit: credit_limit ?? 5000, payment_terms: payment_terms ?? 30 })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, account: data });
}

export async function PATCH(req: NextRequest) {
  const { id, ...updates } = await req.json();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const supabase = await getSupa();
  if (!supabase) return NextResponse.json({ ok: true });

  const { error } = await supabase.from("corporate_accounts").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
