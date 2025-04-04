// components/SignupPage.tsx
import Link from 'next/link';
import React from 'react';

const SignupPage: React.FC = () => {
    return (
        <div>
            <h1>회원가입 페이지</h1>
            <Link href = "/login">로그인</Link>
        </div>
    );
};

export default SignupPage;
