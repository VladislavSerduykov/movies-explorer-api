const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');
const { NotFoundError } = require('../errors/NotFoundError');
const { usersRoutes } = require('./users');

const routes = express.Router();

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

// routes.post('signin', celebrate({
Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}),
// }), )

routes.use('/users', usersRoutes);
// routes.use('/movies', )

routes.all('*', (req, res, next) => {
  next(new NotFoundError('Адрес не найден'));
});

module.exports = { routes };
