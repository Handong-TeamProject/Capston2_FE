"use client";

import Link from "next/link";
import Image from "next/image";
import AuthButton from "@/components/Google/AuthButton";
import { useEffect, useState } from "react";

function Header() {
  const [href, setHref] = useState("/");

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setHref(token ? "/workspace" : "/");
  }, []);

  return (
    <div className="bg-gray-50 flex w-full items-center justify-between px-6 py-3 lg:px-0">
      <Link href={href}>
        <Image src="/Img/qrapo_logo.png" alt="logo" width={80} height={40} />
      </Link>
      <AuthButton />
    </div>
  );
}

export default Header;
