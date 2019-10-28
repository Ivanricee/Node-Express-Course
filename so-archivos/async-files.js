const fs = require("fs")

    //process.argv[2] lo que pasamos por la terminal
    const file = process.argv[2]
    if(!file){
        throw new Error('Debes indicar el archivo que debes leer')
    }
    const content = fs.readFile(file, function(err,content){
        if(err){
            return console.log(err)
        }
        //cortarlineas, hacmos un split de salto de linea
        //crea arrays con saltos de linea
        const lines = content.split('\n').length
        console.log(lines)
    


