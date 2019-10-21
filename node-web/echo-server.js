//creamos otro servidor recibe dtos e imprime directamente 

//http: modulo de node para crear servidores mediante createServer
const http = require('http')
const server = http.createServer();

//el servidor funciona con eventos
server.on('request', (req, res) => {
    if (req.method === 'POST' && req.url == "/echo") {
        let body = []
        //el objeto req es un readible string y estos herdan de emitter
        //este evento es cuando le pasamos datos
        req.on('data', chunk => {
            body.push(chunk)
        })//cuando recibe los datos hay un evento end
        .on('end', () => {
            //definir en el header el tipo de respuesta que vamos a recibir
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            //respondemos al cliente
            //usamos Buffer toString para retornar una cadena de texto y no un objeto 
            //de tipo Buffer
            body = Buffer.concat(body).toString()
            res.end(body)
        })

    } else {
        res.statusCode = 404
        res.end()
    }
})

server.listen(8001);
console.log("Servidor en la url http://localhost:8000")