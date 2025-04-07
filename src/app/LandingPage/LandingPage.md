// LandingPage.tsx

import Footer from "@/components/layout/Footer"
import React from "react"

const LandingPage = () => {
    return (
        <div
            className="bg-white h-screen w-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
            {/* Hero Section */}
            <section
                className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-white text-gray-800 px-4 snap-start">
                <h1 className="text-5xl font-bold mb-4">당신의 아이디어를 현실로</h1>
                <p className="text-xl text-center max-w-xl mb-8">
                    누구나 손쉽게 시작할 수 있는 웹 서비스, 지금 바로 시작해보세요.
                </p>
            </section>

            {/* Feature Section */}
            <section
                className="h-screen flex flex-col justify-center items-center bg-white text-gray-800 px-4 snap-start">
                <h2 className="text-4xl font-semibold mb-6">주요 기능</h2>
                <ul className="text-lg space-y-4">
                    <li>✅ 직관적인 UI</li>
                    <li>⚡ 빠른 반응 속도</li>
                    <li>🔒 안전한 사용자 정보 보호</li>
                </ul>
            </section>

            {/* Call to Action Section */}
            <section
                className="h-screen flex flex-col justify-center items-center bg-blue-50 text-gray-800 px-4 snap-start">
                <h2 className="text-4xl font-semibold mb-4">지금 시작해보세요</h2>
                <p className="text-lg mb-6">간단한 회원가입만으로 모든 기능을 이용할 수 있어요.</p>
                <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition">
                    무료로 가입하기
                </button>
            </section>
        </div>
    )
}

export default LandingPage
