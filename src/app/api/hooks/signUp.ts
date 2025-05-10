// hooks/useSignup.ts

import api from "../api";

export interface SignupData {
    username: string;
    email: string;
    password: string;
    // gender: string;
}

export const signupUser = async (data : SignupData): Promise<void> => {
    try {
        console.log(data);
        const response = await api.post('/api/user/signup', data, {
            headers: {
                Authorization: 'Bearer/u0020eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3NUb2tlbiIsI' +
                        'mlkIjo0LCJleHAiOjE3NDY2MjA0MTd9.wM9AW5dFU2m2S4jld2MwxI5nijuzkL1mZCwuj6fJJx4HNT' +
                        'Pv49xh2cC1ZzOtYKcFPIdtc5gmHJ0U-WvH8JawvQ'
            }
        });

        if (response.status === 200) {
            alert('회원가입이 완료되었습니다.');
        } else {
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    } catch (error : unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const err = error as {
                response: {
                    status: number
                }
            };
            const status = err.response.status;

            switch (status) {
                case 401:
                    alert('AccessToken 만료. 다시 로그인하세요.');
                    location.replace('/user/login');
                    break;
                case 403:
                    alert('/api/user/signup : 권한이 없습니다.');
                    break;
                case 409:
                    alert('중복된 정보입니다. 다시 시도해주세요.');
                    break;
                default:
                    alert('정상적으로 이루어지지 않았습니다. 다시 시도해주세요.');
                    break;
            }
        } else {
            console.error(error);
            alert('예상치 못한 오류가 발생했습니다.');
        }
    }
};
