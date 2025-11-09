import type { Config } from "tailwindcss";

const config: Config = {
  content: [

    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        "2xl-black": "0 20px 25px rgba(0, 0, 0, 0.4)", 
      },
    },
  },
  plugins: [],
};
export default config;