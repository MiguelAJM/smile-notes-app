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
        },

        'blue-chill': {
          50: '#f2f9f9',
          100: '#ddeff0',
          200: '#bfe0e2',
          300: '#92cace',
          400: '#5faab1',
          500: '#438e96',
          600: '#3b757f',
          700: '#356169',
          800: '#325158',
          900: '#2d464c',
          950: '#1a2c32'
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
