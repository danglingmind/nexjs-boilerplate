"use client";

import { useParams, useSearchParams } from "next/navigation";

enum Error {
  Configuration = "Configuration",
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as Error;

  return <div>Error: {error}</div>;
}
