"use client";
import { signIn, signOut } from "next-auth/react";

export function SignInButton() {
  return (
    <form
      action={async () => {
        await signIn();
      }}
    >
      <button className="btn btn-primary">SiginIn</button>
    </form>
  );
}

export function SignOutButton() {
  return (
    <form
      action={async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
      }}
    >
      <button>SiginOut</button>
    </form>
  );
}
