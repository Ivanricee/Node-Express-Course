const express = require('express')
const helmet = require('helmet')
const app = express()

const { config } = require('./config/index');

//##################### SIGN IN

const authApi = require('./routes/auth')

//####################

//importamos nuestra ruta 
const moviesApi = require('./routes/movies.js')
const userMoviesApi = require('./routes/userMovies.js')
const { logErrors, errorHandler, wrapErrors }= require('./utils/middleware/errorHandler.js')
const notFoundHandler = require('./utils/middleware/notFoundHandler.js')
//le permite a nuestras rutas, cuando le enviemos datos en formato json,
//este sepa intrepetarlos
//este es un middleware "body parser"
app.use(express.json())

//cuando no se le pasan datos esta ejecutando los valores por defecto
//si queremos pasarle  algo extra tendriamos que pasarle un archivo de cnfiguracion 
app.use(helmet())


//recibe como paramentro una aplicacion de express
//para generar el enrutamiento

//#############  sign in
authApi(app)
//#############  sign in
moviesApi(app)
userMoviesApi(app)

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