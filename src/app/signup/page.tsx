import { SignupViewModel } from "@/features/auth";

export default function SignupPage() {
  return (
    <main className="login-grid-bg flex min-h-dvh flex-col items-center justify-center bg-login-bg px-4 py-8 text-login-card-foreground" data-cy="signup-page">
      <SignupViewModel />
    </main>
  );
}

