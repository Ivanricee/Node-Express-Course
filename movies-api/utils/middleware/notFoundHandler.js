const boom = require('@hapi/boom')

//no recibe next porque, para que pueda funcionar esta funcion
//lo mas importante es que esta funcion deba ocurrir al final de todo, 
//una vez que ya se paso por todas las rutas
function notFoundHandler(req,res){
    const{
        output: {statusCode, payload}
    } = boom.notFound()

    res.status(statusCode).json(payload)
}

module.exports = notFoundHandler