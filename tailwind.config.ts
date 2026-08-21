import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2937",
        paper: "#fafaf9",
        brand: {
          50: "#f0f7f6",
          100: "#d9ece9",
          200: "#b3d9d3",
          300: "#82beb5",
          400: "#559f95",
          500: "#3a827a",
          600: "#2d6660",
          700: "#26514d",
          800: "#21413e",
          900: "#1c3634",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "72rem",
        prose: "42rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
