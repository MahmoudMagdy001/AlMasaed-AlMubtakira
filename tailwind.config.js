/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
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
        surface: {
          DEFAULT: '#ffffff',
          soft: '#f4f7fb',
          border: '#dde4ef',
        },
        content: {
          heading: '#132454',
          body: '#3a4560',
          muted: '#6a768f',
        },
        feedback: {
          success: '#1f8a5b',
          error: '#c0392b',
          warning: '#b7791f',
        },
      },
      fontFamily: {
        sans: ['Tajawal', 'Segoe UI', 'system-ui', 'sans-serif'],
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
      },
    },
  },
  plugins: [],
}
