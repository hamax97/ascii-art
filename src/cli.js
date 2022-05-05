const yargs = require('yargs');

const argv = yargs
  .option('imagePath', {
    alias: 'i',
    description: 'Path to image; relative to current directory',
    type: 'string',
    requiresArg: true,
  })
  .demandOption('imagePath')
  .option('resolution', {
    alias: 'r',
    description: 'Screen resolution in format: <width>x<height>',
    type: 'string',
    default: '1920x1080',
  })
  .help()
  .alias('help', 'h').argv;

module.exports = argv;
