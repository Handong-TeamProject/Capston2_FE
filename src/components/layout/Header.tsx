"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import AuthButton from "@/components/Google/AuthButton";

function Header() {
  const { data: session } = useSession();
  const href = session ? "/workspace" : "/";

  return (
    <div className="bg-gray-50 flex w-full items-center justify-between px-6 py-3 lg:px-0">
      <Link href={href}>
        <Image src="/Img/qrapo_logo.png" alt="logo" width={80} height={40}/>
      </Link>
      <AuthButton/>
    </div>
  );
}

export default Header;
