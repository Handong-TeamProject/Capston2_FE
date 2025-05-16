// src/app/layout.tsx
"use client";

import Header from "@/components/layout/Header";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import localFont from "next/font/local";
import {usePathname} from "next/navigation";
import Script from "next/script";
import {GoogleOAuthProvider} from "@react-oauth/google";

const customFont = localFont(
    {src: "../../public/font/KimjungchulGothic-Regular.ttf", weight: "400", style: "normal", variable: "--font-custom"}
);

export default function Layout({children} : {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const isLanding = pathname === "/" || pathname === "/landing"; // 원하는 경로 지정
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
            <html lang="ko">
                <head>
                    <Script
                        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`}
                        strategy="beforeInteractive"/>
                </head>
                <body
                    className={`${customFont.className} flex-container bg-gray-500 mx-auto w-full max-w-5xl font-custom`}>
                    <Header/>
                    <main className="flex-container bg-secondary">{children}</main>
                    {!isLanding && <Footer/>}
                </body>
            </html>
        </GoogleOAuthProvider>
    );
}
