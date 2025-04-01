import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // 사용자 정의 색상 (파란색)
        secondary: '#4B5563', // 사용자 정의 색상 (회색)
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'], // 사용자 정의 폰트
      },
      spacing: {
        '72': '18rem', // 사용자 정의 간격 추가
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
}

export default config;
