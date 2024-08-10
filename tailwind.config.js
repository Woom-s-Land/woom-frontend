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
        'gr-btn': 'url(src/assets/group/group-button.png)',
        'gr-btn-active': 'url(src/assets/group/group-button-active.png)',
        'gr-btn-md': 'url(src/assets/group/gr-btn-md.png)',
        'gr-btn-md-active': 'url(src/assets/group/gr-btn-md-active.png)',
        'gr-btn-md-blue': 'url(src/assets/group/gr-btn-md-blue.png)',
        'gr-btn-md-blue-active':
          'url(src/assets/group/gr-btn-md-blue-active.png)',
        'gr-left-btn': 'url(src/assets/group/left-btn.png)',
        'gr-right-btn': 'url(src/assets/group/right-btn.png)',
        'gr-check': 'url(src/assets/group/check.png)',
        'gr-check-fill': 'url(src/assets/group/check_fill.png)',
        'gr-copy': 'url(src/assets/group/copy.png)',
        'gr-external': 'url(src/assets/group/external.png)',
        'inputbox-story': 'url(src/assets/story/input-box-story.png)',
        'bgm-o': 'url(src/assets/menu/bgm-o.png)',
        'bgm-x': 'url(src/assets/menu/bgm-x.png)',
        menu: 'url(src/assets/menu/menu.png)',
        'inputbox-comment': 'url(./assets/comment/input-box.png)',
        'dialoguebox-comment': 'url(./assets/comment/dialoge-box.png)',
      },
      gridTemplateColumns: {
        'custom-19': 'repeat(19, minmax(0, 1fr))',
      },
      colors: {
        'base-color': '#AA7959',
        'point-color': '#613416',
      },
      fontSize: {
        xxs: '0.6rem',
        xxxs: '0.4rem',
      },
    },
  },
  plugins: [],
};
