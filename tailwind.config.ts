import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070a",
          900: "#080b10",
          800: "#0d1118",
          700: "#11161f",
          600: "#161c26",
          500: "#1d2530",
          400: "#2a3441",
        },
        neon: {
          DEFAULT: "#2bff9b",
          soft: "#52ffb0",
          dim: "#13e386",
        },
        electric: {
          DEFAULT: "#3b9bff",
          soft: "#66b4ff",
          dim: "#1f7fe6",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(43,255,155,0.18), 0 8px 40px -12px rgba(43,255,155,0.35)",
        "glow-blue":
          "0 0 0 1px rgba(59,155,255,0.18), 0 8px 40px -12px rgba(59,155,255,0.35)",
        card: "0 18px 50px -24px rgba(0,0,0,0.9)",
        "card-hover": "0 30px 70px -28px rgba(0,0,0,0.95)",
      },
      backgroundImage: {
        "tech-grid":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(59,155,255,0.16), transparent 55%)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "fade-up": "fade-up 0.5s ease-out both",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        scan: "scan 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
