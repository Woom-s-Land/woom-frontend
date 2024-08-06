import char_1d1 from '../assets/6/d1.png';
import char_1d2 from '../assets/6/d2.png';
import char_1d4 from '../assets/6/d2.png';
import char_1d5 from '../assets/6/d4.png';
import char_1d6 from '../assets/6/d5.png';
import char_1d8 from '../assets/6/d8.png';

import char_1u1 from '../assets/6/u1.png';
import char_1u2 from '../assets/6/u2.png';
import char_1u4 from '../assets/6/u4.png';
import char_1u5 from '../assets/6/u5.png';
import char_1u6 from '../assets/6/u6.png';
import char_1u8 from '../assets/6/u8.png';

import char_1r1 from '../assets/6/r1.png';
import char_1r2 from '../assets/6/r2.png';
import char_1r4 from '../assets/6/r4.png';
import char_1r5 from '../assets/6/r5.png';
import char_1r6 from '../assets/6/r6.png';
import char_1r8 from '../assets/6/r8.png';

import char_1l1 from '../assets/6/l1.png';
import char_1l2 from '../assets/6/l2.png';
import char_1l4 from '../assets/6/l4.png';
import char_1l5 from '../assets/6/l5.png';
import char_1l6 from '../assets/6/l6.png';
import char_1l8 from '../assets/6/l8.png';

const init = {};
const imageSrc = {
  char_1d1,
  char_1d2,
  char_1d4,
  char_1d5,
  char_1d6,
  char_1d8,

  char_1u1,
  char_1u2,
  char_1u4,
  char_1u5,
  char_1u6,
  char_1u8,

  char_1r1,
  char_1r2,
  char_1r4,
  char_1r5,
  char_1r6,
  char_1r8,

  char_1l1,
  char_1l2,
  char_1l4,
  char_1l5,
  char_1l6,
  char_1l8,
};

const CharacterImages = Object.entries(imageSrc).reduce(
  (images, [key, src]) => {
    const image = new Image();
    image.src = src;
    images[key] = image;
    return images;
  },
  init
);

export default CharacterImages;
