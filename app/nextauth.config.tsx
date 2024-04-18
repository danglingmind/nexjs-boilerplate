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
    authorized({ auth, request: { nextUrl } }) {
      console.log(auth);
      const isLoggedIn = !!auth?.user;
      const isInside = nextUrl.pathname.startsWith("/ui/inside");
      if (isInside) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/ui/inside", nextUrl));
      }
      return true;
    },
  },
  providers: providers,
} satisfies NextAuthConfig;
