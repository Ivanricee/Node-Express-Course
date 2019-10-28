//contamos la linea de un archiv

const fs = require("fs")
//puede funcionnar de manera aasyncrona: es decir que va  esperar a que
//termine el proceso para seguir con el arbol de ejecuciones
//se recomienda try catch para capturar errores


//syncrona: no bloquea el proceso y sigue ejecutando las siguientes lineas
try{
    //process.argv[2] lo que pasamos por la terminal
    const file = process.argv[2]
    const content = fs.readFileSync(file).toString()
    //cortarlineas, hacmos un split de salto de linea
    //crea arrays con saltos de linea
    const lines = content.split('\n').length
    console.log(lines)
}catch(err){
    return console.log(err)

}