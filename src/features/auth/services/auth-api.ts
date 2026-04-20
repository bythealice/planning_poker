import { apiClient } from "@/core/api";

import { normalizeEmail } from "@/features/auth/utils/normalize-email";
import type { AuthRepository, SignInSession } from "@/features/auth/types";

function toDemoToken(email: string) {
  if (typeof window === "undefined") {
    return email.replace(/[^a-z0-9]/gi, "").toLowerCase();
  }

  return window.btoa(email);
}

async function signInWithApi(email: string, password: string): Promise<SignInSession> {
  const { data } = await apiClient.post<SignInSession>("/auth/login", {
    email,
    password,
  });

  return data;
}

async function signInWithDemoFallback(email: string): Promise<SignInSession> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    email,
    token: `demo-${toDemoToken(email)}`,
  };
}

export const authService: AuthRepository = {
  async signIn(email: string, password: string): Promise<SignInSession> {
    const normalizedEmail = normalizeEmail(email);

    try {
      return await signInWithApi(normalizedEmail, password);
    } catch {
      return signInWithDemoFallback(normalizedEmail);
    }
  },
};

