import NextAuth from "next-auth";
import { authConfig } from "@/app/nextauth.config";
import { NextRequest, NextResponse } from "next/server";

// export default NextAuth(authConfig).auth;
export { auth as middleware } from "@/app/auth";

// export function middleware(req: NextRequest) {
//   return NextResponse.redirect(new URL("/ui/inside", req.url));
// }

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
