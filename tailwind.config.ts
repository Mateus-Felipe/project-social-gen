import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'mdlg': '1000px'
    },
    extend: {
      colors: {
        warning: '#f00'
      },
      fontSize: {
        sm: '0.5rem',
        base: '.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.563rem',
        '4xl': '1.953rem',
        '5xl': '2.441rem',
      },
      boxShadow: {
        'custom': '6px 6px 23px -7px rgba(0, 0, 0, 0.51)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
