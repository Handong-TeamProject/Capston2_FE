// src/app/layout.tsx
"use client";

import Header from "@/components/layout/Header";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SessionProvider>
      <html lang="ko">
        <body className="flex-container w-full bg-gray-500 max-w-7xl mx-auto font-custom">
          <Header/>
          <main className="flex-container bg-secondary">{children}</main>
          <footer className="flex-container h-60 bg-zinc-700">
            <p className="text-white">© 2025 나의 웹사이트</p>
          </footer>
        </body>
      </html>
    </SessionProvider>
  );
}
