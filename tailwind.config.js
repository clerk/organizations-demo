/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/layout.tsx",
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
