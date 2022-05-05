const { RGB_LENGTH } = require('./constants');

module.exports = { averagePixelFilter, lightnessPixelFilter, luminosityPixelFilter };

function averagePixelFilter(pixel) {
  const sum = pixel.reduce((acc, val) => acc + val);
  return Math.round(sum / RGB_LENGTH);
}

function lightnessPixelFilter(pixel) {
  return (Math.max(pixel) + Math.min(pixel)) / 2;
}

function luminosityPixelFilter(pixel) {
  return 0.21 * pixel[0] + 0.72 * pixel[1] + 0.07 * pixel[2];
}
