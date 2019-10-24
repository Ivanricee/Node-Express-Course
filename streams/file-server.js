const fs = require('fs')

//crear server
const server = require('http').createServer()
//ejecutamos evento
server.on('request', (req,res) => {
    //en el request cargamos el archivo
    fs.readFile("./big",(err,data) =>{
      if(err){
        console.log("error",err)
      }  
      res.end(data)
    })
})

server.listen(3000)