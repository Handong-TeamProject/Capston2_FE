import {signIn} from "next-auth/react";

export const handleGoogleLogin = () => {
    signIn("google", {
        callbackUrl: "/auth/callback", // 우리가 만든 커스텀 페이지
    });
};

export const StartButton = () => {
    return (
        <a
            onClick={() => handleGoogleLogin()}
            className="inline-block bg-orange hover:bg-yellow text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mb-32 mt-10">
            시작하기
        </a>
    )
}