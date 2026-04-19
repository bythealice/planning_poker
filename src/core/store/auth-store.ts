import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthSession = {
  token: string;
  email: string;
};

export type AuthState = {
  session: AuthSession | null;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
};

const initialState = {
  session: null,
} satisfies Pick<AuthState, "session">;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: "planning-poker-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ session: state.session }),
    },
  ),
);

export const authSelectors = {
  session: (state: AuthState) => state.session,
  setSession: (state: AuthState) => state.setSession,
  clearSession: (state: AuthState) => state.clearSession,
} as const;

