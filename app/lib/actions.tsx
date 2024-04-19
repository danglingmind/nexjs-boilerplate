"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/app/auth";

export async function authenticate(
  providerId: string | undefined,
  formData?: FormData
) {
  try {
    await signIn(providerId, formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return "Something went wrong during login.";
    }
    throw error;
  }
}
