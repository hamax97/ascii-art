const asciiArray = '`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
const brightnessNumValues = 256;
const asciiMapFactor = brightnessNumValues / asciiArray.length;

module.exports.brightnessConversion = function (brightness) {
  if (brightness === 0) {
    return asciiArray[brightness];
  } else if (brightness === 255) {
    return asciiArray[asciiArray.length - 1];
  }

  return asciiArray[Math.round(brightness / asciiMapFactor)];
};
