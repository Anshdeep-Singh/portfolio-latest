import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulse : {
          '0%, 100%': { opacity: "1" },
          '50%': { opacity: "0.5" },
        },
        bounce : {
          '0%, 100%': { transform: "translateY(0)" },
          '50%': { transform: "translateY(-10px)" },
        },

      },
    },
    animation: {
      'spin-slow': 'spin 8s linear infinite',
      'wiggle': 'wiggle 1s ease-in-out infinite',
      'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'bounce': 'bounce 1s infinite',

    },
    backgroundImage:{
      webPattern: 'repeating-radial-gradient(circle, #000 0 1px, transparent 1px 64px);',
      webPatternMb: 'repeating-radial-gradient(circle, #000 0 1px, transparent 1px 32px);',

        },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }
  
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }
  
      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }
  
      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }
  
      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      smm: { max: "530px" },
      // => @media (max-width: 530px) { ... }
  
      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }
  },
  },

  darkMode: 'class',
  plugins: [],
}
export default config
