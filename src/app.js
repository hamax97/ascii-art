const argv = require('./cli');
const { transform } = require('./pipeline');

async function app() {
  try {
    await transform(argv.imagePath, { resolution: argv.resolution, imagePath: argv.imagePath });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

app();
