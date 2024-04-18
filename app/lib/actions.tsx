"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/app/auth";

export async function authenticate(
  providerId: string | undefined,
  callbackUrl?: string,
  formData?: FormData
) {
  try {
    if (callbackUrl && formData) {
      await signIn(providerId, { callbackUrl: callbackUrl, ...formData });
    } else if (formData) {
      await signIn(providerId, formData);
    } else if (callbackUrl) {
      await signIn(providerId, { callbackUrl: callbackUrl });
    } else {
      await signIn(providerId);
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return "Something went wrong during login.";
    }
    throw error;
  }
}
