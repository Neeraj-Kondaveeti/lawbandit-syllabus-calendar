/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInScale: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        fadeInScale: "fadeInScale 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
}
