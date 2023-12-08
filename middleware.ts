import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: "/admin/:path*" };
