/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F1E7",
        linen: "#EFE4D4",
        walnut: "#6C4F3D",
        charcoal: "#201F1C",
        graphite: "#34322E",
        mustard: "#C99A2E",
        clay: "#A66E52",
        sage: "#7E8C78",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 24px 70px rgba(32, 31, 28, 0.12)",
        card: "0 18px 45px rgba(32, 31, 28, 0.10)",
        insetWarm: "inset 0 1px 0 rgba(255,255,255,0.45)",
      },
    },
  },
  plugins: [],
};
