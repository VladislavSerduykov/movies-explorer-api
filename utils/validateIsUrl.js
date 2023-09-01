const validator = require('validator');

function validateIsUrl(value, helpers) {
  if (validator.isUrl(value)) return value;
  return helpers.message(`${value} is not valid link`);
}

module.exports = { validateIsUrl };
