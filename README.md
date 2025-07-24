# 📱 QRapo (Capstone #2 Frontend)

QRapo, 빠르게 라포 형성과 관계 발전을 도와주는 서비스

---

## 🧭 프로젝트 개요

- **🌱 목적**: 어색한 첫 만남에서도 자연스럽고 구조적인 대화를 이끌어 관계 친밀도를 빠르게 형성할 수 있도록 도와주는 서비스  
- **🎓 참여**:
  - **기업**: 그린라이트그룹
  - **지도 교수님**: 김세진 교수님
  - **팀원**: 김광일 (프론트엔드), 정은다 (백엔드)
- **📅 기간**: 2025년 봄학기 캡스톤 디자인

---

## 🛠 기술 스택

### 프론트엔드 (이 리포지토리)
- **Next.js**, **TypeScript**, **JavaScript**
- 스타일링: **TailwindCSS**
- 배포: **Vercel** (추후 포함 가능)

### 백엔드 (별도 Repo)
- **Spring Boot**, **JPA**, **MySQL**, Docker, AWS EC2

### 협업 도구
- IDE: VSCode
- 디자인: **Figma**
- 커뮤니케이션: Zoom, 카카오톡
- 문서관리: Notion
- 버전관리: GitHub

---

## 🎯 주요 기능

- **단계별 진행 콘텐츠**  
  1. 프로필 설정  
  2. 경험 공유  
  3. 취향 탐색  
  4. 약속 생성 (날짜, 장소 설정)  
  5. 회고 작성

- **그룹 & 매칭 시스템**  
  - 그룹 생성 또는 참여  
  - 개인 간 매칭 기능 지원

- **신뢰도 기반 점수/순위 시스템**  
  - 대화 및 활동 참여도 반영

- **MVP 구조 설계**  
  - 단계별 확장이 가능한 플러그형 모듈 구조

---

<pre>
## 🏗 프로젝트 구조

Capston2_FE/
├── public/                  # 정적 파일 (SVG, 이미지 등)
│   └── img/                 # 로고, 아이콘 등 시각 요소
│
├── src/
│   ├── app/                 # Next.js 13 App Router 기반 페이지 설정
│   │   ├── LandingPage/     # 랜딩 페이지
│   │   ├── api/             # API 라우팅
│   │   ├── day1 ~ day5/     # 5일차별 콘텐츠 화면 구성
│   │   ├── day4/promise-creation/
│   │   ├── menu/            # 사이드 메뉴
│   │   ├── mypage/          # 마이페이지
│   │   ├── project/         # 프로젝트 관련 기능
│   │   ├── signup/          # 회원가입 페이지
│   │   └── test/, workspace/  # 테스트/작업 중 페이지
│
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   │   ├── Google/          # 구글 로그인 관련 컴포넌트
│   │   ├── Modal/           # 모달 컴포넌트
│   │   └── common/          # 기타 공통 UI 컴포넌트
│
│   ├── layout/              # 공통 레이아웃 파일들
│   ├── data/                # 콘텐츠 및 설정 데이터
│   │   ├── day1 ~ day5/     # 날짜별 질문 데이터
│   │   ├── dayDescription.js  # 5일 흐름 정보 객체
│   │   ├── projectData.js     # 프로젝트 선택지 데이터
│   │   └── projectInfo.js     # 프로젝트 소개 정보
│
│   ├── styles/
│   │   ├── globals.css      # 전역 스타일
│   │   └── layout.tsx       # 기본 레이아웃
│
│   └── page.tsx             # 루트 페이지
│
├── .gitignore
├── README.md
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── package.json
├── package-lock.json
├── eslint-config, prettier-config 등
</pre>

---

<!--
## 🎨 스크린샷

> `/public/screenshots/` 또는 Notion Figma 링크에 업로드 후 아래처럼 삽입 가능

```md
![1. 프로필 설정](./public/screenshots/profile.png)
![2. 경험 공유](./public/screenshots/experience.png)
![3. 취향 탐색](./public/screenshots/taste.png)
![4. 약속 생성](./public/screenshots/appointment.png)
![5. 회고 제출](./public/screenshots/review.png)
-->

⸻

🔍 실행 가이드
	1.	클론 & 설치

git clone https://github.com/Handong-TeamProject/Capston2_FE.git
cd Capston2_FE
npm install


	2.	개발 서버 실행

npm run dev

브라우저에서 http://localhost:3000 열기

	3.	빌드

npm run build
npm run start



⸻

🧩 향후 계획
	•	컴포넌트 테스트 (Jest + React Testing Library)
	•	프론트↔백엔드 통합 테스트
	•	Docker 컨테이너 구성 및 CI/CD 파이프라인 구축
	•	접근성 개선 및 모바일 반응형 UI 보강

⸻

⚖️ 라이선스

MIT License
