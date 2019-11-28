const boom = require('@hapi/boom');

//recibe scopes permitidos para la ruta
function scopesValidationHandler(allowedScopes){
    //retorna un middleware porque necesitamos 
    //intervenir el req y response de cada ruta
    return function(req, res, next){
        if(!req.user || (req.user && !req.user.scopes)){
            next(boom.unauthorized('Missing scopes'))
        }
        
        //verifica si allowedScopes  esta incluido dentro de los scopes del 
        //usuario. Include es propiedad de los array
        const hasAccess= allowedScopes
        .map(allowedScopes => req.user.scopes.includes(allowedScopes))
        //si existe entonces convertimos allower en boolean, 
        //para que la variable hasAcces return un true o false
        .find(allowed => Boolean(allowed))

        if(hasAccess){
            next()
        }else{
            next(boom.unauthorized('Insufficient scopes'))
        }
    }
}

module.exports = scopesValidationHandler