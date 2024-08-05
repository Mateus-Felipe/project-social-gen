import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'arial': ['Arial'],
      'helvetica': ['Helvetica'],
    },
    screens: {
      'lg': '1300px',
      'mdlg': '1000px',
      'md': '768px',
      'sd': '600px',
      'sm': '497px'
    },
    extend: {
      colors: {
        warning: '#f00',
        'blue-light-theme': '#BFC3E0',
        'blue-dark-theme': '#0B0068',
        'blue-theme': '#29306B',
        'yellow-theme': '#D9C55E',
        'yellow-light-theme': '#F4E596',
        'orange-light-theme': '#F69853',
        'orange-theme': '#D36514',
        'red-light-theme': '#F47171',
        'red-theme': '#D81616',
        'purple-theme': '#C86FFF',

      },
      dropShadow: {
        '2xl-strong': '3px 3px 2px rgba(0, 0, 0, 1)',
        '2xl-strong-two': '0px 0px 2px rgba(0, 0, 0, 1)',
        '2xl-strong-two-light': '0px 0px 2px rgba(0, 0, 0, 0.5)',
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
