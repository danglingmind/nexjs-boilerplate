import type { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/db";
// import CustomPrismaAdapter from "@/prisma/customAdapter";

export const providers: Provider[] = [GithubProvider({}), GoogleProvider({})];

export const authConfig = {
  pages: {
    //   signIn: "/signin",
    // error: "/error/auth",
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  //   basePath: "/auth",
  callbacks: {
    //     signIn({ user, account, profile }) {
    //       console.log("user", user);
    //       console.log("profile", profile);
    //       console.log("account", account);
    //       return Promise.resolve(true);
    //     },
    //     jwt({ token, trigger, session }) {
    //       if (trigger === "update") token.name = session?.user?.name;
    //       return token;
    //     },
    //     session({ session, token }) {
    //       session.user.id = String(token.id);
    //       return session;
    //     },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      let isProtected = false;

      const protectedPathsPrefix = ["/ui/"];
      protectedPathsPrefix.forEach((prefix) => {
        if (pathname.startsWith(prefix)) {
          isProtected = true;
        }
      });
      if (isProtected) return !!auth;
      return true;
    },
  },
  providers: providers,
} satisfies NextAuthConfig;

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
