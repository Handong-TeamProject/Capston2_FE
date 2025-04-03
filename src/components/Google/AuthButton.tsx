"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthButton() {
    const { data: session } = useSession();

    return session ? (
        <div className = "flex flex-row items-center font-bold">
            <p className = "mr-1 hidden md:block">반갑습니다, {session.user?.name}님 | </p>
            <p onClick={() => signOut({ callbackUrl: "/" })} className = "text-orange hover:text-orange50 object-hover">로그아웃</p>
        </div>
    ) : (
        <button onClick={() => signIn("google")} className = "bg-orange text-white text-base w-20 h-8 rounded object-hover hover:bg-orange50  ">시작하기</button>
    );
}
