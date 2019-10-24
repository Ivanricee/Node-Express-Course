const fs = require('fs')

//crear server
const server = require('http').createServer()
//ejecutamos evento
server.on('request', (req,res) => {
    //en el request cargamos el archivo
    //lee nuestro archivo como un string
    const src = fs.createReadStream('./big')
    //los readible string tienen un metodo llamado pipe()
    //pipe integra un readible string 
    //res es un string
    src.pipe(res)
})

server.listen(3001)