import React, { useState, useEffect } from 'react';
import WaterDrop from './WaterDrop'; // 경로에 맞게 수정

const waterDrops = [
  {
    x: 570,
    y: 983,
  },
  {
    x: 70,
    y: 50,
  },
  {
    x: 150,
    y: 100,
  },
  {
    x: 570,
    y: 80,
  },
  {
    x: 960,
    y: 30,
  },
  {
    x: 1150,
    y: 250,
  },
  {
    x: 1350,
    y: 60,
  },
  {
    x: 1570,
    y: 100,
  },
  {
    x: 1920,
    y: 127,
  },
  {
    x: 1890,
    y: 60,
  },
  {
    x: 1950,
    y: 70,
  },
  {
    x: 2000,
    y: 300,
  },
  {
    x: 1950,
    y: 430,
  },
  {
    x: 1988,
    y: 720,
  },
  {
    x: 1950,
    y: 800,
  },
  {
    x: 2010,
    y: 1020,
  },
  {
    x: 1930,
    y: 1300,
  },
  {
    x: 2000,
    y: 1450,
  },
  {
    x: 1900,
    y: 1400,
  },
  {
    x: 70,
    y: 1450,
  },
  {
    x: 550,
    y: 1435,
  },
  {
    x: 740,
    y: 1300,
  },
  {
    x: 960,
    y: 1438,
  },
  {
    x: 1150,
    y: 1480,
  },
  {
    x: 1350,
    y: 1460,
  },

  {
    x: 50,
    y: 750,
  },
  {
    x: 70,
    y: 860,
  },
  {
    x: 950,
    y: 460,
  },
  {
    x: 180,
    y: 1100,
  },
  {
    x: 20,
    y: 1200,
  },
  {
    x: 50,
    y: 750,
  },
  {
    x: 120,
    y: 300,
  },
  {
    x: 800,
    y: 833,
  },
];

const RandomWaterDrops = ({ backgroundX, backgroundY }) => {
  const [visibleDrops, setVisibleDrops] = useState([]);
  const getRandomDelay = () => Math.random() * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      const newVisibleDrops = waterDrops.filter(() => Math.random() > 0.5);
      setVisibleDrops(newVisibleDrops);
    }, getRandomDelay());

    return () => clearInterval(interval);
  }, [waterDrops]);

  return (
    <>
      {visibleDrops.map((drop, index) => (
        <WaterDrop
          key={index}
          x={drop.x + backgroundX}
          y={drop.y + backgroundY}
          delay={getRandomDelay() * 10}
        />
      ))}
    </>
  );
};

export default RandomWaterDrops;
