"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import ConfirmModal from "../Modal/ConfirmModal";
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

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
  // 구글 로그인 버튼 클릭 시 실행
  const handleGoogleLogin = () => {
    signIn("google", {
      callbackUrl: "/auth/callback", // 우리가 만든 커스텀 페이지
    });
  };

  return (
    <>
      {session ? (
        <div className="flex flex-row items-center font-bold">
          <p className="mr-1 hidden md:block">
            반갑습니다, {session.user?.name}님 |{" "}
          </p>
          <p
            onClick={openLogoutModal}
            className="object-hover cursor-pointer text-orange hover:text-orange50"
          >
            로그아웃
          </p>
          <Link href = "/mypage"><UserCircleIcon className="w-6 h-6 text-boldGray ml-1 hover:text-orange object-hover" /></Link>
        </div>
      ) : (
        <button
          onClick={() => handleGoogleLogin()}
          className="object-hover h-8 w-20 rounded bg-orange text-base text-white hover:bg-orange50"
        >
          시작하기
        </button>
      )}

      {/* 로그아웃 확인 모달 */}
      {isLogoutModalOpen && (
        <ConfirmModal
          message="로그아웃 하시겠습니까?"
          closeModal={closeLogoutModal}
          handleAction={handleLogout}
        />
      )}
    </>
  );
}
