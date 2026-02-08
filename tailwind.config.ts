import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f8",
          100: "#e8e9eb",
          200: "#c9cbd1",
          300: "#a4a8b3",
          400: "#7b8190",
          500: "#5b6070",
          600: "#454958",
          700: "#333543",
          800: "#22232e",
          900: "#14151e"
        },
        accent: {
          300: "#7ce7d9",
          400: "#3fd3c5",
          500: "#18b6a9",
          600: "#129287"
        },
        ember: {
          400: "#ffb37a",
          500: "#ff8a4d",
          600: "#f46a2e"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glow: "0 0 35px rgba(63, 211, 197, 0.35)",
        card: "0 18px 60px rgba(20, 21, 30, 0.25)"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at 20% 20%, rgba(63, 211, 197, 0.22), transparent 55%), radial-gradient(circle at 80% 10%, rgba(255, 138, 77, 0.18), transparent 50%), linear-gradient(120deg, #0f1118 0%, #181b26 45%, #12141d 100%)",
        "grid-fade": "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
