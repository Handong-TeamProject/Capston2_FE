// libs/api.ts
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/api', // 여기!
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // 🔥 추가!
});

// ✅ access token이 필요한 요청은 이 함수로 만들기
export const getAccessApi = () => {
    if (typeof window === 'undefined') 
        return api; // SSR 환경일 경우 fallback
    
    const token = sessionStorage.getItem('accessToken');

    return axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            'Content-Type': 'application/json',
            ...(token && {
                Authorization: `${token}`
            }) // ✅ 토큰 있을 때만 추가
        },
        withCredentials: true
    });
};