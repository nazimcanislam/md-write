import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-text": "var(--color-primary-text)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-hover-ghost": "var(--color-primary-hover-ghost)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
