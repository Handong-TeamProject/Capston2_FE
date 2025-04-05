// src/app/components/LandingPage.tsx
import React from "react";
import Link from "next/link";

const LandingPage: React.FC = () => {
  return (
    <div>
      <h1>랜딩 페이지</h1>
      <nav>
        <ul>
          <li>
            <Link href="/login">로그인 페이지</Link>
          </li>
          <li>
            <Link href="/signup">회원가입 페이지</Link>
          </li>
          <li>
            <Link href="/workspace">프로젝트 목록 페이지</Link>
          </li>
          <li>
            <Link href="/profile">프로필 목록 페이지</Link>
          </li>
          <li>
            <Link href="/balance-game">밸런스 게임 페이지</Link>
          </li>
          <li>
            <Link href="/first-impression">첫인상 페이지</Link>
          </li>
          <li>
            <Link href="/experience-question">경험 질문 페이지</Link>
          </li>
          <li>
            <Link href="/situation-question">상황 질문 페이지</Link>
          </li>
          <li>
            <Link href="/preference-question">취향 질문 페이지</Link>
          </li>
          <li>
            <Link href="/user-guide">나 사용법 페이지</Link>
          </li>
          <li>
            <Link href="/promise-creation">약속 생성 페이지</Link>
          </li>
          <li>
            <Link href="/current-impression">현인상 페이지</Link>
          </li>
          <li>
            <Link href="/survey">설문조사 페이지</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LandingPage;
