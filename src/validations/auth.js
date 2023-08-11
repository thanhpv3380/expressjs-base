const { Joi } = require('express-validation');
const { customValidate } = require('./validationUtil');

const login = {
  body: Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  }),
};

const register = {
  body: Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    name: Joi.string().trim().required(),
    email: Joi.string().email().trim().lowercase().required(),
    phoneNumber: Joi.string().trim().required(),
    address: Joi.string().trim(),
    gender: Joi.string().trim(),
  }),
};

module.exports = {
  loginValidate: customValidate(login, { keyByField: true }),
  registerValidate: customValidate(register, { keyByField: true }),
};
