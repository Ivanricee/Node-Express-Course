const fs = require('fs')
//leer. Todolo que se haga aqui se realiza con una alternativa asyncrona
//hacerlo sincrono hara que se bloquee el proceso principal.

//Ejemplo si se quiere subir una foto a un servidor, si se hace syncrono
//Durante el tiempo que se este guardando un archivo, El servidor
//no respondera a peticiones
function leer(ruta, cb){
    fs.readFile(ruta,(err, data)=>{
        //Leido
        cb(data.toString())
    })
}
function escribir(ruta, contenido,cb){
    fs.writeFile(ruta, contenido, (err)=>{        
        if(err)console.error('no he podido esribirlo')
        else console.log("se ha escrito correctamente")
    })
}
function borrar(ruta,cb){
    fs.unlink(ruta,cb)
}
borrar(`${__dirname}/archivo1.txt`, console.log)
//leer(`${__dirname}/archivo1.txt`, console.log)
//escribir(`${__dirname}/archivo1.txt`, 'Soy un archivo nuevo', console.log)