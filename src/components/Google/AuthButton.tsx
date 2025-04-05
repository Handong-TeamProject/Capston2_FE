"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import ConfirmModal from "../common/ConfirmModal";

export default function AuthButton() {
    const { data: session } = useSession();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const openLogoutModal = () => setIsLogoutModalOpen(true);
    const closeLogoutModal = () => setIsLogoutModalOpen(false);

    const handleLogout = () => {
        alert("로그아웃 되었습니다!");
        closeLogoutModal();
        signOut({ callbackUrl: "/" });
    };

    return (
        <>
            {session ? (
                <div className="flex flex-row items-center font-bold">
                    <p className="mr-1 hidden md:block">반갑습니다, {session.user?.name}님 | </p>
                    <p
                        onClick={openLogoutModal}
                        className="text-orange hover:text-orange50 object-hover cursor-pointer"
                    >
                        로그아웃
                    </p>
                </div>
            ) : (
                <button
                    onClick={() => signIn("google")}
                    className="bg-orange text-white text-base w-20 h-8 rounded object-hover hover:bg-orange50"
                >
                    시작하기
                </button>
            )}

            {/* 로그아웃 확인 모달 */}
            {isLogoutModalOpen && (
                <ConfirmModal message = "로그아웃 하시겠습니까?" closeModal={closeLogoutModal} handleAction={handleLogout}/>
            )}
        </>
    );
}
