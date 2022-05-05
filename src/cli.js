const yargs = require('yargs');

const argv = yargs
  .option('imagePath', {
    alias: 'i',
    description: 'Path to image; relative to current directory',
    type: 'string',
    requiresArg: true,
  })
  .option('resolution', {
    alias: 'r',
    description: 'Screen resolution in format: <width>x<height>',
    type: 'string',
  })
  .help()
  .alias('help', 'h').argv;

module.exports = argv;
