/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ios-bg': '#000000',
        'ios-glass': 'rgba(255, 255, 255, 0.2)',
        'ios-glass-dark': 'rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'default-wallpaper': "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
      },
    },
  },
  plugins: [],
}
