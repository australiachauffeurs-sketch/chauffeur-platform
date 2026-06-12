import { NextRequest, NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/brevo";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, pickup, dropoff, service, travelDate, sourcePage } =
      await req.json();

    if (!phone && !email) {
      return NextResponse.json(
        { error: "Please provide a phone number or email so we can reach you." },
        { status: 400 }
      );
    }
    if (!pickup || !dropoff) {
      return NextResponse.json(
        { error: "Pickup and drop-off are required." },
        { status: 400 }
      );
    }

    // 1) Persist the lead (best-effort — never block the user on DB issues)
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (url && (key?.startsWith("eyJ") || key?.startsWith("sb_secret_"))) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(url, key);
        await supabase.from("leads").insert({
          name: name || null,
          email: email || null,
          phone: phone || null,
          pickup,
          dropoff,
          service: service || null,
          travel_date: travelDate || null,
          source_page: sourcePage || null,
        });
      } catch (e) {
        console.error("[Lead] DB insert failed:", e);
      }
    }

    // 2) Notify the business (best-effort)
    sendLeadEmail({ name, email, phone, pickup, dropoff, service, travelDate, sourcePage }).catch(
      () => {}
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Lead] Error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
