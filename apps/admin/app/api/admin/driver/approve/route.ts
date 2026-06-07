import { NextRequest } from "next/server";
import { proxyToWeb } from "@/lib/proxy";

export async function POST(req: NextRequest) {
  const body = await req.text();
  return proxyToWeb(req, "/api/admin/driver/approve", { method: "POST", body });
}
