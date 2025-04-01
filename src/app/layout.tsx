// src/app/layout.tsx
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex-container bg-gray-500">
        <header className={`flex-container bg-primary`}>
          <p className="font-sans text-white">나의 웹사이트</p>
        </header>
        <main className={`flex-container h-60 bg-secondary`}>{children}</main>
        <footer className={`flex-container h-60 bg-zinc-700`}>
          <p className="text-white">© 2025 나의 웹사이트</p>
        </footer>
      </body>
    </html>
  );
}
