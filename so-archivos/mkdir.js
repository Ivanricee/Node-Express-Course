const fs = require('fs')
//el aprametro recursivo crea toda la ruta de carpetas si no existen
fs.mkdir("platzi/escuela-js/node",{recursive:true},err => {
    if(err){
        return console.log(err)
    }
})