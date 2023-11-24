/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        'white-1': '#F2F2F2',
        'blue-1': '#2F527B',
        'blue-2': '#1D355D',
        'blue-80': '#6066D0CC',
        'blue-70': '#6066D0B2',
        'yellow-1': '#F9A826',
        'red-1': '#EA8282',
        'green-1': '#60BF88',
        'green-2': '#6FCF97'

      }
    }
  },
  plugins: []
}
