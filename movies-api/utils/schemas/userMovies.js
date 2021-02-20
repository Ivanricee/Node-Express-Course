const joi = require('@hapi/joi');

const { movieIdSchema } = require('./movies');
const { userIdSchema } = require('./users');

const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F-]{36}$/);

const createUserMovieSchema = {
  userId: userIdSchema,
  movieId: movieIdSchema
};

module.exports = {
  userMovieIdSchema,
  createUserMovieSchema
};