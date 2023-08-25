const express = require('express');
const { celebrate, Joi } = require('celebrate')

const routes = express.Router();

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), );

routes.post('signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), )

routes.use('/users', )
routes.use('/movies', )

routes.all('*', (req, res, next) => {
  next(new )
})

module.exports = { routes };