const utils = require('src/utils');
const {
  screenResolutionStrValidator,
  screenWidthValidator,
  screenHeightValidator,
} = require('src/validators');

const { expectValidationError, expectNotValidationError } = require('./helpers');

describe('utils', () => {
  describe('getResizeValues', () => {
    let spyScreenResolutionStrValidator;
    let spyScreenWidthValidator;
    let spyScreenHeightValidator;

    beforeEach(() => {
      spyScreenResolutionStrValidator = jest.spyOn(screenResolutionStrValidator, 'validate');
      spyScreenWidthValidator = jest.spyOn(screenWidthValidator, 'validate');
      spyScreenHeightValidator = jest.spyOn(screenHeightValidator, 'validate');
    });

    test('throws if invalid screen resolution string', () => {
      expect(() => utils.getResizeValues()).toThrowError();
      expectValidationError(spyScreenResolutionStrValidator);
      expect(() => utils.getResizeValues(null)).toThrowError();
      expectValidationError(spyScreenResolutionStrValidator);
      expect(() => utils.getResizeValues('')).toThrowError();
      expectValidationError(spyScreenResolutionStrValidator);
      expect(() => utils.getResizeValues('1920xa1080')).toThrowError();
      expectValidationError(spyScreenResolutionStrValidator);
      expect(() => utils.getResizeValues('a1920x1080')).toThrowError();
      expectValidationError(spyScreenResolutionStrValidator);
      expect(() => utils.getResizeValues('asdxasd')).toThrowError();
      expectValidationError(spyScreenResolutionStrValidator);
      expect(() => utils.getResizeValues('1920x-1080')).toThrowError();
      expectValidationError(spyScreenResolutionStrValidator);
      expect(() => utils.getResizeValues('-1920x1080')).toThrowError();
      expectValidationError(spyScreenResolutionStrValidator);

      expect(spyScreenResolutionStrValidator).toHaveBeenCalledTimes(8);
    });

    test('throws if invalid resolution sizes', () => {
      expect(() => utils.getResizeValues('1279x719')).toThrowError();
      expectValidationError(spyScreenWidthValidator);
      expectValidationError(spyScreenHeightValidator);

      expect(() => utils.getResizeValues('1279x720')).toThrowError();
      expectValidationError(spyScreenWidthValidator);
      expectNotValidationError(spyScreenHeightValidator);

      expect(() => utils.getResizeValues('1280x719')).toThrowError();
      expectNotValidationError(spyScreenWidthValidator);
      expectValidationError(spyScreenHeightValidator);

      expect(() => utils.getResizeValues('0x0')).toThrowError();
      expectValidationError(spyScreenWidthValidator);
      expectValidationError(spyScreenHeightValidator);
    });

    test('returns resize values', () => {
      let [width, height] = utils.getResizeValues('1920x1080');
      expect(width).toBe(620);
      expect(height).toBe(320);

      [width, height] = utils.getResizeValues('1280x720');
      expect(width).toBe(391);
      expect(height).toBe(191);

      [width, height] = utils.getResizeValues('1680x1050');
      expect(width).toBe(534);
      expect(height).toBe(309);
    });
  });
});
