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
        colors: {
            // สีเขียวศิริราช (Siriraj Green) - โดยประมาณ
            'siriraj-primary': '#005740',
            'siriraj-dark': '#003d2d',
            // สีเหลืองทอง (Gold) - ใช้ตัดขอบหรือเน้นย้ำ
            'siriraj-gold': '#D4AF37',
            'siriraj-gold-light': '#F2D05E',
            // สีพื้นหลังสะอาดตา
            'bg-soft': '#F9FAFB',
        },
    },
  },
  // plugins: [
  //   require('@tailwindcss/forms'),
  // ],
}
