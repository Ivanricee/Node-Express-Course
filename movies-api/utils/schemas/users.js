//nos permite definir el eschema que sera usado en la colexxion de usuarios
const joi = require('@hapi/joi')

//eschema del id del usuario
//definimos una id correspondiente a la collection de mongo
const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

//definimos el eschema de como crear un usuario
//ahora solo lo necesitamos para hacer un nuevo schema "createProviderUserSchema"
const userSchema = {
    name: joi.string().max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    
}
const createUserSchema = {
    ...userSchema,
    isAdmin: joi.boolean()
}

const createProviderUserSchema = {
   ...userSchema,
   apiKeyToken: joi.string().required()
}
module.exports = {
    userIdSchema,
    createUserSchema,
    createProviderUserSchema
}