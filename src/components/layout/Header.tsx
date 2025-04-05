"use client";

import { useSession } from "next-auth/react";
import AuthButton from "../Google/AuthButton";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();
  const href = session ? "/workspace" : "/";

  return (
    <div className="bg-gray-50 flex w-full items-center justify-between px-6 py-3 lg:px-0">
      <Link href={href}>
        <img src="/Img/qrapo_logo.png" alt="logo" className="w-20" />
      </Link>
      <AuthButton />
    </div>
  );
}

export default Header;
