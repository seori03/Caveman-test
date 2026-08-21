import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_TITLE } from "@/lib/config";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description:
    "물리치료 학생의 임상추론 성장 포트폴리오 — 공부, 임상실습, Case, 그리고 임상적 판단의 성장 기록",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
