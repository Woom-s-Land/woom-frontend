import nearBed from '../assets/home/home_active_bed.png';
import nearDesk from '../assets/home/home_active_desk.png';
import nearToilet from '../assets/home/home_active_toilet.png';
import home from '../assets/home/home.png';
import forwardHome from '../assets/home/forward_home.png';

const init = {};
const imageSrc = {
  nearBed,
  nearDesk,
  nearToilet,
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
