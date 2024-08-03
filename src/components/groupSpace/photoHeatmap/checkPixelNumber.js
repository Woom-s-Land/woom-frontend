import pixelmap from './pixelmap.json';
const checkPixelNumber = (lng, lat) => {
  let num = 0;
  pixelmap.forEach((pixel, index) => {
    if (
      lat >= pixel.y &&
      lat < pixel.y + pixel.height &&
      lng >= pixel.x &&
      lng < pixel.x + pixel.width
    ) {
      console.log(pixel.num);
      num = pixel.num;
    }
  });
  return num;
};

export default checkPixelNumber;
