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
        black: '#1A1A1A',
        lightGray: '#2A2A2A',
        gray: '#a3a3a3',
        
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
