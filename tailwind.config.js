/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: 'var(--primary)',
          'primary-hover': 'var(--primary-hover)',
          secondary: 'var(--secondary)',
          'secondary-hover': 'var(--secondary-hover)',
          accent: 'var(--accent)',
          'accent-hover': 'var(--accent-hover)',
          'background-light': 'var(--background-light)',
          'background-dark': 'var(--background-dark)',
          'surface-light': 'var(--surface-light)',
          'surface-dark': 'var(--surface-dark)',
          'text-light': 'var(--text-light)',
          'text-dark': 'var(--text-dark)',
          'text-muted-light': 'var(--text-muted-light)',
          'text-muted-dark': 'var(--text-muted-dark)',
          success: 'var(--success)',
          warning: 'var(--warning)',
          error: 'var(--error)',
          info: 'var(--info)',
          'border-light': 'var(--border-light)',
          'border-dark': 'var(--border-dark)',
          'neutral-light': '#f3f4f6',
          'neutral-dark': '#374151',
        },
        fontFamily: {
          sans: ['var(--font-family)'],
        },
        boxShadow: {
          'sm': 'var(--shadow-sm)',
          'md': 'var(--shadow-md)',
          'lg': 'var(--shadow-lg)',
        },
        borderRadius: {
          'sm': 'var(--radius-sm)',
          'md': 'var(--radius-md)',
          'lg': 'var(--radius-lg)',
          'xl': 'var(--radius-xl)',
          'full': 'var(--radius-full)',
        },
        transitionDuration: {
          'fast': 'var(--transition-fast)',
          'normal': 'var(--transition-normal)',
          'slow': 'var(--transition-slow)',
        },
      },
    },
    plugins: [],
  }