# ASCII Art

Turns images into ASCII art.

Implemented based on this [guide](https://robertheaton.com/2018/06/12/programming-projects-for-advanced-beginners-ascii-art/).

Tech stack used:
- NodeJS.
- Jest.
- Joi.

## Install

```bash
npm install
```

## Run

![Animation](images/animation.gif)

Show help:

```bash
node src/app.js -h
```

Print image with ASCII characters:

1. Write the following command but do not hit enter yet.

   ```bash
   node src/app.js --imagePath <path/to/the/image>
   ```

2. Zoom out as much as possible your terminal.
3. Hit enter.

The program assumes a screen resolution of 1920x1080. If the ASCII art looks squashed or weird
you can specify another screen resolution using the flag `--screenResolution <width>x<height>`:

```bash
node src/app.js --imagePath <path/to/the/image> --screenResolution 1280x720
```

## Examples

The cross of Christ:
<p align="center">
  <img alt="The cross of Christ" src="./images/the-cross.jpg" width="45%" height="210">
&nbsp; &nbsp; &nbsp;
  <img alt="The cross of Christ ASCII" src="./images/the-cross-ascii.jpg" width="45%" height="210">
</p>

Mario Bros:

<p align="center">
  <img alt="Mario Bros" src="./images/mario-bros.jpg" style="border:1px solid black;" width="45%">
&nbsp; &nbsp; &nbsp;
  <img alt="Mario Bros ASCII" src="./images/mario-bros-ascii.jpg" width="45%">
</p>

Monkey:

<p align="center">
  <img alt="Monkey" src="./images/monkey.jpg" width="45%">
&nbsp; &nbsp; &nbsp;
  <img alt="Monkey ASCII" src="./images/monkey-ascii.jpg" width="45%">
</p>
