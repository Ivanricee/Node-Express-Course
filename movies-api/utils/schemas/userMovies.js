const joi = require('@hapi/joi')

const { movieIdScema } = require('./movies')
const { userIdSchema } = require('./users')

const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createUserMovieSchema = {
    userId: userIdSchema,
    movieId: movieIdScema
}

module.exports = {
    userMovieIdSchema,
    createUserMovieSchema
}