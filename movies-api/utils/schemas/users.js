//nos permite definir el eschema que sera usado en la colexxion de usuarios
const joi = require('@hapi/joi')

//eschema del id del usuario
//definimos una id correspondiente a la collection de mongo
const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

//definimos el eschema de como crear un usuario

const createUserSchema = {
    name: joi.string().max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    isAdmin: joi.boolean()
}

module.exports = {
    userIdSchema,
    createUserSchema
}