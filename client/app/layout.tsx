import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Hello Next.js!",
  description: "Hello Next.js! with TypeScript, Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          noto_sans_kr.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
