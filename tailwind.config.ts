import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#08100b",
          900: "#0d1914",
          850: "#12231c",
          800: "#172d24",
          750: "#1d382c",
          700: "#244537",
          600: "#315c4a",
          500: "#417962",
          400: "#5ba284",
          300: "#80c4a6",
          200: "#b3dfca",
          100: "#dcf0e6",
          50: "#f0f8f4",
        },
        moss: {
          light: "#d2e59e",
          DEFAULT: "#8dae42",
          dark: "#5e7728",
        },
        sage: {
          100: "#e9f0ec",
          200: "#c7d9ce",
          300: "#a5c2b0",
          400: "#83ab92",
          500: "#659075",
        },
        earth: {
          warm: "#f7f5ed",
          sun: "#f59e0b",
          bark: "#78350f",
          clay: "#b45309",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "var(--font-newsreader)",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanner-sweep": "sweep 2.5s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        sweep: {
          "0%, 100%": { transform: "translateY(0%)", opacity: "0.2" },
          "50%": { transform: "translateY(100%)", opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
