"use client";
import Image from "next/image";
import AuthButton from "@/components/Google/AuthButton";

function Header() {

  const handleMovePage = () => {
    const isLogin = sessionStorage.getItem("refreshToken");
    if (isLogin) {
      window.location.href = "/workspace";
    } else {
      window.location.href = "/";
    }
  }

  return (
    <div className="bg-gray-50 flex w-full items-center justify-between px-6 py-3 lg:px-0">
      <Image src="/Img/qrapo_logo.png" alt="logo" width={80} height={40} onClick={handleMovePage} />
      <AuthButton />
    </div>
  );
}

export default Header;
