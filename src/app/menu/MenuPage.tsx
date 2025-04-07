import Link from "next/link";
const MenuPage: React.FC = () => {
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
                        <Link href="/day1/profile">프로필 목록 페이지</Link>
                    </li>
                    <li>
                        <Link href="/day1/balance-game">밸런스 게임 페이지</Link>
                    </li>
                    <li>
                        <Link href="/day1/first-impression">첫인상 페이지</Link>
                    </li>
                    <li>
                        <Link href="/day2/experience-question">경험 질문 페이지</Link>
                    </li>
                    <li>
                        <Link href="/day2/situation-question">상황 질문 페이지</Link>
                    </li>
                    <li>
                        <Link href="/day3/preference-question">취향 질문 페이지</Link>
                    </li>
                    <li>
                        <Link href="/day3/user-guide">나 사용법 페이지</Link>
                    </li>
                    <li>
                        <Link href="/day4/promise-creation">약속 생성 페이지</Link>
                    </li>
                    <li>
                        <Link href="/day5/current-impression">현인상 페이지</Link>
                    </li>
                    <li>
                        <Link href="/day5/survey">설문조사 페이지</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default MenuPage;