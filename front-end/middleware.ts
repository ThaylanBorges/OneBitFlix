import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const PUBLIC_PATHS = ["/", "/login", "/register"];
const PROTECTED_PREFIXES = ["/home", "/profile"];

const isValidToken = async (token: string) => {
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
};

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get("token");
  const token = tokenCookie?.value;

  const isPublic = PUBLIC_PATHS.includes(pathname);
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  // nemhuma rota relevante - dixa passar
  if (!isPublic && !isProtected) return NextResponse.next();

  const autenticated = token ? await isValidToken(token) : false;

  // usuário autenticado acessando página publica - redirecionar
  if (autenticated && isPublic) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // usuário não autenticado accessando página protegidas - redicecionar para login
  if (!autenticated && isProtected) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);

    const redirectResponse = NextResponse.redirect(loginUrl);
    if (token) redirectResponse.cookies.delete("token");
    return redirectResponse;
  }

  // limpa o token
  if (token && !autenticated) {
    const response = NextResponse.next();
    response.cookies.delete("token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/home/:path*", "/profile"],
};
