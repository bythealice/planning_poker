import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <section className="w-full max-w-2xl rounded-xl border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold">Planning Poker + Jira</h1>
        <p className="mt-3 text-muted-foreground">
          Base do projeto pronta com Next.js App Router, feature-first,
          Zustand, React Query, Axios, Zod, React Hook Form, Tailwind e
          shadcn/ui.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Ir para login
        </Link>
      </section>
    </main>
  );
}
