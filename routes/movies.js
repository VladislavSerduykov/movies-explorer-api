const express = require('express');

const { getMovies, deleteMovie, addMovie } = require('../controllers/movies');
const { deleteMovieValidator, addMovieValidator } = require('../utils/validators/movies');

const movies = express.Router();

movies.get('/', getMovies);
movies.post('/', addMovieValidator, addMovie);
movies.delete('/:id', deleteMovieValidator, deleteMovie);

module.exports = { movies };
