import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/hibakujumoku") {
    return new Response(null, {
      status: 308,
      headers: {
        Location: new URL("/hibakujumoku/", request.url).toString(),
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/hibakujumoku/:path*",
};
