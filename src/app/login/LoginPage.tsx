"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import AuthButton from "../../components/Google/AuthButton";

const LoginPage: React.FC = () => {
  // const { data: session, status } = useSession();
  const {status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/workspace");
    }
  }, [status, router]);

  if (status === "loading") return null; // 로딩 중일 때 아무것도 표시하지 않음
  if (status === "authenticated") return null; // 이미 로그인 상태라면 UI 렌더링 X

  return (
    <div className="flex-container">
      <Image src="/Img/qrapo_logo.png" alt="logo" width={128} height={50} />
      <p className="text-center text-[1rem] font-bold text-gray">
        빠르고 효과적인 친밀감 형성을 돕는
        <br />
        협력형 서비스, QRapo
      </p>
      <div>구글로 로그인하기</div>
      <AuthButton />
    </div>
  );
};

export default LoginPage;
