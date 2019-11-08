const boom = require('@hapi/boom')
//dependiendo si estamos en modo desarrollo o produccion
//queremso que el error contenga el stack del error
const {config} = require('../../config')


//con boom ahora recibiremos otro tipo de error
//hacemso destructuring al error
function withErrorStack(error, stack){
    if(config.dev){
        return {...error,stack}
    }
    return error;

}

//el middleware se encargara de manejar el error
function logErrors(err, req,res,next){
    console.log(`aja la baraja ${err}`)
    next(err)
}

// ------------------ boom function
//es posible que en algun momento el error que llegue no sea de tipo boom 
//con esta funcion nos aseguramos de que todos sean de tipo boom
function wrapErrors(err,req,res,next){
    if(!err.isBoom){
        next(boom.badImplementation(err))
    }
    //si es de tipo boom simplemente llamamos el siguiente middleware con el error
    next(err)

}

//middleware que nos ayuda a darle manejo al error
//por defaul express imprime los errores en formato html
//en esta ocasion lo necesitamos en formato json 
//para eso creamos una funcionalidad de ayuda(no es un middleware)
//withErrorStack

function errorHandler(err,req,res,next){//eslint-disable-line
    //con boom lo que tenemos que hacer es
    const {output:{statusCode, payload} } = err
   // res.status(err.status || 500) -> sin boom
    res.status(statusCode)// -> con boom
    //con esto regresamos en formato el error y el stack del error
    //res.json(withErrorStack(err.message, err.stack)) -> sin boom
    res.json(withErrorStack(payload, err.stack)) //-> con boom
}

module.exports ={
    logErrors,
    //con boom ahora exportamos nuestro ewrpa error tambien 
    wrapErrors,
    errorHandler
}