//modulo nativo de js
const {Writable} = require('stream')

const writableStream = new Writable({
    //en el constructor va el metodo write()
    //chunk son pedazos de datos
    write(chunk, encoding,callback){
        //en este ejemplo convertimos un readable string a
        //cadena de datos y lo imprimimos
        console.log(chunk.toString)
        //se llama la funcion callback para que sepa que ha dinalizado
        callback()
    }
});

//los writable string tienen que estar añadidos a un readable string

//process.stdin -> funcionalidad nativa que se encarga de leer los datos
//usamos pipe para leer el string
process.stdin.pipe(writableStream);