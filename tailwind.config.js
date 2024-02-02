/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "custom-rg": ["NanumSquareNeoOTF-Rg", "sans-serif"],
        "custom-bd": ["NanumSquareNeoOTF-Bd", "sans-serif"],
        "custom-hv": ["NanumSquareNeoOTF-Hv", "sans-serif"],
      },
      colors: {
        "custom-blue": "#7071E8",
        "custom-red": "#F37C4B",
        "custom-black": "#1D1D1D",
        "custom-gray": {
          100: "#F9F9F9",
          200: "#F5F5F5",
          300: "#DDD",
          400: "#999999",
          500: "#767676",
          600: "#6F6F6F",
        },
      },
      backgroundImage: {
        arrowTop: "url('/asset/image/ArrowTop.png')",
        arrowLeft: "url('/asset/image/ArrowLeft.png')",
      },
    },
  },
  plugins: [],
};
