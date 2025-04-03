"use client";

import { useState } from "react";

function Header() {
    const [isLogin, setIseLogin] = useState(false);
    return (
        <div className = "flex justify-center items-center w-full bg-gray-50">
            <img src="/Img/qrapo_logo.png" alt="logo" className="w-20" />
            {
                isLogin ? (
                    <div className="flex justify-center items-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            로그아웃
                        </button>
                    </div>  
                ) : (
                    <div className="flex justify-center items-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            로그인
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default Header;