import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  const pathname = request.nextUrl.pathname;

  if (
    token &&
    (pathname === "/" ||
      pathname === "/auth/login" ||
      pathname === "/auth/register")
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!token && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/login", "/auth/register", "/home/:path*"],
};
