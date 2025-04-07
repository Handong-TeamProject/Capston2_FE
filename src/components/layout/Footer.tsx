"use client";

import Image from "next/image";

function Footer() {
  return (
    <div className="flex w-svw flex-col items-center justify-between bg-beige50 px-6 py-3 sm:px-0">
      <Image src="/Img/qrapo_logo.png" alt="logo" className="mt-2 w-16 md:w-20" width={80} height={60} />
      <div className="flex-container mt-5 text-center text-xs text-black md:text-base">
        <p className="text-xs md:text-sm">
          QRapo(큐라포, 빠르게 관계 형성을 도와주는 서비스)
        </p>
        <p className="mt-1 text-xs md:text-sm">
          ⓒQRapo. 2025.All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
