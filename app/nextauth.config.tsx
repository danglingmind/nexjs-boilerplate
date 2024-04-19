import type { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";

export const providers: Provider[] = [
  GithubProvider({
    clientId: process.env.GITHUB_ID ?? "",
    clientSecret: process.env.GITHUB_SECRET ?? "",
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_ID ?? "",
    clientSecret: process.env.GOOGLE_SECRET ?? "",
  }),
];

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      console.log("authorized");
      const isLoggedIn = !!auth?.user;

      const unprotectedPaths = ["/login"];

      const isProtected = !unprotectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/login", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
    redirect({ url, baseUrl }) {
      return "/ui/inside";
    },
  },
  providers: providers,
} satisfies NextAuthConfig;
