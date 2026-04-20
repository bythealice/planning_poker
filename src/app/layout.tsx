import type { Metadata } from "next";
import { Sora, Space_Mono } from "next/font/google";
import { AppProviders } from "@/core/providers/app-providers";
import "./globals.css";
import { ReactNode } from "react";

const soraSans = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Planning Poker",
  description: "Planning Poker integrado ao Jira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${soraSans.variable} ${spaceMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-login-bg font-sans text-login-card-foreground antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
