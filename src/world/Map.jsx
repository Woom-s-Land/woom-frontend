import CharacterInMap from './CharacterInMap';
import boundary from '../assets/map/map_collisions';
import mapImages from './mapImages';
import {
  initializeCollisionMap,
  initializeBoundaries,
} from '../utils/boundaryUtils';
import { useState, useEffect } from 'react';
import { Stage, Sprite, Graphics } from '@pixi/react';

const Map = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [backgroundX, setBackgroundX] = useState(-300);
  const [backgroundY, setBackgroundY] = useState(-700);

  return (
    <div>
      <Stage width={width} height={height}>
        <Sprite image={mapImages.map} x={backgroundX} y={backgroundY} />
        <CharacterInMap
          width={width}
          height={height}
          setBackgroundX={setBackgroundX}
          setBackgroundY={setBackgroundY}
          backgroundX={backgroundX}
          backgroundY={backgroundY}
        />
      </Stage>
    </div>
  );
};

export default Map;
