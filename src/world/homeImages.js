import home from '../assets/home/home.png';
import forwardHome from '../assets/home/forward_home.png';

const init = {};
const imageSrc = {
  home,
  forwardHome,
};

const homeImages = Object.entries(imageSrc).reduce((images, [key, src]) => {
  const image = new Image();
  image.src = src;
  images[key] = image;
  return images;
}, init);

export default homeImages;
