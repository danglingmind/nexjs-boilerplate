import type { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";

export const providers: Provider[] = [
  GithubProvider,
  GoogleProvider({
    clientId: process.env.GOOGLE_ID ?? "",
    clientSecret: process.env.GOOGLE_SECRET ?? "",
  }),
];

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = String(token.id);
      return session;
    },

    // async authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const unprotectedPaths = ["/login"];
    //   const isProtected = !unprotectedPaths.some((path) =>
    //     nextUrl.pathname.startsWith(path)
    //   );
    //   if (isLoggedIn) {
    //     console.log("loggedin");
    //     return true;
    //   } else {
    //     console.log("not loggedin");
    //     if (isProtected) {
    //       const redirectUrl = new URL("/login", nextUrl.origin);
    //       redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
    //       return Response.redirect(redirectUrl);
    //     }
    //   }
    //   if (isProtected && !isLoggedIn) {
    //     const redirectUrl = new URL("/login", nextUrl.origin);
    //     redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
    //     return Response.redirect(redirectUrl);
    //   }
    //   return true;
    // },
    // redirect({ url, baseUrl }) {
    //   console.log("redirect", url, baseUrl);
    //   return "/ui/inside";
    // },
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
