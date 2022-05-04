const sharp = require('sharp');

const { RGB_LENGTH } = require('./constants');
const { averagePixelFilter } = require('./pixelFilters');
const { brightnessConversion } = require('./brightnessConversions');

async function transform() {
  const { pixelArray, width, height } = await readRawPixels();
  const pixelMatrix = createPixelMatrix(pixelArray, width, height);
  const brightnessMatrix = extractBrightnessMatrix(pixelMatrix, averagePixelFilter);
  const asciiMatrix = convertToASCIIMatrix(brightnessMatrix, brightnessConversion);
  printASCIIMatrix(asciiMatrix);
}

async function readRawPixels() {
  const { data, info } = await sharp('./src/.ignore/ascii-pineapple.jpg')
    .resize(620, 320)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;

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

  return pixelMatrix;
}

function extractBrightnessMatrix(pixelMatrix, pixelFilter) {
  const height = pixelMatrix.length;
  const brightnessMatrix = new Array(height);

  for (let i = 0; i < height; i++) {
    brightnessMatrix[i] = pixelMatrix[i].map((pixel) => pixelFilter(pixel));
  }

  return brightnessMatrix;
}

function convertToASCIIMatrix(brightnessMatrix, brightnessConversion) {
  const height = brightnessMatrix.length;
  const asciiMatrix = new Array(height);

  for (let i = 0; i < height; i++) {
    asciiMatrix[i] = brightnessMatrix[i].map((brightness) => brightnessConversion(brightness));
  }

  return asciiMatrix;
}

function printASCIIMatrix(asciiMatrix) {
  console.clear();

  const height = asciiMatrix.length;
  const width = asciiMatrix[0].length;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const char = asciiMatrix[i][j];
      process.stdout.write(`${char}${char}${char}`);
    }
    process.stdout.write('\n');
  }
}

transform();
