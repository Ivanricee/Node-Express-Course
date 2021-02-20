const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const ApiKeysService = require('../services/apiKeys')

//#sign up
const UsersService = require('../services/users')
const validationHandler = require('../utils/middleware/validationHandler')
const {createUserSchema, createProviderUserSchema} = require('../utils/schemas/users')
//# fin de importaciones de sign up 

const { config } = require('../config');
//Basic strategy
require('../utils/auth/strategies/basic')

function authApi(app) {
    const router = express.Router()
    //ruta de autenticacion 'home'
    app.use('/api/auth', router)

    const apiKeysService = new ApiKeysService()
    const usersService = new UsersService
    // # RECORDAR SESION
    // Agregamos las variables de timpo en segundos
        const THIRTY_DAYS_IN_SEC = 2592000;
        const TWO_HOURS_IN_SEC = 7200;
    //callback de ruta
    router.post('/sign-in', async function (req, res, next) {
          // Obtenemos el atributo rememberMe desde el cuerpo del request
          console.log('concha marico')
        const { rememberMe } = req.body;
        const { apiKeyToken } = req.body;
        if (!apiKeyToken) {
            next(boom.unauthorized('apiKeyToken is required'))
        }
        //implementamos un custom callback con la ayuda de passport
        passport.authenticate('basic', function (error, user) {
            try {
                if (error || !user) {
                    next(boom.unauthorized())
                }
                
                req.login(user, { session: false }, async function (error) {
                    if (error) {
                        next(error)
                    }

                    const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken })
                    if (!apiKey) {
                        next(boom.unauthorized())
                    }
                    const { _id: id, name, email } = user
                    const payload = {
                        sub: id,
                        name,
                        email,
                        scopes: apiKey.scopes
                    }
                    // Si el atributo rememberMe es verdadero la expiración será en 30 dias
                    // de lo contrario la expiración será en 2 horas
                    
                    const token = jwt.sign(payload, config.authJwtSecret,{
                        expiresIn: '15m'
                    })
                    res.cookie("token", token, {
                        httpOnly: !config.dev,
                        secure: !config.dev,
                        maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC
                    });
                    return res.status(200).json({ token, user: { id, name, email } })
                })
            } catch (error) {
                next(error)
            }
            //como este authenticate es un custom callback debemos 
            //hacer un  closure con la firma de la ruta
        })(req, res, next)
    })

    //# ruta para sign up
    router.post('/sign-up',
    validationHandler(createUserSchema), 
    async function(req, res, next){
        const {body:user}= req;
        try{
            //este servicio toma el pass, hace un hash y lo inserta en la base de datos
            const createdUserId = await usersService.createUser({user})
            res.status(201).json({
                data: createdUserId,
                message: 'user created'
            })
            
        }catch(error){
            next(error)
        }
    })
    //esta ruta la usaremos con nuestros provedores terceros
    router.post(
        '/sign-provider',
        validationHandler(createProviderUserSchema),
        async function(req, res, next) {
          const { body } = req;
    
          const { apiKeyToken, ...user } = body;
            //para poder realizar cualqueir tarea externa es necesario que
            //tenga una apikeyToken
            if (!apiKeyToken) {
                next(boom.unauthorized('apiKeyToken is required'));
              }
        
              try {
                //al google aauth le pasamos el usuario que viene del cuerpo de
                //la ruta, de esta manera puede crear la autorizacion google oauth
                const queriedUser = await usersService.getOrCreateUser({ user });
                //creamos el token pasandole el apiToken del cuerpode la url
                //asi obtenemos los scopes necesarios (crud)
                const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });
                if (!apiKey) {
                    next(boom.unauthorized());
                  }
                //si el apiKey se genero y existe:
                //a partir de queriedUser vamos a construir nuestro payload
                const { _id: id, name, email } = queriedUser;
                //tendra como id, el iddel usuario
                const payload = {
                    sub: id,
                    name,
                    email,
                    scopes: apiKey.scopes
                  };

                //ahora creamos nuestro JWT es parecido al de sign in
                //solo que este es para el sign in de terceros
                const token = jwt.sign(payload, config.authJwtSecret, {
                    expiresIn: '15m'
                  });
                  return res.status(200).json({ token, user: { id, name, email } });
                } catch (error) {
                    next(error);
                }
    })
}

module.exports = authApi