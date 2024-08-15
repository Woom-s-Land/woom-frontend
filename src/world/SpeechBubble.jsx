import { memo, useState, useEffect } from 'react';
import { Text, Graphics, Container } from '@pixi/react';
import * as PIXI from 'pixi.js';

const SpeechBubble = memo(({ width, height, text }) => {
  const length = text.length;
  const padding = 80; // 배경과 텍스트 간의 여백
  const boxWidth = length * 12 + 10; // 배경 박스의 너비
  const boxHeight = 25; // 배경 박스의 높이
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (text) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [text]);

  if (!isVisible) return null;

  return (
    <Container x={width / 2} y={height - padding}>
      <Graphics
        draw={(g) => {
          g.clear(); // 이전 그래픽 지우기
          g.beginFill(0x000000, 0.5);

          g.drawRoundedRect(
            -boxWidth / 2, // X 좌표: 배경 박스 중앙이 x=0에 위치하도록
            -boxHeight / 2, // Y 좌표: 배경 박스 중앙이 y=0에 위치하도록
            boxWidth, // 너비
            boxHeight, // 높이
            15 // 둥글기
          );
          g.endFill();
        }}
      />

      <Text
        text={text}
        x={0}
        y={0}
        anchor={0.5}
        style={
          new PIXI.TextStyle({
            fill: '#ffffff',
            fontSize: 11,
            fontFamily: 'DungGeunMo',
          })
        }
      />
    </Container>
  );
});

export default SpeechBubble;
