import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Layout from "@/components/common/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "스미스 - 병역 특례 채용 공고",
  description: "병역 특례 채용 공고를 확인하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
