import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/hibakujumoku") {
    return new Response(null, {
      status: 308,
      headers: {
        Location: new URL("/hibakujumoku/", request.url).toString(),
      },
    });
  }

  if (pathname.startsWith("/hibakujumoku/")) {
    return NextResponse.next();
  }

  if (/^\/(ja|en)(?:\/|$)/.test(pathname)) {
    return NextResponse.next();
  }

  const savedLocale = request.cookies.get("ygj_locale")?.value;
  const browserLanguage =
    request.headers.get("accept-language")?.split(",")[0]?.trim().toLowerCase() ?? "";
  const locale =
    savedLocale === "ja" || savedLocale === "en"
      ? savedLocale
      : browserLanguage.startsWith("ja")
        ? "ja"
        : "en";

  const destination = request.nextUrl.clone();
  destination.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = locale === "ja"
    ? NextResponse.rewrite(destination)
    : NextResponse.redirect(destination);

  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  matcher: [
    "/",
    "/activities/:path*",
    "/partners/:path*",
    "/contact/:path*",
    "/ja/:path*",
    "/en/:path*",
    "/hibakujumoku/:path*",
  ],
};
