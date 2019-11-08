const express = require('express')
const app = express()

const { config } = require('./config/index');

//importamos nuestra ruta 
const moviesApi = require('./routes/movies.js')
const { logErrors, errorHandler, wrapErrors }= require('./utils/middleware/errorHandler.js')
const notFoundHandler = require('./utils/middleware/notFoundHandler.js')
//le permite a nuestras rutas, cuando le enviemos datos en formato json,
//este sepa intrepetarlos
//este es un middleware "body parser"
app.use(express.json())



//recibe como paramentro una aplicacion de express
//para generar el enrutamiento
moviesApi(app)

//capturar error 404
app.use(notFoundHandler)


//los middlewares de error siempre tienen que ir al final de las rutas 
//(las rutas tambien son middlewares)
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)



app.listen(config.port, function (){
    console.log(`Listening http://localhost:${config.port}`)
})