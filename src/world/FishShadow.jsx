import { AnimatedSprite } from '@pixi/react';
import { useState, useEffect } from 'react';
import { fishShadow } from '../assets/animation/fish-shadow/fishShadow';

const FishShadow = ({ x, y, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [isVisible]);
  return (
    <>
      {isVisible && (
        <AnimatedSprite
          textures={fishShadow}
          isPlaying={true}
          animationSpeed={0.15} // 애니메이션 속도 조절
          x={x}
          y={y}
          width={32}
          height={32}
        />
      )}
    </>
  );
};

export default FishShadow;
