import { NextRequest, NextResponse } from "next/server";

const PROTECTED = ["/dashboard", "/booking"];
const PUBLIC    = ["/", "/book", "/auth", "/api", "/_next", "/favicon"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip public routes
  const isPublic = PUBLIC.some(p => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p + "?"));
  if (isPublic) return NextResponse.next();

  // Check if route needs protection
  const isProtected = PROTECTED.some(p => pathname === p || pathname.startsWith(p + "/"));
  if (!isProtected) return NextResponse.next();

  // Check auth — cookie set on login/signup
  const ecUser    = req.cookies.get("ec_user")?.value;
  const sbToken   = req.cookies.get("sb-access-token")?.value;
  const isAuthed  = !!(ecUser || sbToken);

  if (!isAuthed) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
