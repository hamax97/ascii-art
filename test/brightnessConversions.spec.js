const { uint8Validator } = require('src/validators');
const { brightnessConversion } = require('src/brightnessConversions');

const { expectValidationError } = require('./helpers');

describe('brightnessConversion', () => {
  let spyUint8Validator;
  beforeEach(() => {
    spyUint8Validator = jest.spyOn(uint8Validator, 'validate');
  });

  afterEach(() => {
    spyUint8Validator.mockRestore();
  });

  test('maps correctly from brightness number to ascii character', () => {
    expect(brightnessConversion(0)).toBe('`');
    expect(brightnessConversion(255)).toBe('$');
    expect(brightnessConversion(127)).toBe('v');
    expect(brightnessConversion(63)).toBe('[');
    expect(brightnessConversion(90)).toBe('\\');
    expect(brightnessConversion(231)).toBe('&');
    expect(brightnessConversion(21)).toBe(';');
  });

  test('handles wrong input', () => {
    expect(() => brightnessConversion()).toThrowError();
    expectValidationError(spyUint8Validator);
    expect(() => brightnessConversion(null)).toThrowError();
    expectValidationError(spyUint8Validator);
    expect(() => brightnessConversion('asd')).toThrowError();
    expectValidationError(spyUint8Validator);
    expect(() => brightnessConversion(-1)).toThrowError();
    expectValidationError(spyUint8Validator);
    expect(() => brightnessConversion(256)).toThrowError();
    expectValidationError(spyUint8Validator);
    expect(() => brightnessConversion({})).toThrowError();
    expectValidationError(spyUint8Validator);
    expect(() => brightnessConversion(new Number(1))).toThrowError();
    expectValidationError(spyUint8Validator);
  });
});
