/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'modal-bg': 'url(src/assets/common/modal.png)',
        'close-bt': 'url(src/assets/common/x-bt.png)',
        'right-bt': 'url(src/assets/button/right-bt-up.png)',
        'left-bt': 'url(src/assets/button/left-bt-up.png)',
        'plus-bt': 'url(src/assets/button//plus-bt-up.png)',
        'heatmap-bg': 'url(src/assets/heatmap/heatmap_bg.png)',
        'help-mark': 'url(src/assets/heatmap/questionmark.png)',
        'help-mark-hover': 'url(src/assets/heatmap/questionmark_hover.png)',
        'help-bubble': 'url(src/assets/heatmap/help_bubble.png)',
        'modal-vertical': 'url(src/assets/heatmap/modal.png)',
      },
      gridTemplateColumns: {
        'custom-19': 'repeat(19, minmax(0, 1fr))',
      },
      colors: {
        'base-color': '#AA7959',
      },
    },
  },
  plugins: [],
};
