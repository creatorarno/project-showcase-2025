/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00d4ff", // Cyan from screenshots
        secondary: "#9333ea", // Purple/Violet
        "background-dark": "#0A0B1E", // Deep dark blue/black
        "card-dark": "#101c22",
        "text-light": "#F0F0F0",
        "text-muted": "#94a3b8",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 212, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.2)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 212, 255, 0.1) 1px, transparent 1px)",
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}