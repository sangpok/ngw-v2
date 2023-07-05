/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        hovermenu: '0px 0px 4px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        tossface: 'Tossface',
        coolsaying: 'BookkMyungjo-Bd',
      },
      transitionDelay: {
        zoom: '0.2s',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('tailwind-gradient-mask-image')],
};
