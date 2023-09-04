const { STATUS_CODE } = require('../utils/errorConst');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.FORBIDDEN;
  }
}

module.exports = { ForbiddenError };
