/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#102033",
        mist: "#f4f7fb",
        brand: "#0f766e",
        sand: "#f5ede2",
        coral: "#ef6c57"
      },
      boxShadow: {
        panel: "0 18px 45px rgba(16, 32, 51, 0.08)"
      },
      fontFamily: {
        sans: ["'Manrope'", "ui-sans-serif", "system-ui"],
        display: ["'Plus Jakarta Sans'", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};
