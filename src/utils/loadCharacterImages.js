const directionMap = {
  d: 0, // DOWN
  u: 1, // UP
  r: 2, // RIGHT
  l: 3, // LEFT
};

const loadCharacterImages = () => {
  const allImages = {};

  // Vite의 import.meta.glob을 사용하여 동적으로 파일을 로드합니다.
  const context = import.meta.glob('../assets/{0..11}/*.png', { eager: true });

  // 프레임 번호를 순서대로 배열의 인덱스로 변환하기 위한 맵을 생성합니다.
  const frameMap = new Map(
    [1, 2, 4, 5, 6, 8].map((frame, index) => [frame, index])
  );

  Object.keys(context).forEach((key) => {
    // 파일 경로에서 상대 경로와 확장자를 제거하여 필요한 부분만 추출합니다.
    const path = key.replace('../assets/', '').replace('.png', '');

    // 경로를 '/'로 분리하여 캐릭터 번호와 나머지 정보를 추출합니다.
    const [characterNumber, ...rest] = path.split('/');
    const [direction, frame] = rest[0].split('');

    // 캐릭터 번호가 존재하지 않는 경우 새로 초기화합니다.
    if (!allImages[characterNumber]) {
      allImages[characterNumber] = {};
    }

    // 방향을 숫자로 변환합니다.
    const directionIndex = directionMap[direction];
    if (directionIndex === undefined) {
      return;
    }

    // 방향에 대한 배열이 존재하지 않는 경우 새로 초기화합니다.
    if (!allImages[characterNumber][directionIndex]) {
      allImages[characterNumber][directionIndex] = [];
    }

    // 프레임 번호를 정수로 변환합니다.
    const frameNumber = parseInt(frame, 10);
    const index = frameMap.get(frameNumber);

    if (index !== undefined) {
      allImages[characterNumber][directionIndex][index] = context[key].default;
    }
  });

  return allImages;
};

export default loadCharacterImages;
