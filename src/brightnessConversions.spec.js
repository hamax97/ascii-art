const { uint8Validator } = require('./validators');
const { brightnessConversion } = require('./brightnessConversions');

jest.mock('./validators');

describe('brightnessConversion', () => {
  beforeEach(() => {
    uint8Validator.validate = jest.fn().mockReturnValue({ error: null });
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
    uint8Validator.validate = jest
      .fn()
      .mockReturnValue({ error: 'Fake validation error' });

    expect(() => brightnessConversion()).toThrowError();
    expect(() => brightnessConversion(null)).toThrowError();
    expect(() => brightnessConversion('asd')).toThrowError();
    expect(() => brightnessConversion(-1)).toThrowError();
    expect(() => brightnessConversion(256)).toThrowError();
    expect(() => brightnessConversion({})).toThrowError();
    expect(() => brightnessConversion(new Number(1))).toThrowError();

    expect(uint8Validator.validate).toHaveBeenCalledTimes(7);
  });
});
