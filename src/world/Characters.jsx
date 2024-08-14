import { useEffect, useState } from 'react';
import { Sprite, Container, Texture } from '@pixi/react';
import Nickname from './Nickname';
import allImages from '../characterImages';

const CHAR_WIDTH = 40; // 캐릭터 사이즈
const CHAR_HEIGHT = 60;

const OtherCharacter = ({
  x,
  y,
  direction,
  stepIndex,
  costume,
  nickname,
  backgroundX,
  backgroundY,
}) => {
  const [directionImages, setDirectionImages] = useState({});

  useEffect(() => {
    const images = allImages[costume];

    if (images) {
      setDirectionImages(images);
    } else {
      setDirectionImages({});
    }
  }, [costume]);

  return (
    <Container x={Number(x) + backgroundX} y={Number(y) + backgroundY}>
      {directionImages[direction] && directionImages[direction][stepIndex] && (
        <Sprite
          image={directionImages[direction][stepIndex]}
          x={0}
          y={0}
          width={CHAR_WIDTH}
          height={CHAR_HEIGHT}
        />
      )}
      <Nickname width={CHAR_WIDTH} height={CHAR_HEIGHT} text={nickname} />
    </Container>
  );
};

export default OtherCharacter;
