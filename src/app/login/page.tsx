import { LoginViewModel } from "@/features/auth";

export default function LoginPage() {
  return (
    <main className="login-grid-bg flex min-h-dvh flex-col items-center justify-center bg-login-bg px-4 py-8 text-login-card-foreground">
      <LoginViewModel />
    </main>
  );
}

