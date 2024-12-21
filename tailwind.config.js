/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "rgba(147, 51, 234, 0.8)",
          light : "rgba(164, 61, 255, 0.1)"
        },
        secondary: {
          dark: "rgba(29, 78, 216, 0.8)",
          light: "rgba(29, 78, 216, 0.2)",
        },
      },
    },
  },
  daisyui: {
    themes: ["light", "night", "valentine", "dark"],
  },
  plugins: [daisyui],
};
