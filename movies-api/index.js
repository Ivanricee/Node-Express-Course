const express = require('express')

const app = express()

const { config } = require('./config/index');

//importamos nuestra ruta 
const moviesApi = require('./routes/movies.js')

//recibe como paramentro una aplicacion de express
//para generar el enrutamiento
moviesApi(app)


app.listen(config.port, function (){
    console.log(`Listening http://localhost:${config.port}`)
})