import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES6 모듈의 __dirname과 __filename 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'src/assets'); // 이미지가 저장된 경로
const outputFile = path.join(__dirname, 'src/characterImages.js'); // 자동으로 생성될 파일 경로

// 프레임 번호를 인덱스로 변환하는 매핑
const frameMap = new Map([
  [1, 0],
  [2, 1],
  [4, 2],
  [5, 3],
  [6, 4],
  [8, 5],
]);

// 방향을 숫자로 매핑하는 객체
const directionMap = {
  d: 0,
  u: 1,
  r: 2,
  l: 3,
};

// 이미지 파일을 import할 수 있는 변수명으로 변환
const toVariableName = (filePath) => {
  // 파일 경로에서 슬래시와 특수문자를 변환
  const [character, fileName] = filePath.split('/');
  const [direction, frameNumber] = fileName.replace('.png', '').split('');

  // c + costume_directionframeNumber 형식으로 변환
  let variableName = `c${character}_${direction}${frameNumber}`;

  return variableName;
};

function getImageImports(dir) {
  let imports = '';
  let allImages = {};

  function walkDir(currentDirPath) {
    const files = fs.readdirSync(currentDirPath);

    files.forEach((file) => {
      const filePath = path.join(currentDirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        // 폴더 이름이 0부터 11까지인지 확인
        if (/^[0-9]$|^[1][0-1]$/.test(file)) {
          allImages[file] = Array.from({ length: 4 }, () => []); // 각 방향에 대한 빈 배열 생성
          walkDir(filePath);
        }
      } else if (path.extname(file) === '.png') {
        // 경로에서 파일 이름과 확장자를 제거
        const relativePath = path
          .relative(imagesDir, filePath)
          .replace(/\\/g, '/');
        const [character, fileName] = relativePath.split('/');
        const [direction, frameNumber] = fileName.replace('.png', '').split('');

        const directionIndex = directionMap[direction];
        if (directionIndex === undefined) return;

        const stepIndex = frameMap.get(parseInt(frameNumber, 10));
        if (stepIndex === undefined) return;

        // 경로를 변수명으로 변환
        const variableName = toVariableName(relativePath);
        const importPath = `./assets/${relativePath}`;

        // Generate import statement
        imports += `import ${variableName} from '${importPath}';\n`;

        // Initialize the direction array if necessary
        if (!allImages[character]) {
          allImages[character] = Array.from({ length: 4 }, () => []);
        }

        // Ensure the direction array exists
        if (!allImages[character][directionIndex]) {
          allImages[character][directionIndex] = [];
        }

        // Add variable name to the appropriate stepIndex
        allImages[character][directionIndex][stepIndex] = variableName;
      }
    });
  }

  walkDir(dir);

  // ES6 모듈 형식으로 변환된 객체를 문자열로 생성
  const content = `
${imports}

// Create a function to return the allImages object with variable names
const createAllImages = () => {
  return ${JSON.stringify(allImages, null, 2).replace(/"(\w+)"/g, '$1')};
};

const allImages = createAllImages();

export default allImages;
  `;

  fs.writeFileSync(outputFile, content);
  console.log(`Generated ${outputFile}`);
}

getImageImports(imagesDir);
