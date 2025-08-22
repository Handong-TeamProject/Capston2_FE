// libs/hooks/token.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // 기본값 설정

export async function accessTokenUser(): Promise<string | null> {
    try {
        const refreshToken = sessionStorage.getItem("refreshToken") || "";

        // 👇 인터셉터 없는 axios 직접 사용
        const response = await axios.post(`${BASE_URL}/auth`, null, {
            headers: {
                "RefreshToken": `Bearer/u0020${refreshToken}`
            },
            withCredentials: true
        });

        // 👇 응답 헤더에서 accessToken 추출 (key는 소문자!)
        const accessToken = response.headers["authorization"];

        if (!accessToken) {
            alert("로그인 실패: accessToken 없음");
            return null;
        }

        sessionStorage.setItem("accessToken", accessToken.startsWith("Bearer/u0020") ? accessToken.slice("Bearer/u0020".length) : accessToken);
        return accessToken;

    } catch (error: unknown) {
        console.error("accessToken 재발급 중 오류 발생:", error);
        alert("accessToken 재발급 중 오류 발생");
        sessionStorage.clear();
        window.location.href = "/";
        return null;
    }
}
