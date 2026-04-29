/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark navy base
        ink: {
          900: "#0a0f1e",
          800: "#0e1424",
          700: "#141b2e",
          600: "#1c2440",
          500: "#252e4d",
        },
        // Amber accent (primary)
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        // Muted greys
        slate: {
          50: "#f8fafc",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', '"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "Menlo", "monospace"],
      },
      boxShadow: {
        amber: "0 0 0 1px rgba(245, 158, 11, 0.25)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 1px 2px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "amber-gradient":
          "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
        "hero-fade":
          "linear-gradient(180deg, rgba(10,15,30,0) 0%, rgba(10,15,30,0.6) 70%, rgba(10,15,30,1) 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
