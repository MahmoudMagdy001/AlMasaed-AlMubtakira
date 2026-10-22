/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#336ea6',
          50: '#f0f6fc',
          100: '#e1ecf8',
          200: '#c3daf1',
          300: '#95c0e6',
          400: '#5ec1f0', // Cyan Blue
          500: '#3d94cc',
          600: '#336ea6', // Blue
          700: '#234f78',
          800: '#1b3b5a',
          900: '#132454', // Dark Blue
        },
        sand: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        surface: {
          DEFAULT: '#ffffff',
          soft: '#f4f7fb',
          border: '#dde4ef',
          'border-subtle': '#edf2f9',
        },
        content: {
          heading: '#132454',
          body: '#3a4560',
          muted: '#6a768f',
          inverse: '#ffffff',
          'inverse-muted': '#e1ecf8',
        },
        feedback: {
          success: '#1f8a5b',
          error: '#c0392b',
          warning: '#b7791f',
        },
        whatsapp: {
          DEFAULT: '#25d366',
          hover: '#20bd5a',
        },
      },
      fontFamily: {
        sans: ['Tajawal', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.4' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.8' }],
        lg: ['1.125rem', { lineHeight: '1.8' }],
        xl: ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.3' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.5rem', { lineHeight: '1.2' }],
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        control: '8px',
        card: '12px',
      },
      boxShadow: {
        card: '0 6px 24px rgba(19, 36, 84, 0.08)',
        elevated: '0 12px 32px rgba(19, 36, 84, 0.12)',
        header: '0 2px 12px rgba(19, 36, 84, 0.06)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
