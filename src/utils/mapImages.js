import map from '../assets/map/map.png';
import photo from '../assets/map/map-photo.png';
import photomap from '../assets/map/map-photomap.png';
import guestbook from '../assets/map/map-board.png';
import radio from '../assets/map/map-radio.png';
import keyRadio from '../assets/map/key-radio.png';
const init = {};
const imageSrc = {
  map,
  photo,
  photomap,
  guestbook,
  radio,
  keyRadio,
};

const mapImages = Object.entries(imageSrc).reduce((images, [key, src]) => {
  const image = new Image();
  image.src = src;
  images[key] = image;
  return images;
}, init);

export default mapImages;
