import { auth } from "@/app/auth";

export default async function LoggedIn() {
  const session = await auth();
  return <div>{session?.user ? session?.user?.email : "not signed in "}</div>;
}
