/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Sarabun', 'ui-sans-serif', 'system-ui'],
        'serif': ['Sarabun', 'ui-serif', 'Georgia'],
        'mono': ['Sarabun', 'ui-monospace', 'SFMono-Regular'],
        'font-banner': ['DBLim'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
