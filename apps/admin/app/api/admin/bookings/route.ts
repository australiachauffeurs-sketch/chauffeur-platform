import { NextRequest } from "next/server";
import { proxyToWeb } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.toString();
  return proxyToWeb(req, `/api/admin/bookings${search ? `?${search}` : ""}`);
}
