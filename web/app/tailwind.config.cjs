export default {
  plugins: [],
  theme: {
    extend: {},
    colors: {
      primary: "#1C6758",
      secondary: "#D6CDA4",
      tertiary: "#3D8361",
      quaternary: "#3D8361",
      text: {
        lightGray: "#919191",
      },
    },
  },
  purge: ["./index.html", "./src/**/*.{svelte,js,ts}"], // for unused CSS
  variants: {
    extend: {},
  },
  darkMode: false, // or 'media' or 'class'
};
