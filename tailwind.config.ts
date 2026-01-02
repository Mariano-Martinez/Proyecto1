import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#ffe600",
          blue: "#3483fa",
          dark: "#2d3277",
        },
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
