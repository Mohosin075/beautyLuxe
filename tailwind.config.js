/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "rgba(147, 51, 234, 0.8)",
          light: "rgba(164, 61, 255, 0.1)",
        },
        secondary: {
          dark: "rgba(29, 78, 216, 0.8)",
          light: "rgba(29, 78, 216, 0.2)",
        },
        darkBackground: "#000000",
        lightBackground: '#FFFFFF',
        primaryAccent: "#9115eb",
        secondaryAccent: "#FF4C4C",
        tertiaryAccent: "#00FF00",
        textLight: "#FFFFFF",
        textDark: "#333333",
        buttonBackground: "rgba(0, 0, 0, 0.5)",
        backgroundLightOverlay: "rgba(0, 0, 0, 0.1)",
        backgroundDarkOverlay: "#111827",
        darkGray : "#0F172A",
        lightGray : "#F3F4F6",
        background : "rgba(164, 61, 255, 0.1)"
      },
    },
  },
  daisyui: {
    themes: ["light", "night", "valentine", "dark"],
  },
  plugins: [daisyui],
};

// export default {
//   darkMode: "class", // Enables dark mode via class
//   theme: {
//     extend: {
//       colors: {
//         purple: {
//           light: "#F3E5F5",
//           DEFAULT: "#6A0DAD",
//           dark: "#5E35B1",
//         },
//         gray: {
//           light: "#F9F9F9",
//           DEFAULT: "#333333",
//           dark: "#1C1C1C",
//         },
//         gold: "#FFD700",
//         sky: "#AED6F1",
//         navy: "#2C3E50",
//         peach: "#FADBD8",
//       },
//       backgroundImage: {
//         "gradient-purple": "linear-gradient(to right, #6A0DAD, #9B59B6)",
//       },
//     },
//   },
// };
