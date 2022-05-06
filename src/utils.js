const {
  resolutionStrValidator,
  screenWidthValidator,
  screenHeightValidator,
} = require('./validators');

module.exports = { getResizeValues };

function getResizeValues(resolution) {
  const { error } = resolutionStrValidator.validate(resolution);
  if (error) {
    throw new InvalidResolutionError(error);
  }

  const [screenWidth, screenHeigth] = parseResolution(resolution);
  return [mapPixelSize(screenWidth), mapPixelSize(screenHeigth)];
}

function parseResolution(resolution) {
  const [screenWidth, screenHeight] = resolution.split('x').map((res) => parseInt(res));

  const { error: screenWidthError } = screenWidthValidator.validate(screenWidth);
  const { error: screenHeightError } = screenHeightValidator.validate(screenHeight);

  if (screenWidthError || screenHeightError) {
    throw new InvalidResolutionError(screenWidthError || screenHeightError);
  }

  return [screenWidth, screenHeight];
}

const m = (620 - 320) / (1920 - 1080);
const b = 620 - m * 1920;

/**
 * Return the pixel size the image should be resized to based on the screen resolution given.
 * @param {number} sizeOfScreenSide Size of either sides of the screen.
 * @returns Integer with the pixel size the image should be resized to.
 */
function mapPixelSize(sizeOfScreenSide) {
  // Calculated based on the assumption that a screen with resolution 1920x1080 maps to
  // 620x320 pixels.
  return Math.round(sizeOfScreenSide * m + b);
}

class InvalidResolutionError extends Error {
  constructor(errMsg) {
    super(`Invalid resolution: ${errMsg}`);
  }
};
