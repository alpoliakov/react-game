const colors = require(`tailwindcss/colors`);
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.500'),
            strong: {
              color: theme('colors.orange.500'),
            },
            blockquote: {
              color: theme('colors.orange.700'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.500'),
            strong: {
              color: theme('colors.pink.500'),
            },
            blockquote: {
              color: theme('colors.pink.700'),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ['dark'],
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
