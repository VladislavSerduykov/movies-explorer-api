const rateLimit = require('express-rate-limit');

const defaultConfig = require('./defaultConfig');

const {
  LIMITER_MAX_LIMIT = defaultConfig.LIMITER_MAX_LIMIT,
  LIMITER_WINDOW = defaultConfig.LIMITER_WINDOW,
} = process.env;

const limiter = rateLimit({
  windowMs: LIMITER_WINDOW,
  max: LIMITER_MAX_LIMIT,
});

module.exports = {
  limiter,
};
