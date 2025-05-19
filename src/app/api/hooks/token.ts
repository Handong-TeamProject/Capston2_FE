// libs/hooks/token.ts
import axios from "axios";

export async function accessTokenUser(): Promise<string | null> {
    try {
        const refreshToken = sessionStorage.getItem("refreshToken") || "";

        // 👇 인터셉터 없는 axios 직접 사용
        const response = await axios.post("http://localhost:8080/api/auth", null, {
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

    } catch (error: any) {
        alert("accessToken 재발급 중 오류 발생");
        window.location.href = "/";
        return null;
    }
}
