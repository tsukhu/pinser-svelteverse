/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/*.{html,svelte,tsx,ts,jsx,js,pcss,scss,css}',
    './libs/**/*.{html,svelte,tsx,ts,jsx,js,pcss,scss,css}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
};
