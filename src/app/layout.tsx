// src/app/layout.tsx
"use client";

import Header from "@/components/layout/Header";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/layout/Footer";
import localFont from "next/font/local";

const customFont = localFont({
  src: "../../public/font/KimjungchulGothic-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-custom",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <html lang="ko">
        <body
          className={`${customFont.className} flex-container bg-gray-500 mx-auto w-full max-w-5xl font-custom`}
        >
          <Header />
          <main className="flex-container bg-secondary">{children}</main>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
