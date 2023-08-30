const { STATUS_CODE } = require('../utils/errorConst');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.NOT_FOUND;
  }
}

module.exports = { NotFoundError };
