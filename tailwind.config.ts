import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["KimjungchulGothic", "sans-serif"],
      },
      colors: {
        black: "#1A1A1A",
        boldGray: "#A3A3A3",
        lightGray: "#D9D9D9",
        inputGray: "#F7F7F7",
        gray: "#a3a3a3",
        baseGray: "#FAFAFA",
        orange: "#FEA104",
        orange50: "#FEA10450",
        yellow: "#FFC941",
        yellow50: "#FFC941",
        beige: "#FFE6B5",
        beige50: "#FFE6B5",
        beige90: "#FFFBF0",
        green: "#69AD4E",
        green50: "#D3EDC9",
        blue: "#5CA2E0",
        blue50: "#DBEAFC",
        red: "#F15252",
        red50: "#FED2D2",
      },
      spacing: {
        "72": "18rem", // 사용자 정의 간격 추가
        "84": "21rem",
        "96": "24rem",
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
