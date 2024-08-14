import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { groupActions } from '../store/groupSlice';
import { Stage, Sprite, Container } from '@pixi/react';
import { OutlineFilter } from '@pixi/filter-outline';
import basicAxios from '../libs/axios/basicAxios';
import CharacterInMap from './CharacterInMap';
import mapImages from '../utils/mapImages';
import PhotoModal from '../components/groupSpace/photo/PhotoModal';
import PhotoHeatMap from '../components/groupSpace/photoHeatmap/PhotoHeatMap';
import CommentModal from '../components/groupSpace/comment/CommentModal';
import StoryReadModal from '../components/groupSpace/radio/StoryReadModal';
import StoryWriteModal from '../components/groupSpace/radio/StoryWriteModal';
import ChatBox from '../components/groupSpace/ChatBox';
import client from '../libs/socket/client';
const outlineStyle = new OutlineFilter(4, 0xbcff89);

const Map = () => {
  const dispatch = useDispatch();

  const width = window.screen.width;
  const height = window.innerHeight;
  const pathname = window.location.pathname;
  const woomsId = pathname.split('/')[2];
  const groupInfo = useSelector((state) => state.group.groupInfo);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [backgroundX, setBackgroundX] = useState(-300);
  const [backgroundY, setBackgroundY] = useState(-300);

  const [characterX, setCharacterX] = useState(width / 2);
  const [characterY, setCharacterY] = useState(height / 2);

  const [isNearPhoto, setIsNearPhoto] = useState(false);
  const [isNearPhotomap, setIsNearPhotomap] = useState(false);
  const [isNearGuestbook, setIsNearGuestbook] = useState(false);
  const [isNearRadio, setIsNearRadio] = useState(false);

  const [isInteractive, setIsInteractive] = useState(false);
  const [radioReadInteractive, setRadioReadInteractive] = useState(false);
  const [radioWriteInteractive, setRadioWriteInteractive] = useState(false);
  const [isOpenPhoto, setIsOpenPhoto] = useState(false);
  const [isOpenPhotomap, setIsOpenPhotomap] = useState(false);
  const [isOpenGuestbook, setIsOpenGuestbook] = useState(false);
  const [isOpenRadioRead, setIsOpenRadioRead] = useState(false);
  const [isOpenRadioWrite, setIsOpenRadioWrite] = useState(false);

  const [isChatting, setIsChatting] = useState(false);

  const photoX = 1417;
  const photoY = 227;
  const photoWidth = 266;
  const photoHeight = 220;

  const photomapX = 1260;
  const photomapY = 515;
  const photomapWidth = 98;
  const photomapHeight = 90;

  const guestbookX = 347;
  const guestbookY = 620;
  const guestbookWidth = 116;
  const guestbookHeight = 126;

  const radioX = 490;
  const radioY = 450;
  const radioWidth = 80;
  const radioHeight = 63;
  // 캐릭터의 위치 변경에 따른 정적인 요소의 위치 조정
  const calculateStaticElementPosition = useCallback(() => {
    return {
      px: photoX + backgroundX,
      py: photoY + backgroundY,
      pmx: photomapX + backgroundX,
      pmy: photomapY + backgroundY,
      gx: guestbookX + backgroundX,
      gy: guestbookY + backgroundY,
      rx: radioX + backgroundX,
      ry: radioY + backgroundY,
    };
  }, [characterX, characterY, backgroundX, backgroundY, width, height]);

  // #stomp
  const [connected, setConnected] = useState(false);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [costume, setCostume] = useState(userInfo.costume);

  // const token = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d';

  useEffect(() => {
    client.activate();
    client.onConnect = () => {
      console.log('STOMP client connected');
      setConnected(true);
      console.log(groupInfo);
      basicAxios({
        method: 'post',
        url: `/join/${groupInfo.woomsInviteCode}`,
      })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    };

    client.onDisconnect = () => {
      console.log('STOMP client disconnected');
      setConnected(false);
    };

    return () => {
      client.deactivate();
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(groupActions.exit());
    };
  }, []);

  // #end-stomp

  useEffect(() => {
    if (isInteractive) {
      setIsOpenPhoto(false);
      setIsOpenPhotomap(false);
      setIsOpenGuestbook(false);
      setIsOpenRadioRead(false);
      setIsOpenRadioWrite(false);
      if (isNearPhoto) setIsOpenPhoto(true);
      else if (isNearPhotomap) setIsOpenPhotomap(true);
      else if (isNearGuestbook) setIsOpenGuestbook(true);
    } else if (radioReadInteractive) {
      if (isNearRadio) setIsOpenRadioRead(true);
    } else if (radioWriteInteractive) {
      if (isNearRadio) setIsOpenRadioWrite(true);
    }
  }, [isInteractive, radioReadInteractive, radioWriteInteractive]);

  const handleClosePhoto = () => {
    setIsOpenPhoto(false);
  };
  const handleClosePhotomap = () => {
    setIsOpenPhotomap(false);
  };
  const handleCloseGuestbook = () => {
    console.log('click');
    setIsOpenGuestbook(false);
  };
  const handleCloseRadioRead = () => {
    console.log('click');
    setIsOpenRadioRead(false);
  };
  const handleCloseRadioWrite = () => {
    console.log('click');
    setIsOpenRadioWrite(false);
  };
  const isNear = (
    charX,
    charY,
    elementX,
    elementY,
    elementWidth,
    elementHeight
  ) => {
    // 사각형 1의 경계
    const rect1Right = charX + 40;
    const rect1Bottom = charY + 60;

    // 사각형 2의 경계
    const rect2Right = elementX + elementWidth + 30;
    const rect2Bottom = elementY + elementHeight + 30;

    // 겹침 여부를 확인하는 조건
    return !(
      rect1Right < elementX || // 사각형 1의 오른쪽이 사각형 2의 왼쪽보다 왼쪽에 위치
      rect1Bottom < elementY || // 사각형 1의 아래쪽이 사각형 2의 위쪽보다 위에 위치
      charX > rect2Right || // 사각형 1의 왼쪽이 사각형 2의 오른쪽보다 오른쪽에 위치
      charY > rect2Bottom
    ); // 사각형 1의 위쪽이 사각형 2의 아래쪽보다 아래에 위치
  };

  useEffect(() => {
    const cx = characterX - backgroundX;
    const cy = characterY - backgroundY;

    setIsNearPhoto(isNear(cx, cy, photoX, photoY, photoWidth, photoHeight));
    setIsNearPhotomap(
      isNear(cx, cy, photomapX, photomapY, photomapWidth, photomapHeight)
    );
    setIsNearGuestbook(
      isNear(cx, cy, guestbookX, guestbookY, guestbookWidth, guestbookHeight)
    );
    setIsNearRadio(isNear(cx, cy, radioX, radioY, radioWidth, radioHeight));
  }, [characterX, characterY, backgroundX, backgroundY]);

  const handleArrowKeyDown = (e) => {
    if (e.key === 'Enter' && !isChatting) {
      setIsChatting(true);
    }
    if ((e.key === 'Escape') & isChatting) {
      setIsChatting(false);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleArrowKeyDown);
    return () => {
      document.removeEventListener('keydown', handleArrowKeyDown);
    };
  }, [handleArrowKeyDown]);

  return (
    <div className='w-full h-full overflow-hidden'>
      <Stage width={width} height={height}>
        {/* 배경을 관리하는 Container */}
        <Container>
          <Sprite image={mapImages.map} x={backgroundX} y={backgroundY} />
        </Container>
        {/* 정적인 요소를 관리하는 Container */}
        <Container>
          <Sprite
            image={mapImages.photo}
            width={photoWidth}
            height={photoHeight}
            x={calculateStaticElementPosition().px}
            y={calculateStaticElementPosition().py}
            filters={isNearPhoto ? [outlineStyle] : []}
          />
          <Sprite
            image={mapImages.photomap}
            width={photomapWidth}
            height={photomapHeight}
            x={calculateStaticElementPosition().pmx}
            y={calculateStaticElementPosition().pmy}
            filters={isNearPhotomap ? [outlineStyle] : []}
          />
          <Sprite
            image={mapImages.guestbook}
            width={guestbookWidth}
            height={guestbookHeight}
            x={calculateStaticElementPosition().gx}
            y={calculateStaticElementPosition().gy}
            filters={isNearGuestbook ? [outlineStyle] : []}
          />
          <Sprite
            image={mapImages.radio}
            width={radioWidth}
            height={radioHeight}
            x={calculateStaticElementPosition().rx}
            y={calculateStaticElementPosition().ry}
            filters={isNearRadio ? [outlineStyle] : []}
          />
        </Container>
        {/* 캐릭터를 관리하는 Container */}
        <Container>
          <CharacterInMap
            width={width}
            height={height}
            nickname={nickname}
            costume={costume}
            stompClient={client}
            connected={connected}
            token={groupInfo.woomsInviteCode}
            setBackgroundX={setBackgroundX}
            setBackgroundY={setBackgroundY}
            backgroundX={backgroundX}
            backgroundY={backgroundY}
            isOpenPhoto={isOpenPhoto}
            isOpenPhotomap={isOpenPhotomap}
            isOpenGuestbook={isOpenGuestbook}
            isOpenRadioRead={isOpenRadioRead}
            isOpenRadioWrite={isOpenRadioWrite}
            setIsInteractive={setIsInteractive}
            setRadioReadInteractive={setRadioReadInteractive}
            setRadioWriteInteractive={setRadioWriteInteractive}
            setCharacterX={setCharacterX} // 캐릭터의 X 위치를 상위 컴포넌트로 전달
            setCharacterY={setCharacterY} // 캐릭터의 Y 위치를 상위 컴포넌트로 전달
            isChatting={isChatting}
          />
        </Container>
      </Stage>
      {isOpenPhoto && (
        <PhotoModal onClose={handleClosePhoto} woomsId={woomsId} />
      )}
      {isOpenPhotomap && (
        <PhotoHeatMap onClose={handleClosePhotomap} woomsId={woomsId} />
      )}
      {isOpenGuestbook && (
        <CommentModal onClose={handleCloseGuestbook} woomsId={woomsId} />
      )}
      {isOpenRadioRead && (
        <StoryReadModal onClose={handleCloseRadioRead} woomsId={woomsId} />
      )}
      {isOpenRadioWrite && (
        <StoryWriteModal onClose={handleCloseRadioWrite} woomsId={woomsId} />
      )}

      <ChatBox
        stompClient={client}
        connected={connected}
        nickname={nickname}
        token={groupInfo.woomsInviteCode}
        setIsChatting={setIsChatting}
        isChatting={isChatting}
      />
    </div>
  );
};

export default Map;
