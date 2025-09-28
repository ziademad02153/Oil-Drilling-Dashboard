/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#F26C2A',
        'brand-dark': '#2D3748',
        'brand-light': '#F7FAFC',
        'brand-gray': '#A0AEC0',
      },
    },
  },
  plugins: [],
};
