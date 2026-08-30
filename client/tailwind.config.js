/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF3FA',
          100: '#D6E2F2',
          200: '#AEC4E4',
          300: '#7B9DD0',
          400: '#3F6AAE',
          500: '#1D4788',
          600: '#14356E',
          700: '#0F2A5A',
          800: '#0B2450',
          900: '#071A38',
          950: '#041024',
        },
        azure: {
          50: '#ECF7FE',
          100: '#D0EDFC',
          200: '#A2DAF8',
          300: '#63C0F0',
          400: '#2BA3E2',
          500: '#0F8BD4',
          600: '#0A6EAE',
          700: '#0B588B',
          800: '#0E4A73',
          900: '#113E60',
        },
        moss: {
          50: '#F0FAEE',
          100: '#DCF3D8',
          200: '#BAE7B2',
          300: '#8DD481',
          400: '#5FBF52',
          500: '#3FA935',
          600: '#2E8727',
          700: '#266B21',
          800: '#21551E',
          900: '#1C471B',
        },
        gold: {
          50: '#FEF8EC',
          100: '#FBEBC7',
          200: '#F7D68B',
          300: '#F2BE4F',
          400: '#EFAE2A',
          500: '#E9A81C',
          600: '#C4820F',
          700: '#9C6210',
          800: '#814E15',
          900: '#6E4117',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.03', letterSpacing: '-0.035em', fontWeight: '800' }],
        'display-lg': ['clamp(2.25rem, 4.6vw, 3.75rem)', { lineHeight: '1.06', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-md': ['clamp(1.875rem, 3.4vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-sm': ['clamp(1.5rem, 2.4vw, 2rem)', { lineHeight: '1.18', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      maxWidth: {
        container: '1240px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11,36,80,0.04), 0 8px 24px -6px rgba(11,36,80,0.08)',
        lift: '0 2px 4px rgba(11,36,80,0.04), 0 18px 44px -12px rgba(11,36,80,0.16)',
        deep: '0 30px 80px -20px rgba(7,26,56,0.45)',
        glow: '0 0 0 1px rgba(15,139,212,0.14), 0 18px 50px -14px rgba(15,139,212,0.34)',
      },
      backgroundImage: {
        'brand-sweep': 'linear-gradient(100deg, #0B2450 0%, #0F2A5A 38%, #0A6EAE 78%, #0F8BD4 100%)',
        'accent-sweep': 'linear-gradient(90deg, #0F8BD4 0%, #3FA935 55%, #E9A81C 100%)',
        'mesh-navy': 'radial-gradient(1100px 620px at 12% -8%, rgba(15,139,212,0.30) 0%, transparent 62%), radial-gradient(880px 520px at 92% 8%, rgba(63,169,53,0.22) 0%, transparent 60%), radial-gradient(700px 500px at 68% 106%, rgba(233,168,28,0.16) 0%, transparent 62%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spin-mark': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        marquee: 'marquee 38s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'spin-mark': 'spin-mark 12s linear infinite',
      },
    },
  },
  plugins: [],
}
