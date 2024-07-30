import { useState, useEffect, useCallback, useRef } from 'react';
import CharacterImages from './characterImages';
import mapImages from './mapImages';
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
const SIZE = 60; // 캐릭터 사이즈 60*60
const MOVE_DISTANCE = 7; // 한 프레임별 움직일 거리
const FRAME_INTERVAL = 60; // 프레임이 전환될 간격
const STEP_COUNT = 6;

// #todo: 추후 캐릭터 코스튬, 닉네임 사용자 정보에 맞게 수정
const directionImages = {
  [Direction.UP]: [
    CharacterImages.char_1u1,
    CharacterImages.char_1u2,
    CharacterImages.char_1u4,
    CharacterImages.char_1u5,
    CharacterImages.char_1u6,
    CharacterImages.char_1u8,
  ],
  [Direction.DOWN]: [
    CharacterImages.char_1d1,
    CharacterImages.char_1d2,
    CharacterImages.char_1d4,
    CharacterImages.char_1d5,
    CharacterImages.char_1d6,
    CharacterImages.char_1d8,
  ],
  [Direction.RIGHT]: [
    CharacterImages.char_1r1,
    CharacterImages.char_1r2,
    CharacterImages.char_1r4,
    CharacterImages.char_1r5,
    CharacterImages.char_1r6,
    CharacterImages.char_1r8,
  ],
  [Direction.LEFT]: [
    CharacterImages.char_1l1,
    CharacterImages.char_1l2,
    CharacterImages.char_1l4,
    CharacterImages.char_1l5,
    CharacterImages.char_1l6,
    CharacterImages.char_1l8,
  ],
};

const Character = ({
  width,
  height,
  setBackgroundX,
  setBackgroundY,
  backgroundX,
  backgroundY,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(Direction.DOWN);
  const [charX, setCharX] = useState(width / 2);
  const [charY, setCharY] = useState(height / 2);
  const [isStopX, setIsStopX] = useState(0);
  const [isStopY, setIsStopY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [collision, setCollision] = useState([]);

  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  const BoundaryWidth = 32;
  const BoundaryHeight = 32;

  useEffect(() => {
    const collisionMap = initializeCollisionMap(collisions, 64);
    setCollision(
      initializeBoundaries(collisionMap, BoundaryWidth, BoundaryHeight, 29870)
    );
  }, []);

  // 충돌 or 상호작용 여부 판정 함수
  const boundaryCollision = useCallback(
    (cx, cy, bx, by) => {
      return collision.some((col) => {
        return (
          col.position.x + BoundaryWidth + bx >= cx + 16 &&
          col.position.y + BoundaryHeight + by >= cy + 35 &&
          cx + 40 >= col.position.x + bx &&
          cy + 40 >= col.position.y + by
        );
      });
    },
    [collision]
  );

  // 키 눌렀을 때 실행될 함수
  const handleArrowKeyDown = useCallback(
    (e) => {
      const ArrowKeys = {
        KeyW: { dir: Direction.UP },
        KeyS: { dir: Direction.DOWN },
        KeyD: { dir: Direction.RIGHT },
        KeyA: { dir: Direction.LEFT },
      };

      const key = ArrowKeys[e.code];
      if (key) {
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
    [charX, charY, stepIndex, direction, isAnimating]
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

  const updateBackgroundPosition = (positionUpdater) => {
    flushSync(() => {
      positionUpdater();
    });
  };

  const updateCharacterPosition = (newCharX, newCharY) => {
    setCharX(newCharX);
    setCharY(newCharY);
  };

  const animate = (timestamp) => {
    if (!lastFrameTimeRef.current) {
      lastFrameTimeRef.current = timestamp;
    }
    const deltaTime = timestamp - lastFrameTimeRef.current;

    if (deltaTime > FRAME_INTERVAL) {
      setStepIndex((prev) => (prev + 1) % 6);

      let newX = charX;
      let newY = charY;
      let newBackgroundX = backgroundX;
      let newBackgroundY = backgroundY;
      let collisionDetected = false;

      switch (direction) {
        case Direction.UP:
          if (isStopY !== 0) {
            newY -= MOVE_DISTANCE;
            if (newY <= height / 2) setIsStopY(0);
          } else {
            newBackgroundY = backgroundY + MOVE_DISTANCE;
            if (newBackgroundY >= 0) {
              setIsStopY(-1);
              newBackgroundY = 0;
            }
          }
          break;
        case Direction.DOWN:
          console.log('DOWN');
          if (isStopY !== 0) {
            newY += MOVE_DISTANCE;
            if (newY >= height / 2) setIsStopY(0);
          } else {
            newBackgroundY = backgroundY - MOVE_DISTANCE;
            if (newBackgroundY <= height - MAP_HEIGHT) {
              if (isStopY !== 1) setIsStopY(1);
              newBackgroundY = height - MAP_HEIGHT;
            }
          }
          break;
        case Direction.LEFT:
          if (isStopX !== 0) {
            newX -= MOVE_DISTANCE;
            if (newX <= width / 2) setIsStopX(0);
          } else {
            newBackgroundX = backgroundX + MOVE_DISTANCE;
            if (newBackgroundX > 0) {
              setIsStopX(-1);
              newBackgroundX = 0;
            }
          }
          break;
        case Direction.RIGHT:
          if (isStopX !== 0) {
            newX += MOVE_DISTANCE;
            if (newX >= width / 2) setIsStopX(0);
          } else {
            newBackgroundX = backgroundX - MOVE_DISTANCE;
            if (newBackgroundX <= width - MAP_WIDTH) {
              setIsStopX(1);
              newBackgroundX = width - MAP_WIDTH;
            }
          }
          break;
        default:
          break;
      }

      if (!boundaryCollision(newX, newY, newBackgroundX, newBackgroundY)) {
        flushSync(() => {
          setCharX(newX);
          setCharY(newY);
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
      <Sprite
        image={directionImages[direction][stepIndex]}
        x={0}
        y={0}
        width={60}
        height={60}
      />
      <Nickname width={60} height={60} text='브로콜리맨' />
    </Container>
  );
};

export default Character;
