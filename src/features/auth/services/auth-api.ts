import { apiClient } from "@/core/api";

import { normalizeEmail } from "@/features/auth/utils/normalize-email";
import type { AuthRepository, AuthSession } from "@/features/auth/types";

function toDemoToken(email: string) {
  if (typeof window === "undefined") {
    return email.replace(/[^a-z0-9]/gi, "").toLowerCase();
  }

  return window.btoa(email);
}

async function loginWithApi(email: string): Promise<AuthSession> {
  const { data } = await apiClient.post<AuthSession>("/auth/login", {
    email,
  });

  return data;
}

async function loginWithDemoFallback(email: string): Promise<AuthSession> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    email,
    token: `demo-${toDemoToken(email)}`,
  };
}

export const authService: AuthRepository = {
  async login(email: string): Promise<AuthSession> {
    const normalizedEmail = normalizeEmail(email);

    try {
      return await loginWithApi(normalizedEmail);
    } catch {
      return loginWithDemoFallback(normalizedEmail);
    }
  },
};

