import '../App.css';
import { useState } from 'react';
import Character from './CharacterInHome';
import { Stage, Sprite } from '@pixi/react';
import homeImages from './homeImages';
const MAP_X = 488;
const MAP_Y = 384;

const Home = () => {
  const [background, setBackground] = useState(homeImages.home);

  return (
    <div>
      <Stage width={MAP_X} height={MAP_Y}>
        <Sprite image={background} x={0} y={0} />
        <Character setBackground={setBackground} />
        <Sprite image={homeImages.forwardHome} x={0} y={0} />
      </Stage>
    </div>
  );
};

export default Home;
