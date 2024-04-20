"use server";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

export async function authenticate(
  providerId: string | undefined,
  redirectTo?: string
  //   formData?: FormData
) {
  try {
    redirectTo
      ? await signIn(providerId, { redirectTo: redirectTo })
      : await signIn(providerId);
  } catch (error) {
    if (error instanceof AuthError) {
      return "Something went wrong during login.";
    }
    throw error;
  }
}
