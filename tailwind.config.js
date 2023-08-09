/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {boxShadow: {
      '3xl': '0 0 0 3px #C8F3FA,0 1px 2px rgba(15,17,17,.15) inset',
    }},
  },
  plugins: [],
}

