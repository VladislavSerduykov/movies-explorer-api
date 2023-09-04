const { ValidationError } = require('../errors/errors');
const { ERROR_MESSAGES } = require('./errorConst');

function handleError(err) {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    const field = Object.keys(err.errros)[0];
    return new ValidationError(`${ERROR_MESSAGES.WRONG_DATA_AT_FIELD} ${field}`);
  }

  return err;
}

module.exports = {
  handleError,
};
