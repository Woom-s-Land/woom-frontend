import { Text, Graphics, Container } from '@pixi/react';
import * as PIXI from 'pixi.js';

const Nickname = ({ width, height, text }) => {
  const length = text.length;
  const padding = 10; // 배경과 텍스트 간의 여백
  const boxWidth = length * 12; // 배경 박스의 너비
  const boxHeight = 15; // 배경 박스의 높이

  return (
    <Container x={width / 2} y={height + padding}>
      <Graphics
        draw={(g) => {
          g.beginFill(0xffffff);
          // 배경 박스의 중앙 정렬 및 크기 조정
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
            fill: '#000000',
            fontSize: 9,
            fontFamily: 'DungGeunMo',
          })
        }
      />
    </Container>
  );
};

export default Nickname;
