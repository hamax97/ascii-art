const sharp = require('sharp');

const RGB_LENGTH = 3;

async function transform() {
  const { pixelArray, width, height } = await readRawPixels();
  const pixelMatrix = createPixelMatrix(pixelArray, width, height);
  const brightnessMatrix = extractBrightnessMatrix(pixelMatrix, averagePixelFilter);
  const asciiMatrix = convertToASCIICharacters(brightnessMatrix);
}

async function readRawPixels() {
  const { data, info } = await sharp('./src/.ignore/ascii-pineapple.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  console.log('Successfully loaded image!');
  console.log(`Width: ${width}, Height: ${height}`);

  return {
    pixelArray: new Uint8ClampedArray(data.buffer),
    width: width,
    height: height,
  };
}

function createPixelMatrix(pixelArray, width, height) {
  const pixelMatrix = new Array(height);
  for (let i = 0; i < height; i++) {

    pixelMatrix[i] = new Array();
    const pixelsPerRow = width * RGB_LENGTH;
    const rowOffset = i * pixelsPerRow;

    for (let j = 0; j < pixelsPerRow; j += RGB_LENGTH) {
      const pixelStartIndex = rowOffset + j;
      const pixel = pixelArray.slice(pixelStartIndex, pixelStartIndex + RGB_LENGTH);
      pixelMatrix[i].push(pixel);
    }
  }

  console.log('Successfully created pixel matrix!');
  console.log(`Columns: ${pixelMatrix[0].length}, Rows: ${pixelMatrix.length}`);

  return pixelMatrix;
}

function averagePixelFilter(pixel) {
  const sum = pixel.reduce((acc, val) => acc + val);
  return sum / RGB_LENGTH;
}

function lightnessPixelFilter(pixel) {
  return (Math.max(pixel) + Math.min(pixel)) / 2;
}

function luminosityPixelFilter(pixel) {
  return 0.21 * pixel[0] + 0.72 * pixel[1] + 0.07 * pixel[2];
}

function extractBrightnessMatrix(pixelMatrix, pixelFilter) {
  const height = pixelMatrix.length;
  const brightnessMatrix = new Array(height);

  for (let i = 0; i < height; i++) {
    brightnessMatrix[i] = pixelMatrix[i].map(pixel => pixelFilter(pixel));
  }

  console.log('Successfully created brightness matrix!');
  console.log(`Columns: ${brightnessMatrix[0].length}, Rows: ${brightnessMatrix.length}`);

  return brightnessMatrix;
}

function convertToASCIICharacters(brightnessMatrix) {
  console.log('Implement conversion stuff!!');
  return [[]];
}

transform();
