/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        gold: {
          300: '#F5D98B',
          400: '#E5C55A',
          500: '#C9A84C',
          600: '#A8863A',
          700: '#7D6128',
        },
        wine: {
          700: '#7C1C2A',
          800: '#5C1320',
          900: '#3E0D16',
        },
      },
      backgroundImage: {
        'radial-wine': 'radial-gradient(ellipse at 20% 50%, rgba(124,28,42,0.18) 0%, transparent 60%)',
        'radial-gold': 'radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.10) 0%, transparent 50%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulse_glow: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        pulse_glow: 'pulse_glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
