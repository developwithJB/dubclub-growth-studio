/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dub: {
          green: "#36ff22",
          lime: "#7dff35",
          ink: "#0b0b0d",
          card: "#171719",
          panel: "#202024",
          border: "#393941",
          muted: "#9a9aa3",
          danger: "#ff4d4d",
          amber: "#ffbd3d"
        }
      },
      boxShadow: {
        glow: "0 0 28px rgba(54, 255, 34, 0.16)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};
