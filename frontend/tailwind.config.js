/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      keyframes: {
        "bg-pulse": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0.5" },
        },
      },
      animation: {
        "bg-pulse": "bg-pulse 3s linear infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
