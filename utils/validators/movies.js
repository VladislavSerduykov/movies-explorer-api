const { celebrate, Joi } = require('celebrate');
const { validateIsUrl, validateObjectId } = require('../validateIsUrl');

const addMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateIsUrl),
    trailerLink: Joi.string().required().custom(validateIsUrl),
    thumbnail: Joi.string().required().custom(validateIsUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().custom(validateObjectId),
  }),
});

module.exports = { addMovieValidator, deleteMovieValidator };
