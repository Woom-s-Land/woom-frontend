// Home.jsx
import React, { useState, useCallback } from 'react';
import { Stage, Sprite, useApp } from '@pixi/react';
import { OutlineFilter } from '@pixi/filter-outline';
import homeImages from './homeImages';
import Character from './CharacterInHome';

const MAP_X = 488;
const MAP_Y = 384;

const Home = () => {
  const [background, setBackground] = useState(homeImages.home);
  const [isActiveBed, setIsActiveBed] = useState(false);
  const [isActiveDesk, setIsActiveDesk] = useState(false);
  const [isActiveToilet, setIsActiveToilet] = useState(false);
  const [isInBathroom, setIsInBathroom] = useState(true);
  const handleCharacterMove = useCallback((charX, charY) => {
    const bedX = 376;
    const bedY = 20;
    const bedWidth = 103;
    const bedHeight = 112;
    const deskX = 0;
    const deskY = 160;
    const deskWidth = 62;
    const deskHeight = 138;
    const toiletX = 6;
    const toiletY = 25;
    const toiletWidth = 37;
    const toiletHeight = 60;

    setIsActiveBed(charX + 40 >= bedX - 20 && charY <= bedY + bedHeight + 20);
    setIsActiveDesk(
      charX <= deskX + deskWidth + 30 &&
        charY <= deskY + deskHeight + 30 &&
        charY >= deskY
    );
    setIsActiveToilet(
      charX <= toiletX + toiletWidth + 20 &&
        charY <= toiletY + toiletHeight + 20
    );
    setIsInBathroom(charX <= 137 && charX >= 102 && charY <= 173);
  }, []);

  return (
    <div className='flex justify-center mt-24'>
      <Stage width={MAP_X} height={MAP_Y}>
        <Sprite image={background} x={0} y={0} />
        <Sprite
          image={homeImages.bed}
          x={376}
          y={20}
          filters={isActiveBed ? [new OutlineFilter(2, 0xbcff89)] : []}
        />
        <Sprite
          image={homeImages.desk}
          x={0}
          y={160}
          filters={isActiveDesk ? [new OutlineFilter(2, 0xbcff89)] : []}
        />
        <Sprite
          image={homeImages.toilet}
          x={6}
          y={25}
          filters={isActiveToilet ? [new OutlineFilter(2, 0xbcff89)] : []}
        />

        <Character
          handleCharacterMove={handleCharacterMove}
          isActiveBed={isActiveBed}
          isActiveDesk={isActiveDesk}
          isActiveToilet={isActiveToilet}
        />
        {isInBathroom && <Sprite image={homeImages.forward} x={0} y={144} />}
      </Stage>
    </div>
  );
};

export default Home;
