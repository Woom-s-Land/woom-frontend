export const initializeCollisionMap = (collisions, length) => {
  let tempCollisionMap = [];
  for (let i = 0; i < collisions.length; i += length) {
    tempCollisionMap.push(collisions.slice(i, i + length));
  }
  return tempCollisionMap;
};

export const initializeBoundaries = (
  collisionMap,
  BoundaryWidth,
  BoundaryHeight,
  number
) => {
  let tempBoundaries = [];
  collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === number) {
        tempBoundaries.push({
          position: {
            x: j * BoundaryWidth,
            y: i * BoundaryHeight,
          },
          width: BoundaryWidth,
          height: BoundaryHeight,
        });
      }
    });
  });
  return tempBoundaries;
};
