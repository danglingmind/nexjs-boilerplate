import { authenticate } from "@/app/lib/actions";
import { providers } from "@/app/nextauth.config";
import { randomUUID } from "crypto";
import type { Provider } from "next-auth/providers";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginForm() {
  return (
    <div className="flex flex-col justify-center items-center">
      {providers.map((provider: Provider) => (
        <form
          key={provider.id}
          action={(formData) => {
            if (provider.id !== "creadentials") {
              authenticate(String(provider.id));
            } else {
              authenticate(provider.id, formData);
            }
          }}
        >
          <input name="callbackUrl" type="hidden" defaultValue="/" />
          <button type="submit" className="btn-primary">
            Sign in with {provider?.name}
          </button>
        </form>
      ))}
    </div>
  );
}
