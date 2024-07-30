import CharacterInMap from './CharacterInMap';
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

  const [boundaries, setBoundaries] = useState([]);

  const BoundaryWidth = 32;
  const BoundaryHeight = 32;

  const collisionImageUrl = 'http://localhost:5173/src/assets/collision.png';
  useEffect(() => {
    const boundaryMap = initializeCollisionMap(boundary, 64);
    setBoundaries(
      initializeBoundaries(boundaryMap, BoundaryWidth, BoundaryHeight, 29870)
    );
  }, []);
  useEffect(() => {
    console.log('BackgroundX updated:', backgroundX);
  }, [backgroundX]);

  useEffect(() => {
    console.log('BackgroundY updated:', backgroundY);
  }, [backgroundY]);

  return (
    <div>
      <Stage width={width} height={height}>
        <Sprite image={mapImages.map} x={backgroundX} y={backgroundY} />
        <CharacterInMap
          width={width}
          height={height}
          setBackgroundX={setBackgroundX}
          setBackgroundY={setBackgroundY}
        />
      </Stage>
    </div>
  );
};

export default Map;
