const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      xs: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        'magenta-fuchsia': {
          50: '#fff2ff',
          100: '#fde3ff',
          200: '#fbc6ff',
          300: '#fc99ff',
          400: '#fc5dff',
          500: '#f221ff',
          600: '#e100ff',
          700: '#bb00cf',
          800: '#9b00a9',
          900: '#810689',
          950: '#57005e'
        }
      },
      width: {
        xs: '425px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
}
