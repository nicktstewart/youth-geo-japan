import { NextResponse } from "next/server";
import { hasLocale } from "@/lib/i18n";

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const locale =
    typeof body === "object" && body !== null && "locale" in body
      ? String(body.locale)
      : "";

  if (!hasLocale(locale)) {
    return NextResponse.json({ error: "Unsupported locale" }, { status: 400 });
  }

  const response = NextResponse.json({ locale });
  response.cookies.set("ygj_locale", locale, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
