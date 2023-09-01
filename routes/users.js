const express = require('express');
const { updateUser, getUser } = require('../controllers/users');
const { updateUserValidator } = require('../utils/validators/users');

const users = express.Router();

users.get('/me', getUser);
users.patch('/me', updateUserValidator, updateUser);

module.exports = { users };
