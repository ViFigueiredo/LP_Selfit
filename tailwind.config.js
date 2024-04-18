/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': 'rgb(2,0,36)',
        'custom-red': 'rgba(236,3,0,1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-custom': 'linear-gradient(0deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
  ],
}