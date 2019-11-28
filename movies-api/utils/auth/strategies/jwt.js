const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UsersService = require('../../../services/users');
const { config } = require('../../../config');
passport.use(
    new Strategy(
        {
            secretOrKey: config.authJwtSecret,
            //se saca del header
            //es decir que cuando hagamos una peticion donde queramos enviar nuestro
            //jsonwebtoken lo que debemos hacer es enviarlo en el header como
            //bearerToken
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async function (tokenPayload, cb) {
            const usersService = new UsersService();

            try {
                const user = await usersService.getUser({ email: tokenPayload.email });

                if (!user) {
                    //si no encuentra el usuario 
                    //llamamos el callback con el error y el objeto del usuario
                    //como false
                    return cb(boom.unauthorized(), false);
                }
                //si encotramos el usuario entonces:
                //borramos el password del objeto
                delete user.password;
                //llamamos el callback con el error en nulo y pasamos el usurio
                // con el scope
                cb(null, { ...user, scopes: tokenPayload.scopes });
            } catch (error) {
                return cb(error);
            }
        }
    )
);