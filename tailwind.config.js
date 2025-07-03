/** @type {import('tailwindcss').Config} */

import grid60Cols from './src/libV4/plugins/tailwind/grid60Cols'

export default {
  content: [
    './index.html',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        disappear: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        // Titles.
        t1: '4.5rem',
        t2: '4rem',
        t3: '3.5rem',
        t4: '3rem',
        t5: '2.5rem',
        t6: '2rem',
        t7: '1.5rem',

        // Subtitles.
        st1: '1.25rem',
        st2: '1.125rem',
        st3: '1rem',
        st4: '0.875rem',
        st5: '0.75rem',

        // Bodies.
        b1: '1.5rem',
        b2: '1.25rem',
        b3: '1.125rem',
        b4: '1rem',
        b5: '0.875rem',
        b6: '0.75rem',

        // Call to actions.
        cta1: '1rem',
        cta2: '0.875rem',
        cta3: '0.75rem',

        // Labels.
        label1: '1rem',
        label2: '0.875rem',
      },
      colors: {
        primary: {
          light: '#1A73E8',
          dark: '#1A73E8',
        },
        gray: {
          bg1: '#D9D9D9',
          light: '#6B7280',
        },
        backgroundAccordion: {
          light: '#FFFFFF',
          dark: '#1E1E1E',
        },
        backgroundCharts: {
          light: '#FFFFFF',
          dark: '#424242',
        },
        backgroundGray1: {
          light: '#0000000f',
          dark: '#000000cc',
        },
        backgroundGray2: {
          light: '#DEDEDE',
          dark: '#4C4C4C',
        },
        backgroundWhite1: {
          light: '#FFFFFF',
          dark: '#303030',
        },
        textfieldPrimary: {
          light: '#f5f6ff',
          dark: '',
        },
        divider: {
          dark: '#757575',
        },
        backgroundGray3: {
          light: '#FAFAFA',
          dark: '#4C4C4C',
        },
      },
    },
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [grid60Cols],
}
