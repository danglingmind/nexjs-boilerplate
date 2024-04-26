import Image from "next/image";
import SignInPage from "./signin/page";
import {
  SignInButton,
  SignOutButton,
} from "@/app/components/auth/auth-components";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border-2 border-black bg-white p-10">
        {session?.user ? <SignOutButton /> : <SignInButton />}
      </div>
    </main>
  );
}
