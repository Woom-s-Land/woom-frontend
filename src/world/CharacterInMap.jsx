import { useState, useEffect, useCallback, useRef } from 'react';
import loadCharacterImages from '../utils/loadCharacterImages';
import collisions from '../assets/map/map_collisions';

import {
  initializeCollisionMap,
  initializeBoundaries,
} from '../utils/boundaryUtils';
import { flushSync } from 'react-dom';
import { Sprite, Container } from '@pixi/react';
import Nickname from './Nickname';

const Direction = {
  DOWN: 0,
  UP: 1,
  RIGHT: 2,
  LEFT: 3,
};

const MAP_WIDTH = 2048;
const MAP_HEIGHT = 1536;
const CHAR_WIDTH = 40; // 캐릭터 사이즈
const CHAR_HEIGHT = 60;
const MOVE_DISTANCE = 22; // 한 프레임별 움직일 거리
const FRAME_INTERVAL = 60; // 프레임이 전환될 간격
const STEP_COUNT = 6;

// #todo: 추후 캐릭터 코스튬, 닉네임 사용자 정보에 맞게 수정
const Character = ({
  width,
  height,
  setBackgroundX,
  setBackgroundY,
  backgroundX,
  backgroundY,
  isOpenPhoto,
  isOpenPhotomap,
  isOpenGuestbook,
  setCharacterX,
  setCharacterY,
  setIsInteractive,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(Direction.DOWN);
  const [directionImages, setDirectionImages] = useState({});
  const [charX, setCharX] = useState(width / 2);
  const [charY, setCharY] = useState(height / 2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [collision, setCollision] = useState([]);
  const [photoInteraction, setPhotoInteraction] = useState([]);
  const [photomapInteraction, setPhotomapInteraction] = useState([]);
  const [guestbookInteraction, setGuestbookInteraction] = useState([]);

  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const characterNumber = 1;

  const BoundaryWidth = 32;
  const BoundaryHeight = 32;

  useEffect(() => {
    const allImages = loadCharacterImages();
    const images = allImages[characterNumber];
    setDirectionImages(images);
  }, [characterNumber]);

  useEffect(() => {
    const collisionMap = initializeCollisionMap(collisions, 64);
    const coll = initializeBoundaries(
      collisionMap,
      BoundaryWidth,
      BoundaryHeight,
      29870
    );
    const coll2 = initializeBoundaries(
      collisionMap,
      BoundaryWidth,
      BoundaryHeight,
      93988
    );
    coll.push(...coll2);
    setCollision(coll);
  }, []);

  // 충돌 or 상호작용 여부 판정 함수
  const boundaryCollision = useCallback(
    (collisions, cx, cy, bx, by) => {
      return collisions.some((col) => {
        return (
          col.position.x + BoundaryWidth + bx >= cx + 16 &&
          col.position.y + BoundaryHeight + by >= cy + 35 &&
          cx + 40 >= col.position.x + bx &&
          cy + 40 >= col.position.y + by
        );
      });
    },
    [collision, photoInteraction, photomapInteraction, guestbookInteraction]
  );

  // 키 눌렀을 때 실행될 함수
  const handleArrowKeyDown = useCallback(
    (e) => {
      setIsInteractive(false);
      const ArrowKeys = {
        KeyW: { dir: Direction.UP },
        KeyS: { dir: Direction.DOWN },
        KeyD: { dir: Direction.RIGHT },
        KeyA: { dir: Direction.LEFT },
      };
      if (e.code === 'Space') {
        setIsInteractive(true);
      }
      const key = ArrowKeys[e.code];
      if (key && !isOpenPhoto && !isOpenPhotomap && !isOpenGuestbook) {
        setIsAnimating(true);
        if (direction !== key.dir) {
          setDirection(key.dir);
          setStepIndex(0);
        }
        if (!isAnimating) {
          setStepIndex(0);
          e.preventDefault();
        }
      }
    },
    [
      charX,
      charY,
      stepIndex,
      direction,
      isAnimating,
      isOpenPhoto,
      isOpenPhotomap,
      isOpenGuestbook,
    ]
  );

  // 키를 누르다 뗐을 때 실행할 함수
  // => 애니메이션을 중단하고 해당 방향 첫 프레임을 띄움
  const handleArrowKeyUp = useCallback(() => {
    setIsAnimating(false);
    setStepIndex(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleArrowKeyDown);
    document.addEventListener('keyup', handleArrowKeyUp);
    return () => {
      document.removeEventListener('keydown', handleArrowKeyDown);
      document.removeEventListener('keyup', handleArrowKeyUp);
    };
  }, [handleArrowKeyDown, handleArrowKeyUp]);

  // 애니메이션을 시작하거나 중단하는 함수
  useEffect(() => {
    if (isAnimating) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating, stepIndex, direction]);

  // 실제로 캐릭터가 맵의 어느 위치에 있는지 계산해주는 함수
  const getCharPos = (charX, charY, mapX, mapY) => {
    return [charX - mapX, charY - mapY];
  };

  const animate = (timestamp) => {
    if (!lastFrameTimeRef.current) {
      lastFrameTimeRef.current = timestamp;
    }
    const deltaTime = timestamp - lastFrameTimeRef.current;

    if (deltaTime > FRAME_INTERVAL) {
      setStepIndex((prev) => (prev + 1) % STEP_COUNT);

      let newX = charX;
      let newY = charY;
      let newBackgroundX = backgroundX;
      let newBackgroundY = backgroundY;
      // Center인지 확인하는 함수
      const isCenterX = () => charX == width / 2;
      const isCenterY = () => charY == height / 2;
      switch (direction) {
        case Direction.UP:
          if (newBackgroundY + MOVE_DISTANCE <= 0 && isCenterY()) {
            newBackgroundY += MOVE_DISTANCE;
          } else {
            newY -= MOVE_DISTANCE;
          }
          break;
        case Direction.DOWN:
          if (
            newBackgroundY - MOVE_DISTANCE >= -MAP_HEIGHT + height &&
            isCenterY()
          ) {
            newBackgroundY -= MOVE_DISTANCE;
          } else {
            newY += MOVE_DISTANCE;
          }
          break;
        case Direction.LEFT:
          if (newBackgroundX + MOVE_DISTANCE <= 0 && isCenterX()) {
            newBackgroundX += MOVE_DISTANCE;
          } else {
            newX -= MOVE_DISTANCE;
          }
          break;
        case Direction.RIGHT:
          if (
            newBackgroundX - MOVE_DISTANCE >= -MAP_WIDTH + width &&
            isCenterX()
          ) {
            newBackgroundX -= MOVE_DISTANCE;
          } else {
            newX += MOVE_DISTANCE;
          }
          break;
        default:
          break;
      }
      // 경계에 왔을 경우 카메라 고정
      if (newBackgroundX > 0) newBackgroundX = 0;
      if (newBackgroundX < -MAP_WIDTH + width)
        newBackgroundX = -MAP_WIDTH + width;
      if (newBackgroundY > 0) newBackgroundY = 0;
      if (newBackgroundY < -MAP_HEIGHT + height)
        newBackgroundY = -MAP_HEIGHT + height;

      if (
        !boundaryCollision(
          collision,
          newX,
          newY,
          newBackgroundX,
          newBackgroundY
        )
      ) {
        flushSync(() => {
          setCharX(newX);
          setCharY(newY);
          setCharacterX(newX);
          setCharacterY(newY);
          setBackgroundX(newBackgroundX);
          setBackgroundY(newBackgroundY);
        });
      } else {
        setIsAnimating(false);
      }

      lastFrameTimeRef.current = timestamp;
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <Container x={charX} y={charY}>
      {directionImages[direction] && directionImages[direction][stepIndex] && (
        <Sprite
          image={directionImages[direction][stepIndex]}
          x={0}
          y={0}
          width={CHAR_WIDTH}
          height={CHAR_HEIGHT}
        />
      )}
      <Nickname width={CHAR_WIDTH} height={CHAR_HEIGHT} text='브로콜리맨' />
    </Container>
  );
};

export default Character;
