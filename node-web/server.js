//http: modulo de node para crear servidores mediante createServer
const http = require('http')
const server = http.createServer();

//el servidor funciona con eventos
server.on('request', (req,res) =>{
    res.statusCode = 200;
    //definir en el header el tipo de respuesta que vamos a recibir
    res.setHeader('Content-Type', 'text/plain')
    //respondemos al cliente
    res.end('hello world\n')
})

server.listen(8000);
console.log("Servidor en la url http://localhost:8000")


