/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--bg)',
          2: 'var(--bg-2)',
          3: 'var(--bg-3)',
        },
        paper: 'var(--paper)',
        ink: {
          DEFAULT: 'var(--ink)',
          dim: 'var(--ink-dim)',
          mute: 'var(--ink-mute)',
        },
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
        },
        green: {
          DEFAULT: 'var(--green)',
          deep: 'var(--green-deep)',
          ink: 'var(--green-ink)',
        },
        blue: {
          DEFAULT: 'var(--blue)',
          2: 'var(--blue-2)',
          deep: 'var(--blue-deep)',
        },
        cream: 'var(--cream)',
        peach: 'var(--peach)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-up': 'fadeUp 1s cubic-bezier(.2,.8,.2,1) forwards',
        'float-y': 'floatY 4s ease-in-out infinite',
        'scroll-x': 'scroll-x 60s linear infinite',
        pulse: 'pulseDot 2s infinite',
        bob: 'bob 2s infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'scroll-x': {
          to: { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        blink: {
          '0%,50%': { opacity: '1' },
          '51%,100%': { opacity: '0' },
        },
      },
    },
    fontFamily: {
      display: 'var(--font-display)',
      sans: 'var(--font-display)',
      mono: 'var(--font-mono)',
      openSans: 'var(--font-open-sans)',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
