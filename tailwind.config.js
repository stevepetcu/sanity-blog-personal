/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '600px',
          md: '728px',
          lg: '905px',
          xl: '1200px',
        },
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        'blue-500': '#2276FC',
        'yellow-100': '#fef7da',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
        'tight-ma-only': '-.055em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        'xxs': '0.45rem',
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
        'inner-lg': 'inset 0px 0px 15px 7px rgba(0, 0, 0, 0.15)',
        'sm-dark-below': '0px 5px 5px 5px rgba(0,0,0,0.16)',
        'sm-dark-above': '0px -5px 5px 5px rgba(0,0,0,0.16)',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};
