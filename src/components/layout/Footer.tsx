"use client";

function Footer() {

    return (
        <div className="flex justify-between items-center flex-col w-full bg-lightGray  sm:px-0 px-6  py-3">
            <img src="/Img/qrapo_logo.png" alt="logo" className="w-14 md:w-20" />
            <div className = "flex-container text-center text-xs md:text-base text-black mt-4">
                <p>QRapo(큐라포, 빠르게 관계 형성을 도와주는 서비스)</p>
                <p>ⓒQRapo. 2025.All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
