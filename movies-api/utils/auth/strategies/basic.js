//Cuando lo agreguemos como middleware a una ruta
//y si hacen una peticion de una autencticacion de tipo basic
//a partir del email y password podra extraer el usuario
//entonces podra definir si esta autenticado en nuestra app
const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
//service para crud de usuarios
const UsersService = require('../../../services/users')

//implementamos estrategia

passport.use(new BasicStrategy(async function(email,password, cb){
    const userServices = new UsersService();

    try{
        const user = await userServices.getUser({email})
        if(!user ){
            return cb(boom.unauthorized(),false)
        }

        if(!(await bcrypt.compare(password,user.password))){
            return cb(boom.unauthorized,false)
        }
        //borramos el password del objeto user 
        //para que este no sea visible durante el uso de la aplicacion
        delete user.password

        return cb(null,user)
    }catch(error){
        return cb(error)
    }
    
}))