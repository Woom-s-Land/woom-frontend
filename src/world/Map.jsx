import CharacterInMap from './CharacterInMap';
import mapImages from './mapImages';
import { useState } from 'react';
import { Stage, Sprite } from '@pixi/react';

const Map = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [backgroundX, setBackgroundX] = useState(-300);
  const [backgroundY, setBackgroundY] = useState(-700);
  const [mapImage, setMapImage] = useState(mapImages.map);
  return (
    <div>
      <Stage width={width} height={height}>
        <Sprite image={mapImage} x={backgroundX} y={backgroundY} />
        <CharacterInMap
          width={width}
          height={height}
          setBackgroundX={setBackgroundX}
          setBackgroundY={setBackgroundY}
          backgroundX={backgroundX}
          backgroundY={backgroundY}
          setMapImage={setMapImage}
        />
      </Stage>
    </div>
  );
};

export default Map;
