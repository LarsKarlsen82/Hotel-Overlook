module.exports = {
  content: [
    "./App.jsx",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      margin: {
        'custom': '40rem', // Adjust the value as needed
      },
      height: {
        'customHeight': '40rem', // Adjust the value as needed
        
      },
      fontFamily: {
        'Nunito': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
