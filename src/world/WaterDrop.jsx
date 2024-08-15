import { AnimatedSprite } from '@pixi/react';
import { waterDrop } from '../assets/animation/waterdrop/waterDrop';

const WaterDrop = ({ x, y }) => {
  return (
    <AnimatedSprite
      textures={waterDrop}
      isPlaying={true}
      animationSpeed={0.1} // 애니메이션 속도 조절
      x={x}
      y={y}
      width={32}
      height={32}
    />
  );
};

export default WaterDrop;
