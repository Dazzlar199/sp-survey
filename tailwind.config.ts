import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1a2332', light: '#2d3a4d' },
        gold: { DEFAULT: '#c9a959', light: '#d4bc7a', dark: '#b8960f' },
        ivory: '#FAFAF8',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
