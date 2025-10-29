// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#3b82f6", // bright blue
          600: "#2563eb",
        },
        lightBg: "#f8fafc",
        darkBg: "#0f172a",
        darkCard: "#1e293b",
      },
    },
  },
  plugins: [],
};
