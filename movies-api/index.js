const express = require('express')

const app = express()

const { config } = require('./config/index');

//usamos el metodo
//luego la ruta
// y luego recibe una fucnion que tiene el req obj y el res obj
app.get('/', function(req,res){
    //cuando entremos a esa ruta obtendremos este valor
    res.send('hello world')
});

app.get('/json', function(req,res){
    //cuando entremos a esa ruta obtendremos este json
    res.json('hello world')
});

app.listen(config.port, function (){
    console.log(`Listening http://localhost:${config.port}`)
})