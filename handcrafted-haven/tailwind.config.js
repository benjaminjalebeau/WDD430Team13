/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", 
      "./src/app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary':'#219EBC',
          'secondary': '#FFB703',
          'tertiary': '#8ECAE6',
          'accent1':'#FB8500',
          'darker':'#023047',
        },
        fontFamily: {
          roboto: ['Roboto', 'sans-serif'], 
        },
      },
    },
    plugins: [],
  };