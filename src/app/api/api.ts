// libs/api.ts
import axios from 'axios';
import { accessTokenUser } from './hooks/token'; // 상대 경로 주의

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'; // 기본값 설정

// ✅ 인터셉터 함수 정의
function attachInterceptors(instance: ReturnType<typeof axios.create>) {
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const status = error.response?.status;
            const originalRequest = error.config;

            // ✅ 401: accessToken 만료 → 재발급 시도
            if (status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                const newToken = await accessTokenUser();

                if (newToken) {
                    sessionStorage.setItem("accessToken", newToken.startsWith("Bearer/u0020") ? newToken.slice("Bearer/u0020".length) : newToken);
                    originalRequest.headers = {
                        ...originalRequest.headers,
                        Authorization: newToken, // 'Bearer ' 포함 여부는 서버에 따라
                    };
                    return axios(originalRequest); // 요청 재시도
                } else {
                    window.dispatchEvent(new Event("logout")); // ✅ 이벤트 전파
                    window.location.href = "/"; // 재발급 실패 시 로그인 이동
                }
            }

            // ✅ 403: 권한 없음 → 사용자에게 알림 또는 메인으로 이동
            if (status === 403) {
                alert("접근 권한이 없습니다.");
                window.dispatchEvent(new Event("logout"));
                window.location.href = "/";
            }

            return Promise.reject(error);
        }
    );

    return instance;
}

// ✅ 기본 API 인스턴스
export const api = attachInterceptors(
    axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
);

// ✅ accessToken 포함 요청용 인스턴스
export const getAccessApi = () => {
    if (typeof window === 'undefined') return api;

    const token = sessionStorage.getItem('accessToken');

    const accessApi = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer/u0020${token}` }), // Bearer 포함 여부는 서버에 따라
        },
        withCredentials: true,
    });

    return attachInterceptors(accessApi);
};
