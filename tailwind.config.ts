import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./components/ui/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
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
    extend: 
    {
      backgroundImage: {
        frontpage: "url('/background_image.jpg')",
        globe: "url('/globe.png')",
      },
      backgroundPosition: {
        "top-3": "center top -3rem",
      },
      fontSize: {
        '8.5xl': ['7rem', '1'],
      },
      screens: {
        '3xl': '1860px', 
      },
      colors: {
        'periwinkle': {
          50: "#A6B8D7",
          100: "#92A8CE",
          150: "#8099C3",
          200: "#6E89B8",
          300: "#556F9D",
          400: "#355981",
        },
        'navy': {
          100: "#154364",
          200: "#0A3351",
        },
        'slate': {
          150: '#E7ECF3',
          350: '#B0BCCD',
        },
        
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        gavelRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(25deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'gavel-rotate': 'gavelRotate 1s ease-in-out infinite',
      },
    }, 
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addBase }) {
      addBase({
        "@supports": {
          "interpolate-size": "allow-keywords",
        },
        html: {
          interpolateSize: "allow-keywords",
        },
      });
    }),
  ],
} satisfies Config;

export default config;
