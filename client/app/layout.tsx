import siteMetadata from "@/data/siteMetadata.json";
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/components/Header";

import "@/styles/globals.css";

const noto_sans_kr = Noto_Sans_KR({ subsets: ["latin"] });

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
      <body className={noto_sans_kr.className}>{children}</body>
    </html>
  );
}
