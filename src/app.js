const sharp = require('sharp');

const RGB_LENGTH = 3;

async function transform() {
  const { pixelArray, width, height } = await readRawPixels();
  const pixelMatrix = createPixelMatrix(pixelArray, width, height);
  const brightnessMatrix = extractBrightnessMatrix(pixelMatrix);
}

async function readRawPixels() {
  const { data, info } = await sharp('./src/.ignore/ascii-pineapple.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  console.log('Successfully loaded image!');
  console.log(`Width: ${width}, Height: ${height}.`);

  return {
    pixelArray: new Uint8ClampedArray(data.buffer),
    width: width,
    height: height,
  };
}

function createPixelMatrix(pixelArray, width, height) {
  const pixelMatrix = new Array(height);
  for (let i = 0; i < height; i++) {

    const pixelRow = new Array(width);
    const offset = i * width;

    for (let j = 0; j < width - RGB_LENGTH; j += RGB_LENGTH) {
      const pixelStartIndex = offset + j;
      const pixel = pixelArray.slice(pixelStartIndex, pixelStartIndex + RGB_LENGTH);
      pixelRow[j] = pixel;
    }

    pixelMatrix[i] = pixelRow;

  }

  return pixelMatrix;
}

function extractBrightnessMatrix(pixelMatrix) {
  console.log('Implement this brightness stuff');
  // TODO: Maybe map reduce in each pixel.
  return [[]];
}

transform();
