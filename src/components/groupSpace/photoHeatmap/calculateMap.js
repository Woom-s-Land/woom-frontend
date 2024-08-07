const latitudeMin = 34.396655936741276;
const latitudeMax = 38.60794481319153;
const longitudeMin = 126.11412825247619;
const longitudeMax = 129.59768321236191;

const noIsland = [
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
];

/* latitude: 위도(남/북), longitude: 경도(동/서),  */
const koreaMap = [];
let num = 1;
const calcPixelMap = (
  latitudeMin,
  latitudeMax,
  longitudeMin,
  longitudeMax,
  map
) => {
  const width = (longitudeMax - longitudeMin) / map[0].length;
  const height = (latitudeMax - latitudeMin) / map.length;
  map.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1) {
        koreaMap.push({
          num: num++,
          x: longitudeMin + j * width,
          y: latitudeMax - i * height,
          width: width,
          height: height,
        });
      }
    });
  });
};
const jlatitudeMin = 33.23665733736817;
const jlatitudeMax = 33.551080692239765;
const jlongitudeMin = 126.14563782744108;
const jlongitudeMax = 127.01665183761314;

const jeju = [
  [0, 1, 1, 1],
  [1, 1, 1, 0],
];

calcPixelMap(latitudeMin, latitudeMax, longitudeMin, longitudeMax, noIsland);
calcPixelMap(jlatitudeMin, jlatitudeMax, jlongitudeMin, jlongitudeMax, jeju);

koreaMap.push({
  num: num++,
  x: 130.79392164435012,
  y: 37.446270677822945,
  width: 0.1279745605966,
  height: 0.11,
});
koreaMap.push({
  num: num++,
  x: 131.86123140470642,
  y: 37.237605662375216,
  width: 0.0111381267221,
  height: 0.00956860960823,
});

console.log(JSON.stringify(koreaMap));

export default koreaMap;
