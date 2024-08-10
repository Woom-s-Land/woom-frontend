import home from '../assets/home/home.png';
import bed from '../assets/home/home-bed.png';
import desk from '../assets/home/home-desk.png';
import toilet from '../assets/home/home-toilet.png';
import forward from '../assets/home/home-forward.png';
import interactionKey from '../assets/home/interaction_key.png'
import rug from '../assets/home/home-rug.png'

const init = {};
const imageSrc = {
  home,
  bed,
  desk,
  toilet,
  forward,
  interactionKey, 
  rug
};

const homeImages = Object.entries(imageSrc).reduce((images, [key, src]) => {
  const image = new Image();
  image.src = src;
  images[key] = image;
  return images;
}, init);

export default homeImages;
