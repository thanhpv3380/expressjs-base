const { Joi, validate } = require('express-validation');

const { PAGE_NUMBER_DEFAULT, PAGE_SIZE_DEFAULT } = require('../configs');

const validateOptionsDefault = {
  context: true,
  keyByField: true,
};

const joiPagination = {
  pageNum: Joi.number().integer().min(0).default(PAGE_NUMBER_DEFAULT),
  limit: Joi.number().integer().min(1).default(PAGE_SIZE_DEFAULT),
};

const customValidate = (schema, options, joiOptions) => {
  return validate(
    schema,
    { ...validateOptionsDefault, ...options },
    joiOptions,
  );
};

module.exports = {
  joiPagination,
  customValidate,
};
