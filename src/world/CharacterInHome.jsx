import { useState, useEffect, useCallback, useRef } from 'react';
import CharacterImages from './characterImages';
import homeImages from './homeImages';
import collisions from '../assets/home/home-collisions';
import interactions from '../assets/home/home-interactions';
import { Sprite, Container } from '@pixi/react';
import {
  initializeCollisionMap,
  initializeBoundaries,
} from '../utils/boundaryUtils';
import Nickname from './Nickname';
import InteractionSpeechBubble from './InteractionSpeechBubble';

const Direction = {
  DOWN: 0,
  UP: 1,
  RIGHT: 2,
  LEFT: 3,
};

const MAP_X = 488;
const MAP_Y = 384;
const SIZE = 60; // 캐릭터 사이즈 60*60
const BoundaryWidth = 8; // 충돌박스의 너비
const BoundaryHeight = 8;
const MOVE_DISTANCE = 7; // 한 프레임별 움직일 거리
const FRAME_INTERVAL = 60; // 프레임이 전환될 간격

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

// todo: 하드 코딩 된 것들 수정
const Character = ({ setBackground }) => {
  const [boundaries, setBoundaries] = useState([]);
  const [bedInteraction, setBedInteraction] = useState([]);
  const [deskInteraction, setDeskInteraction] = useState([]);
  const [toiletInteraction, setToiletInteraction] = useState([]);
  const [isNearBed, setIsNearBed] = useState(false);
  const [isNearDesk, setIsNearDesk] = useState(false);
  const [isNearToilet, setIsNearToilet] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(Direction.DOWN);
  const [charX, setCharX] = useState(270);
  const [charY, setCharY] = useState(40);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInteractionBed, setIsInteractionBed] = useState(false);
  const [isInteractionToilet, setIsInteractionToilet] = useState(false);
  const [writeLetter, setWriteLetter] = useState(false);
  const [readLetter, setReadLetter] = useState(false);

  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  // 경계 맵 생성
  useEffect(() => {
    const collisionMap = initializeCollisionMap(collisions, 61);
    const bedInteractionMap = initializeCollisionMap(interactions, 61);
    setBoundaries(
      initializeBoundaries(collisionMap, BoundaryWidth, BoundaryHeight, 15)
    );
    setBedInteraction(
      initializeBoundaries(bedInteractionMap, BoundaryWidth, BoundaryHeight, 21)
    );
    setDeskInteraction(
      initializeBoundaries(bedInteractionMap, BoundaryWidth, BoundaryHeight, 19)
    );
    setToiletInteraction(
      initializeBoundaries(bedInteractionMap, BoundaryWidth, BoundaryHeight, 17)
    );
  }, []);

  // 충돌 or 상호작용 여부 판정 함수
  const boundaryCollision = useCallback((boundary, x, y) => {
    return boundary.some((col) => {
      return (
        col.position.x + BoundaryWidth >= x + 16 &&
        col.position.y + BoundaryHeight >= y + 35 &&
        x + 40 >= col.position.x &&
        y + 40 >= col.position.y
      );
    });
  }, []);

  // 키 눌렀을 때 실행될 함수
  const handleArrowKeyDown = useCallback(
    (e) => {
      setIsAnimating(true);
      const ArrowKeys = {
        KeyW: { dir: Direction.UP, isMoveable: () => charY - 16 > 0 },
        KeyS: {
          dir: Direction.DOWN,
          isMoveable: () => charY + 24 < MAP_Y - SIZE,
        },
        KeyD: {
          dir: Direction.RIGHT,
          isMoveable: () => charX + 16 < MAP_X - SIZE,
        },
        KeyA: { dir: Direction.LEFT, isMoveable: () => charX + 16 > 0 },
        Space: { dir: direction, isMoveable: () => isNearBed || isNearToilet },
        KeyE: { dir: direction, isMoveable: () => isNearDesk },
        KeyR: { dir: direction, isMoveable: () => isNearDesk },
      };

      const key = ArrowKeys[e.code];
      if (key) {
        if (e.code === 'KeyE' && key.isMoveable()) {
          // # todo: 편지 모달 만들어지면 timeout 안 하기
          setWriteLetter(true);
          setTimeout(() => {
            setWriteLetter(false);
          }, 1000);
        } else if (e.code === 'KeyR' && key.isMoveable()) {
          setReadLetter(true);
          setTimeout(() => {
            setReadLetter(false);
          }, 1000);
        } else if (e.code === 'Space' && key.isMoveable()) {
          if (isNearBed) {
            setIsInteractionBed(true);
            setTimeout(() => {
              setIsInteractionBed(false);
            }, 1500);
          } else {
            setIsInteractionToilet(true);

            setTimeout(() => {
              setIsInteractionToilet(false);
            }, 1500);
          }
        }
        if (direction !== key.dir) {
          setDirection(key.dir);
          setStepIndex(0);
        }
        if (!key.isMoveable()) {
          setIsAnimating(false);
        } else if (!isAnimating) {
          setStepIndex(0);
          e.preventDefault();
        }
      }
    },
    [charX, charY, direction, isAnimating]
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

  const animate = (timestamp) => {
    if (!lastFrameTimeRef.current) {
      lastFrameTimeRef.current = timestamp;
    }
    const deltaTime = timestamp - lastFrameTimeRef.current;

    if (deltaTime > FRAME_INTERVAL) {
      setStepIndex((prev) => (prev + 1) % 6);

      let newX = charX;
      let newY = charY;
      let collisionDetected = false;

      switch (direction) {
        case Direction.UP:
          newY = charY - MOVE_DISTANCE;
          collisionDetected = boundaryCollision(boundaries, newX, newY);
          setIsNearBed(boundaryCollision(bedInteraction, newX, newY));
          setIsNearDesk(boundaryCollision(deskInteraction, newX, newY));
          setIsNearToilet(boundaryCollision(toiletInteraction, newX, newY));
          break;
        case Direction.DOWN:
          newY = charY + MOVE_DISTANCE;
          collisionDetected = boundaryCollision(boundaries, newX, newY);
          setIsNearBed(boundaryCollision(bedInteraction, newX, newY));
          setIsNearDesk(boundaryCollision(deskInteraction, newX, newY));
          setIsNearToilet(boundaryCollision(toiletInteraction, newX, newY));
          break;
        case Direction.LEFT:
          newX = charX - MOVE_DISTANCE;
          collisionDetected = boundaryCollision(boundaries, newX, newY);
          setIsNearBed(boundaryCollision(bedInteraction, newX, newY));
          setIsNearDesk(boundaryCollision(deskInteraction, newX, newY));
          setIsNearToilet(boundaryCollision(toiletInteraction, newX, newY));
          break;
        case Direction.RIGHT:
          newX = charX + MOVE_DISTANCE;
          collisionDetected = boundaryCollision(boundaries, newX, newY);
          setIsNearBed(boundaryCollision(bedInteraction, newX, newY));
          setIsNearDesk(boundaryCollision(deskInteraction, newX, newY));
          setIsNearToilet(boundaryCollision(toiletInteraction, newX, newY));
          break;
        default:
          break;
      }
      if (!collisionDetected) {
        setCharX(newX);
        setCharY(newY);
      } else {
        setIsAnimating(false);
      }
      if (isNearBed) {
        setBackground(homeImages.nearBed);
      } else if (isNearDesk) {
        setBackground(homeImages.nearDesk);
      } else if (isNearToilet) {
        setBackground(homeImages.nearToilet);
      } else setBackground(homeImages.home);

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
      {isInteractionBed && (
        <InteractionSpeechBubble
          width={60}
          height={60}
          text='아직은 잠이 오지 않아'
        />
      )}
      {isInteractionToilet && (
        <InteractionSpeechBubble width={60} height={60} text='끄응...' />
      )}
    </Container>
  );
};

export default Character;
