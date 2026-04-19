import type { Metadata } from "next";
import { Sora, Space_Mono } from "next/font/google";

import { AppProviders } from "@/core/providers/app-providers";

import "./globals.css";

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
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${soraSans.variable} ${spaceMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
