const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const {
  ConflictError, NotFoundError, UnauthorizedError,
} = require('../errors/errors');
const { ERROR_MESSAGES } = require('../utils/errorConst');
const { handleError } = require('../utils/handleError');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(ERROR_MESSAGES.WRONG_CREDENTIALS);
      }
      const hasRightPassword = bcrypt.compare(password, user.password);

      if (!hasRightPassword) {
        throw new UnauthorizedError(ERROR_MESSAGES.WRONG_CREDENTIALS);
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'not-secret-key',
        { expiresIn: '7d' },
      );

      res.send({ token });
    }).catch(() => next(new UnauthorizedError(ERROR_MESSAGES.WRONG_CREDENTIALS)));
};

async function createUser(req, res, next) {
  try {
    const {
      name, email, password,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      email,
      password: hashPassword,
      name,
    });

    user = user.toObject();
    delete user.password;
    res.status(201).send(user);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError(ERROR_MESSAGES.USER_CONFLICT));
      return;
    }
    if (err instanceof mongoose.Error) {
      next(handleError(err));
    }

    next(err);
  }
}

const getUser = (req, res, next) => {
  const { userId } = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(
          ERROR_MESSAGES.USER_NOT_FOUND,
        );
      }
      return res.send(user);
    })
    .catch((err) => next(err));
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(
          ERROR_MESSAGES.USER_NOT_FOUND,
        );
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.USER_CONFLICT));
      }
      if (err instanceof mongoose.Error) {
        next(handleError(err));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser, getUser, updateUser, login,
};
