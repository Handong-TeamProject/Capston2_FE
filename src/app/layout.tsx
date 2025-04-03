// src/app/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import "./globals.css";

import localFont from "next/font/local";

const customFont = localFont({
  src: "../../public/font/KimjungchulGothic-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-custom",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="ko">
      <body className= {`${customFont.className} flex-container w-full bg-gray-500 max-w-7xl mx-auto`}>
        {!isLoginPage && <Header />}
        <main className="flex-container bg-secondary">{children}</main>
        <footer className="flex-container h-60 bg-zinc-700">
          <p className="text-white">© 2025 나의 웹사이트</p>
        </footer>
      </body>
    </html>
  );
}
