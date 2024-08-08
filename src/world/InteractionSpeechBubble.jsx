import { Text, Graphics, Container } from '@pixi/react';
import * as PIXI from 'pixi.js';
import '../App.css';

const InteractionSpeechBubble = ({ width, height, text }) => {
  const textStyle = new PIXI.TextStyle({
    align: 'center',
    fill: 0xffffff,
    fontSize: 13,
    fontFamily: 'DungGeunMo',
  });
  const length = text.length;
  const padding = 10;
  const boxWidth = length * 12;
  const boxHeight = 30;
  console.log(textStyle);
  return (
    <>
      <Container x={width / 2} y={-boxHeight - padding}>
        <Graphics
          draw={(g) => {
            g.beginFill(0xb1805f);
            g.drawRoundedRect(
              -boxWidth / 2,
              -boxHeight / 2,
              boxWidth, // 너비
              boxHeight, // 높이
              15 // 둥글기
            );
            g.endFill();
          }}
        />
        <Graphics
          draw={(g) => {
            g.beginFill(0xb1805f);
            g.drawCircle(0, boxHeight - padding / 2, 5);
            g.endFill();
          }}
        />
        <Graphics
          draw={(g) => {
            g.beginFill(0xb1805f);
            g.drawCircle(0, boxHeight + padding / 2, 3);
            g.endFill();
          }}
        />
        <Text text={text} x={0} y={0} anchor={0.5} style={textStyle} />
      </Container>
    </>
  );
};

export default InteractionSpeechBubble;
