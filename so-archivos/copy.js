const fs = require('fs')

fs.copyFile("naranja.txt", "limondulce.txt", err =>{
    if(err){
        return console.log(err)
    }
    console.log("naranja.txt fue copiado como limondulce.txt")
})