import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      text: {
        50: "hsl(135, 15%, 5%)",
        100: "hsl(133, 18%, 10%)",
        200: "hsl(137, 18%, 20%)",
        300: "hsl(136, 18%, 30%)",
        400: "hsl(134, 17%, 40%)",
        500: "hsl(135, 17%, 50%)",
        600: "hsl(134, 17%, 60%)",
        700: "hsl(136, 18%, 70%)",
        800: "hsl(137, 18%, 80%)",
        900: "hsl(133, 18%, 90%)",
        950: "hsl(135, 15%, 95%)",
      },
      backgroundTheme: {
        50: "hsl(142, 44%, 5%)",
        100: "hsl(140, 41%, 10%)",
        200: "hsl(140, 43%, 20%)",
        300: "hsl(140, 42%, 30%)",
        400: "hsl(140, 43%, 40%)",
        500: "hsl(140, 43%, 50%)",
        600: "hsl(140, 43%, 60%)",
        700: "hsl(140, 42%, 70%)",
        800: "hsl(140, 43%, 80%)",
        900: "hsl(140, 41%, 90%)",
        950: "hsl(136, 44%, 95%)",
      },
      primary: {
        50: "hsl(146, 28%, 5%)",
        100: "hsl(143, 25%, 10%)",
        200: "hsl(146, 27%, 20%)",
        300: "hsl(145, 27%, 30%)",
        400: "hsl(145, 27%, 40%)",
        500: "hsl(145, 27%, 50%)",
        600: "hsl(145, 27%, 60%)",
        700: "hsl(145, 27%, 70%)",
        800: "hsl(146, 27%, 80%)",
        900: "hsl(143, 25%, 90%)",
        950: "hsl(146, 28%, 95%)",
      },
      secondary: {
        50: "hsl(156, 20%, 5%)",
        100: "hsl(147, 18%, 10%)",
        200: "hsl(147, 18%, 20%)",
        300: "hsl(147, 18%, 30%)",
        400: "hsl(147, 18%, 40%)",
        500: "hsl(147, 18%, 50%)",
        600: "hsl(147, 18%, 60%)",
        700: "hsl(147, 18%, 70%)",
        800: "hsl(147, 18%, 80%)",
        900: "hsl(147, 18%, 90%)",
        950: "hsl(144, 20%, 95%)",
      },
      accent: {
        50: "hsl(156, 20%, 5%)",
        100: "hsl(160, 18%, 10%)",
        200: "hsl(160, 18%, 20%)",
        300: "hsl(160, 18%, 30%)",
        400: "hsl(160, 18%, 40%)",
        500: "hsl(159, 18%, 50%)",
        600: "hsl(160, 18%, 60%)",
        700: "hsl(160, 18%, 70%)",
        800: "hsl(160, 18%, 80%)",
        900: "hsl(160, 18%, 90%)",
        950: "hsl(156, 20%, 95%)",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
