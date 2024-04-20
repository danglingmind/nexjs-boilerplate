import { signOut, auth } from "@/auth";

export default async function SignOutPage() {
  const session = await auth();
  return (
    <div>
      <h3>Hi {session?.user?.name}</h3>
      <h5>Are you sure you want to sign out?</h5>
      <form
        action={async (formData) => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
