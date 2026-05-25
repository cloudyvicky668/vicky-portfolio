/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper': '#FDFBF7',
        'wheat-gold': '#E6C384',
        'peach-pink': '#FBC6B1',
        'amber-brown': '#8C6A5E',
        'sky-blue': '#A1C4FD',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        'sans': ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'handwriting': ['Handwriting', 'cursive'],
        'architects': ['ArchitectsDaughter', 'cursive'],
      },
      borderRadius: {
        'organic': '2rem',
        'soft': '1.5rem',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(140, 106, 94, 0.1)',
        'glass-hover': '0 12px 40px rgba(140, 106, 94, 0.15)',
        'soft-long': '0 20px 50px rgba(0, 0, 0, 0.08)',
        'record': '0 25px 60px rgba(0, 0, 0, 0.12), 0 0 80px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
