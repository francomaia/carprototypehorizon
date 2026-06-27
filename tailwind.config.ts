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
        // Tema CLARO. Os nomes são mantidos por compatibilidade:
        //  - `ink`     → superfícies/bordas (tons claros, branco→cinza)
        //  - `neon`    → acento PRIMÁRIO (vermelho)
        //  - `electric`→ acento SECUNDÁRIO (azul)
        ink: {
          950: "#ffffff",
          900: "#ffffff",
          800: "#ffffff",
          700: "#f3f5f9",
          600: "#eaeef4",
          500: "#e1e6ee",
          400: "#ccd3df",
        },
        neon: {
          DEFAULT: "#e11d2a",
          soft: "#ff4d5b",
          dim: "#b3121f",
        },
        electric: {
          DEFAULT: "#2563eb",
          soft: "#3b82f6",
          dim: "#1d4ed8",
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
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(225,29,42,0.18), 0 10px 36px -14px rgba(225,29,42,0.40)",
        "glow-blue":
          "0 0 0 1px rgba(37,99,235,0.16), 0 10px 36px -14px rgba(37,99,235,0.35)",
        card: "0 10px 30px -14px rgba(20,22,30,0.18)",
        "card-hover": "0 22px 48px -18px rgba(20,22,30,0.26)",
      },
      backgroundImage: {
        "tech-grid":
          "linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(225,29,42,0.10), transparent 55%)",
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
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "gradient-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "fade-up": "fade-up 0.5s ease-out both",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
        scan: "scan 6s linear infinite",
        "gradient-pan": "gradient-pan 18s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
