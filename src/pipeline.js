const sharp = require('sharp');

const { RGB_LENGTH } = require('./constants');
const { averagePixelFilter } = require('./pixelFilters');
const { brightnessConversion } = require('./brightnessConversions');
const { getResizeValues } = require('./utils');

module.exports = { transform };

async function transform(imagePath, options) {
  const { pixelArray, width, height } = await readRawPixels(imagePath, options.screenResolution);
  const pixelMatrix = createPixelMatrix(pixelArray, width, height);
  const brightnessMatrix = extractBrightnessMatrix(pixelMatrix, averagePixelFilter);
  const asciiMatrix = convertToASCIIMatrix(brightnessMatrix, brightnessConversion);
  printASCIIMatrix(asciiMatrix);
}

async function readRawPixels(imagePath, screenResolution) {
  const originalImage = sharp(imagePath);
  const resizedImage = await resizeImage(originalImage, screenResolution);

  const { data, info } = await resizedImage.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  return {
    pixelArray: new Uint8ClampedArray(data.buffer),
    width: width,
    height: height,
  };
}

async function resizeImage(image, screenResolution) {
  const { width: originalWidth, height: originalHeight } = await image.metadata();
  const [targetWidth, targetHeight] = getResizeValues(screenResolution);
  const width = originalWidth > targetWidth ? targetWidth : originalWidth;
  const height = originalHeight > targetHeight ? targetHeight : originalHeight;

  if (width !== originalWidth || height !== originalHeight) {
    return image.resize(width, height);
  }

  return image;
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
    brightnessMatrix[i] = pixelMatrix[i].map((pixel) => Math.round(pixelFilter(pixel)));
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
