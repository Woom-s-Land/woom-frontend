import map from '../assets/map/map.png';

const init = {};
const imageSrc = {
  map,
};

const mapImages = Object.entries(imageSrc).reduce((images, [key, src]) => {
  const image = new Image();
  image.src = src;
  images[key] = image;
  return images;
}, init);

export default mapImages;
