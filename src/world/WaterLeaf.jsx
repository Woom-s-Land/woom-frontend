import { Texture } from 'pixi.js';
import { AnimatedSprite, Sprite } from '@pixi/react';
import { useState, useEffect } from 'react';
import { waterLeaf } from '../assets/animation/waterleaf/waterLeaf';
import waterLeafStop from '../assets/animation/waterleaf/leaf4.png';
const WaterLeaf = ({ x, y, delay }) => {
  const [isAnimate, setIsAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsAnimate(true);
    }, delay);
  }, [isAnimate]);
  return (
    <>
      {isAnimate ? (
        <AnimatedSprite
          textures={waterLeaf}
          isPlaying={true}
          animationSpeed={0.05} // 애니메이션 속도 조절
          x={x}
          y={y}
          width={32}
          height={32}
        />
      ) : (
        <Sprite
          texture={Texture.from(waterLeafStop)}
          x={x}
          y={y}
          width={32}
          height={32}
        />
      )}
    </>
  );
};

export default WaterLeaf;
