const { STATUS_CODE } = require('../utils/errorConst');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.BAD_REQUEST;
  }
}

module.exports = { ValidationError };
