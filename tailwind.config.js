/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: "rgb(var(--foreground) / <alpha-value>)",
        secondary: "rgb(var(--foreground) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
