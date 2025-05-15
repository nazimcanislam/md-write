/** @type {import('tailwindcss').Config} */
export const theme = {
  extend: {
    colors: {
      primary: "#00AA55",
      "primary-hover": "#00894A",
    },
  },
};
export const plugins = [
  require("@tailwindcss/typography"),
  // ...
];
