const { mongoose } = require('mongoose');

const { Movie } = require('../models/movie');

const {
  NotFoundError, UnauthorizedError, ConflictError,
} = require('../errors/errors');
const { handleError } = require('../utils/handleError');
const { ERROR_MESSAGES } = require('../utils/errorConst');

const getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId }).populate('owner')
    .then(() => res.send(Movie))
    .catch((err) => {
      if (!Movie) {
        next(new NotFoundError(ERROR_MESSAGES.MOVIE_NOT_FOUND));
      }
      next(err);
    });
};

const addMovie = (req, res, next) => {
  const {
    country, director, duration,
    year, description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const ownerId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: ownerId,
  }).populate('owner')
    .then(() => res.status(201).send({
      message: 'Фильм добавлен',
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.MOVIE_CONFLICT));
      }

      if (err instanceof mongoose.Error) {
        next(handleError(err));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  Movie.findById(id).populate('owner')
    .then(() => {
      const ownerId = Movie.owner.id;
      if (ownerId !== userId) {
        throw new UnauthorizedError('Нету прав');
      }
      Movie.findByIdAndRemove(id);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(handleError(err));
      }
      next(err);
    });
};

module.exports = { getMovies, addMovie, deleteMovie };
