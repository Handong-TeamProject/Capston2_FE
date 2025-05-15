"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import api from "@/app/api/api"; 
import { accessTokenUser } from "@/app/api/hooks/token";

const AuthCallbackPage = () => {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const session = await getSession();

            if (!session?.user?.email || !session?.user?.name) {
                console.error("세션 정보가 없습니다.");
                return;
            }

            const { email, name } = session.user;

            try {
                const accessToken = session?.accessToken;

                interface LoginResponse {
                    refreshToken?: string;
                    [key: string]: any;
                }

                // 로그인 API 호출
                const response = await api.post<{ refreshToken?: string }>(
                    "/user/login/google",
                    { accessToken }
                );
                const responseData: LoginResponse = response.data;


                if (responseData?.refreshToken) {
                    sessionStorage.setItem("refreshToken", responseData.refreshToken);
                    const response = await accessTokenUser();
                    if (response)
                        router.replace("/workspace");
                    else {
                        alert("로그인 실패");
                        router.replace("/");
                    }
                }
            } catch (err) {
                console.error("로그인 API 호출 중 오류", err);
            }
        };

        handleAuthCallback();
    }, [router]);

    return <div>로그인 처리 중입니다...</div>;
};

export default AuthCallbackPage;
