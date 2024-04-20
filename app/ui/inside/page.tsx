import { auth, signOut } from "@/auth";

export default async function LoggedIn() {
  const session = await auth();
  return (
    <div>
      {session?.user ? (
        <form
          action={async () => {
            "use server";
            signOut();
          }}
        >
          <button className="flex h-[48px] items-center justify-center gap-2 rounded-md  text-sm font-medium ">
            <div>Sign Out</div>
          </button>
        </form>
      ) : (
        "not signed in "
      )}
    </div>
  );
}
