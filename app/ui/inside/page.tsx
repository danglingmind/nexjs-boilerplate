import { SignOutButton } from "@/app/components/auth/auth-components";
import { auth, signOut } from "@/auth";

export default async function LoggedIn() {
  const session = await auth();
  return <div>{session?.user ? <SignOutButton /> : "not signed in "}</div>;
}
