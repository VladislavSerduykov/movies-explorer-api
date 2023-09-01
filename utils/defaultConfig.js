const PORT = 3000;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_SECRET = 'not-secret-key';
const LIMITER_WINDOW = 60000;
const LIMITER_MAX_LIMIT = 100;

module.exports = {
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  LIMITER_WINDOW,
  LIMITER_MAX_LIMIT,
};
