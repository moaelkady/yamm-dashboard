/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        IBMar: ["IBMPlex-sans-arabic", "sans-serif"],
      },
      colors: {
        primaryColor: "#9d6cff",
        secondaryColor: "#f1e6ff",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({});
    },
  ],
};
