const Joi = require('joi');

const strValidator = Joi.string().required();
const uint8Validator = Joi.number().min(0).max(255).required();
const screenResolutionStrValidator = Joi.string()
  .regex(/^[0-9]+x[0-9]+$/)
  .required();
const screenWidthValidator = Joi.number().min(1280).required();
const screenHeightValidator = Joi.number().min(720).required();

module.exports = {
  strValidator,
  uint8Validator,
  screenResolutionStrValidator,
  screenWidthValidator,
  screenHeightValidator,
};
