import siteMetadata from "@/data/siteMetadata.json";
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/components/Header";

import "@/styles/globals.css";

const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteMetadata.language} className={noto_sans_kr.variable}>
      <head>
        <title>{siteMetadata.title}</title>
        <meta
          charSet="UTF-8"
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <Header />
        {children}
      </body>
    </html>
  );
}
