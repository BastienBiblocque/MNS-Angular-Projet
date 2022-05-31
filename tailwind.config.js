module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#222831",
          "secondary": "#00ADB5",
          "accent": "#37CDBE",
          "neutral": "#00ADB5",
          "base-100": "#EEEEEE",
        },
      },
    ],
  },
}
