/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'modal-bg': 'url(./assets/common/modal.png)',
        'close-bt': 'url(./assets/common/x-bt.png)',
        'right-bt': 'url(./assets/button/right-bt-up.png)',
        'left-bt': 'url(./assets/button/left-bt-up.png)',
        'plus-bt': 'url(./assets/button//plus-bt-up.png)',
        'heatmap-bg': 'url(./assets/heatmap/heatmap_bg.png)',
        'help-mark': 'url(./assets/heatmap/questionmark.png)',
        'help-mark-hover': 'url(./assets/heatmap/questionmark_hover.png)',
        'help-bubble': 'url(./assets/heatmap/help_bubble.png)',
        'modal-vertical': 'url(./assets/heatmap/modal.png)',
        'gr-btn': 'url(./assets/group/group-button.png)',
        'gr-btn-active': 'url(./assets/group/group-button-active.png)',
        'gr-btn-md': 'url(./assets/group/gr-btn-md.png)',
        'gr-btn-md-active': 'url(./assets/group/gr-btn-md-active.png)',
        'gr-btn-md-blue': 'url(./assets/group/gr-btn-md-blue.png)',
        'gr-btn-md-blue-active':
          'url(./assets/group/gr-btn-md-blue-active.png)',
        'gr-left-btn': 'url(./assets/group/left-btn.png)',
        'gr-right-btn': 'url(./assets/group/right-btn.png)',
        'gr-check': 'url(./assets/group/check.png)',
        'gr-check-fill': 'url(./assets/group/check_fill.png)',
        'gr-copy': 'url(./assets/group/copy.png)',
        'gr-external': 'url(./assets/group/external.png)',
        'inputbox-story': 'url(./assets/story/input-box-story.png)',
        'bgm-o': 'url(./assets/menu/bgm-o.png)',
        'bgm-x': 'url(./assets/menu/bgm-x.png)',
        menu: 'url(./assets/menu/menu.png)',
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
      cursor: {
        custom: 'url(./assets/cursor/MouseBasic.png), auto',
        pointer: 'url(./assets/cursor/MousePoint.png), auto',
        'custom-active': 'url(./assets/cursor/MouseHold.png), auto',
      },
    },
  },
  plugins: [],
};
