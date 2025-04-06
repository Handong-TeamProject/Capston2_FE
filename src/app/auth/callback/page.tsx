"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {getSession} from "next-auth/react";
// import axios from "axios";

const AuthCallbackPage = () => {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const session = await getSession();

            if (
                !session
                    ?.user
                        ?.email || !session
                            ?.user
                                ?.name
            ) {
                console.error("세션 정보가 없습니다.");
                return;
            }

            const {email, name} = session.user;

            try {
                // 로그인 api 로직 추가하기
                // const response = await axios.post("/login", {email});
                // const userId = response.data
                //     ?.user_id;
                const userId = false;

                if (userId) {
                    router.replace("/workspace");
                } else {
                    sessionStorage.setItem("signupInfo", JSON.stringify({name, email}));
                    router.replace("/signup");
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
