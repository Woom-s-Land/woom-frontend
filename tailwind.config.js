/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: { 
        'modal-bg':"url(src/assets/common/modal.png)",
        'close-bt':"url(src/assets/common/x-bt.png)",
        'right-bt':"url(src/assets/button/right-bt-up.png)",
        'left-bt':"url(src/assets/button/left-bt-up.png)",
        'plus-bt':"url(src/assets/button//plus-bt-up.png)"
      }
    },
  },
  plugins: [],
};
