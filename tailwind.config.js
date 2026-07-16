/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette (from Lumen.aid's Instagram identity).
        // Contrast: white on teal ≈5.3:1, white on blue ≈5.1:1, cream on night ≈14:1,
        // mint on night ≈6.5:1 — all pass WCAG AA for body text. Cream/teal/blue/poppy
        // on each other are large-text-only pairs; keep small text white or night.
        night: '#0F1114',
        teal: '#0C7A5F',
        blue: '#3E6FB3',
        cream: '#F1E7D4',
        poppy: '#C63D3D',
        mint: '#35B48C',
        ash: '#B9B3A6',
        soot: '#4A463D',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        marker: ['"Permanent Marker"', 'cursive'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
}
