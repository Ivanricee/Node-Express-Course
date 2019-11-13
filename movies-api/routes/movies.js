const express = require('express')
const MoviesService = require('../services/movies.js')
const {
    movieIdSchema,
    createMovieSchema,
    updatedMovieId
} = require('../utils/schemas/movies.js')

const validationHandler = require('../utils/middleware/validationHandler')


//#####################-----------CACHE-
//primero traemos la utilidad
const cacheResponse = require('../utils/cacheResponse')

const { FIVE_MINUTES_IN_SECONDS,SIXTY_MINUTES_IN_SECONDS  } = require('../utils/time')

//#####################------------------------




//creamos una funcion que reciba una aplicacion de express
//nos permite ser dinamicos y tener control sobre 
//que aplicacion va a consumir nuestra ruta
function moviesApi(app) {
    // creamos el router:
    const router = express.Router();
    //A la aplicacion que le vamos a pasar como parametro que, 
    //en la ruta de inicio (/api/movies -> home) va a utilizar
    //ese router
    app.use("/api/movies", router)
    //Instanciamos un nuevo servicio
    const moviesService = new MoviesService();
    //alimetnamos el router con las otras rutas de ejemplo
    //cuando acceda a "home", va a devolver las peliculas 
    //como estamos escribiendo codigo asyncrono usamos la palabra
    //reservada async y usamos try catch
    //Una ruta recibe req, res y en este caso tambien la funcionalidad 
    //next(parte de la teoria middleware)
    router.get('/', async function (req, res, next) {

        //############## Agregamos cache
        //el iempo se declara en las regalas del negocio
        cacheResponse(res,FIVE_MINUTES_IN_SECONDS)

        //###############





        const { tags } = req.query
        try {
            //como el codigo es un array debomos envolverlo en un promesa para
            //que podamos hacer uso de nuestro codigo asyn con nuestro
            //codigo await
            const movies = await moviesService.getMovies({ tags })
           // throw new Error('Error getting movies');
            //usamos responsee, definimos el estatus ok
            //y que la respuesta es json
            //datos y mensaje para que el cliente sepa que es lo que acaba de hacer
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch (err) {
            next(err)
        }
    })
    //obtiene una pelicula en especifico
    router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        
        //############## Agregamos cache
        cacheResponse(res,SIXTY_MINUTES_IN_SECONDS)
        //###############
        const { movieId } = req.params
        try {
            const movies = await moviesService.getMovie({ movieId })
            res.status(200).json({
                data: movies,
                message: 'movies retrieved'
            })
        } catch (err) {
            next(err)
        }
    })
    //crea una nueva pelicula
    router.post('/', validationHandler(createMovieSchema), async function (req, res, next) {
        const { body: movie } = req
        try {
            const createdMovieId = await moviesService.createMovie({ movie })
            res.status(201).json({
                data: createdMovieId,
                message: 'movies created'
            })
        } catch (err) {
            next(err)
        }
    })
    //actualizacion 
    router.put('/:movieId', validationHandler(updatedMovieId), validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params
        const { body: movie } = req
        try {
            const updatedMovieId = await moviesService.updateMovie({ movieId, movie })
            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            })
        } catch (err) {
            next(err)
        }
    })
    //deleted
    router.delete('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params

        try {
            const deletedMovieId = await moviesService.deleteMovie({ movieId })
            res.status(200).json({
                data: deletedMovieId,
                message: 'movie deleted',
            })
        } catch (err) {
            next(err)
        }
    })
}

module.exports = moviesApi