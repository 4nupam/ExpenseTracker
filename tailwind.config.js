/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with the 'class' strategy
  content: ["./src/**/*.{html,js,javascript,jsx}"],
  theme: {
    extend: {
      scrollbar: ['rounded'], // Optional, for rounded scrollbars
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Add the tailwind-scrollbar plugin
  ],
}
