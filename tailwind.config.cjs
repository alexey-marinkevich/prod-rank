/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        handwritten: ['Allura', 'sans-serif'],
      },
      screens: {
        mouse: { raw: '(hover:hover)' },
      },
    },
  },
  plugins: [],
};
