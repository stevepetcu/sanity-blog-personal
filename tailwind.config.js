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
        'inner-lg': 'inset 0px 0px 15px 7px rgba(0, 0, 0, 0.1)',
        'sm-dark-below': '0px 5px 5px 5px rgba(0,0,0,0.12)',
        'sm-dark-above': '0px -5px 5px 5px rgba(0,0,0,0.12)',
      },
      animation: {
        'spin-quarter': 'spin-quarter 2.5s ease-in-out infinite',
        'reveal-bottom-up': 'reveal-bottom-up 2.5s ease-in-out infinite',
      },
      keyframes: {
        'spin-quarter': {
          '0%, 100%': { opacity: 1, transform: 'rotate(0deg)' },
          '5%': { opacity: 0.25, transform: 'rotate(-90deg)' },
        },
        'reveal-bottom-up': {
          '0%, 100%': { opacity: 1, height: '25px' },
          '5%': { opacity: 0.25, height: '0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};
