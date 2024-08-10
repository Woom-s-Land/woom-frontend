import map from '../assets/map/map.png';
import photo from '../assets/map/map-photo.png';
import photomap from '../assets/map/map-photomap.png';
import guestbook from '../assets/map/map-board.png';

const init = {};
const imageSrc = {
  map,
  photo,
  photomap,
  guestbook,
};

const mapImages = Object.entries(imageSrc).reduce((images, [key, src]) => {
  const image = new Image();
  image.src = src;
  images[key] = image;
  return images;
}, init);

export default mapImages;
