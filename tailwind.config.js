/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg_principal: "#13131A",
        blue_base:"#8FB2F5",
        bg_input:"#1E1E29",
      },
    },
  },
  plugins: [],
};
