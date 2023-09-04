const { STATUS_CODE, ERROR_MESSAGES } = require('../utils/errorConst');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const { statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR } = err;
  let { message } = err;
  if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR) {
    message = ERROR_MESSAGES.UNKNOWN_ERROR;
  }
  res.status(statusCode).send({ message });
}

module.exports = { errorHandler };
