/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      colors: {

        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        brand: 'var(--color-primary)',
        accent: 'var(--color-accent)',

        newcolor: '#8cb7ff',
        add: '#c7ddd1',
        newadd: '#829088',
        sub: '#30895e',
        footcolor: '#07393C',
        newoffwhite: '#f0edee',
        newhara: '#07393C',
        bacha: '#F9F6E5',
        start: '#52414c'
      },
      fontFamily: {

        custom: 'Source Code Pro',
        second: 'Be Vietnam Pro'
      },
      animation: {
        'spin-slow': 'spin 3s linear '
      }
    },
  },
  plugins: [],
}