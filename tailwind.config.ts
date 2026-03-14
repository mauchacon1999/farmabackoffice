import type { Config } from "tailwindcss";

/**
 * Palette inspired by Droguerías Colsubsidio (drogueriascolsubsidio.com).
 * Colors reference CSS variables from globals.css so dark mode works via :root.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        offer: {
          DEFAULT: "var(--offer)",
          foreground: "var(--offer-foreground)",
        },
        border: "var(--border)",
        "promo-bg": "var(--promo-bg)",
        "promo-foreground": "var(--promo-foreground)",
        "footer-bg": "var(--footer-bg)",
        "footer-foreground": "var(--footer-foreground)",
        "footer-muted": "var(--footer-muted)",
      },
    },
  },
  plugins: [],
};

export default config;
