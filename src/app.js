const argv = require('./cli');
const { transform } = require('./pipeline');

async function app() {
  try {
    await transform(argv.imagePath, { screenResolution: argv.screenResolution });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

app();
