module.exports = { getResizeValues };

function getResizeValues(resolution) {
  if (typeof resolution !== 'string' || !resolution.includes('x')) {
    throwInvalidResolution();
  }

  const [screenWidth, screenHeigth] = resolution.split('x').map((res) => parseInt(res));
  if (isNaN(screenWidth) || isNaN(screenHeigth)) {
    throwInvalidResolution();
  }

  try {
    return [getPixelSize(screenWidth), getPixelSize(screenHeigth)];
  } catch (err) {
    throwInvalidResolution(err);
  }

  function throwInvalidResolution(errMsg) {
    const invalidResolutionMsg = `Invalid resolution: ${resolution}`;
    if (errMsg) {
      throw new Error(`${invalidResolutionMsg}: ${errMsg}`);
    }

    throw new Error(invalidResolutionMsg);
  }
}

/**
 * Return the pixel size the image should be resized to based on the screen resolution given.
 * @param {*} resolution Size of either sides of the screen.
 * @returns Integer with the pixel size the image should be resized to.
 */
function getPixelSize(resolution) {
  // Calculated based on the assumption that a screen with resolution 1920x1080 maps to
  // 620x320 pixels.
  const m = (620 - 320) / (1920 - 1080);
  const b = 620 - m * 1920;
  return Math.round(resolution * m + b);
}
