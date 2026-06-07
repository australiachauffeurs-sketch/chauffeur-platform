import { NextRequest, NextResponse } from "next/server";

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";

export async function GET(req: NextRequest) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Origin":       "http://localhost:3001",
    };

    const adminSecret = process.env.ADMIN_SECRET;
    if (adminSecret) headers["x-admin-secret"] = adminSecret;

    const res  = await fetch(`${WEB_URL}/api/admin/stats`, { headers, cache: "no-store" });
    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[Admin stats proxy] Error:", err);
    return NextResponse.json({ error: "Failed to connect to backend. Make sure the web app is running on port 3000." }, { status: 502 });
  }
}
