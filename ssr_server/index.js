const express = require("express");
const passport = require('passport')
const boom = require('@hapi/boom')
const cookieParser = require('cookie-parser')
//nos permite hacer un reques a la api
const axios = require('axios')
const { config } = require("./config");

const app = express();
//Se usara este servidor como una especia de proxy
//y todo seran llamas al api-server

//el token usado en el sign-in se inyectara en una cookie
//las demas rutas simplemente llamarn el token de esa cookie
//En una SPA se tiene muy seguro el sitio

//middlewares
// body parser
app.use(express.json());
app.use(cookieParser())


// Basic satrategy
require('./utils/auth/strategies/basic')

app.post("/auth/sign-in", async function(req, res, next) {
  //custom callback
  passport.authenticate("basic",function(error,data){
    try{
      if(error || !data){
        next(boom.unauthorized)
      }
      req.login(data, {session:false}, async function(error){
        if(error){
          next(error)
        }
        const {token, ...user} = data;
        //definir una cookie en nuestro objeto res
        res.cookie("token", token, {
          httpOnly: !config.dev,
          secure: !config.dev
        })
        //devolvemos el usuario
        //crea la cookie y ahi insertamos el token,
        //tambien como respuesta devuelve el usuario
        //asi la SPA puede obtner la informacion del usuario y mostrarla
        //y apartir de aqui cada request tendra el token en la cookie
        res.status(200).json(user)
      })
    }catch(error){
      next(error)
    }
  })(req,res,next)

});

app.post("/auth/sign-up", async function(req, res, next) {
  const {body:user}= req
  try{
    await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: "post",
      data: user
    })
    res.status(201).json({message: "user createded"})
  }catch(error){
    next(error)
  }
});


//en el curso de backend con front end
app.get("/movies", async function(req, res, next) {

});
//cuando el usuario en la interfaz grafica agregue o elimine peliculas de su lista
app.post("/user-movies", async function(req, res, next) {
try{
  const {body: userMovie} = req
  //la cookie esta guardada en las cookies y esta se encuentra en el request obj
  const {token} = req.cookies;
  const {data, status} = await axios({
    //la url es de nuestro api server
    url: `${config.apiUrl}/api/user-movies`,
    //nuestra estrategia jwt es tipo bearer token
    headers: {Authorization: `Bearer ${token}`},
    method: 'post',
    data: userMovie
  })
  if(status !== 201){
    return next(boom.badImplementation)
  }

  res.status(201).json(data)
}catch(error){
  next(error)
}
});

app.delete("/user-movies/:userMovieId", async function(req, res, next) {
  try{
    //en vez de recibir del cuerpo el user movie lo recibimos de la url
    const {userMovieId} = req.params
    //la cookie esta guardada en las cookies y esta se encuentra en el request obj
    const {token} = req.cookies;
    const {data, status} = await axios({
      //la url es de nuestro api server
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      //nuestra estrategia jwt es tipo bearer token
      headers: {Authorization: `Bearer ${token}`},
      method: 'delete'
    })
    if(status !== 200){
      return next(boom.badImplementation)
    }
  
    res.status(200).json(data)
  }catch(error){
    next(error)
  }
});

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
