// src/app/layout.tsx
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body>
                <header>
                    <p className='text-red-500'>나의 웹사이트</p>
                </header>
                <main>{children}</main>
                <footer>
                    <p>© 2025 나의 웹사이트</p>
                </footer>
            </body>
        </html>
    );
}

