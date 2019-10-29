const express = require('express')
const { moviesMock } = require('../utils/mocks/movies')


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

    //alimetnamos el router con las otras rutas de ejemplo
    //cuando acceda a "home", va a devolver las peliculas 
    //como estamos escribiendo codigo asyncrono usamos la palabra
    //reservada async y usamos try catch
    //Una ruta recibe req, res y en este caso tambien la funcionalidad 
    //next(parte de la teoria middleware)
    router.get('/', async function (req, res, next) {
        try {
            //como el codigo es un array debomos envolverlo en un promesa para
            //que podamos hacer uso de nuestro codigo asyn con nuestro
            //codigo await
            const movies = await Promise.resolve(moviesMock)

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
    router.get('/:movieId', async function (req, res, next) {
        try {
            const movies = await Promise.resolve(moviesMock[0])           
            res.status(200).json({
                data: movies,
                message: 'movies retrieved'
            })
        } catch (err) {
            next(err)
        }
    })
    //crea una nueva pelicula
    router.post('/', async function (req, res, next) {
        try {
            const createdMovieId = await Promise.resolve(moviesMock[0].id)           
            res.status(201).json({
                data: createdMovieId,
                message: 'movies created'
            })
        } catch (err) {
            next(err)
        }
    })
    //actualizacion 
    router.put('/:moveId', async function (req, res, next) {
        try {
            const updatedMovieId = await Promise.resolve(moviesMock[0].id)           
            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            })
        } catch (err) {
            next(err)
        }
    })
    //deleted
    router.delete('/:moveId', async function (req, res, next) {
        try {
            const deletedMovieId = await Promise.resolve(moviesMock[0].id)           
            res.status(200).json({
                data: deletedMovieId,
                message: 'movie deleted'
            })
        } catch (err) {
            next(err)
        }
    })    
}

module.exports = moviesApi