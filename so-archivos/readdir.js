const fs = require('fs')

//nos permite saber los archivo que existen dentro de un directorio dado
const files = fs.readdir(__dirname,(err,files) =>{
    if(err){
        console.log(err)
    }
    console.log(files)
})
