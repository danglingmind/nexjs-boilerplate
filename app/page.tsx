import Image from "next/image";
import SignInPage from "./signin/page";
import {
  SignInButton,
  SignOutButton,
} from "@/app/components/auth/auth-components";
import { auth } from "@/auth";
import prisma from "@/app/lib/db";

export default async function Home() {
  const session = await auth();
  const user = await prisma?.user?.findFirst();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border-2 border-black bg-white p-10">
        {session?.user ? (
          <div>
            <h1>Welcome {user?.name}</h1>
            <Image
              src={String(user?.image)}
              alt="Picture of user"
              width={100}
              height={100}
            />
            <SignOutButton />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </main>
  );
}
