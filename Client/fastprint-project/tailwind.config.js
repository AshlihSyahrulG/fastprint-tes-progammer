/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#71062F',
          500: '#A91030',
          400: '#CA172D',
          300: '#EC2027',
          200: '#F98A78',
          100: '#FEE0D2',
        },
        success: {
          600: '#0A7854',
          500: '#0F8C57',
          400: '#3DBA78',
          300: '#66DC92',
          200: '#9CF3B4',
          100: 'CCF9D4',
        },
        info: {
          600: '#004EDB',
          500: '#0065FF',
          400: '#3F93FF',
          300: '#66AEFF',
          200: '#99CDFF',
          100: '#CCE8FF',
        },
        warning: {
          600: '#C1A005',
          500: '#E1BE07',
          400: '#ECD440',
          300: '#F6E366',
          200: '#FCF19A',
          100: '#FDF8CC',
        },
        error: {
          600: '#DB3124',
          500: '#FF5132',
          400: '#FF8865',
          300: '#FFA983',
          200: '#FFCCAD',
          100: '#FFE8D6',
        },

      }
    },
  },
  plugins: [],
}

