import NextAuth from "next-auth";
import { authConfig } from "./app/nextauth.config";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
});
