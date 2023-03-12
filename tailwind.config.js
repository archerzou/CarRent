module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Added more colors from Figma File
      colors: {
        primary: '#3563E9',
        secondary: '#5CAFFC',
        black_1: '#1A202C',
        gray_1: '#90A3BF',
        gray_2: '#F6F7F9',
      },
      fontFamily: {
        manrope: ['Plus Jakarta Sans'],
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1024px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [],
};
