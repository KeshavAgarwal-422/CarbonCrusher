/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "#161626",
          "200": "#0b0b12",
        },
        "text-lite": "#79797f",
        white: "#fff",
        darkslategray: "#42424d",
        "blue-1": "#2f80ed",
      },
      fontFamily: {
        gilroy: "Gilroy",
      },
      borderRadius: {
        mini: "15px",
        xl: "20px",
      },
    },
    fontSize: {
      lg: "18px",
      "11xl": "30px",
      "5xl": "24px",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
