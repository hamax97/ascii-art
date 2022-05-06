const { uint8Validator } = require('./validators');

const asciiArray = '`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
const brightnessNumValues = 256;
const asciiMapFactor = brightnessNumValues / asciiArray.length;

module.exports = { brightnessConversion };

function brightnessConversion(brightness) {
  const { error } = uint8Validator.validate(brightness);
  if (error) {
    throw new Error(`Invalid brightness ${brightness}`);
  }

  if (brightness === 0) {
    return asciiArray[brightness];
  } else if (brightness === 255) {
    return asciiArray[asciiArray.length - 1];
  }

  return asciiArray[Math.round(brightness / asciiMapFactor)];
}
