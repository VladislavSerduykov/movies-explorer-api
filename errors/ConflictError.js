const { STATUS_CODE } = require('../utils/errorConst');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.CONFLICT;
  }
}

module.exports = { ConflictError };
