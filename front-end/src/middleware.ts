import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  const pathname = request.nextUrl.pathname;

  if (
    token &&
    (pathname === "/" || pathname === "/login" || pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!token && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/home/:path*"],
};
