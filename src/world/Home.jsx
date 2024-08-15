import React, { useState, useEffect, useCallback } from 'react';
import { Stage, Sprite, Container, AnimatedSprite } from '@pixi/react';
import { OutlineFilter } from '@pixi/filter-outline';
import homeImages from '../utils/homeImages';
import Character from './CharacterInHome';
import ReadLetterMain from '../components/groupSpace/letter/ReadLetterMain';
import WriteLetterMain from '../components/groupSpace/letter/WriteLetterMain';
import Group from '../components/group/Group';
import { useSelector } from 'react-redux';
import { aquarium } from '../assets/animation/aquarium/aquarium';

const MAP_X = 488;
const MAP_Y = 384;

const Home = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [costume, setCostume] = useState(userInfo.costume);
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFirst(false);
    }, 3000);
  }, []);
  // console.log(userInfo);
  const [isActiveBed, setIsActiveBed] = useState(false);
  const [isActiveDesk, setIsActiveDesk] = useState(false);
  const [isActiveToilet, setIsActiveToilet] = useState(false);
  const [isActiveRug, setIsActiveRug] = useState(false);
  const [isInBathroom, setIsInBathroom] = useState(false);

  const [isOpenWriteLetter, setIsOpenWriteLetter] = useState(false);
  const [isOpenReadLetter, setIsOpenReadLetter] = useState(false);
  const [isOpenGroup, setIsOpenGroup] = useState(false);

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
  const rugX = 217;
  const rugY = 354;
  const rugWidth = 60;
  const rugHeight = 30;

  const handleWriteLetterClose = () => {
    setIsOpenWriteLetter(false);
  };

  const handleReadLetterClose = () => {
    setIsOpenReadLetter(false);
  };

  const handleGroupClose = () => {
    setIsOpenGroup(false);
  };
  const handleCharacterMove = useCallback((charX, charY) => {
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
    // console.log(charX, rugX, charY, rugY);
    setIsActiveRug(
      charX >= rugX - 20 && charX <= rugX + rugWidth + 20 && charY >= rugY - 60
    );
    setIsInBathroom(charX <= 137 && charX >= 102 && charY <= 173);
  }, []);

  return (
    <div className='fixed w-full h-full bg-map-all bg-cover'>
      <div className='absolute inset-0 bg-black opacity-50 z-10' />
      <div className='flex justify-center items-center h-full relative z-20'>
        <Stage width={MAP_X} height={MAP_Y}>
          <Sprite image={homeImages.home} x={0} y={0} />
          <Container>
            {isFirst && (
              <Sprite
                image={homeImages.keyHome}
                x={180}
                y={150}
                width={150}
                height={140}
              />
            )}
            {isActiveDesk && (
              <Sprite
                image={homeImages.keyLetter}
                x={deskX + 100}
                y={deskY + 80}
                width={100}
                height={50}
              />
            )}
          </Container>
          <Sprite
            image={homeImages.bed}
            x={bedX}
            y={bedY}
            filters={isActiveBed ? [new OutlineFilter(2, 0xbcff89)] : []}
          />
          <Sprite
            image={homeImages.desk}
            x={deskX}
            y={deskY}
            filters={isActiveDesk ? [new OutlineFilter(2, 0xbcff89)] : []}
          />
          <Sprite
            image={homeImages.toilet}
            x={toiletX}
            y={toiletY}
            filters={isActiveToilet ? [new OutlineFilter(2, 0xbcff89)] : []}
          />
          <Sprite
            image={homeImages.rug}
            x={rugX}
            y={rugY}
            filters={isActiveRug ? [new OutlineFilter(2, 0xbcff89)] : []}
          />
          <AnimatedSprite
            textures={aquarium}
            isPlaying={true}
            animationSpeed={0.08} // 애니메이션 속도 조절
            x={344}
            y={30}
            width={32}
            height={33}
          />
          <Character
            handleCharacterMove={handleCharacterMove}
            isActiveBed={isActiveBed}
            isActiveDesk={isActiveDesk}
            isActiveToilet={isActiveToilet}
            isActiveRug={isActiveRug}
            isOpenReadLetter={isOpenReadLetter}
            isOpenWriteLetter={isOpenWriteLetter}
            setIsOpenWriteLetter={setIsOpenWriteLetter}
            setIsOpenReadLetter={setIsOpenReadLetter}
            setIsOpenGroup={setIsOpenGroup}
            nickname={nickname}
            costume={costume}
          />
          {isInBathroom && <Sprite image={homeImages.forward} x={0} y={144} />}
        </Stage>

        {/* 모달 컴포넌트들은 Stage 위에 표시되도록 설정 */}
        {isOpenWriteLetter && (
          <WriteLetterMain
            isOpen={isOpenWriteLetter}
            onClose={handleWriteLetterClose}
          />
        )}
        {isOpenReadLetter && (
          <ReadLetterMain
            isOpen={isOpenReadLetter}
            onClose={handleReadLetterClose}
          />
        )}
        {isOpenGroup && (
          <Group isOpen={isOpenGroup} handleCloseGroup={handleGroupClose} />
        )}
      </div>
    </div>
  );
};

export default Home;
