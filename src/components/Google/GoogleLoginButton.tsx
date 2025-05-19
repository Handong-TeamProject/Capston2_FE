"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { api } from "@/app/api/api";
import { accessTokenUser } from "@/app/api/hooks/token";

export default function GoogleLoginButton() {
    const router = useRouter();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token;
            if (!accessToken) {
                alert("구글 로그인 실패: accessToken 없음");
                return;
            }

            try {
                const response = await api.post<{ refreshToken: string }>("/user/login/google", {
                    accessToken: accessToken,
                });

                const refreshToken = response.data.refreshToken;
                if (!refreshToken) {
                    alert("refreshToken 없음");
                    return;
                }

                sessionStorage.setItem("refreshToken", refreshToken);

                const success = await accessTokenUser();
                if (success) {
                    // ✅ 로그인 완료 이벤트 발생
                    window.dispatchEvent(new Event("loginSuccess"));
                    router.replace("/workspace");
                } else {
                    alert("accessToken 발급 실패");
                }
            } catch (err) {
                console.error("서버 로그인 실패", err);
                alert("로그인 중 오류 발생");
            }
        },
        onError: () => alert("구글 로그인 실패"),
        scope: "profile email openid",
    });

    return (
        <button
            onClick={() => login()}
            className="text-white bg-orange px-3 py-1 rounded hover:bg-gray-100 hover:bg-orange50"
        >
            시작하기
        </button>
    );
}
