// components/LoginPage.tsx
import React from 'react';
import { InputSpan } from '../normal/InputSpan';

const LoginPage: React.FC = () => {
    return (
        <div className = "flex-container">
            <img src="/Img/qrapo_logo.png" alt="logo" className="w-32" />
            <p className="text-center text-gray font-bold text-[1rem]">빠르고 효과적인 친밀감 형성을 돕는<br />협력형 서비스, QRapo</p>
            <div>구글로 로그인하기</div>
        </div>
    );
};

export default LoginPage;
