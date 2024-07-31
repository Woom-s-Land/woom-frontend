import map from '../assets/map/map.png';
import nearPhoto from '../assets/map/map_interaction_photo.png';
import nearPhotomap from '../assets/map/map_interaction_photomap.png';
import nearGuestbook from '../assets/map/map_interaction_guestbook.png';
const init = {};
const imageSrc = {
  map,
  nearPhoto,
  nearPhotomap,
  nearGuestbook,
};

const mapImages = Object.entries(imageSrc).reduce((images, [key, src]) => {
  const image = new Image();
  image.src = src;
  images[key] = image;
  return images;
}, init);

export default mapImages;
