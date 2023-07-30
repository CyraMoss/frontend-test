import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      // Header background
      headerBackground: '#F6F6F7',

      // Font colors
      fontPrimary: '#222222',
      fontSecondary: '#888888',

      // Required star
      requiredStar: '#C90000',

      // Border colors
      borderLightGrey: '#CCCCCC',
      borderDarkGrey: '#222222',

      //backgroundWhite
      white: '#FFFFFF',
    },
  },
  plugins: [],
} satisfies Config;
