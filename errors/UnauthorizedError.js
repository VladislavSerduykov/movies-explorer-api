const { STATUS_CODE } = require('../utils/errorConst');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.UNAUTHORIZED;
  }
}

module.exports = { UnauthorizedError };
