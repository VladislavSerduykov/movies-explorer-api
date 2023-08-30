const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { updateUser, getUser } = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/', getUser);
usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
  }),
}), updateUser);

module.exports = { usersRoutes };
