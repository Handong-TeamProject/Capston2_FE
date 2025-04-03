// src/app/layout.tsx
"use client";

import Header from "@/components/layout/Header";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SessionProvider>
      <html lang="ko">
        <body className="flex-container w-full bg-gray-500 max-w-7xl mx-auto font-custom">
          <Header/>
          <main className="flex-container bg-secondary">{children}</main>
          <Footer/>
        </body>
      </html>
    </SessionProvider>
  );
}
