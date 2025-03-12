import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      colors: {
        background: "hsl(158, 33%, 7%)",
        foreground: "hsl(156, 50%, 83%)",
        card: {
          DEFAULT: "hsl(158, 33%, 7%)",
          foreground: "hsl(156, 50%, 83%)",
        },
        popover: {
          DEFAULT: "hsl(158, 33%, 7%)",
          foreground: "hsl(156, 50% , 83%)",
        },
        primary: {
          DEFAULT: "hsl(167, 100%, 35%)",
          foreground: "hsl(155, 53%, 98%)",
        },
        secondary: {
          DEFAULT: "hsl(165. 100%, 10%)",
          foreground: "hsl(156, 50%, 83%)",
        },
        muted: {
          DEFAULT: "hsl(165, 100%, 10%)",
          foreground: "hsl(156, 50%, 83%)",
        },
        accent: {
          DEFAULT: "hsl(165, 100%, 10%)",
          foreground: "hsl(156, 50%, 83%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 62.8%, 30.6%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        border: "hsl(165, 100%, 10%)",
        input: "hsl(var(--input))",
        ring: "hsl(167, 100%, 35%)",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
