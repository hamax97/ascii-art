const Joi = require('joi');

const uint8Validator = Joi.number().min(0).max(255).required();
const resolutionStrValidator = Joi.string()
  .regex(/^[0-9]+x[0-9]+$/)
  .required();
const screenWidthValidator = Joi.number().min(1280).required();
const screenHeightValidator = Joi.number().min(720).required();

module.exports = {
  uint8Validator,
  resolutionStrValidator,
  screenWidthValidator,
  screenHeightValidator,
};
