"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth";

export default function LoginPage(): React.ReactElement {
  const router = useRouter();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <LoginForm
        onSuccess={() => router.push("/")}
      />
    </div>
  );
}
