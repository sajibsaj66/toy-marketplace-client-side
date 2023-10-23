/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  themes: [
    "bumblebee",
    "dark",
    "cmyk",
    {
      mytheme: {
        primary: "#0000FF",
      },
    },
  ],
  plugins: [require("daisyui")],
};
