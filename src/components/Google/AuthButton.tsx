"use client";

import React, { useEffect, useState } from "react";
import ConfirmModal from "../Modal/ConfirmModal";
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import GoogleLoginButton from "@/components/Google/GoogleLoginButton";

export default function AuthButton() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const updateLoginState = () => {
    const token = sessionStorage.getItem("accessToken");
    const name = sessionStorage.getItem("username");
    setIsLoggedIn(!!token);
    if (name) setUsername(name);
  };

  useEffect(() => {
    updateLoginState();

    // ✅ 로그인 완료 이벤트 리스너 등록
    const handleLogin = () => {
      updateLoginState();
    };

    window.addEventListener("loginSuccess", handleLogin);

    return () => {
      window.removeEventListener("loginSuccess", handleLogin);
    };
  }, []);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogout = () => {
    alert("로그아웃 되었습니다!");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername(null);
    closeLogoutModal();
    window.location.href = "/";
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-row items-center font-bold">
          <p className="mr-1 hidden md:block">
            반갑습니다, {username ?? "사용자"}님 |{" "}
          </p>
          <p
            onClick={openLogoutModal}
            className="object-hover cursor-pointer text-orange hover:text-orange50"
          >
            로그아웃
          </p>
          <Link href="/mypage">
            <UserCircleIcon className="w-6 h-6 text-boldGray ml-1 hover:text-orange object-hover" />
          </Link>
        </div>
      ) : (
        <GoogleLoginButton />
      )}

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
