import { Text, Graphics } from '@pixi/react';
import * as PIXI from 'pixi.js';
import '../App.css';

const InteractionSpeechBubble = ({ width, height, text }) => {
  const textStyle = new PIXI.TextStyle({
    align: 'center',
    fill: '#ffffff', // # todo: 폰트 색상 적용 안 됨 확인
    fontSize: 11,
    fontFamily: 'DungGeunMo',
  });
  return (
    <>
      <Graphics
        draw={(g) => {
          g.beginFill(0xb1805f);
          g.drawRoundedRect(-(width / 2), height - 105, width * 2.1, 30, 20);
          g.lineStyle(3, 0xe7ca88, 1);
          g.endFill();
        }}
      />
      <Graphics
        draw={(g) => {
          g.beginFill(0xb1805f);
          g.drawCircle(width - 32, height - 66, 5);
          g.lineStyle(1, 0xe7ca88, 1);
          g.endFill();
        }}
      />
      <Graphics
        draw={(g) => {
          g.beginFill(0xb1805f);
          g.drawCircle(width - 32, height - 55, 3);
          g.lineStyle(1, 0xe7ca88, 1);
          g.endFill();
        }}
      />
      <Text
        text={text}
        x={width / 2 + 2}
        y={height - 90}
        anchor={0.5}
        style={textStyle}
      />
    </>
  );
};

export default InteractionSpeechBubble;
