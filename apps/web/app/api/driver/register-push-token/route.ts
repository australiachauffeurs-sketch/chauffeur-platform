import { NextRequest, NextResponse } from "next/server";

const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

export async function POST(req: NextRequest) {
  try {
    const { driverId, token } = await req.json();
    if (!driverId || !token) {
      return NextResponse.json({ error: "driverId and token are required." }, { status: 400 });
    }

    if (isDemo) {
      console.log("[Demo] Push token registered for driver", driverId, token);
      return NextResponse.json({ success: true, demo: true });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from("drivers")
      .update({ push_token: token, updated_at: new Date().toISOString() })
      .eq("id", driverId);

    if (error) {
      console.error("[Push token] Supabase error:", error);
      return NextResponse.json({ error: "Could not save token." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Push token] Unexpected error:", err);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}
