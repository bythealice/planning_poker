import { LoginViewModel } from "@/features/auth";

export default function LoginPage() {
  return (
    <main className="poker-grid-bg flex min-h-screen flex-col items-center justify-center px-4 py-8 text-zinc-100">
      <LoginViewModel />
    </main>
  );
}

