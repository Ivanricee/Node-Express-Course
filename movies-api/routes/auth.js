const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const ApiKeysService = require('../services/apiKeys')

//#sign up
const UsersService = require('../services/users')
const validationHandler = require('../utils/middleware/validationHandler')
const {createUserSchema} = require('../utils/schemas/users')
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

}

module.exports = authApi