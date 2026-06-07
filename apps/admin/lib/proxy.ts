/**
 * Shared proxy helper — forwards a request from the admin app (port 3001)
 * to the web app API (port 3000), injecting auth headers.
 */
import { NextRequest, NextResponse } from "next/server";

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";

export async function proxyToWeb(
  req: NextRequest,
  path: string,
  options?: { method?: string; body?: string }
): Promise<NextResponse> {
  try {
    const url = `${WEB_URL}${path}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Origin":       "http://localhost:3001",
    };
    const adminSecret = process.env.ADMIN_SECRET;
    if (adminSecret) headers["x-admin-secret"] = adminSecret;

    const res = await fetch(url, {
      method:  options?.method ?? req.method,
      headers,
      body:    options?.body ?? (req.method !== "GET" ? await req.text() : undefined),
      cache:   "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(`[Admin proxy] ${path}:`, err);
    return NextResponse.json({ error: "Proxy error — web app unreachable.", demo: true }, { status: 502 });
  }
}
