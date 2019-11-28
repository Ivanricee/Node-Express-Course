const express = require('express')

const UserMoviesService = require('../services/userMovies')
const validationHandler = require('../utils/middleware/validationHandler')

const { movieIdSchema } = require('../utils/schemas/movies')
const { userIdSchema } = require('../utils/schemas/users')
const { createUserMovieSchema } = require('../utils/schemas/userMovies')

//#####################------------------------
// #################   middleware validation scopes #####################
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

// ########################################################################
// ################---  agregar seguridad a la ruta
// Poteccion de nuestras url con el middleware passport
// La unica manera de acceder a nuestras rutas es si nuestro jsonwebtoken es valido
// # a traves de strategy de jwt
const passport = require('passport')
require("../utils/auth/strategies/jwt")
// ################--


//definimos las rutas de nuestras peliculas de usuario
function userMoviesApi(app) {
    const router = express.Router()

    app.use('/api/user-movies', router)
    const userMoviesService = new UserMoviesService()

    router.get('/', 
    passport.authenticate('jwt', {session: false}),
    scopesValidationHandler(['read:user-movies']),
    validationHandler({ userId: userIdSchema }, 'query'),
        async function (req, res, next) {
            const { userId } = req.query

            try {
                const userMovies = await userMoviesService.getUserMovies({ userId })
                res.status(200).json({
                    data: userMovies,
                    message: 'user movies listed'
                })
            } catch (error) {
                next(error)
            }
        })

    router.post('/', 
    passport.authenticate('jwt', {session: false}),
    scopesValidationHandler(['create:user-movies']),
    validationHandler(createUserMovieSchema), 
        async function(req, res, next){
            const {body:userMovies} = req
            try{    
                const createdUserMovieId = await userMoviesService.createUserMovie({
                    userMovies
                })

                res.status(201).json({
                    data: createdUserMovieId,
                    message: 'user movie created'
                })
            }catch(err){
                next(err)
            }
        }
    )

    router.delete('/:userMovieId', 
    passport.authenticate('jwt', {session: false}),
    scopesValidationHandler(['delete:user-movies']),
    validationHandler({userMovieId:movieIdSchema}, 'params'),
    async function(req,res,next){
        const {userMovieId} = req.params
        try{
            const deletedUserMovieId =await userMoviesService.deletedUserMovieId({
                userMovieId
            })

            res.status(200).json({
                data:deletedUserMovieId,
                message: 'User Movie deleted'
            })
        }catch(err){
            next(err)
        }
    })
}

module.exports = userMoviesApi