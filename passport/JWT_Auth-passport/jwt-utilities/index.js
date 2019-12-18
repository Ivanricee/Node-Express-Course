const jwt = require('jsonwebtoken')

//sacar nuestros argumentos de la terminal
//process.argument lee los comandos de la terminal

//primeros dos que no se definene son:
// el proceso de node y alarchivo que estamos leyendo
const [, ,option, secret, nameOrToken] = process.argv
if(!option || !secret || !nameOrToken){
    return console.log("Missing arguments")
}

function signToken(payload, secret){
    return jwt.sign(payload,secret)
}

function verifyToken(token,screte){
    return jwt.verify(token, secret)
}

if(option == "sign"){
    console.log(signToken({ sub: nameOrToken}, secret ))
}else if(option == 'verify'){
    console.log(verifyToken(nameOrToken,secret))
}else{
    console.log("option needs to bo 'sign' or 'verify' ")
}