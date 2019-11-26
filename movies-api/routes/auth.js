const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const ApiKeysService = require('../services/apiKeys')
const { config } = require('../config');
//Basic strategy
require('../utils/auth/strategies/basic')

function authApi(app) {
    const router = express.Router()
    //ruta de autenticacion 'home'
    app.use('/api/auth', router)

    const apiKeysService = new ApiKeysService()
    //callback de ruta
    router.post('/sign-in', async function (req, res, next) {
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
                        scopes: apiKey.scopes
                    }

                    const token = jwt.sign(payload, config.authJwtSecret,{
                        expiresIn: '15m'
                    })
                    return res.status(200).json({ token, user: { id, name, email } })
                })
            } catch (error) {
                next(error)
            }
            //como este authenticate es un custom callback debemos 
            //hacer un  closure con la firma de la ruta
        })(req, res, next)
    })
}

module.exports = authApi