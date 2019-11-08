const boom = require("@hapi/boom")
const joi = require('@hapi/joi')



/*nuevas propiedades de funcion validationHandler
schema -> determina el formato del objeto enviado
check -> determina donde quiero checkear el esquema (parametros, query o body)

y retornamos una funcion que tiene la forma de un middleware

utilidad validate -> le pasamos req[scheck] (checkeando el body), y el esquema
                     segun el req, puede que envie un error de validacion o no.*/
/*function validate(){ -> codigo antes
    return false
}*/
//con joi
function validate(data, schema){
    const {error} = joi.validate(data, schema)
    return error;
}


function validationHandler(schema, check = "body"){
    return function(req, res, next){
        const error = validate(req[check], schema)
        error ? next(boom.badRequest(error)): next();
    }
}

module.exports = validationHandler