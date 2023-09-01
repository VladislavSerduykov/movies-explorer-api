const express = require('express');

const { users } = require('./users');
const { movies } = require('./movies');
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../utils/validators/users');
const { NotFoundError } = require('../errors/errors');
const { ERROR_MESSAGES } = require('../utils/errorConst');

const routes = express.Router();

routes.all('*', express.json());

routes.post('/signup', createUserValidator, createUser);
routes.post('/signin', loginValidator, login);

routes.all('*', auth);

routes.use('/users', users);
routes.use('/movies', movies);

routes.all('*', (req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGES.PAGE_NOT_FOUND));
});

module.exports = { routes };
