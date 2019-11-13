//el cache hace que recibamos la misma informacion aunque haya sido modificada
//primero revisamos si el cache esta activaod

//no todas la rutas deben tener cache
//las rutas que deben tener cache son en las que estamos requiriendo recursos
const {config} = require('../config')

function cacheRespose(res, seconds){
    //revisamos si no estamos en modo desarrollo
    if(!config.dev){
        //restablesemos en el response
        //con esta funcionalidad ya podemos ir a nuestras rutas
        //y agregarle cache a las rutas necesarias
        res.set("Cache-Control", `public, max-age=${seconds}`)
    }

}

module.exports = cacheRespose