const express = require("express");

const { config } = require("./config");

const app = express();
//Se usara este servidor como una especia de proxy
//y todo seran llamas al api-server

//el token usado en el sign-in se inyectara en una cookie
//las demas rutas simplemente llamarn el token de esa cookie
//En una SPA se tiene muy seguro el sitio
// body parser
app.use(express.json());

app.post("/auth/sign-in", async function(req, res, next) {
  

});

app.post("/auth/sign-up", async function(req, res, next) {

});

app.get("/movies", async function(req, res, next) {

});
//cuando el usuario en la interfaz grafica agregue o elimine peliculas de su lista
app.post("/user-movies", async function(req, res, next) {

});

app.delete("/user-movies/:userMovieId", async function(req, res, next) {

});

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
