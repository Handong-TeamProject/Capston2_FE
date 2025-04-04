"use client";

function Footer() {

    return (
        <div className="flex justify-between items-center flex-col w-svw bg-lightGray  sm:px-0 px-6  py-3">
            <img src="/Img/qrapo_logo.png" alt="logo" className="w-16 md:w-20 mt-2" />
            <div className = "flex-container text-center text-xs md:text-base text-black mt-5">
                <p className="text-xs md:text-sm">QRapo(큐라포, 빠르게 관계 형성을 도와주는 서비스)</p>
                <p className="text-xs md:text-sm mt-1">ⓒQRapo. 2025.All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
